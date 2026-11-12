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
