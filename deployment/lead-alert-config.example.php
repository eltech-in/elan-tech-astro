<?php

declare(strict_types=1);

/**
 * Copy this file to:
 *   account-home/elan-tech-private/lead-alert-config.php
 *
 * Keep the copied file outside public_html and set its permission to 0600.
 * The Brevo API key and the Gmail app password must never be committed to Git
 * or uploaded inside public_html.
 *
 * Alert routes are tried in this order, and the first that accepts the
 * message wins: Brevo, then Gmail (SMTP), then the server's own mail().
 * Leave a route's placeholder in place to switch that route off.
 */
return [
    // Brevo is optional. Leave this line commented out if you use Gmail below.
    // 'brevo_api_key' => 'PASTE_A_BREVO_V3_API_KEY_HERE',
    'sender_email' => 'inquiry@elan-tech.net',
    'sender_name' => 'eLanTech Inquiry',

    // Gmail (or Google Workspace) alerts through SMTP with an app password.
    // 1. Turn on 2-Step Verification for the Google account.
    // 2. Create an app password at https://myaccount.google.com/apppasswords
    // 3. Paste the 16 characters below, with or without the spaces.
    // Use a mailbox kept for website alerts: an app password opens the whole
    // mailbox it belongs to. Alerts are sent from this address.
    'smtp_username' => 'nishant@elan-tech.net',
    'smtp_app_password' => 'PASTE_A_GMAIL_APP_PASSWORD_HERE',
    // Optional. These are the defaults for Gmail.
    'smtp_host' => 'smtp.gmail.com',
    'smtp_port' => 465,              // 465 uses SSL; 587 uses STARTTLS
    // 'smtp_from_email' => 'info@elan-tech.net', // only a "Send mail as" alias verified in that Gmail account

    // Every website enquiry is sent here.
    'recipients' => [
        'info@elan-tech.net',
    ],

    // Add a second closely monitored address for emergency ADA requests.
    // It receives alerts in addition to the regular recipients above.
    'urgent_recipients' => [
        'elantech@gmail.com'
        // 'your-private-email@example.com',
    ],
];
