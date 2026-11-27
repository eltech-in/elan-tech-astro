<?php
/**
 * Step 1 of a paid booking: validates the booking details and creates a Razorpay order at the
 * fixed server-side price for the chosen product and currency. Returns what Razorpay Checkout
 * needs (order id, public key id, amount). The booking details are kept privately with the order.
 */
declare(strict_types=1);
define('ELAN_PAYMENTS', true);
require __DIR__ . '/payments-common.php';

$request = payRequireSameSite();

$product = (string) ($request['product'] ?? '');
$currency = strtoupper((string) ($request['currency'] ?? 'INR'));
if (!isset(PAY_PRODUCTS[$product]) || !isset(PAY_PRODUCTS[$product]['amounts'][$currency])) {
    payJson(400, ['ok' => false, 'error' => 'Unknown product or currency']);
}
$spec = PAY_PRODUCTS[$product];

$fields = is_array($request['fields'] ?? null) ? $request['fields'] : [];
$text = static fn (string $key, int $max) => mb_substr(trim(preg_replace('/\s+/u', ' ', (string) ($fields[$key] ?? '')) ?? ''), 0, $max);
$name = $text('name', 120);
$email = $text('email', 160);
$phone = $text('phone', 24);
$url = $text('url', 300);
$reference = $text('reference', 120);
$notes = mb_substr(trim((string) ($fields['notes'] ?? '')), 0, 2000);

if (trim((string) ($fields['_honey'] ?? '')) !== '') {
    payJson(400, ['ok' => false, 'error' => 'Invalid request']);
}
if (($fields['privacyAccepted'] ?? false) !== true) {
    payJson(422, ['ok' => false, 'error' => 'Please accept the privacy notice']);
}
if (mb_strlen($name) < 2) {
    payJson(422, ['ok' => false, 'error' => 'Please enter your name']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    payJson(422, ['ok' => false, 'error' => 'Please enter a valid email address']);
}
// Phone / WhatsApp is required before payment (owner, 27 Nov 2026).
$phoneDigits = strlen((string) preg_replace('/\D/', '', $phone));
if (!preg_match('/^\+?[0-9 ()-]{7,22}$/', $phone) || $phoneDigits < 7 || $phoneDigits > 15) {
    payJson(422, ['ok' => false, 'error' => 'Please enter a phone or WhatsApp number']);
}
if ($spec['needsUrl']) {
    $scheme = strtolower((string) parse_url($url, PHP_URL_SCHEME));
    if (!filter_var($url, FILTER_VALIDATE_URL) || !in_array($scheme, ['http', 'https'], true)) {
        payJson(422, ['ok' => false, 'error' => 'Please enter the full website address, starting with https://']);
    }
}

$config = payConfig();
if ($config === null) {
    payJson(503, ['ok' => false, 'code' => 'not_configured', 'error' => 'Online payment is not available yet']);
}

payRateLimit('order', 10, 3600);

$amount = (int) $spec['amounts'][$currency];
$receipt = substr($product, 0, 14) . '-' . bin2hex(random_bytes(6));
$result = payRazorpay($config, 'POST', '/orders', [
    'amount' => $amount,
    'currency' => $currency,
    'receipt' => $receipt,
    'notes' => array_filter([
        'product' => $spec['label'],
        'name' => $name,
        'email' => $email,
        'website' => mb_substr($url, 0, 250), // Razorpay notes are limited to 256 characters each
        'reference' => $reference,
    ], static fn ($v) => $v !== ''),
]);
$orderId = (string) ($result['data']['id'] ?? '');
if ($result['status'] !== 200 || !preg_match('/^order_[A-Za-z0-9]{6,40}$/', $orderId)) {
    payLog('order_failed', ['product' => $product, 'currency' => $currency, 'httpStatus' => $result['status'], 'razorpayError' => $result['data']['error']['description'] ?? null]);
    payJson(502, ['ok' => false, 'error' => 'Payment could not be started. Please try again or contact us.']);
}

paySaveOrder([
    'orderId' => $orderId,
    'product' => $product,
    'label' => $spec['label'],
    'amount' => $amount,
    'currency' => $currency,
    'receipt' => $receipt,
    'status' => 'created',
    'createdAt' => gmdate('c'),
    'fields' => compact('name', 'email', 'phone', 'url', 'reference', 'notes'),
]);
payLog('order_created', ['orderId' => $orderId, 'product' => $product, 'amount' => $amount, 'currency' => $currency]);

payJson(200, [
    'ok' => true,
    'orderId' => $orderId,
    'keyId' => $config['key_id'],
    'amount' => $amount,
    'currency' => $currency,
    'description' => $spec['label'],
    'prefill' => ['name' => $name, 'email' => $email, 'contact' => $phone],
]);
