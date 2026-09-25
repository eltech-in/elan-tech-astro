#!/usr/bin/env node

import { existsSync, readdirSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

const SITE_URL = (process.env.SITE_URL || 'https://elan-tech.net').replace(/\/$/, '');
const DIST = resolve(process.cwd(), 'dist');
const CAMPAIGN_START = new Date('2026-09-14T00:00:00+05:30');
const CAMPAIGN_END = new Date('2026-09-25T23:59:59+05:30');
const liveCheckTime = new Date();
const campaignActive = liveCheckTime >= CAMPAIGN_START && liveCheckTime <= CAMPAIGN_END;
const campaignUpcoming = liveCheckTime < CAMPAIGN_START;

const PASS = '\x1b[32m✔\x1b[0m';
const FAIL = '\x1b[31m✘\x1b[0m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

let passed = 0;
let failed = 0;

function result(label, ok, detail = '') {
  if (ok) {
    console.log(`  ${PASS} ${label}`);
    passed++;
    return;
  }

  console.log(`  ${FAIL} ${label}${detail ? ` (${detail})` : ''}`);
  failed++;
}

async function request(url) {
  const response = await fetch(url, {
    redirect: 'manual',
    headers: { 'User-Agent': 'elan-tech-live-verifier/1.0' },
  });
  await response.body?.cancel();
  return response;
}

async function checkStatus(label, url, expectedStatuses) {
  try {
    const response = await request(url);
    result(label, expectedStatuses.includes(response.status), `received ${response.status}`);
    return response;
  } catch (error) {
    result(label, false, error instanceof Error ? error.message : String(error));
    return null;
  }
}

async function checkRedirect(label, url, expectedStatus, expectedPath) {
  const response = await checkStatus(label, url, [expectedStatus]);
  if (!response) return;

  const location = response.headers.get('location');
  const actualPath = location ? new URL(location, url).pathname : '';
  result(`${label}: destination`, actualPath === expectedPath, location || 'missing Location header');
}

async function checkNoindex(label, url) {
  try {
    const response = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': 'elan-tech-live-verifier/1.0' },
    });
    const html = await response.text();
    result(`${label}: returns 200`, response.status === 200, `received ${response.status}`);
    result(
      `${label}: noindex is present`,
      /<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(html),
      'missing robots noindex meta tag',
    );
  } catch (error) {
    result(label, false, error instanceof Error ? error.message : String(error));
  }
}

async function checkPageText(label, path, requiredText, forbiddenText = []) {
  try {
    const response = await fetch(`${SITE_URL}${path}`, {
      headers: { 'User-Agent': 'elan-tech-live-verifier/1.0' },
    });
    const body = await response.text();
    const normalizedBody = body.replace(/\s+/g, ' ').toLowerCase();

    result(`${label}: returns 200`, response.status === 200, `received ${response.status}`);
    for (const text of requiredText) {
      result(
        `${label}: contains "${text}"`,
        normalizedBody.includes(text.toLowerCase()),
        'required wording is missing',
      );
    }
    for (const text of forbiddenText) {
      result(
        `${label}: excludes "${text}"`,
        !normalizedBody.includes(text.toLowerCase()),
        'outdated wording is still present',
      );
    }
  } catch (error) {
    result(label, false, error instanceof Error ? error.message : String(error));
  }
}

async function checkHomepageSchema() {
  try {
    const response = await fetch(`${SITE_URL}/`, {
      headers: { 'User-Agent': 'elan-tech-live-verifier/1.0' },
    });
    const html = await response.text();
    result('Homepage keeps WebSite schema', html.includes('"@type":"WebSite"'));
    result(
      'Obsolete SearchAction schema is absent',
      !html.includes('SearchAction') && !html.includes('search_term_string'),
      'obsolete search schema still present',
    );
  } catch (error) {
    result('Homepage schema check', false, error instanceof Error ? error.message : String(error));
  }
}

async function checkCanonicalLinks(label, path) {
  try {
    const response = await fetch(`${SITE_URL}${path}`, {
      headers: { 'User-Agent': 'elan-tech-live-verifier/1.0' },
    });
    const html = await response.text();
    const canonicalMatch = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    const canonical = canonicalMatch ? new URL(canonicalMatch[1], SITE_URL) : null;
    const invalidLinks = [];

    for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
      const rawHref = match[1].replaceAll('&amp;', '&');
      if (!rawHref || rawHref.startsWith('#') || /^(?:mailto:|tel:|javascript:|data:)/i.test(rawHref)) continue;

      const url = new URL(rawHref, `${SITE_URL}${path}`);
      if (url.hostname !== 'elan-tech.net' && url.hostname !== 'www.elan-tech.net') continue;
      if (url.origin !== SITE_URL || (!url.pathname.endsWith('/') && !extname(url.pathname))) {
        invalidLinks.push(url.href);
      }
    }

    result(
      `${label}: canonical URL`,
      canonical?.origin === SITE_URL && (canonical.pathname.endsWith('/') || Boolean(extname(canonical.pathname))),
      canonical?.href || 'missing canonical',
    );
    result(
      `${label}: internal links are canonical`,
      invalidLinks.length === 0,
      invalidLinks.slice(0, 3).join(', '),
    );
  } catch (error) {
    result(label, false, error instanceof Error ? error.message : String(error));
  }
}

function firstBuiltAsset() {
  const root = join(DIST, '_astro');
  if (!existsSync(root)) return null;

  const pending = [root];
  while (pending.length) {
    const directory = pending.pop();
    if (!directory) continue;

    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) pending.push(path);
      if (entry.isFile() && ['.css', '.js', '.mjs'].includes(extname(entry.name))) {
        return `/${relative(DIST, path).split('\\').join('/')}`;
      }
    }
  }

  return null;
}

console.log(`\n${BOLD}elan-tech.net live verification${RESET}  ${SITE_URL}\n`);

const home = await checkStatus('Apex homepage returns 200', `${SITE_URL}/`, [200]);
if (home) {
  const requiredHeaders = [
    ['Strict-Transport-Security', 'strict-transport-security', ['max-age=']],
    ['X-Frame-Options', 'x-frame-options', ['sameorigin']],
    ['X-Content-Type-Options', 'x-content-type-options', ['nosniff']],
    ['Referrer-Policy', 'referrer-policy', ['strict-origin-when-cross-origin']],
    ['Permissions-Policy', 'permissions-policy', ['camera=()']],
    ['Content-Security-Policy', 'content-security-policy', ["default-src 'self'", 'https://formsubmit.co', 'https://*.sibforms.com']],
  ];

  for (const [label, header, expectedParts] of requiredHeaders) {
    const value = home.headers.get(header) || '';
    const normalizedValue = value.toLowerCase();
    result(
      `${label} header`,
      expectedParts.every((part) => normalizedValue.includes(part.toLowerCase())),
      value || 'missing header',
    );
  }
}
await checkHomepageSchema();
await checkCanonicalLinks('Homepage', '/');
await checkCanonicalLinks('FAQ page', '/faq/');
await checkCanonicalLinks(
  'AI web development article',
  '/blog/technology-trends/ai-web-development-2026/',
);

await checkRedirect('www redirects to apex', 'https://www.elan-tech.net/', 301, '/');
await checkRedirect('Legacy privacy URL', `${SITE_URL}/privacy`, 301, '/privacy-policy/');
await checkRedirect('Legacy terms URL', `${SITE_URL}/terms`, 301, '/terms-conditions/');
await checkRedirect('Legacy about URL', `${SITE_URL}/about-elantech/`, 301, '/about/');
await checkRedirect(
  'Legacy ADA service URL',
  `${SITE_URL}/ada-compliant-web-design`,
  301,
  '/services/ada-compliant-web-design/',
);
await checkRedirect(
  'Legacy appointments URL',
  `${SITE_URL}/appointments/`,
  301,
  '/schedule-consultation/',
);
await checkRedirect(
  'Emergency quote URL',
  `${SITE_URL}/get-quote/?service=ada-emergency`,
  301,
  '/services/ada-compliant-web-design/',
);
await checkNoindex('Quote form', `${SITE_URL}/get-quote/?city=jaipur&service=web-design`);
await checkNoindex('Search results', `${SITE_URL}/search/?q=portfolio`);
await checkPageText(
  'Emergency accessibility service',
  '/services/ada-compliant-web-design/emergency-remediation/',
  ['within 48 hours'],
  ['within 24 hours', '24-hour emergency'],
);
await checkPageText(
  'Free website audit',
  '/free-website-audit/',
  ['initial response from us within 48 hours'],
  ['we deliver in 24 hours', '24-hour emergency audits'],
);
await checkPageText(
  'Emergency accessibility guide',
  '/blog/accessibility/ada-lawsuit-emergency-website-remediation/',
  ['emergency assessment request within 48 hours'],
  ['emergency assessment request within 24 hours'],
);
await checkPageText(
  'Canada accessibility service',
  '/web-design-company-canada/',
  ['respond to assessment requests within 48 hours'],
  ['results in 24-48 hours'],
);
await checkPageText(
  'AI web development article',
  '/blog/technology-trends/ai-web-development-2026/',
  ['delivered within 24-48 hours'],
  ['free 24-hour audit'],
);
await checkPageText(
  'LLM service summary',
  '/llms.txt',
  ['emergency wcag 2.1 aa assessment requests answered within 48 hours'],
  ['emergency wcag 2.1 aa assessment requests answered within 24 hours'],
);
await checkRedirect(
  campaignActive ? 'Active Launchpad campaign URL' : campaignUpcoming ? 'Scheduled Launchpad campaign URL' : 'Retired Launchpad campaign URL',
  `${SITE_URL}/launchpad`,
  campaignActive || campaignUpcoming ? 302 : 301,
  campaignActive ? '/pricing/digital-launchpad/' : '/pricing/',
);
await checkStatus('WordPress tag URL returns 410', `${SITE_URL}/tag/verification-probe`, [410]);
await checkStatus('Malformed literal wildcard URL returns 410', `${SITE_URL}/*`, [410]);

await checkStatus('Cloudflare _headers is not public', `${SITE_URL}/_headers`, [404]);
await checkStatus('Cloudflare _redirects is not public', `${SITE_URL}/_redirects`, [404]);
await checkStatus('Cloudflare _routes.json is not public', `${SITE_URL}/_routes.json`, [404]);

const asset = firstBuiltAsset();
if (asset) {
  const assetResponse = await checkStatus('Built Astro asset returns 200', `${SITE_URL}${asset}`, [200]);
  if (assetResponse) {
    const cacheControl = assetResponse.headers.get('cache-control') || '';
    result(
      'Built Astro asset has one-year immutable caching',
      cacheControl.includes('max-age=31536000') && cacheControl.includes('immutable'),
      cacheControl || 'missing Cache-Control header',
    );
  }
} else {
  result('Built Astro asset found for cache test', false, 'run npm run build first');
}

console.log(`\n${'-'.repeat(60)}`);
if (failed === 0) {
  console.log(`${PASS} ${BOLD}All ${passed} live checks passed.${RESET}\n`);
  process.exit(0);
}

console.log(`${FAIL} ${BOLD}${failed} live checks failed; ${passed} passed.${RESET}\n`);
process.exit(1);
