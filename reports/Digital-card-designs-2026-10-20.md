# Digital card — 20 October 2026

## Delivered

- One canonical URL: `https://elan-tech.net/about/nishant-barde/`.
- Classic design retained; opt-in Studio styling adds a desktop portrait rail and compact circular-portrait mobile header. Both use exactly the same content DOM and action handlers.
- DPDP implementation callout, qualified technical-service wording, and current CRM/ERP, ERPNext, Headless CMS, Payload, Directus, Zoho Commerce and integration coverage.
- Saved vCard and embedded contact QR updated with the current service summary. Public phone and email unchanged.
- Seven proposed software service pages remain unimplemented pending approval.

## Random selection

The allowlist lives in `src/data/digital-card.ts`. A head script picks classic or studio with equal probability on each full page load and sets `data-card-design` before the card is parsed. It makes no network requests, stores no visitor information and writes no cookie. A later reload makes a fresh independent selection and may repeat the same design. Back/forward restoration can retain the already rendered design. Nothing rotates while someone reads or uses the page.

No JavaScript or an unavailable selector leaves the fully usable classic layout. There is one canonical, one Person schema, one contact record, one share destination and one social preview; this is not a duplicate-page SEO experiment or a conversion A/B test.

Review links (reload after changing only the hash):

- `/about/nishant-barde/#design=classic`
- `/about/nishant-barde/#design=studio`

Use the normal URL without a fragment for random public distribution. Preview fragments are allowlisted and not sent to the server. Adding a future design requires its scoped CSS, the registry entry and responsive QA; the shared content should not be duplicated.

## Verification

- Production build and 176 general build checks passed; canonical/resource audit covered 127 HTML files.
- Dedicated tests exercise both random endpoints, invalid/valid preview IDs, fresh selection, lack of storage/network calls, head placement and service/contact presence.
- Type check: zero errors, zero warnings, two pre-existing unused-import hints.
- Browser at 1280px: Studio has a two-column portrait rail, no document overflow.
- Browser at 390px: both variants have no horizontal overflow; Studio’s four dock actions are visible between y=719 and y=824 in an 844px viewport. QR modal opens and closes for both.
- Browser comparison confirmed `.profile-card` textContent is exactly identical between Classic and Studio.
- Screenshots: `card-studio-desktop.jpg`, `card-studio-mobile.jpg`, `card-classic-mobile.jpg` in this reports directory.

## Release

Upload the full new ZIP contents, including hidden `.htaccess`, `robots.txt`, sitemap and matching `_astro` assets. The earlier blog-only release ZIP is not silently overwritten. No production deployment or Git commit performed.
