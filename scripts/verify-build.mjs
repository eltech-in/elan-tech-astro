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
 *   J. Page-specific Open Graph images
 *   K. Analytics disclosure
 *   L. Responsive image optimization
 *   M. Font loading
 *   P. Homepage SEO stability window
 *   Q. Nishant Barde digital contact card
 */

import { existsSync, readFileSync, readdirSync } from 'fs';
import { dirname, join, resolve } from 'path';

const DIST = resolve(process.cwd(), 'dist');
const SRC = resolve(process.cwd(), 'src');

// ── Helpers ──────────────────────────────────────────────────────────────────

const PASS  = '\x1b[32m✔\x1b[0m';
const FAIL  = '\x1b[31m✘\x1b[0m';
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

function fileNotExists(rel) {
  return !existsSync(join(DIST, rel));
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

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.(astro|mdx|tsx)$/.test(entry.name) ? [path] : [];
  });
}

function generatedHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return generatedHtmlFiles(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

function allGeneratedImageFilesExist() {
  return generatedHtmlFiles(DIST).every((htmlPath) => {
    const html = readFileSync(htmlPath, 'utf8');
    const imageTags = html.match(/<img(?:\s|>)[^>]*>/g) ?? [];

    return imageTags.every((tag) => {
      const candidates = [];
      const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
      const srcset = tag.match(/\ssrcset="([^"]+)"/)?.[1];
      if (src) candidates.push(src);
      if (srcset) {
        candidates.push(...srcset.split(',').map((candidate) => candidate.trim().split(/\s+/)[0]));
      }

      return candidates.every((candidate) => {
        if (!candidate || /^(?:https?:|data:)/.test(candidate)) return true;
        const cleanPath = candidate.split('?')[0].split('#')[0];
        const assetPath = cleanPath.startsWith('/')
          ? join(DIST, cleanPath.replace(/^\//, ''))
          : resolve(dirname(htmlPath), cleanPath);
        return existsSync(assetPath);
      });
    });
  });
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
check('Human-readable sitemap stylesheet',      fileContains('sitemap-index.xml', '<?xml-stylesheet', '/sitemap.xsl') && fileExists('sitemap.xsl'));
check('robots.txt',                             fileExists('robots.txt'));
check('pricing/index.html',                     fileExists('pricing/index.html'));
check('lead backup endpoint',                   fileContains('api/submit-lead.php', 'elan-tech-private/leads', 'info@elan-tech.net'));
check('thank-you conversion event',             fileContains('thank-you/index.html', 'elan_form_submission', 'generate_lead'));
check('Branded Open Graph image set',           [
  'home.png', 'services.png', 'accessibility.png', 'pricing.png', 'contact.png',
  'locations-india.png', 'international.png', 'products.png', 'blog.png', 'audit.png',
].every((file) => fileExists(`images/og/${file}`)));
check('Cloudflare _headers excluded',           fileNotExists('_headers'));
check('Cloudflare _redirects excluded',         fileNotExists('_redirects'));
check('Cloudflare _routes.json excluded',       fileNotExists('_routes.json'));

// ── B. Digital Launchpad landing page ─────────────────────────────────────────

section('B  Digital Launchpad landing page  /pricing/digital-launchpad/');
const LP = 'pricing/digital-launchpad/index.html';
check('Page exists',                            fileExists(LP));
check('Title contains "Digital Launchpad"',     fileContains(LP, 'Digital Launchpad'));
check('Canonical tag present',                  fileContains(LP, '/pricing/digital-launchpad/'));
check('Single ₹32,000 + GST plan',              fileContains(LP, '32,000', 'GST'));
check('Old three-plan prices removed',          fileNotContains(LP, '28,800') && fileNotContains(LP, '37,400') && fileNotContains(LP, '46,100'));
check('Expired offer stages removed',          fileNotContains(LP, '30 Jun 2026') && fileNotContains(LP, '12 Jul 2026') && fileNotContains(LP, 'prices rise'));
check('CountdownTimer island mounted',          fileContains(LP, 'CountdownTimer'));
check('Core inclusions rendered',               fileContains(LP, 'Up to 20 agreed pages', 'Shared website hosting and SSL', 'WhatsApp contact link'));
check('BookingForm present',                    fileContains(LP, 'lp-form', 'Request Booking Details on WhatsApp'));
check('Service schema (JSON-LD)',               fileContains(LP, '"@type":"Service"'));
check('FAQPage schema (JSON-LD)',               fileContains(LP, '"@type":"FAQPage"'));
check('BreadcrumbList schema',                  fileContains(LP, '"@type":"BreadcrumbList"'));
check('No WCAG 2.2 reference',                  fileNotContains(LP, 'WCAG 2.2'));
check('WhatsApp number correct (918788834630)', fileContains(LP, '918788834630'));

// ── C. Pricing page ───────────────────────────────────────────────────────────

section('C  Pricing page  /pricing/  (Step 4)');
const PR = 'pricing/index.html';
check('4A: Offer banner present',               fileContains(PR, 'Review the Plan'));
check('4B: Single PlanCard rendered',           fileContains(PR, 'Digital Launchpad', '32,000') && fileNotContains(PR, '28,800'));
check('4B: Full scope link',                    fileContains(PR, 'See full scope, dates and frequently asked questions'));
check('4B: Standard Packages divider',          fileContains(PR, 'Our Standard Packages'));
check('4C: Campaign FAQs match offer',          fileContains(PR, 'What is the Digital Launchpad plan', 'Does the Digital Launchpad include a .com'));
check('Existing FAQs intact',                   fileContains(PR, 'monthly payment plans', 'hidden fees'));

// ── D. Homepage ───────────────────────────────────────────────────────────────

section('D  Homepage  /  (Steps 5–6)');
const HP = 'index.html';
check('Step 5: Dual launch showcase rendered',  fileContains(HP, 'Explore the Plan', 'Discover DigiBizID'));
check('Step 5: Single plan price in strip',     fileContains(HP, '32,000', 'GST') && fileNotContains(HP, '28,800'));
check('Step 6: AnnouncementBar (SSR) rendered', fileContains(HP, 'ann-bar', 'Digital Launchpad limited-time offer'));
check('Scheduled promotions carry timing hooks', fileContains(HP, 'data-launchpad-offer', 'data-launchpad-upcoming') && fileContains(PR, 'data-launchpad-offer', 'data-launchpad-upcoming'));
check('Accessibility-first footer wording',     fileContains(HP, 'Accessibility-first development'));
check('"ISO Certified" removed',               fileNotContains(HP, 'ISO Certified'));
check('Homepage service-focus pre-heading',      fileContains(HP, 'Web design · eCommerce · Accessibility · Since 2002'));
check('Raipur city link in subheading',         fileContains(HP, 'web-design-company-raipur'));
check('Bhopal city link in subheading',         fileContains(HP, 'web-design-company-bhopal'));

// ── E. Header + Footer ────────────────────────────────────────────────────────

section('E  Header + Footer  (Steps 7B/7C)');
check('7B: NEW pill in nav (header)',           fileContains(HP, 'NEW'));
check('7C: Launchpad price in footer',          fileContains(HP, 'Digital Launchpad: ₹32,000 + GST'));
check('7C: Footer orange link colour',          fileContains(HP, 'F26722'));
check('Search icon in header',                  fileContains(HP, '/search/'));
check('Verified social profiles in footer/schema', fileContains(
  HP,
  'instagram.com/elan_tech',
  'youtube.com/c/eLanTechnology',
  'x.com/eLanTechnology',
) && fileNotContains(HP, 'instagram.com/elantechnology'));

// ── F. .htaccess ──────────────────────────────────────────────────────────────

section('F  .htaccess  (Step 7D)');
const HT = '.htaccess';
check('Campaign aliases use temporary redirects during the offer', fileContains(
  HT,
  '^launchpad/?$       /pricing/digital-launchpad/  [L,R=302]',
  '^4year/?$           /pricing/digital-launchpad/  [L,R=302]',
  '^offer/?$           /pricing/digital-launchpad/  [L,R=302]',
));
check('Campaign is hidden before 14 Sep 2026', fileContains(
  HT,
  'RewriteCond %{TIME} <20260914000000',
  '^(?:pricing/digital-launchpad|launchpad|4year|offer)/?$ /pricing/ [L,R=302]',
));
check('Campaign retirement is scheduled after 25 Sep 2026', fileContains(
  HT,
  'RewriteCond %{TIME} >20260925235959',
  '^(?:pricing/digital-launchpad|launchpad|4year|offer)/?$ /pricing/ [L,R=301]',
));
check('Retired campaign URLs avoid 404 errors', fileContains(HT, '/pricing/ [L,R=301]'));
check('HTTPS force rule intact',                fileContains(HT, 'Force HTTPS'));
check('Security headers intact',                fileContains(HT, 'Strict-Transport-Security'));
check('Brevo iframe allowed by CSP',             fileContains(HT, 'https://*.sibforms.com'));
check('FormSubmit requests allowed by CSP',      fileContains(HT, 'https://formsubmit.co'));
check('Calendly widget script allowed by CSP',   fileContains(HT, 'https://assets.calendly.com'));
check('Calendly frames allowed by CSP',          fileContains(HT, 'https://*.calendly.com'));
check('Old ADA service URL redirects to current service', fileContains(
  HT,
  '^ada-compliant-web-design/?$  /services/ada-compliant-web-design/ [L,R=301]',
));
check('Old appointments URL redirects to consultation', fileContains(
  HT,
  '^appointments/?$    /schedule-consultation/   [L,R=301]',
));
check('Malformed literal wildcard URL returns 410', fileContains(
  HT,
  '^\\*$                   -  [G,L]',
));
check('Former digital-card product URL redirects to DigiBizID venture', fileContains(
  HT,
  '^products/digital-business-card/?$ /ventures/digibizid/ [L,R=301]',
));

// ── G. Sitemap ────────────────────────────────────────────────────────────────

section('G  Sitemap  (Step 7A)');
const SM = 'sitemap-0.xml';
check('Launchpad URL in sitemap for scheduled activation', fileContains(SM, 'pricing/digital-launchpad'));
check('Launchpad sitemap settings', (() => {
  const path = join(DIST, SM);
  if (!existsSync(path)) return false;
  const xml = readFileSync(path, 'utf8');
  const lpIdx = xml.indexOf('pricing/digital-launchpad');
  if (lpIdx === -1) return false;
  const nearby = xml.slice(lpIdx, lpIdx + 200);
  return nearby.includes('<priority>0.9</priority>') && nearby.includes('<changefreq>weekly</changefreq>');
})());
check('DigiBizID venture page and sitemap entry', fileContains('ventures/digibizid/index.html', 'DigiBizID', 'An eLan Technology venture', 'elanvcard.elantech.cloud') && fileContains(SM, 'ventures/digibizid'));
check('DigiBizID is absent from the products catalogue', fileNotContains('products/index.html', '/products/digital-business-card/') && fileNotContains('products/index.html', 'elanvcard.elantech.cloud') && !fileContains(SM, 'products/digital-business-card'));
check('Homepage priority = 1.0',               fileContains(SM, '<priority>1.0</priority>'));
check('/pricing/ still in sitemap',             fileContains(SM, '<loc>https://elan-tech.net/pricing/</loc>'));
check('Every canonical blog page has exactly one H1', (() => {
  const sitemapPath = join(DIST, SM);
  if (!existsSync(sitemapPath)) return false;
  const sitemap = readFileSync(sitemapPath, 'utf8');
  const blogUrls = [...sitemap.matchAll(/<loc>https:\/\/elan-tech\.net\/(blog\/[^<]*)<\/loc>/g)];
  if (blogUrls.length === 0) return false;

  return blogUrls.every((match) => {
    const relativePath = match[1].replace(/\/$/, '') + '/index.html';
    const outputPath = join(DIST, relativePath);
    if (!existsSync(outputPath)) return false;
    const html = readFileSync(outputPath, 'utf8');
    return (html.match(/<h1(?:\s|>)/g) ?? []).length === 1;
  });
})());

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
check('25 August Shopify SEO checklist is published and indexed', fileContains(
  'blog/ecommerce/shopify-seo-checklist-india/index.html',
  '<title>Shopify SEO Checklist for Indian Stores (2026) | eLan Technology</title>',
  '<link rel="canonical" href="https://elan-tech.net/blog/ecommerce/shopify-seo-checklist-india/">',
  '2026-08-25T03:30:00.000Z',
  'HowTo',
  'FAQPage',
) && fileContains(
  'sitemap-0.xml',
  'https://elan-tech.net/blog/ecommerce/shopify-seo-checklist-india/',
));
check('1 September Astro 7 business guide is published and indexed', fileContains(
  'blog/technology-trends/what-is-astro-7-business-guide/index.html',
  '<title>What Is Astro 7? Plain-English Business Guide | eLan Technology</title>',
  '<link rel="canonical" href="https://elan-tech.net/blog/technology-trends/what-is-astro-7-business-guide/">',
  '2026-09-01T00:00:00.000Z',
  'FAQPage',
  'What is Astro 7 in simple terms?',
) && fileContains(
  'sitemap-0.xml',
  'https://elan-tech.net/blog/technology-trends/what-is-astro-7-business-guide/',
));
check('15 September website quotation guide is published and indexed', fileContains(
  'blog/web-design/what-should-a-website-quote-include/index.html',
  'What Should a Website Quote Include',
  'website-quote-checklist',
) && fileContains(
  'sitemap-0.xml',
  'https://elan-tech.net/blog/web-design/what-should-a-website-quote-include/',
));
check('Medusa comparison matches dominant query order', fileContains(
  'blog/ecommerce/shopify-vs-medusa-js-2026/index.html',
  'Medusa.js vs Shopify: Costs, Ownership',
));
check('Astro articles serve distinct search intent', fileContains(
  'blog/technology-trends/astro-7-business-websites/index.html',
  'Astro 7 Website Development: Speed, SEO, Migration',
) && fileContains(
  'blog/technology-trends/what-is-astro-7-business-guide/index.html',
  'What Is Astro 7? A Plain-English Guide',
));
check('WCAG explainer uses query-aligned heading', fileContains(
  'blog/accessibility/wcag-explained-business-owners/index.html',
  'WCAG 2.2 AA Requirements in Plain English',
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
  check(`${name}: market guide and canonical CTA`, fileContains(
    page,
    `What ${name} Businesses Usually Need From a Website`,
    'href="/get-quote/"',
  ));
  check(`${name}: honest project proof with real website links`, fileContains(
    page,
    `not presented as local ${name} clients`,
    'target="_blank"',
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

// ── J. Open Graph images ─────────────────────────────────────────────────────

section('J  Page-specific Open Graph images');
const ogImageChecks = [
  ['Homepage', 'index.html', '/images/og/home.png'],
  ['Services hub', 'services/index.html', '/images/og/services.png'],
  ['Web development service', 'services/web-development/index.html', '/images/og/services.png'],
  ['Accessibility service', 'services/ada-compliant-web-design/index.html', '/images/og/accessibility.png'],
  ['eCommerce service', 'services/ecommerce/index.html', '/images/ecommerce-og-2026.png'],
  ['Pricing', 'pricing/index.html', '/images/og/pricing.png'],
  ['Contact', 'contact/index.html', '/images/og/contact.png'],
  ['Free audit', 'free-website-audit/index.html', '/images/og/audit.png'],
  ['Products', 'products/index.html', '/images/og/products.png'],
  ['Blog hub', 'blog/index.html', '/images/og/blog.png'],
  ['India city page', 'web-design-company-nagpur/index.html', '/images/og/locations-india.png'],
  ['International page', 'web-design-company-canada/index.html', '/images/og/international.png'],
];

for (const [label, page, image] of ogImageChecks) {
  check(`${label}: relevant social image`, fileContains(page, image));
}

// ── K. Analytics disclosure ──────────────────────────────────────────────────

section('K  Analytics disclosure');
check('Consent popup is removed', fileNotContains(
  HP,
  'id="cookie-consent"',
  'Accept analytics',
  'Reject analytics',
));
check('Footer analytics notice is available', fileContains(
  HP,
  'aria-label="Analytics notice"',
  'We use website analytics to learn what visitors find useful and improve our services.',
  '/cookie-policy/',
));
check('Analytics load without a consent popup', fileContains(
  HP,
  'if (!hasPrivacySignal()) loadTags();',
));
check('GPC and DNT privacy signals are respected', fileContains(
  HP,
  'globalPrivacyControl',
  'doNotTrack',
));
check('Unconditional GTM noscript iframe removed', fileNotContains(
  HP,
  'googletagmanager.com/ns.html',
));
check('Cookie policy names analytics providers', fileContains(
  'cookie-policy/index.html',
  'Google Analytics and Google Tag Manager',
  'Microsoft Clarity',
  'Global Privacy Control',
));

// ── L. Responsive image optimization ────────────────────────────────────────

section('L  Responsive image optimization');
check('No unapproved raw image tags remain in source templates', sourceFiles(SRC).every(
  (path) => path.endsWith(join('about', 'nishant-barde.astro')) || !/<img(?:\s|>)/.test(readFileSync(path, 'utf8')),
));
check('Homepage emits optimized image assets', fileContains(
  HP,
  '/_astro/',
  'srcset=',
));
check('Blog cards emit responsive image choices', fileContains(
  'blog/index.html',
  '/_astro/',
  'srcset=',
  'sizes=',
));
check('Portfolio cards emit responsive image choices', fileContains(
  'portfolio/index.html',
  '/_astro/',
  'srcset=',
  'sizes=',
));
check('Individual portfolio case-study pages are withheld until verified',
  !fileExists('portfolio/case-study'));
check('Previously published image URLs remain available', fileExists(
  'blog/featuredblog.avif',
) && fileExists('portfolio/mahavir.avif'));
check('Every generated local image candidate exists', allGeneratedImageFilesExist());

// ── M. Font loading ──────────────────────────────────────────────────────────

section('M  Font loading');
check('DM Sans uses font-display swap', fileContains(
  HP,
  '@font-face{font-family:DM Sans',
  'font-display:swap',
  'dm-sans-latin.woff2',
));
check('Sora uses font-display swap', fileContains(
  HP,
  '@font-face{font-family:Sora',
  'font-display:swap',
  'sora-latin.woff2',
));
check('Both local fonts are preloaded', fileContains(
  HP,
  'rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/dm-sans-latin.woff2?v=20260817"',
  'rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/sora-latin.woff2?v=20260817"',
));
check('Both font files are included in the build', fileExists(
  'fonts/dm-sans-latin.woff2',
) && fileExists('fonts/sora-latin.woff2'));

// ── N. GSC indexing policy ───────────────────────────────────────────────────

section('N  GSC indexing policy');
check('Quote form remains intentionally noindex', fileContains(
  'get-quote/index.html',
  '<meta name="robots" content="noindex,nofollow">',
  '<link rel="canonical" href="https://elan-tech.net/get-quote/">',
));
check('Search results remain intentionally noindex', fileContains(
  'search/index.html',
  '<meta name="robots" content="noindex,nofollow">',
  '<link rel="canonical" href="https://elan-tech.net/search/">',
));
check('Conversion and utility pages remain crawlable for noindex discovery',
  fileNotContains('robots.txt', 'Disallow: /thank-you')
  && fileNotContains('robots.txt', 'Disallow: /schedule-consultation')
  && fileNotContains('robots.txt', 'Disallow: /request-demo')
  && fileNotContains('robots.txt', 'Disallow: /search')
);
check('Tracking parameters remain crawlable for canonical discovery',
  fileNotContains('robots.txt', 'utm_source=')
  && fileNotContains('robots.txt', 'utm_medium=')
  && fileNotContains('robots.txt', 'utm_campaign=')
);
check('Thin blog categories are noindex and absent from sitemap',
  fileContains('blog/category/web-design/index.html', '<meta name="robots" content="noindex,nofollow">')
  && fileContains('blog/category/seo/index.html', '<meta name="robots" content="noindex,nofollow">')
  && fileNotContains('sitemap-0.xml', '/blog/category/web-design/')
  && fileNotContains('sitemap-0.xml', '/blog/category/seo/')
);
check('Internal CTAs avoid crawlable form parameters',
  generatedHtmlFiles(DIST).every((path) => {
    const html = readFileSync(path, 'utf8');
    return !/href="\/(?:get-quote|free-website-audit)\/\?/.test(html);
  })
);
check('International pages avoid unsupported savings and compliance guarantees',
  fileNotContains('web-design-company-usa/index.html', 'Save 70-85%')
  && fileNotContains('web-design-company-usa/index.html', 'every website we build meets')
  && fileNotContains('web-design-company-canada/index.html', 'Included free')
  && fileNotContains('web-design-company-canada/index.html', 'satisfies AODA')
);
check('Consultation, demo and thank-you pages remain intentionally noindex',
  fileContains(
    'schedule-consultation/index.html',
    '<meta name="robots" content="noindex,nofollow">',
    '<link rel="canonical" href="https://elan-tech.net/schedule-consultation/">',
  ) && fileContains(
    'request-demo/index.html',
    '<meta name="robots" content="noindex,nofollow">',
    '<link rel="canonical" href="https://elan-tech.net/request-demo/">',
  ) && fileContains(
    'thank-you/index.html',
    '<meta name="robots" content="noindex,nofollow">',
    '<link rel="canonical" href="https://elan-tech.net/thank-you/">',
  )
);
check('Emergency quote URL redirects directly to canonical ADA service', fileContains(
  '.htaccess',
  '^get-quote/?$ /services/ada-compliant-web-design/? [L,R=301]',
));
check('Homepage keeps valid WebSite schema', fileContains(
  'index.html',
  '"@type":"WebSite"',
  '"name":"eLan Technology"',
  '"url":"https://elan-tech.net"',
));
check('Obsolete sitelinks SearchAction schema is removed', fileNotContains(
  'index.html',
  'SearchAction',
  'search_term_string',
));
check('Emergency accessibility response is consistently 48 hours', fileContains(
  'services/ada-compliant-web-design/emergency-remediation/index.html',
  'emergency assessment within 48 hours',
  'emergency assessments within 48 hours',
  'delivered in 48–72 hours',
) && fileNotContains(
  'services/ada-compliant-web-design/emergency-remediation/index.html',
  'emergency assessment within 24 hours',
  'emergency remediations within 24 hours',
  'delivered in 24–72 hours',
));
check('Free audit page has no 24-hour emergency accessibility promise', fileNotContains(
  'free-website-audit/index.html',
  'we deliver in 24 hours',
  '24-hour emergency audits',
));
check('Emergency accessibility guide promises a 48-hour response', fileContains(
  'blog/accessibility/ada-lawsuit-emergency-website-remediation/index.html',
  'emergency assessment request within 48 hours',
));
check('AI-readable accessibility service copy promises 48 hours', fileContains(
  'llms.txt',
  'emergency WCAG 2.1 AA assessment requests answered within 48 hours',
) && fileNotContains('llms.txt', 'emergency 24-hour WCAG'));

// ── O. Portfolio showcase ───────────────────────────────────────────────────

section('O  Portfolio showcase');
check('Latest Beautiphi launch is featured on its production domain', fileContains(
  'portfolio/index.html',
  'Launched 25 August 2026',
  'Beautiphi Esthetic Clinics',
  'https://beautiphiclinic.com/',
));
check('Recent launches are present', fileContains(
  'portfolio/index.html',
  'KEN Global Designs',
  'https://kenglobal.in/',
  'ISA Nagpur',
  'https://www.isanagpur.org/',
  'MDFWala',
  'https://deetyaa.com/',
  'Ophthalmological Society Nagpur',
  'Samarth Realty',
  'BrandEar',
));
check('Five ecommerce projects are showcased', fileContains(
  'portfolio/index.html',
  'Rangresha',
  'Puritas',
  'Mahavir Mevawala',
  'Stems Flower Studio',
  'Larisha Ayurved',
));
check('Commerce platforms are prominent and linked', fileContains(
  'portfolio/index.html',
  '>Shopify</span>',
  '>Medusa.js</span>',
  '>WooCommerce</span>',
  '/services/ecommerce/shopify-development/',
  '/services/ecommerce/medusa-js-development/',
));
check('Five upcoming launches remain after recent production launches', fileContains(
  'portfolio/index.html',
  'ASBIM Consulting',
  'PropertyCab',
  'Parekh Opticals',
  'Divine Advisory',
  'CITL',
));
check('Beautiphi is featured as a live production launch', fileContains(
  'portfolio/index.html',
  'Beautiphi Esthetic Clinics',
  'https://beautiphiclinic.com/',
  'Launched 25 August 2026',
) && fileNotContains('portfolio/index.html', 'https://bec.elantech.in/'));
check('Ekalavya website and JUD portal are both showcased', fileContains(
  'portfolio/index.html',
  'Ekalavya',
  'https://ekalavya.co.in/',
  'Ekalavya JUD Portal',
  'https://jud.ekalavya.co.in/',
  '/_astro/ekalavya-main.',
  '/_astro/ekalavya-jud-portal.',
));
check('Alessanddra redesign is identified as a custom Astro build', fileContains(
  'portfolio/index.html',
  'Alessanddra Nirrwaan Photography',
  'https://alessanddranirrwaan.com/',
  'Astro Website</span>',
  'custom Astro photography website',
  '/_astro/anirwan.',
));
check('Confirmed launch domains are displayed', fileContains(
  'portfolio/index.html',
  'kenglobal.in',
  'asbimconsulting.com',
  'propertycab.in',
));
check('International client projects are added once to the portfolio', fileContains(
  'portfolio/index.html',
  'Wind-Tech Auto Glass',
  'https://wind-tech.com/',
  'Pan Pro Windows',
  'https://panprowindows.ca/',
  'Rushmore Group',
  'https://rushmoregroup.com.au/',
  'Stems Flower Studio',
  'https://stemsflowerstudio.co.nz/',
) && fileNotContains('portfolio/index.html', 'https://stemsflowerstudio.co.nz/-'));
check('Country pages contain accurate project proof', [
  ['web-design-company-usa/index.html', 'Wind-Tech Auto Glass', 'Seattle, Washington', 'https://wind-tech.com/', 'Ribolator USA', 'https://ribolator.com/'],
  ['web-design-company-canada/index.html', 'Pan Pro Windows', 'Scarborough, Ontario', 'https://panprowindows.ca/'],
  ['web-design-company-australia/index.html', 'Rushmore Group', 'Australia', 'https://rushmoregroup.com.au/'],
  ['web-design-company-new-zealand/index.html', 'Stems Flower Studio', 'Auckland, New Zealand', 'https://stemsflowerstudio.co.nz/'],
].every(([page, ...needles]) => fileContains(page, ...needles)));
check('Removed portfolio projects are absent', fileNotContains(
  'portfolio/index.html',
  'Pranamya',
  'STDA India',
  'H Square Media',
));
check('Earlier portfolio archive is restored', fileContains(
  'portfolio/index.html',
  'Earlier projects and long-term client work',
  'additional projects',
  'Silaris',
  '6 Simplex',
  'Aastha Hospital',
  'Trimit Architects',
  'ABC Wiindo',
  'Ribolator USA',
));
check('Correct project-specific archive thumbnails are rendered', fileContains(
  'portfolio/index.html',
  '/_astro/elitefx.',
  '/_astro/silaris.',
  '/_astro/Indo-Advisors.',
  '/_astro/gokhales.',
  '/_astro/nexus-cowork.',
  '/_astro/6simplex.',
  '/_astro/dizviz.',
  '/_astro/abhay-tembhurne.',
  '/_astro/77mishti-packaging.',
  '/_astro/aastha-hospital.',
  '/_astro/icon-hospital.',
  '/_astro/cipfarm.',
  '/_astro/cement-pipe-nagpur.',
  '/_astro/gps-india.',
  '/_astro/ribolator-usa.',
  '/_astro/csri-bsb.',
));
check('Requested portfolio removals are complete', fileNotContains(
  'portfolio/index.html',
  'Harmony Pain &amp; Palliative Clinic',
  'Yog For Yourself',
  'Resort Management Portal',
) && !fileExists('portfolio/case-study'));
check('Portfolio has no links to unpublished case studies', fileNotContains(
  'portfolio/index.html',
  '/portfolio/case-study/',
));
check('Portfolio copy contains no em dash', fileNotContains('portfolio/index.html', '—'));

// ── P. Homepage SEO stability window ─────────────────────────────────────────

section('P  Homepage SEO stability window (review on or after 10 Dec 2026)');
check('Homepage title remains on the 90-day baseline', fileContains(
  HP,
  '<title>Web Design &amp; Development Company in Nagpur | eLan Technology</title>',
));
check('Homepage description remains on the 90-day baseline', fileContains(
  HP,
  "Nagpur web design and development company with 24+ years' experience and 500+ clients. Custom websites, eCommerce and ADA/WCAG accessibility. Free audit.",
));
check('Homepage H1 remains on the 90-day baseline', fileContains(
  HP,
  'Web Design &amp; Development',
  'Trusted by 500+ Businesses',
));
check('Homepage uses qualified accessibility claims', fileContains(
  HP,
  'Accessibility-first',
  'WCAG Testing',
) && fileNotContains(HP, '>ADA Compliant<'));

// ── Q. Nishant Barde digital contact card ────────────────────────────────────

section('Q  Nishant Barde digital contact card');
check('Profile page and downloadable contact exist',
  fileExists('about/nishant-barde/index.html') && fileExists('contact/nishant-barde.vcf'));
check('Profile contact details are correct', fileContains(
  'about/nishant-barde/index.html',
  'Nishant Barde',
  'Digital Growth Consultant',
  '+918788834630',
  'nishant@elan-tech.net',
));
check('Call, WhatsApp, save-contact and QR actions are rendered', fileContains(
  'about/nishant-barde/index.html',
  'tel:+918788834630',
  'wa.me/918788834630',
  '/contact/nishant-barde.vcf',
  'data-qr-dialog',
));
check('Share stays inside the page and uses the native share or copy fallback', fileContains(
  'about/nishant-barde/index.html',
  'data-share-card',
  'Share this digital card',
  'navigator.share',
  'navigator.clipboard.writeText',
));
check('Obsolete portrait tick label is absent', fileNotContains(
  'about/nishant-barde/index.html',
  'Available for new projects',
));
check('Mobile profile header uses the redesigned portrait composition', fileContains(
  'about/nishant-barde/index.html',
  'mobile-portrait-halo',
  'cover-specialisms',
  'Websites',
  'Commerce',
) && fileNotContains('about/nishant-barde/index.html', 'Professional focus'));
check('vCard uses version 3.0 with complete core fields', fileContains(
  'contact/nishant-barde.vcf',
  'BEGIN:VCARD',
  'VERSION:3.0',
  'FN:Nishant Barde',
  'ORG:eLan Technology',
  'END:VCARD',
));
check('Person schema and profile canonical are present', fileContains(
  'about/nishant-barde/index.html',
  'https://schema.org',
  'Digital Growth Consultant',
  'rel="canonical" href="https://elan-tech.net/about/nishant-barde/"',
));
check('Profile URL is included in the sitemap', fileContains(
  'sitemap-0.xml',
  '<loc>https://elan-tech.net/about/nishant-barde/</loc>',
));
check('Profile has its dedicated 1200×630 social image',
  fileExists('images/og/nishant-barde-digital-card.jpg') && fileContains(
    'about/nishant-barde/index.html',
    'property="og:type" content="profile"',
    'https://elan-tech.net/images/og/nishant-barde-digital-card.jpg',
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
