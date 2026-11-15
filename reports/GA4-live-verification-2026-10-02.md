# GA4 live verification — 2 October 2026

Verified in the authenticated eLanTech G4 property's Realtime overview after the uploaded build went live.

## Results

- A labelled browser session used `utm_source=measurement_test`, `utm_medium=internal_test`, `utm_campaign=ga4_verification_20261002` and the site's supported analytics debug option.
- Analytics was already checked in the browser's saved privacy preferences. Explicitly saved that preference before continuing. This was not a clean-browser before-consent test.
- Realtime displayed one active test user and received `page_view`, `session_start` and `first_visit`.
- Realtime received `whatsapp_click`: 1. No WhatsApp message was sent.
- Realtime received `phone_click`: 1. No call was intentionally placed.
- Submitted one contact-form enquiry labelled **TEST ONLY**, reference **ELAN-GA4-OCT02**, using the site's public business email and no customer information. The form reached the thank-you page.
- Realtime received `generate_lead`: 1, and separately displayed it under **Key events**.
- Reloaded the thank-you page: its views increased to two, while `generate_lead` remained one. Confirmed the live refresh does not duplicate this lead.
- Browser console inspection returned no captured errors during this test.

## Interpretation

The deployed GA4 route is receiving live page views, contact-click intent events and confirmed contact-form conversions. Phone and WhatsApp clicks are intent signals, not evidence of completed calls or conversations. This single synthetic conversion does not prove every other form's individual journey.

Exclude the **ELAN-GA4-OCT02** submission from business enquiry totals. The developer-traffic filter was previously put in testing mode, so do not assume debug events have been permanently excluded from aggregate reports. Earlier email-delivery testing was confirmed by the owner; this test's GA4 conversion receipt is not independent proof of this specific email's inbox delivery.

Realtime results establish immediate collection. Standard acquisition and conversion reports still need normal processing before they should be used for performance comparisons. This test did not alter property settings or the site's files.
