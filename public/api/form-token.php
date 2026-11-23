<?php
/**
 * Issues the short-lived form token that submit-lead.php requires (see form-guard.php).
 * Same-site browser requests only.
 */
declare(strict_types=1);

define('ELAN_FORM_GUARD', true);
require __DIR__ . '/form-guard.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');
header('X-Robots-Tag: noindex');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
    header('Allow: GET');
    http_response_code(405);
    echo '{"ok":false}';
    exit;
}

// Browsers send Sec-Fetch-Site on fetch(); a request from another site is refused.
$site = $_SERVER['HTTP_SEC_FETCH_SITE'] ?? '';
if ($site !== '' && !in_array($site, ['same-origin', 'same-site'], true)) {
    http_response_code(403);
    echo '{"ok":false}';
    exit;
}

$token = guardIssueToken();
if ($token === null) {
    http_response_code(503);
    echo '{"ok":false}';
    exit;
}
echo json_encode(['ok' => true, 'token' => $token], JSON_UNESCAPED_SLASHES);
