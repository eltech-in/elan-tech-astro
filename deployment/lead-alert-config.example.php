<?php

declare(strict_types=1);

/**
 * Copy this file to:
 *   account-home/elan-tech-private/lead-alert-config.php
 *
 * Keep the copied file outside public_html and set its permission to 0600.
 * The Brevo API key must never be committed to Git or uploaded inside public_html.
 */
return [
    'brevo_api_key' => 'PASTE_A_BREVO_V3_API_KEY_HERE',
    'sender_email' => 'info@elan-tech.net',
    'sender_name' => 'eLan Technology Website',

    // Every website enquiry is sent here.
    'recipients' => [
        'info@elan-tech.net',
    ],

    // Add a second closely monitored address for emergency ADA requests.
    // It receives alerts in addition to the regular recipients above.
    'urgent_recipients' => [
        // 'your-private-email@example.com',
    ],
];
