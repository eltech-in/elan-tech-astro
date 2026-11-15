# SEO priorities 3–5 — implementation and verification

Date: 13 October 2026. Changes are built locally; no production upload or Git commit was performed.

## 3. Actual 404 paths

In the authenticated GA4 Pages and screens report, the original 11 July–10 October period was retained. Searching the two “Page Not Found” title variants and adding “Page path and screen class” exposed the actual paths. The detailed read-only inventory is `GA4-missing-paths-2026-10-13.json`.

- 52 views in total, across 52 title/path rows.
- 48 views were retired `/elan-client-logos/` image paths.
- Four views were `/probe-test/` (two), `/__probe` (one) and `/__probe/` (one).
- One additional image row, `/elan-client-logos/navsamaj.avif`, had zero views but one active user. It is also a confirmed missing legacy URL.
- All 49 distinct image paths returned HTTP 404 in a public live check on 13 October.

The sources still exist under `src/assets/client-logos/`. Current pages resolve them through Astro's image helpers into hashed `/_astro/` URLs. The retired public image paths were not preserved during that transition. These 48 page views represent direct visits to missing image URLs; ordinary failed image subrequests do not execute the HTML 404 page's GA4 tag. Do not reinterpret this as 48 confirmed broken customer page renders or lost enquiries.

### Implemented recovery

`src/data/legacy-assets.json` maps only the observed image paths to their matching source assets. Three older PNG/WebP paths map to the corresponding current AVIF artwork. `scripts/restore-legacy-assets.mjs` matches source and emitted images by SHA-256 content identity and generates 49 exact permanent redirects into **dist/.htaccess** after every build.

This avoids duplicate images, guessed filenames and stale hand-written hashed destinations. Probe paths remain genuine 404s. No homepage catch-all or unrelated sales redirects were added. Existing relevant legacy-page redirects were preserved.

The internal-link audit now checks image/source/script resource references as well as page links. The final build has no missing internal page/image targets under that audit. Historical referrers were not established by the title/path breakdown; none were invented.

Deployment must include the generated **dist/.htaccess** and matching **dist/_astro/** assets together. Uploading public/.htaccess alone will omit the generated recovery rules. Live 301/image delivery still needs verification after upload; the local Astro preview does not execute Apache rules.

## 4. Shopify–Medusa comparison

The existing canonical article was improved rather than replaced or duplicated. Original publication date and URL remain unchanged; the update date is 13 October 2026.

- Added an opening business-fit answer and clear operating-responsibility caveat.
- Added a like-for-like 12/36-month cost-planning framework, recurring/usage costs, tax/currency and exit considerations. No invented fixed implementation price or universal savings claim.
- Expanded hosted/self-managed responsibilities, custom-code maintenance, backups, response windows and upgrades.
- Added separate Rangresha Shopify and Puritas Medusa implementation examples using the already-approved scope, without fabricated outcomes.
- Added seven migration checkpoints covering data, accounts/subscriptions, URL mapping, payment/stock tests, cutover and rollback.
- Retained conditional source-code, IP and ownership terms; added contextual service, proposal, consultation and US/Canada links.
- Added specific maintenance/migration FAQs and accessible horizontal scrolling for the three comparison tables. Mobile testing found and resolved the earlier article overflow.

Official references checked: Shopify India pricing, Shopify migration guidance and Medusa deployment documentation. Regional prices and provider eligibility must be checked for the merchant; Indian gateway examples are not universal offerings.

## 5. US and Canada pages

Both URLs and self-canonicals remain stable. The shared layout now accepts optional market-specific headlines, introductions and primary actions; other country pages keep their existing defaults.

US: custom ecommerce, web/application development and scoped WCAG remediation; Rib-O-Lator and WIND-Tech proof; Bob G.'s existing attributed feedback; explicit India-based delivery and US time-zone planning.

Canada: service-led websites, accessibility work and ecommerce/ongoing care; Pan Pro Windows proof; Eric H.'s approved direct feedback; province/time-zone-aware collaboration and separate French translation responsibilities.

Both pages now put focused services, client feedback and real project proof ahead of the longer privacy/jurisdiction information. A four-stage delivery/handover section explains scope, approvals, testing, support, ownership and recurring costs. Primary actions request a scoped project proposal; the free review is clearly distinct from a full accessibility audit.

Rib-O-Lator's existing portfolio text incorrectly described industrial B2B distribution software and a MERN stack. The client's official site demonstrates BBQ rotisserie products and credits eLan Technology. The shared portfolio descriptions now reflect the actual product website without asserting an unverified software stack. Existing approved screenshots were retained.

No overseas offices, ranking promises, conversion lifts or blanket compliance certification were invented. Country-specific FAQs distinguish US technical/legal contexts and Canadian/AODA applicability.

## Verification

- Production build: 110 pages, including robots.txt, sitemap files and generated .htaccess.
- Build verification: all 167 checks passed, including new US/Canada/comparison checks.
- Canonical/internal page and resource audit: 126 HTML files passed.
- Legacy asset validation: 49 exact emitted image destinations passed.
- Measurement and delivery regression tests passed.
- Astro/type checks: zero errors; two pre-existing unused-import hints.
- US and Canada page content and proof inspected in the local browser; Canada tested at 390px without horizontal page overflow.
- Comparison tested at 390px: no page overflow; all three table regions remain within 343px content width and scroll their 576px tables with keyboard-focusable regions.
- Homepage SEO title/H1 stability checks passed. Existing unrelated working-tree changes were preserved.

Visual records: `verification-2026-10-13/us-page-updated.jpg`, `canada-page-updated.jpg`, `comparison-updated.jpg`.

## After upload

Check representative old image URLs for 301 → correct image/200, and inspect the two updated country pages and comparison on the live site. Observe search performance by country and query intent over equal periods; these edits do not guarantee indexing, rankings or clicks.
