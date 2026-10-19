<?php

declare(strict_types=1);

/**
 * POST /api/chat.php — the website chat assistant.
 *
 * Request:  {"message": "..."}  or  {"reset": true}
 * Response: {"reply": "..."}    or  {"error": "..."}
 *
 * The conversation lives in the PHP session, so the browser only ever sends
 * the newest message and cannot rewrite earlier turns.
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

const MAX_MESSAGE_LENGTH = 2000;
const MAX_USER_TURNS = 30;
const MAX_TOOL_ROUNDS = 4;

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$autoload = __DIR__ . '/vendor/autoload.php';
if (!is_file($autoload)) {
    error_log('[chat] vendor/autoload.php missing — run `composer install` in public/api');
    respond(500, ['error' => 'Chat is not configured.']);
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

// Reject cross-site requests: the widget only ever calls from this site.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== parse_url('//' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST)) {
    respond(403, ['error' => 'Forbidden.']);
}

$apiKey = env_value('ANTHROPIC_API_KEY');
if ($apiKey === '') {
    error_log('[chat] ANTHROPIC_API_KEY is not set — add it to .env');
    respond(500, ['error' => 'Chat is not configured.']);
}

$body = json_decode((string) file_get_contents('php://input'), true);
if (!is_array($body)) {
    respond(400, ['error' => 'Invalid request.']);
}

session_name('drsq_chat');
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/api/',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_start();

if (!empty($body['reset'])) {
    $_SESSION = [];
    session_regenerate_id(true);
    respond(200, ['ok' => true]);
}

$message = trim((string) ($body['message'] ?? ''));
if ($message === '') {
    respond(400, ['error' => 'Message is empty.']);
}
if (mb_strlen($message) > MAX_MESSAGE_LENGTH) {
    respond(400, ['error' => 'Message is too long.']);
}

// `messages` is the API history (assistant turns kept exactly as returned,
// including thinking blocks); `transcript` is the plain text used in emails.
$_SESSION['messages'] ??= [];
$_SESSION['transcript'] ??= [];
$_SESSION['turns'] = ($_SESSION['turns'] ?? 0) + 1;

if ($_SESSION['turns'] > MAX_USER_TURNS) {
    respond(429, [
        'error' => 'Conversation limit reached.',
        'reply' => 'This conversation has reached its limit. Please start a new chat, or email info@drsqoasis.com and the team will help directly.',
    ]);
}

$messages = $_SESSION['messages'];
$messages[] = ['role' => 'user', 'content' => $message];
$_SESSION['transcript'][] = ['role' => 'user', 'text' => $message];

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
    // Short customer-service replies don't need deep reasoning.
    outputConfig: ['effort' => 'low'],
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
            $input = is_array($block->input) ? $block->input : (array) $block->input;
            $result = match ($block->name) {
                'capture_lead' => handle_capture_lead($input, $_SESSION['transcript']),
                'forward_issue' => handle_forward_issue($input, $_SESSION['transcript']),
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
    error_log('[chat] Claude API rejected the key — check ANTHROPIC_API_KEY in .env');
    $failure = $e;
} catch (RateLimitException $e) {
    error_log('[chat] Claude API rate limit: ' . $e->getMessage());
    $failure = $e;
} catch (APIStatusException $e) {
    error_log('[chat] Claude API error ' . $e->status . ': ' . $e->getMessage());
    $failure = $e;
} catch (APIConnectionException $e) {
    error_log('[chat] could not reach the Claude API: ' . $e->getMessage());
    $failure = $e;
}

if (isset($failure)) {
    // Drop the turn so the visitor can simply try again.
    array_pop($_SESSION['transcript']);
    $_SESSION['turns']--;
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
    // Keep history consistent: never store a refused or empty turn, or one
    // that still has unanswered tool calls after MAX_TOOL_ROUNDS.
    array_pop($_SESSION['transcript']);
    $_SESSION['turns']--;
    respond(200, ['reply' => "I'm not able to help with that here. For anything else, email info@drsqoasis.com or call (470) 546 0052."]);
}

$messages[] = ['role' => 'assistant', 'content' => $response->content];
$_SESSION['messages'] = $messages;
$_SESSION['transcript'][] = ['role' => 'assistant', 'text' => $reply];

respond(200, ['reply' => $reply]);
