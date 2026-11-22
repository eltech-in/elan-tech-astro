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
import { brotliDecompressSync, gunzipSync } from 'node:zlib';

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
check('thank-you conversion event',             fileContains('thank-you/index.html', '__elanTrackEvent', 'generate_lead', 'lead-conversion-pending'));
check('Branded Open Graph image set',           [
  'home.png', 'services.png', 'accessibility.png', 'pricing.png', 'contact.png',
  'locations-india.png', 'international.png', 'products.png', 'blog.png', 'website-audit.png',
].every((file) => fileExists(`images/og/${file}`)));
check('Cloudflare _headers excluded',           fileNotExists('_headers'));
check('Cloudflare _redirects excluded',         fileNotExists('_redirects'));
check('Cloudflare _routes.json excluded',       fileNotExists('_routes.json'));

// Hostinger must never receive pre-compressed HTML/XML or unsupported Zstd
// variants. Also verify each generated gzip/Brotli file round-trips correctly.
function buildFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? buildFiles(path) : [path];
  });
}
const compressionFiles = existsSync(DIST) ? buildFiles(DIST) : [];
const compressedAssets = compressionFiles.filter((path) => /\.(?:br|gz)$/.test(path));
check('No pre-compressed HTML or XML files', !compressionFiles.some((path) => /\.(?:html|xml)\.(?:br|gz|zst)$/.test(path)));
check('No unsupported Zstandard sidecars', !compressionFiles.some((path) => path.endsWith('.zst')));
check('Gzip and Brotli asset variants exist',
  compressedAssets.some((path) => path.endsWith('.gz')) && compressedAssets.some((path) => path.endsWith('.br')));
check('Compressed assets decode to the original files', compressedAssets.length > 0 && compressedAssets.every((path) => {
  try {
    const original = path.replace(/\.(?:br|gz)$/, '');
    const decode = path.endsWith('.gz') ? gunzipSync : brotliDecompressSync;
    return existsSync(original) && decode(readFileSync(path)).equals(readFileSync(original));
  } catch {
    return false;
  }
}));

// ── B. Digital Launchpad landing page ─────────────────────────────────────────

section('B  Retired Digital Launchpad');
const LP = 'pricing/digital-launchpad/index.html';
check('Retired page redirects to current pricing', fileContains(LP, 'http-equiv="refresh"', '/pricing/'));
check('No active booking or offer schema remains', fileNotContains(LP, 'lp-form') && fileNotContains(LP, '"@type":"Offer"'));
check('Campaign backup retained outside published routes', existsSync(join(process.cwd(), 'backups/campaigns/digital-launchpad-september-2026.astro.txt')));
section('C  Current pricing');
const PR = 'pricing/index.html';
check('Current standard prices are displayed', fileContains(PR, '20,999', '30,999'));
check('Current page counts and revisions are displayed', fileContains(PR, 'Up to 10 Pages', 'Up to 20 Pages'));
check('Enterprise has custom pricing', fileContains(PR, 'Contact for Pricing'));
check('Expired campaign is not promoted', fileNotContains(PR, '/pricing/digital-launchpad/'));
check('Existing FAQs intact', fileContains(PR, 'monthly payment plans', 'hidden fees'));
section('D  Homepage');
const HP = 'index.html';
check('DigiBizID remains a venture', fileContains(HP, 'Discover DigiBizID', '/ventures/digibizid/'));
check('Expired Launchpad promotion is absent', fileNotContains(HP, '/pricing/digital-launchpad/'));
check('Accessibility-first footer wording', fileContains(HP, 'Accessibility-first development'));
check('"ISO Certified" removed', fileNotContains(HP, 'ISO Certified'));
check('Homepage service-focus pre-heading', fileContains(HP, 'Web design · eCommerce · Accessibility · Since 2002'));
check('Raipur city link in subheading', fileContains(HP, 'web-design-company-raipur'));
check('Homepage does not link de-indexed location pages', ['bhopal', 'mumbai', 'brazil', 'saudi-arabia'].every(slug => fileNotContains(HP, `href="/web-design-company-${slug}/"`)));

// ── E. Header + Footer ────────────────────────────────────────────────────────

section('E  Header + Footer  (Steps 7B/7C)');
check('Primary pricing navigation remains', fileContains(HP, '/pricing/'));
check('No expired Launchpad footer price', fileNotContains(HP, 'Digital Launchpad: ₹32,000 + GST'));
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
check('All retired campaign aliases redirect permanently', fileContains(HT, '^(?:pricing/digital-launchpad|launchpad|4year|offer)/?$ /pricing/ [L,R=301]'));
check('Consolidated Astro routes redirect in one hop', fileContains(HT, '^blog/(?:technology-trends/)?astro-7-business-websites/?$ /blog/technology-trends/what-is-astro-7-business-guide/ [R=301,L]'));
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
check('Expired campaign is absent from sitemap', fileNotContains(SM, 'pricing/digital-launchpad'));
check('Retired Astro article is absent from sitemap', fileNotContains(SM, '/astro-7-business-websites/'));
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
check('Website audit: concise title with the fee', fileContains(
  'website-audit/index.html',
  '<title>Website Audit from ₹999: Scope, Findings &amp; Next Steps | eLan Technology</title>',
));
check('Trends article: title matches what the article delivers', fileContains(
  'blog/technology-trends/website-development-trends-april-2026/index.html',
  '<title>Web Development Trends 2026: What Is Worth Adopting | eLan Technology</title>',
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
  '<title>What Is Astro 7? Benefits, Costs &amp; Limits for Business Websites | eLan Technology</title>',
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
check('Astro articles are consolidated', fileContains('blog/technology-trends/astro-7-business-websites/index.html', 'http-equiv="refresh"', '/blog/technology-trends/what-is-astro-7-business-guide/') && fileContains('blog/technology-trends/what-is-astro-7-business-guide/index.html', 'Before migration: editing, security and launch checks'));
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
  ['Website audit', 'website-audit/index.html', '/images/og/website-audit.png'],
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
check('Consent choices and withdrawal remain available', fileContains(HP, 'id="privacy-consent-banner"', 'id="privacy-accept"', 'id="privacy-reject"', 'id="privacy-choices-float"'));
check('Consent-first GA4 route uses the verified stream', fileContains(HP, "var MEASUREMENT_ID = 'G-EC0W1VE3NS'", '__elanAnalyticsAllowed', 'window.__elanLoadOptionalAnalytics') && fileNotContains(HP, "j.src = 'https://www.googletagmanager.com/gtm.js"));
check('Separate intent and missing-page events are present', fileContains(HP, 'whatsapp_click', 'phone_click') && fileContains('404.html', 'page_not_found', 'referring_page'));
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
  'Google Analytics 4',
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
check('Thin SEO archive remains noindex and absent from sitemap', fileContains('blog/category/seo/index.html', '<meta name="robots" content="noindex,nofollow">') && fileNotContains('sitemap-0.xml', '/blog/category/seo/'));
check('Useful web-design archive is indexed after content expansion', fileContains('blog/category/web-design/index.html', '<meta name="robots" content="index,follow">') && fileContains('sitemap-0.xml', '/blog/category/web-design/'));
check('Internal CTAs avoid crawlable form parameters',
  generatedHtmlFiles(DIST).every((path) => {
    const html = readFileSync(path, 'utf8');
    return !/href="\/(?:get-quote|website-audit)\/\?/.test(html);
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
check('Emergency accessibility timing is confirmed against scope and availability', fileContains(
  'services/ada-compliant-web-design/emergency-remediation/index.html',
  'We prioritise emergency assessment requests',
  'availability and technical scope',
) && fileNotContains(
  'services/ada-compliant-web-design/emergency-remediation/index.html',
  'emergency assessment within 24 hours',
  'emergency remediations within 24 hours',
  'delivered in 24–72 hours',
));
check('Free audit page has no 24-hour emergency accessibility promise', fileNotContains(
  'website-audit/index.html',
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
  'Featured work: Healthy Genie',
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
check('Upcoming work includes new previews and retains earlier projects', fileContains(
  'portfolio/index.html',
  'PropertyCab',
  'Healthy Genie', 'Jog Hospitality', 'Chandak Instruments Pvt. Ltd.',
  'MMSintered', 'AviForge', 'AnyCore BPO', 'MASS Architects', 'New Edge Ventures',
  'CITL',
));
check('ASBIM and Parekh use production domains and Divine is removed', fileContains('portfolio/index.html', 'https://asbimconsulting.com/', 'https://theparekhopticals.in/') && fileNotContains('portfolio/index.html', 'Divine Advisory') && fileNotContains('portfolio/index.html', 'https://asbim.elantech.cloud/') && fileNotContains('portfolio/index.html', 'https://parekh.elantech.in/'));
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
// propertycab.in does not resolve yet, so the working elantech.cloud demo is the
// only PropertyCab destination until the production domain is live.
check('Confirmed launch domains are displayed', fileContains(
  'portfolio/index.html',
  'kenglobal.in',
  'asbimconsulting.com',
  'propertycab.elantech.cloud',
) && fileNotContains('portfolio/index.html', 'https://propertycab.in/'));
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
check('Recently redesigned Astro websites are shown on the portfolio', fileContains(
  'portfolio/index.html',
  'id="redesigned-work"',
  'https://www.trimitarch.com/',
  'https://abhaytembhurne.in/',
  'https://www.dizviz.com/',
  'Land Surveying · Redesigned',
) && fileNotContains('portfolio/index.html', 'Dizviz Production', 'Personal branding website'));
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
  "Nagpur web design and development company with 24+ years' experience and 500+ clients. Custom websites, eCommerce and ADA/WCAG accessibility. Audits from ₹999.",
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

section('R  Zoho Commerce capability');
check('eCommerce page includes the dedicated Zoho section and scoped FAQ', fileContains(
  'services/ecommerce/index.html', 'id="zoho-commerce"',
  'Can eLan Technology implement and customise Zoho Commerce?',
  'Features and integrations depend on the selected Zoho plan',
  'no partner or certification status is implied',
));
check('Homepage includes the Zoho practice card', fileContains(
  'index.html', 'Your storefront, connected to the way you work',
  '/services/ecommerce/#zoho-commerce',
));
check('Service catalogue and integration page include Zoho',
  fileContains('services/index.html', 'Zoho Commerce') &&
  fileContains('services/integrations/index.html', 'Zoho Commerce', 'Store implementation and supported API workflows'));
check('AI discovery file includes the scoped Zoho capability', fileContains(
  'llms.txt', 'Zoho Commerce implementation and customisation',
  'No Zoho client case study is claimed here.',
));

section('S  Evidence-led international and ecommerce pages');
check('US page has focused positioning, genuine project context and scoped delivery', fileContains(
  'web-design-company-usa/index.html', 'Scope my US project', 'WCAG audit',
  'barbecue rotisserie brand', 'Wind-Tech Auto Glass', 'Bob G.', 'signed proposal',
));
check('Canada page has relevant proof and qualified accessibility scope', fileContains(
  'web-design-company-canada/index.html', 'Scope my Canadian project', 'Pan Pro Windows',
  'Eric H.', 'Regal Health Services', 'AODA applicability', 'French translation',
));
check('Comparison has both project examples, operating costs and migration checkpoints', fileContains(
  'blog/ecommerce/shopify-vs-medusa-js-2026/index.html', 'Rangresha', 'Puritas',
  'like-for-like cost estimate', 'Cutover and rollback', 'comparison-table',
  '/services/ecommerce/shopify-development/', '/services/ecommerce/medusa-js-development/',
));
check('Generated image recovery rules do not redirect probes to sales pages',
  fileContains('.htaccess', '# BEGIN LEGACY CLIENT ASSETS', '/_astro/') &&
  fileNotContains('.htaccess', 'RewriteRule ^probe-test') &&
  fileNotContains('.htaccess', 'RewriteRule ^__probe'));

// ── Summary ───────────────────────────────────────────────────────────────────

section('T  Focused UAE, audit preview and city buying information');
check('UAE page qualifies language, location and integration scope', fileContains('web-design-company-dubai-uae/index.html', 'Scope my UAE project', 'qualified Arabic specialist', 'merchant onboarding', 'not UAE client claims', 'signed scope'));
check('Website audit preserves positioning and labels sample findings', fileContains('website-audit/index.html', 'A website audit with a clear scope', 'fictional examples', 'Not included:', 'Three short steps:', 'Book and pay'));
check('Website audit is booked only by payment (no unpaid request form)', fileNotContains('website-audit/index.html', 'WebsiteAuditForm') && fileNotContains('website-audit/index.html', 'Request audit')
  && fileContains('website-audit/index.html', 'PaidCheckout', '&quot;product&quot;:[0,&quot;website-audit&quot;]'));
// Razorpay Orders API: fixed server-side prices must match the prices shown on the site.
{
  const phpPay = readFileSync(join(resolve(DIST, '..'), 'public/api/payments-common.php'), 'utf8');
  const sitePrices = readFileSync(join(resolve(DIST, '..'), 'src/data/auditPricing.ts'), 'utf8');
  const site = sitePrices.match(/website: \{ INR: (\d+), USD: (\d+)/);
  const php = phpPay.match(/'website-audit' => \[[^\]]*'amounts' => \['INR' => (\d+), 'USD' => (\d+)\]/);
  check('Razorpay website-audit price matches the site price', Boolean(site && php && +php[1] === +site[1] * 100 && +php[2] === +site[2] * 100));
  check('Security policy allows Razorpay Checkout', fileContains('.htaccess', 'https://checkout.razorpay.com', 'frame-src \'self\' https://api.razorpay.com'));
  check('Lead endpoint requires a paid order for audit bookings', readFileSync(join(resolve(DIST, '..'), 'public/api/submit-lead.php'), 'utf8').includes("respond(402, ['ok' => false, 'error' => 'Payment is required before this request'])"));
}

// From 15 November 2026 nothing on the site is offered free: audits are paid (src/data/auditPricing.ts).
{
  const freeOffer = /\b(free (website |seo |local seo |brand |technical |security |rush |initial |accessibility |strategy )?(audit|review|assessment|consultation|quote|demo|call|session)|get free audit|claim free|completely free|100% free|no credit card)\b/i;
  const offenders = generatedHtmlFiles(DIST)
    .filter((path) => freeOffer.test(readFileSync(path, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '').replace(/href="[^"]*"/g, '')));
  check('No page offers a free audit, review, consultation or quote', offenders.length === 0, offenders.slice(0, 5).map((f) => f.replace(DIST + '/', '')).join(', '));
}
check('Audit page shows the ₹999 fee and paid schema offer', fileContains('website-audit/index.html', '₹999', '"price":"999"', 'Accessibility audits start'));
check('Country pages show audit prices in their own currency', fileContains('web-design-company-dubai-uae/index.html', 'AED 69', 'AED 369')
  && fileContains('web-design-company-canada/index.html', 'C$25', 'C$139')
  && fileContains('web-design-company-usa/index.html', 'US$19', 'US$99')
  && fileContains('web-design-company-australia/index.html', 'A$29')
  && fileContains('web-design-company-japan/index.html', '¥2,900')
  && fileContains('web-design-company-new-zealand/index.html', 'NZ$29'));
for (const city of ['nagpur', 'bhopal', 'raipur']) {
  check(`${city} has actionable buying questions and linked evidence`, fileContains(`web-design-company-${city}/index.html`, 'See the work before choosing the scope', 'page/revision limits', 'No ranking or enquiry-volume guarantee'));
}
section('U  20 October Canada accessibility article');
const canadaAuditArticle = 'blog/accessibility/website-accessibility-audit-deliverables-canada/index.html';
check('Canada audit article is emitted with practical scope and limitations', fileContains(canadaAuditArticle, 'What Should a Website Accessibility Audit Deliver?', 'Ontario legislation', 'Retesting with a record', 'Illustrative finding', 'not legal advice'));
check('Canada audit article links authoritative guidance and service journeys', fileContains(canadaAuditArticle, 'https://www.ontario.ca/page/how-make-websites-accessible', 'https://www.w3.org/WAI/test-evaluate/', '/web-design-company-canada/', '/services/ada-compliant-web-design/', '/get-quote/'));
check('Canada page and earlier article link the new guide', fileContains('web-design-company-canada/index.html', '/blog/accessibility/website-accessibility-audit-deliverables-canada/') && fileContains('blog/accessibility/accessibility-audit-vs-remediation/index.html', '/blog/accessibility/website-accessibility-audit-deliverables-canada/'));
check('New guide is discoverable from homepage, blog and sitemap', fileContains('index.html', 'website-accessibility-audit-deliverables-canada') && fileContains('blog/index.html', 'website-accessibility-audit-deliverables-canada') && fileContains('sitemap-0.xml', '/blog/accessibility/website-accessibility-audit-deliverables-canada/'));
section('V  Late-October UAE article and portfolio release');
const uaeGuidePath = 'blog/ecommerce/uae-ecommerce-implementation-checklist/';
check('UAE guide has scoped bilingual, payment and operational guidance', fileContains(`${uaeGuidePath}index.html`, 'UAE Ecommerce Checklist', 'Zoho Commerce', 'stock', 'Arabic', 'qualified', 'https://u.ae/en/information-and-services/business/ecommerce/', '/web-design-company-dubai-uae/'));
check('UAE guide is linked from homepage, blog, market page and sitemap', ['index.html', 'blog/index.html', 'web-design-company-dubai-uae/index.html', 'sitemap-0.xml'].every(path => fileContains(path, uaeGuidePath)));
const octoberPortfolio = readFileSync(join(DIST, 'portfolio/index.html'), 'utf8');
const octoberUpcoming = octoberPortfolio.match(/<section id="launching-soon"[\s\S]*?<\/section>/)?.[0] ?? '';
check('ASBIM and Parekh are no longer upcoming', octoberUpcoming.length > 0 && !/ASBIM Consulting|Parekh Opticals|Divine Advisory/.test(octoberUpcoming));
check('All five supplied new preview URLs are present', ['https://jog-hospitality.netlify.app/', 'https://starlit-semolina-bd9639.netlify.app/', 'https://mmsintered.netlify.app/', 'https://aviforge.netlify.app/', 'https://wandering-frost-5791.elantech-pms.workers.dev/'].every(url => octoberUpcoming.includes(url)));
check('Projects awaiting preview have no empty destination links', octoberUpcoming.includes('MASS Architects') && octoberUpcoming.includes('New Edge Ventures') && octoberUpcoming.includes('Preview link coming soon') && !/href=""/.test(octoberUpcoming));
check('Healthy Genie is the latest production launch, not upcoming', fileContains('portfolio/index.html', 'Medusa.js Meal Commerce', 'https://healthygenie.in/', 'Latest launch') && !octoberUpcoming.includes('Healthy Genie') && fileNotContains('portfolio/index.html', 'healthygenie.elantech.cloud'));
check('Healthy Genie service proof reflects production status', fileContains('services/ecommerce/medusa-js-development/index.html', 'Medusa.js meal commerce', 'Launched', 'https://healthygenie.in/', 'Visit launched website') && fileNotContains('services/ecommerce/medusa-js-development/index.html', 'healthygenie.elantech.cloud'));
section('W  Location-page index policy (src/data/indexPolicy.ts)');
const indexedLocations = ['nagpur', 'pune', 'raipur', 'usa', 'canada', 'australia', 'japan', 'new-zealand', 'dubai-uae'];
const noindexLocations = [
  'ahmedabad', 'bangalore', 'bhopal', 'chandigarh', 'chennai', 'delhi', 'hyderabad', 'indore', 'jaipur', 'kochi', 'kolkata', 'lucknow', 'mumbai',
  'brazil', 'european-union', 'ghana', 'saudi-arabia',
];
check('Core city and country pages are indexable and in the sitemap', indexedLocations.every(slug =>
  fileContains(`web-design-company-${slug}/index.html`, '<meta name="robots" content="index,follow">')
  && fileContains('sitemap-0.xml', `/web-design-company-${slug}/`)));
check('Other city and country pages are noindex and absent from the sitemap', noindexLocations.every(slug =>
  fileContains(`web-design-company-${slug}/index.html`, '<meta name="robots" content="noindex,nofollow">')
  && fileNotContains('sitemap-0.xml', `/web-design-company-${slug}/`)));
check('NDA experience notes appear on US, Canada and Japan only', ['usa', 'canada', 'japan'].every(slug =>
  fileContains(`web-design-company-${slug}/index.html`, 'Confidential client work', '/nda-confidentiality-policy/'))
  && ['australia', 'new-zealand', 'nagpur'].every(slug => fileNotContains(`web-design-company-${slug}/index.html`, 'Confidential client work')));
check('NDA notes name no clients, sectors or stacks', ['usa', 'canada', 'japan'].every(slug =>
  fileNotContains(`web-design-company-${slug}/index.html`, 'WordPress project')
  && fileNotContains(`web-design-company-${slug}/index.html`, 'Contentful')));
check('Site-wide link blocks skip de-indexed location pages', ['index.html', 'about/index.html', 'services/seo/index.html', 'web-design-company-nagpur/index.html', 'search/index.html'].every(page =>
  ['bhopal', 'mumbai', 'delhi', 'kochi', 'brazil', 'saudi-arabia'].every(slug => fileNotContains(page, `/web-design-company-${slug}/`))));

// Every page URL written into HTML attributes or JSON-LD must end in "/".
// A slash-less URL 301s, and Google then files it under "Page with redirect".
{
  const htmlFiles = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.html')) htmlFiles.push(full);
    }
  };
  walk(DIST);
  const urlPattern = /https:(?:\\?\/){2}elan-tech\.net((?:\\?\/)[^"'\s<>)]*)/g;
  const offenders = new Set();
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    for (const match of html.matchAll(urlPattern)) {
      const path = match[1].replace(/\\\//g, '/').replace(/&amp;/g, '&').split(/[?#]/)[0].replace(/[\\.,;]+$/, '');
      if (path === '' || path.endsWith('/')) continue;
      if (/\.[a-z0-9]{2,11}$/i.test(path)) continue; // files: images, feeds, manifests
      offenders.add(path);
    }
  }
  if (offenders.size > 0) console.log(`    slash-less page URLs: ${[...offenders].slice(0, 10).join(', ')}`);
  check('No slash-less page URLs anywhere in built HTML (attributes and JSON-LD)', offenders.size === 0);
}

// Every question in FAQPage markup must also be readable on the page.
// Google requires marked-up content to be visible to visitors.
{
  const pages = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === 'index.html') pages.push(full);
    }
  };
  walk(DIST);
  const decode = (text) => text
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ');
  const hidden = [];
  for (const file of pages) {
    const html = readFileSync(file, 'utf8');
    const questions = [];
    for (const match of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      let data;
      try { data = JSON.parse(match[1]); } catch { continue; }
      const nodes = Array.isArray(data) ? data : (data['@graph'] ?? [data]);
      for (const node of nodes) {
        if (node?.['@type'] !== 'FAQPage') continue;
        for (const item of node.mainEntity ?? []) if (item?.name) questions.push(item.name);
      }
    }
    if (questions.length === 0) continue;
    const visible = decode(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' '));
    const missing = questions.filter((q) => !visible.includes(decode(q)));
    if (missing.length > 0) hidden.push(`${file.replace(DIST, '')} (${missing.length} of ${questions.length})`);
  }
  if (hidden.length > 0) console.log(`    FAQ markup not visible on: ${hidden.slice(0, 12).join(', ')}`);
  check('Every FAQ question in structured data is visible on its page', hidden.length === 0);
}

// Technology stacks: shown only where a project or product proves them.
check('Portfolio features Healthy Genie as the Medusa.js project, not Puritas', fileContains('portfolio/index.html', 'Featured work: Healthy Genie') && fileNotContains('portfolio/index.html', 'Puritas'));
check('Technologies page lists proven stacks with proof links', fileContains(
  'technologies/index.html',
  'Technologies we build with', 'Next.js', 'Medusa.js', 'Shopify', 'WordPress',
  'https://healthygenie.in/', '/products/medical-conference-portal/', '/services/ecommerce/medusa-js-development/',
));
const productSlugs = ['elan-central-cms', 'real-estate-portal', 'medical-conference-portal', 'ima-society-portal', 'resort-management-system', 'project-management-system', 'insurance-agency-management-portal'];
check('All seven product pages exist and show their stack', productSlugs.every(slug =>
  fileContains(`products/${slug}/index.html`, 'id="product-stack-heading"', 'href="/technologies/"')));
check('Product stacks come from one list: no Next.js on the React single-page products', ['medical-conference-portal', 'resort-management-system', 'project-management-system'].every(slug =>
  fileNotContains(`products/${slug}/index.html`, '>Next.js<')));
check('Insurance portal states its stack, features and planned module', fileContains('products/insurance-agency-management-portal/index.html',
  'NestJS', 'MySQL', 'Commission management', 'Sub-agent management', 'Customer family management', 'Planned, not yet available', 'Stock management'));
check('Project Management System page describes the workspace without exposing it', fileContains('products/project-management-system/index.html',
  'Portfolio dashboard', 'Domain renewals', 'Book a walkthrough') && fileNotContains('products/project-management-system/index.html', 'pms.elantech.cloud'));
check('Products index and llms.txt list seven products', productSlugs.every(slug => fileContains('products/index.html', `/products/${slug}/`) && fileContains('llms.txt', `/products/${slug}/`)));
check('Portfolio archive cards name real technologies only', fileContains('portfolio/index.html', 'Built with WordPress') && fileNotContains('portfolio/index.html', 'Built with CSS3') && fileNotContains('portfolio/index.html', 'Custom UI,'));

check('Service, location and homepage proof features Healthy Genie, not Puritas', ['services/ecommerce/medusa-js-development/index.html', 'services/ecommerce/index.html', 'index.html', 'web-design-company-dubai-uae/index.html', 'web-design-company-raipur/index.html', 'llms.txt'].every(page =>
  fileNotContains(page, 'Puritas') && fileNotContains(page, 'puritas.in'))
  && fileContains('services/ecommerce/medusa-js-development/index.html', 'Visit the Healthy Genie website', 'Meal plans and subscriptions')
  && fileContains('services/ecommerce/index.html', 'Healthy Genie - meal plans and subscriptions'));

check('UAE page is indexable, linked site-wide and still makes no UAE client claim', fileContains('web-design-company-dubai-uae/index.html',
  '<meta name="robots" content="index,follow">', 'not UAE client claims', 'Products that fit UAE sectors', 'https://wa.me/918788834630', 'href="/technologies/"', 'href="/products/real-estate-portal/"')
  && ['index.html', 'about/index.html'].every(page => fileContains(page, 'href="/web-design-company-dubai-uae/"')));

// The Dubai and BNI presentations are independent files, not website pages.
// Deploys mirror dist/ to the server with --delete, so server-only files must live in public/.
check('Google Search Console verification file is deployed', fileContains('googlec89e8a0254460df4.html', 'google-site-verification: googlec89e8a0254460df4.html'));
check('No Dubai trip page or trip banner on the website', !existsSync(join(DIST, 'dubai/index.html')) && fileNotContains('index.html', 'id="trip-banner"'));
// The BNI Conclave (Raipur, 21 November 2026) material was removed from the website on 22 November;
// links handed out at the event redirect to the Raipur page.
check('No BNI Conclave pages, files or links on the website', !existsSync(join(DIST, 'bni-raipur'))
  && generatedHtmlFiles(DIST).every((path) => !/bni-raipur|BNI Conclave/i.test(readFileSync(path, 'utf8'))));
check('AVIF images are served as images', fileContains('.htaccess', 'AddType image/avif .avif'));
check('Old BNI share links redirect to the Raipur page', fileContains('.htaccess', 'RewriteRule ^bni-raipur(?:/.*)?$ /web-design-company-raipur/ [L,R=301]'));

const total = passed + failed;
console.log(`\n${'─'.repeat(60)}`);
if (failed === 0) {
  console.log(`\n${PASS} ${BOLD}All ${total} checks passed.${RESET} Build is ready to deploy.\n`);
  process.exit(0);
} else {
  console.log(`\n${FAIL} ${BOLD}${failed} of ${total} checks failed.${RESET} Fix the issues above before deploying.\n`);
  process.exit(1);
}
