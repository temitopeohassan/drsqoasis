<?php

declare(strict_types=1);

/**
 * POST /api/chat.php — the DRSQ Oasis AI assistant.
 *
 * Request:  {"conversationId": "<uuid>", "message": "..."}
 *       or  {"action": "delete", "conversationId": "<uuid>"}
 * Response: {"reply": "..."}  or  {"error": "..."}
 *
 * The browser keeps the list of chats (for the sidebar) and only ever sends the
 * newest message. The model history for each chat — including thinking blocks,
 * which must be passed back unchanged — is stored here, one file per chat.
 */

use Anthropic\Client;
use Anthropic\Core\Exceptions\APIConnectionException;
use Anthropic\Core\Exceptions\APIStatusException;
use Anthropic\Core\Exceptions\AuthenticationException;
use Anthropic\Core\Exceptions\RateLimitException;
use Dotenv\Dotenv;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const MAX_MESSAGE_LENGTH = 4000;
const MAX_USER_TURNS = 50;
const MAX_TOOL_ROUNDS = 4;

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$autoload = __DIR__ . '/vendor/autoload.php';
if (!is_file($autoload)) {
    error_log('[agent] vendor/autoload.php missing — run `composer install -d public/api`');
    respond(500, ['error' => 'Assistant is not configured.']);
}
require $autoload;
require __DIR__ . '/lib/prompt.php';
require __DIR__ . '/lib/mailer.php';

// .env lives two levels up: the project root locally, and the folder above the
// web root on the server (dist/api -> public_html/api -> ~/), outside public reach.
// Set DRSQ_ENV_DIR (e.g. Apache SetEnv) to load it from somewhere else.
$envDir = getenv('DRSQ_ENV_DIR') ?: dirname(__DIR__, 2);
Dotenv::createImmutable($envDir)->safeLoad();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Method not allowed.']);
}

// Reject cross-site requests: only this app calls the endpoint.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== parse_url('//' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST)) {
    respond(403, ['error' => 'Forbidden.']);
}

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) {
    respond(400, ['error' => 'Invalid request.']);
}

$conversationId = (string) ($body['conversationId'] ?? '');
if (!preg_match('/^[A-Za-z0-9-]{8,64}$/', $conversationId)) {
    respond(400, ['error' => 'Invalid conversation.']);
}

// Chat files live outside the web root (default: <env dir>/chat-data).
$dataDir = env_value('CHAT_DATA_DIR', $envDir . '/chat-data');
if (!is_dir($dataDir) && !mkdir($dataDir, 0700, true) && !is_dir($dataDir)) {
    error_log("[agent] cannot create CHAT_DATA_DIR {$dataDir}");
    respond(500, ['error' => 'Assistant is not configured.']);
}
$file = $dataDir . '/' . $conversationId . '.dat';

if (($body['action'] ?? '') === 'delete') {
    if (is_file($file)) {
        unlink($file);
    }
    respond(200, ['ok' => true]);
}

$apiKey = env_value('ANTHROPIC_API_KEY');
if ($apiKey === '') {
    error_log('[agent] ANTHROPIC_API_KEY is not set — add it to .env');
    respond(500, ['error' => 'Assistant is not configured.']);
}

$message = trim((string) ($body['message'] ?? ''));
if ($message === '') {
    respond(400, ['error' => 'Message is empty.']);
}
if (mb_strlen($message) > MAX_MESSAGE_LENGTH) {
    respond(400, ['error' => 'Message is too long.']);
}

// Hold an exclusive lock for the whole turn so two tabs can't interleave
// writes to the same conversation.
$handle = fopen($file, 'c+');
if ($handle === false || !flock($handle, LOCK_EX)) {
    respond(500, ['error' => 'Could not open the conversation.']);
}

$saved = stream_get_contents($handle);
$state = $saved !== '' ? unserialize($saved) : false;
if (!is_array($state)) {
    // `messages` is the API history (assistant turns kept exactly as returned);
    // `transcript` is the plain text included in lead and issue emails.
    $state = ['messages' => [], 'transcript' => [], 'turns' => 0];
}

$saveState = static function (array $state) use ($handle): void {
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, serialize($state));
    fflush($handle);
};

if ($state['turns'] >= MAX_USER_TURNS) {
    respond(429, [
        'error' => 'Conversation limit reached.',
        'reply' => 'This conversation has reached its length limit. Please start a **New chat** to continue.',
    ]);
}

$messages = $state['messages'];
$messages[] = ['role' => 'user', 'content' => $message];
$transcript = [...$state['transcript'], ['role' => 'user', 'text' => $message]];

$client = new Client(apiKey: $apiKey);
$model = env_value('CLAUDE_MODEL', 'claude-opus-5-5');
$tools = chat_tools();

$request = static fn (array $messages) => $client->beta->messages->create(
    model: $model,
    maxTokens: 16000,
    system: [
        ['type' => 'text', 'text' => chat_system_prompt(), 'cacheControl' => ['type' => 'ephemeral']],
    ],
    tools: $tools,
    messages: $messages,
    outputConfig: ['effort' => 'medium'],
    // If a safety classifier declines a turn, the API retries it on a fallback
    // model inside the same call instead of returning an empty refusal.
    fallbacks: 'default',
    betas: ['server-side-fallback-2026-07-01'],
);

try {
    $response = $request($messages);

    for ($round = 0; $response->stopReason === 'tool_use' && $round < MAX_TOOL_ROUNDS; $round++) {
        $toolResults = [];
        foreach ($response->content as $block) {
            if ($block->type !== 'tool_use') {
                continue;
            }
            $result = match ($block->name) {
                'capture_lead' => handle_capture_lead($block->input, $transcript),
                'forward_issue' => handle_forward_issue($block->input, $transcript),
                default => ['ok' => false, 'error' => "Unknown tool {$block->name}."],
            };
            $toolResults[] = [
                'type' => 'tool_result',
                'toolUseID' => $block->id,
                'content' => json_encode($result, JSON_UNESCAPED_UNICODE),
                'isError' => !$result['ok'],
            ];
        }

        $messages[] = ['role' => 'assistant', 'content' => $response->content];
        $messages[] = ['role' => 'user', 'content' => $toolResults];
        $response = $request($messages);
    }
} catch (AuthenticationException $e) {
    error_log('[agent] Claude API rejected the key — check ANTHROPIC_API_KEY in .env');
    $failure = $e;
} catch (RateLimitException $e) {
    error_log('[agent] Claude API rate limit: ' . $e->getMessage());
    $failure = $e;
} catch (APIStatusException $e) {
    error_log('[agent] Claude API error ' . $e->status . ': ' . $e->getMessage());
    $failure = $e;
} catch (APIConnectionException $e) {
    error_log('[agent] could not reach the Claude API: ' . $e->getMessage());
    $failure = $e;
}

if (isset($failure)) {
    // Nothing is saved, so the visitor can simply resend.
    respond(502, ['error' => 'The assistant is unavailable right now.']);
}

$reply = '';
foreach ($response->content as $block) {
    if ($block->type === 'text') {
        $reply .= $block->text;
    }
}
$reply = trim($reply);

if ($response->stopReason === 'refusal' || $response->stopReason === 'tool_use' || $reply === '') {
    // Never store a refused or empty turn, or one that still has unanswered
    // tool calls after MAX_TOOL_ROUNDS; the history stays valid for next time.
    respond(200, ['reply' => "I'm not able to help with that here. For anything else, email info@drsqoasis.com or call (470) 546 0052."]);
}

$messages[] = ['role' => 'assistant', 'content' => $response->content];
$transcript[] = ['role' => 'assistant', 'text' => $reply];
$saveState([
    'messages' => $messages,
    'transcript' => $transcript,
    'turns' => $state['turns'] + 1,
]);

respond(200, ['reply' => $reply]);
