<?php
/**
 * Cloudflare Turnstile secret key for the website forms (copy to the server, never commit the real key):
 *   domains/elan-tech.net/elan-tech-private/turnstile-config.php   (permissions 600)
 *
 * Order matters: publish the site key (TURNSTILE_SITE_KEY in src/lib/submitLead.ts) first,
 * then add this file. With this file in place, every enquiry must pass Turnstile.
 * Delete the file to switch Turnstile off again.
 */
return [
    'secret_key' => 'REPLACE_WITH_TURNSTILE_SECRET_KEY',
];
