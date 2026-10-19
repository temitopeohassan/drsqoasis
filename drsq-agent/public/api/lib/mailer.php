<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailerException;
use PHPMailer\PHPMailer\PHPMailer;

function env_value(string $key, string $default = ''): string
{
    $value = $_ENV[$key] ?? $_SERVER[$key] ?? getenv($key);
    return ($value === false || $value === null || $value === '') ? $default : (string) $value;
}

/**
 * Send a plain-text notification to the team. Uses SMTP when SMTP_HOST is set,
 * otherwise PHP's mail(). Returns null on success or an error string.
 */
function send_team_email(string $to, string $subject, string $body, ?string $replyTo = null, ?string $replyName = null): ?string
{
    $mail = new PHPMailer(true);

    try {
        $smtpHost = env_value('SMTP_HOST');
        if ($smtpHost !== '') {
            $mail->isSMTP();
            $mail->Host = $smtpHost;
            $mail->Port = (int) env_value('SMTP_PORT', '587');
            $user = env_value('SMTP_USER');
            if ($user !== '') {
                $mail->SMTPAuth = true;
                $mail->Username = $user;
                $mail->Password = env_value('SMTP_PASS');
            }
            $secure = strtolower(env_value('SMTP_SECURE', 'tls'));
            $mail->SMTPSecure = match ($secure) {
                'ssl', 'smtps' => PHPMailer::ENCRYPTION_SMTPS,
                'none', '' => '',
                default => PHPMailer::ENCRYPTION_STARTTLS,
            };
        } else {
            $mail->isMail();
        }

        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->setFrom(env_value('MAIL_FROM', 'no-reply@drsqoasis.com'), env_value('MAIL_FROM_NAME', 'DRSQ Oasis Assistant'));

        foreach (array_filter(array_map('trim', explode(',', $to))) as $address) {
            $mail->addAddress($address);
        }
        if ($replyTo !== null && PHPMailer::validateAddress($replyTo)) {
            $mail->addReplyTo($replyTo, $replyName ?? '');
        }

        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->isHTML(false);
        $mail->send();

        return null;
    } catch (MailerException $e) {
        error_log('[chat] email failed: ' . $mail->ErrorInfo);
        return 'Email could not be sent.';
    }
}

/** Plain-text transcript of the visible conversation, appended to every email. */
function transcript_text(array $transcript): string
{
    $lines = [];
    foreach ($transcript as $entry) {
        $who = $entry['role'] === 'user' ? 'Visitor' : 'Assistant';
        $lines[] = "{$who}: {$entry['text']}";
    }
    return implode("\n\n", $lines);
}

function handle_capture_lead(array $input, array $transcript): array
{
    if (!PHPMailer::validateAddress($input['email'] ?? '')) {
        return ['ok' => false, 'error' => 'The email address is not valid. Ask the visitor to check it.'];
    }

    $to = env_value('CHAT_LEADS_TO', env_value('CHAT_FORWARD_TO', 'info@drsqoasis.com'));
    $subject = 'New assistant lead: ' . $input['name'] . ($input['organization'] !== '' ? " ({$input['organization']})" : '');
    $body = implode("\n", [
        'A new lead was captured by the DRSQ Oasis AI assistant app.',
        '',
        "Name:         {$input['name']}",
        "Email:        {$input['email']}",
        'Phone:        ' . ($input['phone'] !== '' ? $input['phone'] : '-'),
        'Organization: ' . ($input['organization'] !== '' ? $input['organization'] : '-'),
        "Audience:     {$input['audience']}",
        "Interest:     {$input['interest']}",
        '',
        'Summary:',
        $input['summary'],
        '',
        '--- Chat transcript ---',
        transcript_text($transcript),
    ]);

    $error = send_team_email($to, $subject, $body, $input['email'], $input['name']);
    return $error === null ? ['ok' => true, 'message' => 'Lead sent to the team.'] : ['ok' => false, 'error' => $error];
}

function handle_forward_issue(array $input, array $transcript): array
{
    if (!PHPMailer::validateAddress($input['email'] ?? '')) {
        return ['ok' => false, 'error' => 'The email address is not valid. Ask the visitor to check it.'];
    }

    $to = env_value('CHAT_ISSUES_TO', env_value('CHAT_FORWARD_TO', 'info@drsqoasis.com'));
    $prefix = $input['urgency'] === 'high' ? '[URGENT] ' : '';
    $subject = "{$prefix}Assistant issue: {$input['subject']}";
    $body = implode("\n", [
        'An issue was forwarded by the DRSQ Oasis AI assistant app.',
        '',
        "Name:     {$input['name']}",
        "Email:    {$input['email']}",
        'Phone:    ' . ($input['phone'] !== '' ? $input['phone'] : '-'),
        "Category: {$input['category']}",
        "Urgency:  {$input['urgency']}",
        '',
        'Description:',
        $input['description'],
        '',
        '--- Chat transcript ---',
        transcript_text($transcript),
    ]);

    $error = send_team_email($to, $subject, $body, $input['email'], $input['name']);
    return $error === null ? ['ok' => true, 'message' => 'Issue forwarded to the team.'] : ['ok' => false, 'error' => $error];
}
