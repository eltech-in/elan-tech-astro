# eLan Technology website

Astro website for [elan-tech.net](https://elan-tech.net), deployed as a static build to Hostinger.

## Local development

Use Node.js 24 or newer (Node 26 is also supported). The build stack uses
Astro 7, React 19 and Tailwind CSS 4. TypeScript 7 runs the standalone type
check; the TypeScript 6 API compatibility package remains available for Astro's
language tooling.

```sh
npm install
npm run dev
```

Use `npm run check` for source validation and `npm run ship` for the complete production build and deployment-readiness checks.

The production postbuild step generates exact legacy client-logo redirects in `dist/.htaccess` from `src/data/legacy-assets.json`. Deploy **the built `dist/.htaccess`**, not the source template in `public/.htaccess`. Image targets are matched by file content and regenerated on every build, so no duplicate image files are needed. `npm run verify` checks these targets and the built HTML's internal links/image resources.

Future-dated blog posts are normally excluded. An explicitly approved post can
set `publishEarly: true` to be included in an upload-ready build; drafts remain
excluded. Static hosting has no publication timer: uploading that build makes
the post public immediately, even if its displayed date is tomorrow.

## Deployment

Run `npm run deploy` after configuring `.env.deploy`. The deployment script supports Hostinger SSH/rsync and FTP, then checks the live redirects and security headers. See the instructions printed by the script when credentials are not configured.

The Digital Launchpad campaign is scheduled for 14 to 25 September 2026. Before launch, `/pricing/digital-launchpad/` and its `/launchpad`, `/4year`, and `/offer` aliases temporarily redirect to `/pricing/`. During the offer, the landing page opens and the aliases temporarily redirect to its canonical URL. After 25 September, all campaign URLs permanently redirect to `/pricing/`. Campaign promotions are date-controlled in the browser, while builds made during the offer include the landing page in the sitemap.

## Lead delivery and backup

The Contact, Free Audit, Get Quote, Emergency Assessment, and Request Demo forms use two independent channels:

1. FormSubmit delivers the enquiry to `info@elan-tech.net`.
2. `/api/submit-lead.php` stores a protected server-side copy.

On Hostinger, backups are written outside `public_html` to:

```text
~/elan-tech-private/leads/leads-YYYY-MM.jsonl
```

The directory and files are created with owner-only permissions. Set the server environment variable `ELAN_LEAD_STORAGE_DIR` to use a different private location. The endpoint accepts only same-site requests, validates the email and payload, limits submissions per IP, ignores honeypot submissions, and caps request size.

If FormSubmit is unavailable, the endpoint attempts a direct email notification while retaining the stored copy. Check the backup directory during routine maintenance and define a retention period appropriate for enquiry data.

### Email alerts from the endpoint

`/api/submit-lead.php` sends its own alert for every enquiry. It tries each configured route in order and stops at the first that accepts the message:

1. **Brevo**, when `brevo_api_key` is set.
2. **Gmail or Google Workspace over SMTP**, when `smtp_username` and `smtp_app_password` are set.
3. **The server's `mail()` function**, as a last resort. This route is not treated as reliable.

When Brevo or Gmail accepts the alert, the browser does not call FormSubmit at all. FormSubmit is used only when neither route is configured or both fail.

To turn on Gmail alerts:

1. Turn on 2-Step Verification for the Google account, then create an app password at `https://myaccount.google.com/apppasswords`.
2. On the server, copy `deployment/lead-alert-config.example.php` to `~/elan-tech-private/lead-alert-config.php` (outside `public_html`, permission `0600`) and fill in `smtp_username` and `smtp_app_password`.
3. Submit a test enquiry, then read the last line of `~/elan-tech-private/leads/alert-status-YYYY-MM.jsonl`. `"channel":"smtp"` means Gmail accepted it. If it failed, `errors` names the stage and the mail server's reply code, for example `smtp: AUTH password rejected (535)`.

The app password is never committed, never placed inside `public_html`, and never written to the status file. Use a mailbox kept for website alerts, because an app password opens the whole mailbox. Alerts are sent from that mailbox; the enquirer's address is set as Reply-To. The mail server's certificate is always verified before the password is sent.
