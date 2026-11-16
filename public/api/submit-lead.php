<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['https://elan-tech.net', 'https://www.elan-tech.net'];
if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    respond(403, ['ok' => false, 'error' => 'Origin not allowed']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength < 1 || $contentLength > 32768) {
    respond(413, ['ok' => false, 'error' => 'Invalid request size']);
}

$raw = file_get_contents('php://input');
$request = is_string($raw) ? json_decode($raw, true) : null;
if (!is_array($request)) {
    respond(400, ['ok' => false, 'error' => 'Invalid JSON']);
}

$submissionId = (string) ($request['submissionId'] ?? '');
$formType = (string) ($request['formType'] ?? '');
$notify = ($request['notify'] ?? false) === true;
$fields = $request['fields'] ?? null;

$allowedForms = ['contact', 'website-audit', 'paid-booking', 'get-quote', 'rush-assessment', 'request-demo'];
// Pages cached before 16 November 2026 still send the old form name.
if ($formType === 'free-audit') {
    $formType = 'website-audit';
}
if (!preg_match('/^[a-zA-Z0-9-]{12,64}$/', $submissionId)) {
    respond(400, ['ok' => false, 'error' => 'Invalid submission ID']);
}
if (!in_array($formType, $allowedForms, true) || !is_array($fields)) {
    respond(400, ['ok' => false, 'error' => 'Invalid form data']);
}

// Bots commonly fill this field. Return a normal response without storing it.
if (trim((string) ($fields['_honey'] ?? '')) !== '') {
    respond(200, ['ok' => true, 'stored' => false]);
}

function cleanValue(mixed $value, int $depth = 0): mixed
{
    if ($depth > 2) {
        return null;
    }
    if (is_string($value)) {
        $value = trim(str_replace("\0", '', $value));
        return function_exists('mb_substr') ? mb_substr($value, 0, 4000) : substr($value, 0, 4000);
    }
    if (is_bool($value) || is_int($value) || is_float($value) || $value === null) {
        return $value;
    }
    if (is_array($value)) {
        $clean = [];
        foreach (array_slice($value, 0, 50, true) as $key => $item) {
            $safeKey = preg_replace('/[^a-zA-Z0-9 _.-]/', '', (string) $key);
            if ($safeKey !== '') {
                $clean[substr($safeKey, 0, 80)] = cleanValue($item, $depth + 1);
            }
        }
        return $clean;
    }
    return null;
}

$cleanFields = cleanValue($fields);
if (!is_array($cleanFields)) {
    respond(400, ['ok' => false, 'error' => 'Invalid fields']);
}
unset($cleanFields['_honey'], $cleanFields['_captcha'], $cleanFields['_template']);

// These forms require affirmative acknowledgement of their versioned,
// just-in-time privacy notices.
$privacyNoticeVersions = [
    'contact' => 'contact-2026-09-23',
    'get-quote' => 'get-quote-2026-09-23',
    'website-audit' => 'website-audit-2026-11-16',
    'paid-booking' => 'paid-booking-2026-11-16',
    'request-demo' => 'request-demo-2026-09-24',
    'rush-assessment' => 'rush-assessment-2026-09-24',
];
if (isset($privacyNoticeVersions[$formType])) {
    $privacyAccepted = ($cleanFields['privacyAccepted'] ?? false) === true;
    $privacyNoticeVersion = (string) ($cleanFields['_privacyNoticeVersion'] ?? '');
    // The website-audit form was named free-audit before 16 November 2026; accept its notice version from cached pages.
    $legacyAuditNotice = $formType === 'website-audit' && $privacyNoticeVersion === 'free-audit-2026-09-23';
    if (!$privacyAccepted || ($privacyNoticeVersion !== $privacyNoticeVersions[$formType] && !$legacyAuditNotice)) {
        respond(422, ['ok' => false, 'error' => 'Privacy acknowledgement is required']);
    }
}

if ($formType === 'get-quote') {
    $quoteName = trim((string) ($cleanFields['name'] ?? ''));
    $projectType = trim((string) ($cleanFields['projectType'] ?? ''));
    $description = trim((string) ($cleanFields['description'] ?? ''));
    if (strlen($quoteName) < 2 || $projectType === '' || strlen($description) < 1) {
        respond(422, ['ok' => false, 'error' => 'Required quote details are missing']);
    }
}

if ($formType === 'website-audit') {
    $auditName = trim((string) ($cleanFields['name'] ?? ''));
    $auditUrl = trim((string) ($cleanFields['url'] ?? ''));
    $parsedAuditUrl = filter_var($auditUrl, FILTER_VALIDATE_URL);
    $auditScheme = is_string($parsedAuditUrl) ? strtolower((string) parse_url($parsedAuditUrl, PHP_URL_SCHEME)) : '';
    if (strlen($auditName) < 2 || $parsedAuditUrl === false || !in_array($auditScheme, ['http', 'https'], true)) {
        respond(422, ['ok' => false, 'error' => 'Required audit details are missing or invalid']);
    }
}

if ($formType === 'request-demo') {
    $demoName = trim((string) ($cleanFields['name'] ?? ''));
    $demoProduct = trim((string) ($cleanFields['product'] ?? ''));
    $allowedDemoProducts = [
        'Real Estate Portal',
        'Medical Conference Portal',
        'IMA Society Portal',
        'Resort Management System',
    ];
    if (strlen($demoName) < 2 || !in_array($demoProduct, $allowedDemoProducts, true)) {
        respond(422, ['ok' => false, 'error' => 'Required demo-request details are missing or invalid']);
    }
}

if ($formType === 'rush-assessment') {
    $rushName = trim((string) ($cleanFields['name'] ?? ''));
    $rushUrl = trim((string) ($cleanFields['url'] ?? ''));
    $rushPlatform = trim((string) ($cleanFields['platform'] ?? ''));
    $rushDeadline = trim((string) ($cleanFields['deadline'] ?? ''));
    $parsedRushUrl = filter_var($rushUrl, FILTER_VALIDATE_URL);
    $rushScheme = is_string($parsedRushUrl) ? strtolower((string) parse_url($parsedRushUrl, PHP_URL_SCHEME)) : '';
    $allowedRushPlatforms = ['', 'Shopify', 'WooCommerce', 'Custom', 'Not sure'];
    $validRushDeadline = $rushDeadline === '' || (
        preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $rushDeadline, $deadlineParts) === 1
        && checkdate((int) $deadlineParts[2], (int) $deadlineParts[3], (int) $deadlineParts[1])
    );
    if (
        strlen($rushName) < 2
        || $parsedRushUrl === false
        || !in_array($rushScheme, ['http', 'https'], true)
        || !in_array($rushPlatform, $allowedRushPlatforms, true)
        || !$validRushDeadline
    ) {
        respond(422, ['ok' => false, 'error' => 'Required rush-assessment details are missing or invalid']);
    }
}

// Audit requests and other paid bookings are accepted only for a verified, unused Razorpay
// payment (razorpay-verify.php marks the order paid). The booking is then marked as used.
if (in_array($formType, ['website-audit', 'paid-booking'], true)) {
    $paidOrderId = (string) ($cleanFields['_razorpayOrderId'] ?? '');
    $paymentsRoot = getenv('ELAN_PRIVATE_DIR');
    $paymentsRoot = (is_string($paymentsRoot) && trim($paymentsRoot) !== '') ? rtrim($paymentsRoot, '/') : dirname(__DIR__, 2) . '/elan-tech-private';
    $paidOrderPath = $paymentsRoot . '/payments/orders/' . $paidOrderId . '.json';
    $paidOrder = (preg_match('/^order_[A-Za-z0-9]{6,40}$/', $paidOrderId) && is_file($paidOrderPath))
        ? json_decode((string) file_get_contents($paidOrderPath), true)
        : null;
    $paidProductMatches = is_array($paidOrder)
        && ($formType === 'paid-booking' || ($paidOrder['product'] ?? '') === 'website-audit');
    if (!is_array($paidOrder) || ($paidOrder['status'] ?? '') !== 'paid' || !$paidProductMatches) {
        respond(402, ['ok' => false, 'error' => 'Payment is required before this request']);
    }
    $paidOrder['status'] = 'booked';
    $paidOrder['bookedAt'] = gmdate('c');
    $paidOrder['leadSubmissionId'] = $submissionId;
    file_put_contents($paidOrderPath, json_encode($paidOrder, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT), LOCK_EX);
    @chmod($paidOrderPath, 0600);
    // The alert shows what was actually paid, from the server record, not from the browser.
    $cleanFields['_paidProduct'] = (string) ($paidOrder['label'] ?? '');
    $cleanFields['_paymentId'] = (string) ($paidOrder['paymentId'] ?? '');
    $cleanFields['_amountPaid'] = number_format(((int) ($paidOrder['amount'] ?? 0)) / 100, 2) . ' ' . (string) ($paidOrder['currency'] ?? '');
}

$email = trim((string) ($cleanFields['email'] ?? ''));
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'A valid email is required']);
}

$storageRoot = getenv('ELAN_LEAD_STORAGE_DIR');
if (!is_string($storageRoot) || trim($storageRoot) === '') {
    // public_html/api/submit-lead.php -> account-home/elan-tech-private/leads
    $storageRoot = dirname(__DIR__, 2) . '/elan-tech-private/leads';
}

if (!is_dir($storageRoot) && !mkdir($storageRoot, 0700, true) && !is_dir($storageRoot)) {
    respond(503, ['ok' => false, 'error' => 'Backup storage unavailable']);
}

// Retain unconverted enquiry backup records for no more than
// 12 months. This runs at most once per UTC day and preserves other forms.
$retentionMarker = $storageRoot . '/.lead-retention-last-run';
$shouldPruneLeads = !is_file($retentionMarker) || filemtime($retentionMarker) < time() - 86400;
if ($shouldPruneLeads) {
    $leadCutoff = time() - (365 * 86400);
    $formsWithTwelveMonthRetention = ['contact', 'get-quote', 'website-audit', 'paid-booking', 'request-demo', 'rush-assessment'];
    $currentLeadFile = 'leads-' . gmdate('Y-m') . '.jsonl';
    foreach (glob($storageRoot . '/leads-*.jsonl') ?: [] as $candidateFile) {
        if (basename($candidateFile) === $currentLeadFile || !is_file($candidateFile)) {
            continue;
        }
        $keptLines = [];
        foreach (file($candidateFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $savedLine) {
            $savedRecord = json_decode($savedLine, true);
            $receivedAt = is_array($savedRecord) ? strtotime((string) ($savedRecord['receivedAt'] ?? '')) : false;
            $isExpiredLead = is_array($savedRecord)
                && in_array(($savedRecord['formType'] ?? ''), $formsWithTwelveMonthRetention, true)
                && is_int($receivedAt)
                && $receivedAt < $leadCutoff;
            if (!$isExpiredLead) {
                $keptLines[] = $savedLine;
            }
        }
        file_put_contents($candidateFile, $keptLines === [] ? '' : implode(PHP_EOL, $keptLines) . PHP_EOL, LOCK_EX);
        @chmod($candidateFile, 0600);
    }
    @touch($retentionMarker);
    @chmod($retentionMarker, 0600);
    foreach (glob($storageRoot . '/alert-status-*.jsonl') ?: [] as $statusFile) {
        if (!is_file($statusFile)) continue;
        $keptStatus = [];
        foreach (file($statusFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $savedStatus) {
            $statusRecord = json_decode($savedStatus, true);
            $recordedAt = is_array($statusRecord) ? strtotime((string) ($statusRecord['recordedAt'] ?? '')) : false;
            if ($recordedAt === false || $recordedAt >= $leadCutoff) $keptStatus[] = $savedStatus;
        }
        file_put_contents($statusFile, $keptStatus === [] ? '' : implode(PHP_EOL, $keptStatus) . PHP_EOL, LOCK_EX);
        @chmod($statusFile, 0600);
    }
}

$clientIp = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rateKey = hash('sha256', $clientIp);
$rateDir = $storageRoot . '/.rate-limit';
if (!is_dir($rateDir) && !mkdir($rateDir, 0700, true) && !is_dir($rateDir)) {
    respond(503, ['ok' => false, 'error' => 'Rate limiter unavailable']);
}

$rateFile = $rateDir . '/' . $rateKey . '.json';
$now = time();
$attempts = [];
if (is_file($rateFile)) {
    $savedAttempts = json_decode((string) file_get_contents($rateFile), true);
    if (is_array($savedAttempts)) {
        $attempts = array_values(array_filter($savedAttempts, static fn ($time): bool => is_int($time) && $time > $now - 3600));
    }
}
if (count($attempts) >= 15) {
    respond(429, ['ok' => false, 'error' => 'Too many requests']);
}
$attempts[] = $now;
file_put_contents($rateFile, json_encode($attempts), LOCK_EX);
@chmod($rateFile, 0600);

$record = [
    'receivedAt' => gmdate('c'),
    'submissionId' => $submissionId,
    'formType' => $formType,
    'fields' => $cleanFields,
];
$leadFile = $storageRoot . '/leads-' . gmdate('Y-m') . '.jsonl';
$line = json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . PHP_EOL;
$stored = file_put_contents($leadFile, $line, FILE_APPEND | LOCK_EX) !== false;
if ($stored) {
    @chmod($leadFile, 0600);
}

if (!$stored) {
    respond(503, ['ok' => false, 'error' => 'Could not store lead']);
}

$privateRoot = dirname(__DIR__, 2) . '/elan-tech-private';
$configPath = getenv('ELAN_LEAD_ALERT_CONFIG');
if (!is_string($configPath) || trim($configPath) === '') {
    $configPath = $privateRoot . '/lead-alert-config.php';
}

$alertConfig = [];
if (is_file($configPath)) {
    $loadedConfig = require $configPath;
    if (is_array($loadedConfig)) {
        $alertConfig = $loadedConfig;
    }
}

function validRecipients(mixed $configured): array
{
    $values = is_array($configured) ? $configured : [$configured];
    $recipients = [];
    foreach ($values as $value) {
        $candidate = trim((string) $value);
        if (filter_var($candidate, FILTER_VALIDATE_EMAIL)) {
            $recipients[] = $candidate;
        }
    }
    return array_values(array_unique($recipients));
}

function sendWithBrevo(
    string $apiKey,
    array $recipients,
    string $senderEmail,
    string $senderName,
    string $replyTo,
    string $subject,
    string $textBody,
    string $htmlBody
): bool {
    if ($apiKey === '' || !function_exists('curl_init')) {
        return false;
    }

    $payload = [
        'sender' => ['name' => $senderName, 'email' => $senderEmail],
        'to' => array_map(static fn (string $address): array => ['email' => $address], $recipients),
        'replyTo' => ['email' => $replyTo],
        'subject' => $subject,
        'textContent' => $textBody,
        'htmlContent' => $htmlBody,
        'tags' => ['website-lead'],
    ];

    $request = curl_init('https://api.brevo.com/v3/smtp/email');
    if ($request === false) {
        return false;
    }
    curl_setopt_array($request, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 12,
        CURLOPT_HTTPHEADER => [
            'Accept: application/json',
            'Content-Type: application/json',
            'api-key: ' . $apiKey,
        ],
        CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
    ]);
    curl_exec($request);
    $status = (int) curl_getinfo($request, CURLINFO_HTTP_CODE);
    curl_close($request);

    return $status >= 200 && $status < 300;
}

/**
 * Sends the alert through an authenticated SMTP account, such as Gmail with
 * an app password. Returns [accepted, error]. The error names the stage that
 * failed and the server's reply code; it never contains the password.
 */
function sendWithSmtp(
    array $smtp,
    array $recipients,
    string $fromEmail,
    string $fromName,
    string $replyTo,
    string $subject,
    string $textBody,
    string $htmlBody
): array {
    $host = (string) ($smtp['host'] ?? '');
    $port = (int) ($smtp['port'] ?? 0);
    $username = (string) ($smtp['username'] ?? '');
    $password = (string) ($smtp['password'] ?? '');
    $caFile = (string) ($smtp['ca_file'] ?? '');
    $implicitTls = ($smtp['encryption'] ?? '') === 'ssl';
    if ($host === '' || $port < 1 || $username === '' || $password === '' || $recipients === []) {
        return [false, 'not configured'];
    }

    // The certificate is always verified, so the password is only ever sent
    // to the real mail server.
    $ssl = ['verify_peer' => true, 'verify_peer_name' => true, 'peer_name' => $host, 'SNI_enabled' => true];
    if ($caFile !== '' && is_file($caFile)) {
        $ssl['cafile'] = $caFile;
    }
    $context = stream_context_create(['ssl' => $ssl]);
    $socket = @stream_socket_client(
        ($implicitTls ? 'ssl://' : 'tcp://') . $host . ':' . $port,
        $errorNumber,
        $errorText,
        8,
        STREAM_CLIENT_CONNECT,
        $context
    );
    if (!is_resource($socket)) {
        return [false, 'connect failed'];
    }
    stream_set_timeout($socket, 12);

    $read = static function () use ($socket): int {
        $code = 0;
        for ($lineCount = 0; $lineCount < 60; $lineCount++) {
            $line = fgets($socket, 1024);
            if ($line === false || strlen($line) < 3) {
                return 0;
            }
            $code = (int) substr($line, 0, 3);
            // "250-..." continues the reply; "250 ..." ends it.
            if (strlen($line) < 4 || $line[3] !== '-') {
                break;
            }
        }
        return $code;
    };
    $command = static function (string $line) use ($socket, $read): int {
        if (@fwrite($socket, $line . "\r\n") === false) {
            return 0;
        }
        return $read();
    };
    $fail = static function (string $stage, int $code) use ($socket): array {
        @fwrite($socket, "QUIT\r\n");
        @fclose($socket);
        return [false, $stage . ' rejected (' . $code . ')'];
    };

    $code = $read();
    if ($code !== 220) {
        return $fail('greeting', $code);
    }
    $code = $command('EHLO elan-tech.net');
    if ($code !== 250) {
        return $fail('EHLO', $code);
    }
    if (!$implicitTls) {
        $code = $command('STARTTLS');
        if ($code !== 220) {
            return $fail('STARTTLS', $code);
        }
        if (@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT) !== true) {
            @fclose($socket);
            return [false, 'TLS handshake failed'];
        }
        $code = $command('EHLO elan-tech.net');
        if ($code !== 250) {
            return $fail('EHLO after STARTTLS', $code);
        }
    }

    $code = $command('AUTH LOGIN');
    if ($code !== 334) {
        return $fail('AUTH', $code);
    }
    $code = $command(base64_encode($username));
    if ($code !== 334) {
        return $fail('AUTH username', $code);
    }
    $code = $command(base64_encode($password));
    if ($code !== 235) {
        return $fail('AUTH password', $code);
    }

    $code = $command('MAIL FROM:<' . $username . '>');
    if ($code !== 250) {
        return $fail('MAIL FROM', $code);
    }
    foreach ($recipients as $recipient) {
        $code = $command('RCPT TO:<' . $recipient . '>');
        if ($code !== 250 && $code !== 251) {
            return $fail('RCPT TO', $code);
        }
    }
    $code = $command('DATA');
    if ($code !== 354) {
        return $fail('DATA', $code);
    }

    $oneLine = static fn (string $value): string => trim((string) preg_replace('/[\r\n]+/', ' ', $value));
    $encodeHeader = static function (string $value) use ($oneLine): string {
        $value = $oneLine($value);
        if (preg_match('/[^\x20-\x7E]/', $value) !== 1) {
            return $value;
        }
        return function_exists('mb_encode_mimeheader')
            ? mb_encode_mimeheader($value, 'UTF-8', 'B', "\r\n")
            : '=?UTF-8?B?' . base64_encode($value) . '?=';
    };
    $displayName = $oneLine($fromName);
    $fromHeader = preg_match('/[^\x20-\x7E]/', $displayName) === 1
        ? $encodeHeader($displayName) . ' <' . $fromEmail . '>'
        : '"' . addcslashes($displayName, '"\\') . '" <' . $fromEmail . '>';
    $boundary = 'elan-' . bin2hex(random_bytes(12));
    $domain = substr((string) strrchr($fromEmail, '@'), 1) ?: 'elan-tech.net';

    $message = implode("\r\n", [
        'Date: ' . date('r'),
        'From: ' . $fromHeader,
        'To: ' . implode(', ', $recipients),
        'Reply-To: ' . $oneLine($replyTo),
        'Subject: ' . $encodeHeader($subject),
        'Message-ID: <' . bin2hex(random_bytes(16)) . '@' . $domain . '>',
        'MIME-Version: 1.0',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        '',
        '--' . $boundary,
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        rtrim(chunk_split(base64_encode($textBody), 76, "\r\n")),
        '--' . $boundary,
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        rtrim(chunk_split(base64_encode($htmlBody), 76, "\r\n")),
        '--' . $boundary . '--',
    ]);

    if (@fwrite($socket, $message . "\r\n.\r\n") === false) {
        @fclose($socket);
        return [false, 'message write failed'];
    }
    $code = $read();
    if ($code !== 250) {
        return $fail('message', $code);
    }
    @fwrite($socket, "QUIT\r\n");
    @fclose($socket);

    return [true, ''];
}

$notified = false;
$notificationReliable = false;
$notificationChannel = null;
$alertErrors = [];
if ($notify) {
    $subject = preg_replace('/[\r\n]+/', ' ', (string) ($cleanFields['_subject'] ?? "Website enquiry: {$formType}"));
    $subject = function_exists('mb_substr') ? mb_substr((string) $subject, 0, 150) : substr((string) $subject, 0, 150);
    if ($formType === 'rush-assessment' && !str_starts_with((string) $subject, '[URGENT]')) {
        $subject = '[URGENT] ' . $subject;
    }
    $body = "Form: {$formType}\nSubmission: {$submissionId}\n\n";
    $htmlRows = '';
    foreach ($cleanFields as $key => $value) {
        if (str_starts_with((string) $key, '_')) {
            continue;
        }
        $displayValue = is_array($value) ? json_encode($value, JSON_UNESCAPED_UNICODE) : (string) $value;
        $body .= ucfirst((string) $key) . ': ' . $displayValue . "\n";
        $htmlRows .= '<tr><th align="left" style="padding:8px;border-bottom:1px solid #e5e7eb;color:#475569">'
            . htmlspecialchars(ucfirst((string) $key), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')
            . '</th><td style="padding:8px;border-bottom:1px solid #e5e7eb;color:#0f172a">'
            . nl2br(htmlspecialchars($displayValue, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'))
            . '</td></tr>';
    }

    $htmlBody = '<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto">'
        . '<div style="padding:18px 22px;background:#0f766e;color:white;border-radius:12px 12px 0 0">'
        . '<strong style="font-size:18px">New ' . htmlspecialchars($formType, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . ' request</strong>'
        . '<div style="font-size:12px;margin-top:5px;opacity:.9">Submission ' . htmlspecialchars($submissionId, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '</div>'
        . '</div><table role="presentation" style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb">'
        . $htmlRows . '</table><p style="font-size:13px;color:#64748b">Reply to this email to contact the enquirer directly. A private server backup has also been saved.</p></div>';

    $recipients = validRecipients($alertConfig['recipients'] ?? ['info@elan-tech.net']);
    if ($formType === 'rush-assessment') {
        $urgentRecipients = validRecipients($alertConfig['urgent_recipients'] ?? []);
        $recipients = array_values(array_unique(array_merge($recipients, $urgentRecipients)));
    }
    if ($recipients === []) {
        $recipients = ['info@elan-tech.net'];
    }

    $senderEmail = trim((string) ($alertConfig['sender_email'] ?? 'info@elan-tech.net'));
    if (!filter_var($senderEmail, FILTER_VALIDATE_EMAIL)) {
        $senderEmail = 'info@elan-tech.net';
    }
    $senderName = trim((string) ($alertConfig['sender_name'] ?? 'eLan Technology Website'));
    $brevoApiKey = trim((string) (getenv('BREVO_API_KEY') ?: ($alertConfig['brevo_api_key'] ?? '')));
    // Brevo is optional. A key still set to the example placeholder counts as not configured.
    if (str_starts_with($brevoApiKey, 'PASTE_')) {
        $brevoApiKey = '';
    }

    if (sendWithBrevo($brevoApiKey, $recipients, $senderEmail, $senderName, $email, (string) $subject, $body, $htmlBody)) {
        $notified = true;
        $notificationReliable = true;
        $notificationChannel = 'brevo';
    }

    // Second route: an authenticated SMTP account, such as Gmail with an app
    // password. It runs only when its username and password are configured.
    if (!$notified) {
        $smtpUsername = trim((string) (getenv('GMAIL_SMTP_USERNAME') ?: ($alertConfig['smtp_username'] ?? '')));
        $smtpPassword = (string) preg_replace('/\s+/', '', (string) (getenv('GMAIL_APP_PASSWORD') ?: ($alertConfig['smtp_app_password'] ?? '')));
        if (str_starts_with($smtpPassword, 'PASTE_')) {
            $smtpPassword = '';
        }
        if ($smtpPassword !== '' && filter_var($smtpUsername, FILTER_VALIDATE_EMAIL)) {
            $smtpPort = (int) ($alertConfig['smtp_port'] ?? 465);
            $smtpEncryption = (string) ($alertConfig['smtp_encryption'] ?? ($smtpPort === 465 ? 'ssl' : 'starttls'));
            // Gmail sends as the signed-in account unless a verified alias is set.
            $smtpFrom = trim((string) ($alertConfig['smtp_from_email'] ?? $smtpUsername));
            if (!filter_var($smtpFrom, FILTER_VALIDATE_EMAIL)) {
                $smtpFrom = $smtpUsername;
            }
            [$smtpAccepted, $smtpError] = sendWithSmtp(
                [
                    'host' => trim((string) ($alertConfig['smtp_host'] ?? 'smtp.gmail.com')),
                    'port' => $smtpPort,
                    'encryption' => $smtpEncryption === 'ssl' ? 'ssl' : 'starttls',
                    'username' => $smtpUsername,
                    'password' => $smtpPassword,
                    'ca_file' => trim((string) ($alertConfig['smtp_ca_file'] ?? '')),
                ],
                $recipients,
                $smtpFrom,
                $senderName,
                $email,
                (string) $subject,
                $body,
                $htmlBody
            );
            if ($smtpAccepted) {
                $notified = true;
                $notificationReliable = true;
                $notificationChannel = 'smtp';
            } else {
                $alertErrors[] = 'smtp: ' . $smtpError;
            }
        }
    }

    if (!$notified) {
        $headers = [
            'From: ' . $senderName . ' <' . $senderEmail . '>',
            'Reply-To: ' . $email,
            'Content-Type: text/plain; charset=UTF-8',
            'X-Mailer: PHP/' . PHP_VERSION,
        ];
        $notified = @mail(implode(',', $recipients), (string) $subject, $body, implode("\r\n", $headers));
        if ($notified) {
            $notificationChannel = 'php-mail';
        }
    }
}

// A provider accepting mail is not proof of inbox delivery. Retain operational
// status alongside the private lead backup so unalerted enquiries can be found.
$alertStatus = json_encode([
    'recordedAt' => gmdate('c'),
    'submissionId' => $submissionId,
    'formType' => $formType,
    'stored' => $stored,
    'notificationRequested' => $notify,
    'notificationAccepted' => $notified,
    'notificationReliable' => $notificationReliable,
    'channel' => $notificationChannel,
    // Why a configured route did not send. Stage and reply code only, no secrets.
    'errors' => $alertErrors,
], JSON_UNESCAPED_SLASHES);
if ($alertStatus !== false) {
    $statusPath = $storageRoot . '/alert-status-' . gmdate('Y-m') . '.jsonl';
    @file_put_contents($statusPath, $alertStatus . "\n", FILE_APPEND | LOCK_EX);
    @chmod($statusPath, 0600);
}

respond(200, [
    'ok' => true,
    'stored' => $stored,
    'notified' => $notified,
    'notificationReliable' => $notificationReliable,
    'notificationChannel' => $notificationChannel,
]);
