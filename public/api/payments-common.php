<?php
/**
 * Shared helpers for the Razorpay Orders API endpoints (razorpay-order.php, razorpay-verify.php)
 * and the paid-request check in submit-lead.php. Not an endpoint: direct requests get 404.
 *
 * Secrets: the Razorpay key id and key secret live only on the server, in
 *   <account>/domains/elan-tech.net/elan-tech-private/razorpay-config.php
 * (see deployment/razorpay-config.example.php). They are never sent to the browser,
 * except the public key id that Razorpay Checkout needs.
 *
 * Prices are fixed here, in the smallest currency unit, and must match src/data/auditPricing.ts
 * (verify-build.mjs checks the website-audit figures). The browser cannot change an amount.
 */
declare(strict_types=1);

if (!defined('ELAN_PAYMENTS')) {
    http_response_code(404);
    exit;
}

const PAY_PRODUCTS = [
    'website-audit' => ['label' => 'Website audit (one domain)', 'amounts' => ['INR' => 99900, 'USD' => 1900], 'needsUrl' => true],
    'accessibility-audit' => ['label' => 'Accessibility audit, full package (one domain)', 'amounts' => ['INR' => 999900, 'USD' => 9900], 'needsUrl' => true],
    'booking-advance' => ['label' => 'Project booking advance', 'amounts' => ['INR' => 999900, 'USD' => 9900], 'needsUrl' => false],
];

function payJson(int $status, array $payload): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, max-age=0');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

/** Account-private folder, outside public_html. ELAN_PRIVATE_DIR overrides it (local tests). */
function payPrivateRoot(): string
{
    $env = getenv('ELAN_PRIVATE_DIR');
    return (is_string($env) && trim($env) !== '') ? rtrim($env, '/') : dirname(__DIR__, 2) . '/elan-tech-private';
}

/** Returns ['key_id' => ..., 'key_secret' => ...] or null when payments are not configured. */
function payConfig(): ?array
{
    $path = payPrivateRoot() . '/razorpay-config.php';
    if (!is_file($path)) {
        return null;
    }
    $config = require $path;
    if (!is_array($config)) {
        return null;
    }
    $keyId = trim((string) ($config['key_id'] ?? ''));
    $keySecret = trim((string) ($config['key_secret'] ?? ''));
    if (!preg_match('/^rzp_(live|test)_[A-Za-z0-9]{8,40}$/', $keyId) || strlen($keySecret) < 12) {
        return null;
    }
    return ['key_id' => $keyId, 'key_secret' => $keySecret];
}

function payOrdersDir(): string
{
    $dir = payPrivateRoot() . '/payments/orders';
    if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
        payJson(503, ['ok' => false, 'error' => 'Payment storage unavailable']);
    }
    return $dir;
}

function payOrderPath(string $orderId): string
{
    if (!preg_match('/^order_[A-Za-z0-9]{6,40}$/', $orderId)) {
        payJson(400, ['ok' => false, 'error' => 'Invalid order']);
    }
    return payOrdersDir() . '/' . $orderId . '.json';
}

function payLoadOrder(string $orderId): ?array
{
    $path = payOrderPath($orderId);
    if (!is_file($path)) {
        return null;
    }
    $order = json_decode((string) file_get_contents($path), true);
    return is_array($order) ? $order : null;
}

function paySaveOrder(array $order): void
{
    $path = payOrderPath((string) $order['orderId']);
    file_put_contents($path, json_encode($order, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT), LOCK_EX);
    @chmod($path, 0600);
}

/** POST, same-site and size checks shared by the payment endpoints. */
function payRequireSameSite(): array
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        payJson(405, ['ok' => false, 'error' => 'Method not allowed']);
    }
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowedOrigins = ['https://elan-tech.net', 'https://www.elan-tech.net'];
    $localTest = getenv('ELAN_PRIVATE_DIR') !== false && preg_match('#^http://(localhost|127\.0\.0\.1)(:\d+)?$#', $origin);
    if ($origin !== '' && !in_array($origin, $allowedOrigins, true) && !$localTest) {
        payJson(403, ['ok' => false, 'error' => 'Origin not allowed']);
    }
    $length = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($length < 1 || $length > 16384) {
        payJson(413, ['ok' => false, 'error' => 'Invalid request size']);
    }
    $request = json_decode((string) file_get_contents('php://input'), true);
    if (!is_array($request)) {
        payJson(400, ['ok' => false, 'error' => 'Invalid JSON']);
    }
    return $request;
}

/** Simple per-IP limit, stored privately. */
function payRateLimit(string $bucket, int $max, int $windowSeconds): void
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $dir = payPrivateRoot() . '/payments/.rate-limit';
    if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
        return;
    }
    $file = $dir . '/' . hash('sha256', $bucket . '|' . $ip) . '.json';
    $now = time();
    $hits = is_file($file) ? (json_decode((string) file_get_contents($file), true) ?: []) : [];
    $hits = array_values(array_filter($hits, static fn ($t) => is_int($t) && $t > $now - $windowSeconds));
    if (count($hits) >= $max) {
        payJson(429, ['ok' => false, 'error' => 'Too many attempts. Please try again later.']);
    }
    $hits[] = $now;
    file_put_contents($file, json_encode($hits), LOCK_EX);
    @chmod($file, 0600);
}

/** Calls the Razorpay REST API with the server-side key pair. */
function payRazorpay(array $config, string $method, string $path, ?array $body = null): array
{
    $ch = curl_init('https://api.razorpay.com/v1' . $path);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_USERPWD => $config['key_id'] . ':' . $config['key_secret'],
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT => 20,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2,
    ]);
    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body, JSON_UNESCAPED_SLASHES));
    }
    $raw = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $data = is_string($raw) ? json_decode($raw, true) : null;
    return ['status' => $status, 'data' => is_array($data) ? $data : []];
}

/** Records payment events (never secrets or card data) for troubleshooting. */
function payLog(string $event, array $context = []): void
{
    $dir = payPrivateRoot() . '/payments';
    if (!is_dir($dir) && !mkdir($dir, 0700, true) && !is_dir($dir)) {
        return;
    }
    $file = $dir . '/payment-log-' . gmdate('Y-m') . '.jsonl';
    file_put_contents($file, json_encode(['at' => gmdate('c'), 'event' => $event] + $context, JSON_UNESCAPED_SLASHES) . PHP_EOL, FILE_APPEND | LOCK_EX);
    @chmod($file, 0600);
}
