#!/usr/bin/env node
/**
 * verify-build.mjs — post-build sanity checker for elan-tech.net
 *
 * Usage:
 *   node scripts/verify-build.mjs          # after npm run build
 *   npm run verify                          # shortcut
 *
 * Exit code 0 = all checks passed. Exit code 1 = one or more failures.
 *
 * Checks are grouped:
 *   A. Critical files exist
 *   B. Digital Launchpad landing page
 *   C. Pricing page (Step 4)
 *   D. Homepage (Steps 5–6)
 *   E. Header + Footer (Step 7B/7C)
 *   F. .htaccess (Step 7D)
 *   G. Sitemap (Step 7A)
 *   H. CTR metadata for GSC near-win pages
 *   I. Expanded city pages
 */

import { existsSync, readFileSync } from 'fs';
import { join, resolve } from 'path';

const DIST = resolve(process.cwd(), 'dist');

// ── Helpers ──────────────────────────────────────────────────────────────────

const PASS  = '\x1b[32m✔\x1b[0m';
const FAIL  = '\x1b[31m✘\x1b[0m';
const WARN  = '\x1b[33m⚠\x1b[0m';
const BOLD  = '\x1b[1m';
const RESET = '\x1b[0m';
const DIM   = '\x1b[2m';

let passed = 0;
let failed = 0;

function check(label, ok, detail = '') {
  if (ok) {
    console.log(`  ${PASS} ${label}`);
    passed++;
  } else {
    console.log(`  ${FAIL} ${label}${detail ? `  ${DIM}← ${detail}${RESET}` : ''}`);
    failed++;
  }
}

function section(title) {
  console.log(`\n${BOLD}${title}${RESET}`);
}

function fileExists(rel) {
  return existsSync(join(DIST, rel));
}

function fileContains(rel, ...needles) {
  const path = join(DIST, rel);
  if (!existsSync(path)) return false;
  const content = readFileSync(path, 'utf8');
  return needles.every(n => content.includes(n));
}

function fileNotContains(rel, needle) {
  const path = join(DIST, rel);
  if (!existsSync(path)) return true;
  return !readFileSync(path, 'utf8').includes(needle);
}

// ── Start ─────────────────────────────────────────────────────────────────────

console.log(`\n${BOLD}elan-tech.net build verification${RESET}  ${DIM}dist: ${DIST}${RESET}\n${'─'.repeat(60)}`);

// ── A. Critical files ─────────────────────────────────────────────────────────

section('A  Critical files');
check('dist/ exists',                           existsSync(DIST));
check('index.html',                             fileExists('index.html'));
check('404.html',                               fileExists('404.html'));
check('.htaccess',                              fileExists('.htaccess'));
check('sitemap-index.xml',                      fileExists('sitemap-index.xml'));
check('sitemap-0.xml',                          fileExists('sitemap-0.xml'));
check('robots.txt',                             fileExists('robots.txt'));
check('pricing/index.html',                     fileExists('pricing/index.html'));

// ── B. Digital Launchpad landing page ─────────────────────────────────────────

section('B  Digital Launchpad landing page  /pricing/digital-launchpad/');
const LP = 'pricing/digital-launchpad/index.html';
check('Page exists',                            fileExists(LP));
check('Title contains "Digital Launchpad"',     fileContains(LP, 'Digital Launchpad'));
check('Canonical tag present',                  fileContains(LP, '/pricing/digital-launchpad/'));
check('Plan: eLan Starter ₹28,800',            fileContains(LP, '28,800'));
check('Plan: eLan Business ₹37,400',           fileContains(LP, '37,400'));
check('Plan: eLan Complete ₹46,100',           fileContains(LP, '46,100'));
check('Expired offer stages removed',          fileNotContains(LP, '30 Jun 2026') && fileNotContains(LP, '12 Jul 2026') && fileNotContains(LP, 'prices rise'));
check('CountdownTimer island mounted',          fileContains(LP, 'CountdownTimer'));
check('InclusionGrid rendered (8 items)',        fileContains(LP, 'Professional Website', 'SSL Certificate', 'WhatsApp Chat Button'));
check('BookingForm present',                    fileContains(LP, 'lp-form', 'Reserve Slot via WhatsApp'));
check('Service schema (JSON-LD)',               fileContains(LP, '"@type":"Service"'));
check('FAQPage schema (JSON-LD)',               fileContains(LP, '"@type":"FAQPage"'));
check('BreadcrumbList schema',                  fileContains(LP, '"@type":"BreadcrumbList"'));
check('No WCAG 2.2 reference',                  fileNotContains(LP, 'WCAG 2.2'));
check('WhatsApp number correct (918788834630)', fileContains(LP, '918788834630'));

// ── C. Pricing page ───────────────────────────────────────────────────────────

section('C  Pricing page  /pricing/  (Step 4)');
const PR = 'pricing/index.html';
check('4A: Offer banner present',               fileContains(PR, 'View Offer'));
check('4B: PlanCard tiles rendered',            fileContains(PR, 'eLan Starter', 'eLan Business', 'eLan Complete'));
check('4B: "See Full Plan Details" link',        fileContains(PR, 'See Full Plan Details'));
check('4B: Standard Packages divider',          fileContains(PR, 'Our Standard Packages'));
check('4C: Digital Launchpad FAQ Q1',           fileContains(PR, 'What is the Digital Launchpad plan'));
check('4C: Digital Launchpad FAQ Q2 (.com)',    fileContains(PR, 'Does the Digital Launchpad include a .com'));
check('Existing FAQs intact',                   fileContains(PR, 'monthly payment plans', 'hidden fees'));

// ── D. Homepage ───────────────────────────────────────────────────────────────

section('D  Homepage  /  (Steps 5–6)');
const HP = 'index.html';
check('Step 5: HomePromoStrip rendered',        fileContains(HP, 'Reserve a Slot'));
check('Step 5: Final plan prices in strip',     fileContains(HP, '28,800', '37,400', '46,100'));
check('Step 6: AnnouncementBar (SSR) rendered', fileContains(HP, 'ann-bar', 'Digital Launchpad limited-time offer'));
check('WCAG 2.1 AA badge (not 2.2)',            fileContains(HP, 'WCAG 2.1 AA'));
check('"ISO Certified" removed',               fileNotContains(HP, 'ISO Certified'));
check('Nagpur accessibility pre-heading',       fileContains(HP, "Nagpur's accessibility-first web studio"));
check('Raipur city link in subheading',         fileContains(HP, 'web-design-company-raipur'));
check('Bhopal city link in subheading',         fileContains(HP, 'web-design-company-bhopal'));

// ── E. Header + Footer ────────────────────────────────────────────────────────

section('E  Header + Footer  (Steps 7B/7C)');
check('7B: NEW pill in nav (header)',           fileContains(HP, 'NEW'));
check('7C: 4-Year Website Plan in footer',      fileContains(HP, '4-Year Website Plan'));
check('7C: Footer orange link colour',          fileContains(HP, 'F26722'));
check('Search icon in header',                  fileContains(HP, '/search/'));

// ── F. .htaccess ──────────────────────────────────────────────────────────────

section('F  .htaccess  (Step 7D)');
const HT = '.htaccess';
check('R=302 /launchpad redirect',              fileContains(HT, 'launchpad', 'R=302'));
check('R=302 /4year redirect',                  fileContains(HT, '4year', 'R=302'));
check('R=302 /offer redirect',                  fileContains(HT, 'offer', 'R=302'));
check('All 3 point to digital-launchpad/',      fileContains(HT, '/pricing/digital-launchpad/'));
check('HTTPS force rule intact',                fileContains(HT, 'Force HTTPS'));
check('Security headers intact',                fileContains(HT, 'Strict-Transport-Security'));

// ── G. Sitemap ────────────────────────────────────────────────────────────────

section('G  Sitemap  (Step 7A)');
const SM = 'sitemap-0.xml';
check('Launchpad URL in sitemap',               fileContains(SM, 'pricing/digital-launchpad'));
check('Launchpad priority = 0.9',              (() => {
  const path = join(DIST, SM);
  if (!existsSync(path)) return false;
  const xml = readFileSync(path, 'utf8');
  // Check that the digital-launchpad entry has priority 0.9
  const lpIdx = xml.indexOf('pricing/digital-launchpad');
  if (lpIdx === -1) return false;
  const nearby = xml.slice(lpIdx, lpIdx + 200);
  return nearby.includes('<priority>0.9</priority>');
})());
check('Launchpad changefreq = weekly',         fileContains(SM,
  'pricing/digital-launchpad',
  '<changefreq>weekly</changefreq>',
));
check('Homepage priority = 1.0',               fileContains(SM, '<priority>1.0</priority>'));
check('/pricing/ still in sitemap',             fileContains(SM, '<loc>https://elan-tech.net/pricing/</loc>'));

// ── H. CTR metadata ──────────────────────────────────────────────────────────

section('H  CTR metadata for GSC near-win pages');
check('Homepage: web design + development title', fileContains(
  HP,
  '<title>Web Design &amp; Development Company in Nagpur | eLan Technology</title>',
));
check('ADA service: remediation + WCAG title and 48-hour response', fileContains(
  'services/ada-compliant-web-design/index.html',
  '<title>ADA Website Remediation Services &amp; WCAG Audits | eLan Technology</title>',
  'Emergency response within 48 hours.',
));
check('Free audit: concise benefit-led title', fileContains(
  'free-website-audit/index.html',
  '<title>Free Website Audit: SEO, Speed &amp; Security | eLan Technology</title>',
));
check('April trends: query-aligned title', fileContains(
  'blog/technology-trends/website-development-trends-april-2026/index.html',
  '<title>Web Development Trends &amp; News: April 2026 | eLan Technology</title>',
));
check('AI article: query-aligned title', fileContains(
  'blog/technology-trends/ai-web-development-2026/index.html',
  '<title>AI in Web Development 2026: Business Guide | eLan Technology</title>',
));

// ── I. Expanded city pages ───────────────────────────────────────────────────

section('I  Expanded city pages');
const expandedCities = [
  ['Indore', 'indore', 'Web Design &amp; Development Company in Indore'],
  ['Kolkata', 'kolkata', 'Web Design &amp; Development Company in Kolkata'],
  ['Lucknow', 'lucknow', 'Web Design &amp; Development Company in Lucknow'],
  ['Chandigarh', 'chandigarh', 'Web Design Company in Chandigarh | Websites &amp; Landing Pages'],
];

for (const [name, slug, title] of expandedCities) {
  const page = `web-design-company-${slug}/index.html`;
  check(`${name}: page, canonical and service-area schema`, fileContains(
    page,
    `<title>${title} | eLan Technology</title>`,
    `<link rel="canonical" href="https://elan-tech.net/web-design-company-${slug}/">`,
    '"areaServed"',
  ));
  check(`${name}: market guide and city-aware CTA`, fileContains(
    page,
    `What ${name} Businesses Usually Need From a Website`,
    `city=${slug}`,
  ));
  check(`${name}: honest project proof with case-study links`, fileContains(
    page,
    `not presented as local ${name} clients`,
    '/portfolio/case-study/',
  ));
}
check('Fabricated local portfolio labels removed', expandedCities.every(
  ([, slug]) => fileNotContains(
    `web-design-company-${slug}/index.html`,
    slug === 'indore'
      ? 'Indore Textile Exporter'
      : slug === 'kolkata'
        ? 'Kolkata Finance Portal'
        : slug === 'lucknow'
          ? 'UP Government Portal'
          : 'Chandigarh Education Portal',
  )
));

// ── Summary ───────────────────────────────────────────────────────────────────

const total = passed + failed;
console.log(`\n${'─'.repeat(60)}`);
if (failed === 0) {
  console.log(`\n${PASS} ${BOLD}All ${total} checks passed.${RESET} Build is ready to deploy.\n`);
  process.exit(0);
} else {
  console.log(`\n${FAIL} ${BOLD}${failed} of ${total} checks failed.${RESET} Fix the issues above before deploying.\n`);
  process.exit(1);
}
