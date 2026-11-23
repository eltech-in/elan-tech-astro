<?php
/**
 * Spam protection shared by form-token.php and submit-lead.php. Not an endpoint: direct requests get 404.
 *
 * 1. Form token: the browser fetches a signed, time-stamped token from form-token.php before it submits.
 *    A submission without a valid token, sent within 3 seconds of the token or after 6 hours, is refused.
 *    The signing key is created on first use in <private>/form-guard-secret (0600), never in the code.
 * 2. Cloudflare Turnstile: required only when <private>/turnstile-config.php exists with a secret key
 *    (see deployment/turnstile-config.example.php). The site key is public, in src/lib/submitLead.ts.
 * 3. Content checks: link-stuffed or typical spam messages are kept in a separate spam file for review
 *    and do not send an alert.
 */
declare(strict_types=1);

if (!defined('ELAN_FORM_GUARD')) {
    http_response_code(404);
    exit;
}

const GUARD_MIN_SECONDS = 3;
const GUARD_MAX_SECONDS = 6 * 3600;

function guardPrivateRoot(): string
{
    $env = getenv('ELAN_PRIVATE_DIR');
    return (is_string($env) && trim($env) !== '') ? rtrim($env, '/') : dirname(__DIR__, 2) . '/elan-tech-private';
}

function guardSecret(): ?string
{
    $root = guardPrivateRoot();
    $path = $root . '/form-guard-secret';
    if (is_file($path)) {
        $secret = trim((string) file_get_contents($path));
        if (strlen($secret) >= 64) {
            return $secret;
        }
    }
    if (!is_dir($root) && !mkdir($root, 0700, true) && !is_dir($root)) {
        return null;
    }
    $secret = bin2hex(random_bytes(32));
    if (file_put_contents($path, $secret, LOCK_EX) === false) {
        return null;
    }
    @chmod($path, 0600);
    return $secret;
}

function guardIssueToken(): ?string
{
    $secret = guardSecret();
    if ($secret === null) {
        return null;
    }
    $payload = time() . '.' . bin2hex(random_bytes(8));
    return $payload . '.' . hash_hmac('sha256', $payload, $secret);
}

/** Returns null when the token is valid, otherwise a short reason (logged, never shown to visitors). */
function guardCheckToken(string $token): ?string
{
    if (!preg_match('/^(\d{10})\.([0-9a-f]{16})\.([0-9a-f]{64})$/', $token, $parts)) {
        return 'token-missing';
    }
    $secret = guardSecret();
    if ($secret === null) {
        return null; // Fail open if the private folder is unavailable; other checks still apply.
    }
    $expected = hash_hmac('sha256', $parts[1] . '.' . $parts[2], $secret);
    if (!hash_equals($expected, $parts[3])) {
        return 'token-invalid';
    }
    $age = time() - (int) $parts[1];
    if ($age < GUARD_MIN_SECONDS) {
        return 'too-fast';
    }
    if ($age > GUARD_MAX_SECONDS) {
        return 'token-expired';
    }
    return null;
}

function guardTurnstileSecret(): ?string
{
    $path = guardPrivateRoot() . '/turnstile-config.php';
    if (!is_file($path)) {
        return null;
    }
    $config = require $path;
    $secret = is_array($config) ? trim((string) ($config['secret_key'] ?? '')) : '';
    return $secret !== '' && !str_contains($secret, 'REPLACE') ? $secret : null;
}

/** Null when Turnstile is off or the token passes, otherwise a reason. */
function guardCheckTurnstile(string $token, string $ip): ?string
{
    $secret = guardTurnstileSecret();
    if ($secret === null) {
        return null;
    }
    if ($token === '' || strlen($token) > 2048) {
        return 'turnstile-missing';
    }
    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query(['secret' => $secret, 'response' => $token, 'remoteip' => $ip]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);
    $body = curl_exec($ch);
    if (!is_string($body)) {
        return null; // Cloudflare unreachable: do not lose a real enquiry; token and content checks still apply.
    }
    $result = json_decode($body, true);
    return (is_array($result) && ($result['success'] ?? false) === true) ? null : 'turnstile-failed';
}

/** Null for an ordinary enquiry, otherwise why it looks like spam. */
function guardSpamReason(array $fields): ?string
{
    $text = '';
    foreach (['message', 'description', 'details', 'notes', 'requirements', 'issues'] as $key) {
        if (isset($fields[$key]) && is_string($fields[$key])) {
            $text .= ' ' . $fields[$key];
        }
    }
    $name = (string) ($fields['name'] ?? '');
    $company = (string) ($fields['company'] ?? '');

    if (preg_match('#https?://|www\.|\.(com|net|ru|xyz|top)\b#i', $name)) {
        return 'link-in-name';
    }
    if (preg_match_all('#https?://|www\.#i', $text) > 2) {
        return 'too-many-links';
    }
    if (preg_match('#\[url|\[/url\]|<a\s+href|\[link=#i', $text . ' ' . $company)) {
        return 'link-markup';
    }
    $patterns = [
        '\b(backlinks?|guest post(ing)?|link building|domain authority|\bDA\s?\d{2})\b',
        '\b(casino|betting|viagra|cialis|porn|escort|loan offer|forex signal|crypto (investment|trading)|bitcoin investment)\b',
        '\b(rank(ing)? your (website|site) on (the )?(first|1st) page)\b',
        '\b(we (can|will) (increase|boost) your (website )?(traffic|sales|ranking))\b',
        '\b(unsubscribe|opt[- ]out) (here|link)\b',
        '\b(whatsapp|telegram) me (at|on)\b.*\+\d',
        '\b(hire|outsource) (our )?(virtual assistants?|developers?) (at|from) \$\d',
        '\bai (chatbot|video|voice) (that|which) (will|can) (get|bring) you\b',
    ];
    foreach ($patterns as $pattern) {
        if (preg_match('/' . $pattern . '/iu', $text)) {
            return 'spam-phrase';
        }
    }
    return null;
}

/** Keeps a refused submission for review (no alert is sent). */
function guardQuarantine(string $storageRoot, string $submissionId, string $formType, string $reason, array $fields): void
{
    if (!is_dir($storageRoot) && !mkdir($storageRoot, 0700, true) && !is_dir($storageRoot)) {
        return;
    }
    $path = $storageRoot . '/spam-' . gmdate('Y-m') . '.jsonl';
    $line = json_encode([
        'receivedAt' => gmdate('c'),
        'submissionId' => $submissionId,
        'formType' => $formType,
        'reason' => $reason,
        'fields' => $fields,
    ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    if ($line !== false) {
        @file_put_contents($path, $line . PHP_EOL, FILE_APPEND | LOCK_EX);
        @chmod($path, 0600);
    }
}
