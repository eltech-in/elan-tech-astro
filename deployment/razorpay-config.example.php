<?php
/**
 * Razorpay API keys for online payments (website audit, accessibility audit, booking advance).
 *
 * Copy this file on the SERVER (never commit the real one) to:
 *   ~/domains/elan-tech.net/elan-tech-private/razorpay-config.php
 * i.e. next to lead-alert-config.php, OUTSIDE public_html, with permission 0600.
 *
 * Get the keys in the Razorpay Dashboard → Account & Settings → API Keys → Generate Key.
 * Start with Test Mode keys (rzp_test_...) to try a payment with Razorpay's test cards/UPI,
 * then replace them with Live Mode keys (rzp_live_...) to take real payments.
 * The key secret is shown only once when generated; keep it only in this file.
 */
return [
    'key_id' => 'rzp_test_XXXXXXXXXXXXXX',
    'key_secret' => 'replace-with-the-key-secret',
];
