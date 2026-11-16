<?php
/**
 * Step 2 of a paid booking: Razorpay Checkout returns order id, payment id and signature.
 * The signature is HMAC-SHA256(order_id|payment_id) with the server-side key secret; only a
 * matching signature marks the order paid. submit-lead.php then accepts the booking request
 * for that order once (see the paid-request check there).
 */
declare(strict_types=1);
define('ELAN_PAYMENTS', true);
require __DIR__ . '/payments-common.php';

$request = payRequireSameSite();

$orderId = (string) ($request['orderId'] ?? '');
$paymentId = (string) ($request['paymentId'] ?? '');
$signature = (string) ($request['signature'] ?? '');
if (!preg_match('/^pay_[A-Za-z0-9]{6,40}$/', $paymentId) || !preg_match('/^[a-f0-9]{64}$/', $signature)) {
    payJson(400, ['ok' => false, 'error' => 'Invalid payment response']);
}

$config = payConfig();
if ($config === null) {
    payJson(503, ['ok' => false, 'error' => 'Online payment is not available yet']);
}

payRateLimit('verify', 30, 3600);

$order = payLoadOrder($orderId);
if ($order === null) {
    payJson(404, ['ok' => false, 'error' => 'Order not found']);
}

$expected = hash_hmac('sha256', $orderId . '|' . $paymentId, $config['key_secret']);
if (!hash_equals($expected, $signature)) {
    payLog('signature_mismatch', ['orderId' => $orderId, 'paymentId' => $paymentId]);
    payJson(400, ['ok' => false, 'error' => 'Payment could not be verified']);
}

if (($order['status'] ?? '') === 'created') {
    $order['status'] = 'paid';
    $order['paymentId'] = $paymentId;
    $order['paidAt'] = gmdate('c');
    paySaveOrder($order);
    payLog('payment_verified', ['orderId' => $orderId, 'paymentId' => $paymentId, 'amount' => $order['amount'], 'currency' => $order['currency']]);
} elseif (($order['paymentId'] ?? '') !== $paymentId) {
    payJson(409, ['ok' => false, 'error' => 'This order was already paid with a different payment']);
}

payJson(200, ['ok' => true, 'orderId' => $orderId, 'paymentId' => $paymentId, 'product' => $order['product']]);
