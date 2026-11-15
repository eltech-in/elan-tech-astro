# 20 October 2026 blog release

Prepared 19 October 2026 for the user’s upload later tonight (India time).

## Included

- New article: What Should a Website Accessibility Audit Deliver? A Guide for Canadian Businesses.
- URL: `/blog/accessibility/website-accessibility-audit-deliverables-canada/`.
- Publication date: 20 October 2026, 00:00 India time.
- Covers scope, representative journeys, manual testing, reproducible evidence, priorities, remediation handover, retesting, exclusions and procurement questions.
- Cites Ontario and W3C primary guidance. Distinguishes Ontario legislation from Canada-wide obligations and the legal baseline from the contracted WCAG target. No legal-compliance guarantee or fabricated client findings.
- Links from the Canada page and existing audit-versus-remediation article; the homepage, blog listings, category page, schema and sitemap use the existing content pipeline.
- Reuses existing North American accessibility artwork for cards and social metadata. Uses a text-first article hero rather than stretching/cropping the older cover.
- Existing consent controls, lead handling, homepage title/H1 and proposed new software service pages are unchanged by this release.

## Static publication behaviour

The user explicitly requested an upload-ready build before the nominal publication date, so `publishEarly: true` includes the article now. It is accessible as soon as this build is uploaded; the website does not run a timed midnight publisher. To avoid early accessibility, upload after midnight India time. No production upload or scheduling was performed by the assistant.

## Upload notes

Upload the rebuilt `dist` contents, including hidden `.htaccess`, `robots.txt`, sitemap XML and matching `_astro` assets. This build also retains the previously completed local updates; it is not a blog-only patch.

No rewrite rule or robots exception is needed for the new canonical article. After upload, check the article, homepage blog card and sitemap publicly; request indexing in GSC only once the URL is live.

The 27 October UAE article and the seven proposed new software services are not part of this release.
