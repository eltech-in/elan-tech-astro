# Enquiry tracking and accessibility verification — 13 October 2026

## Completed changes (local build, not deployed)

- Replaced low-contrast amber, Shopify, Medusa and Zoho text with theme-aware colours. Calculated contrast against the actual white/light-card and dark-card backgrounds ranges from 5.17:1 to 10.65:1, above the 4.5:1 normal-text requirement.
- Footer legal links and the privacy-settings button now have 44px minimum touch height and separate spacing.
- Privacy banner and floating privacy control now use the measured height of the actual fixed contact dock, including the two-row digital-card dock. This removes the hard-coded offsets and the old 760px/1024px breakpoint mismatch.
- Added bottom-page space and scroll clearance for fixed controls; privacy banners are scrollable on short screens. The first-visit banner suppresses the optional venture slide so these panels do not compete.
- Explicit `analytics_debug=1` QA sessions retain that flag through the successful submission redirect. Previously the confirmation URL lost it, making the test conversion normal traffic even if a developer filter was active.
- Added delivery/fallback regression checks and extended measurement checks; these now run through `npm run verify`.

## Verification

- Type/Astro checks: zero errors, two existing unused-import hints.
- PHP lead endpoint: syntax check passed; backend mail configuration and private logs were not changed.
- Build: successful, 110 generated pages.
- Existing build checks: all 163 passed.
- Canonical checks: 126 HTML files passed.
- Measurement tests: no scripts before consent; one Google route; private query data removed; explicit debug sessions distinguished; all five supported form types count once; no conversion on direct, expired, future-dated or mismatched thank-you visits; phone/WhatsApp clicks do not create leads; withdrawal and browser privacy signals checked.
- Delivery tests use mocked transports, not real mail: reliable server alert avoids duplicate fallback; failed alert invokes fallback; private storage can safely capture an enquiry when email is unavailable; validation errors cannot bypass privacy checks; total delivery failure rejects.
- Responsive checks: homepage at 390×844 and digital card at 390×844 and 320×568. At 390×844 the homepage banner ends at y=770 and contact bar starts at y=786. At 320px the card privacy control ends at y=419 and the four-button dock starts at y=435.3. No horizontal overflow was observed on the sampled small card viewport.
- Footer controls each measured 44px high; page-end legal controls remained above the floating privacy/contact stack.

## Live GA4 account inspection

- `generate_lead` is configured as a key event and shows the eLanTech stream.
- Phone and WhatsApp clicks are not in the key-event list; they remain intent events.
- Internal Traffic exclusion is Active.
- `eLan Developer Traffic` exclusion was initially **Testing**. After the owner's explicit approval, it was changed to **Active** on 13 October 2026. The saved table confirms Developer Traffic / Exclude / Active. This excludes future events with populated `debug_mode` or `debug_event` from standard processing, not ordinary unmarked visitor traffic. Screenshot: `verification-2026-10-13/ga4-developer-exclusion-active.jpg`.
- Earlier synthetic conversions cannot be retroactively removed by activating this filter. Exclude known test records in business reporting.

## Live enquiry-delivery test

- Submitted one contact enquiry on the production site, labelled **TEST ONLY ELAN-VERIFY-OCT13**, using only the site's public email and no customer data.
- Analytics was explicitly rejected for submission and confirmation, preventing this synthetic submission from generating another GA4 lead.
- Production reached `/thank-you/?form=contact`. This proves the client reported a successful capture through at least one delivery/storage route, not inbox delivery.
- The available Gmail session is not the `info@elan-tech.net` mailbox. Receipt in the actual destination inbox remains **unconfirmed**. The owner should confirm the reference in Inbox/Spam or provide the appropriate mailbox access.
- This was one live contact-form test, not five live submissions. Other form conversions and delivery routes were checked through isolated regression tests.
- No calls, WhatsApp messages, deployments or Git commits were made.

## Deployment and remaining actions

Upload the new `dist/` contents to publish the accessibility and QA-redirect changes. The build includes robots.txt and .htaccess; neither required a source change for this task. Private alert configuration must stay outside public_html and must not be replaced by the example file.

After upload: confirm ELAN-VERIFY-OCT13 email receipt, then re-run a debug-marked conversion on the updated live build and verify its receipt in DebugView without adding it to standard business reports. Developer exclusion has now been activated with approval. Site-level unit tests verify the expected tracking logic but do not substitute for live GA4 receipt.

Visual records are in `reports/verification-2026-10-13/`. Original unrelated working-tree changes were preserved.
