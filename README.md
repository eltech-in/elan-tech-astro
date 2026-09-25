# eLan Technology website

Astro website for [elan-tech.net](https://elan-tech.net), deployed as a static build to Hostinger.

## Local development

```sh
npm install
npm run dev
```

Use `npm run check` for source validation and `npm run ship` for the complete production build and deployment-readiness checks.

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
