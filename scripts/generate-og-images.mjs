#!/usr/bin/env node

import { readFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import sharp from 'sharp';

const projectRoot = resolve(import.meta.dirname, '..');
const outputDir = join(projectRoot, 'public/images/og');
const logoSvg = await readFile(join(projectRoot, 'public/images/elan-tech-logoh.svg'));
const logoData = `data:image/svg+xml;base64,${logoSvg.toString('base64')}`;

const cards = [
  {
    file: 'home.png',
    eyebrow: 'WEB DESIGN COMPANY SINCE 2002',
    title: ['Web Design, eCommerce', '& Accessibility'],
    subtitle: 'Useful websites built around real business goals.',
    tags: ['Custom websites', 'Shopify & Medusa.js', 'ADA & WCAG'],
    accent: '#FF6B20',
    secondary: '#6D5DFB',
    mark: 'WEB',
  },
  {
    file: 'services.png',
    eyebrow: 'ELAN TECHNOLOGY SERVICES',
    title: ['Digital services that', 'move business forward'],
    subtitle: 'Clear advice, thoughtful design and dependable delivery.',
    tags: ['Design', 'Development', 'SEO', 'Marketing'],
    accent: '#5B4BFF',
    secondary: '#11B981',
    mark: '{ }',
  },
  {
    file: 'accessibility.png',
    eyebrow: 'ADA & WCAG WEBSITE COMPLIANCE',
    title: ['Accessible websites.', 'Better for everyone.'],
    subtitle: 'Audits, remediation and accessible design by real specialists.',
    tags: ['WCAG audits', 'ADA remediation', '48-hour assessment'],
    accent: '#1667E8',
    secondary: '#9B5CF6',
    mark: 'AA',
  },
  {
    file: 'pricing.png',
    eyebrow: 'WEBSITE PLANS & CUSTOM QUOTES',
    title: ['Clear pricing.', 'Long-term value.'],
    subtitle: 'Choose a practical plan or request a quote for a custom build.',
    tags: ['4-year plans', 'Transparent scope', 'No hidden fees'],
    accent: '#F26722',
    secondary: '#F2B84B',
    mark: '₹',
  },
  {
    file: 'contact.png',
    eyebrow: 'LET’S BUILD SOMETHING USEFUL',
    title: ['Tell us what your', 'business needs next'],
    subtitle: 'Talk directly with the eLan Technology team in Nagpur.',
    tags: ['Request a quote', 'WhatsApp', 'Free consultation'],
    accent: '#E74788',
    secondary: '#FF8C42',
    mark: 'HI',
  },
  {
    file: 'locations-india.png',
    eyebrow: 'SERVING BUSINESSES ACROSS INDIA',
    title: ['Web design expertise', 'from Nagpur'],
    subtitle: 'Local understanding with a proven remote delivery process.',
    tags: ['24+ years', '500+ clients', 'India-wide delivery'],
    accent: '#E85D24',
    secondary: '#168C68',
    mark: 'IN',
  },
  {
    file: 'international.png',
    eyebrow: 'INDIA-BASED, GLOBALLY EXPERIENCED',
    title: ['Reliable web delivery', 'across borders'],
    subtitle: 'A clear, collaborative process for international businesses.',
    tags: ['10+ countries', 'Timezone overlap', 'Direct communication'],
    accent: '#087EA4',
    secondary: '#5C6AC4',
    mark: '10+',
  },
  {
    file: 'products.png',
    eyebrow: 'BUSINESS SOFTWARE BY ELAN TECHNOLOGY',
    title: ['Own your business', 'platform'],
    subtitle: 'Purpose-built portals without recurring SaaS dependency.',
    tags: ['Real estate', 'Medical conferences', 'Resort management'],
    accent: '#087F5B',
    secondary: '#3B82F6',
    mark: 'OWN',
  },
  {
    file: 'blog.png',
    eyebrow: 'PRACTICAL DIGITAL INSIGHTS',
    title: ['Web, eCommerce', '& AI ideas that help'],
    subtitle: 'Straightforward guidance for business owners and teams.',
    tags: ['Accessibility', 'eCommerce', 'AI & web technology'],
    accent: '#7C3AED',
    secondary: '#06A6A6',
    mark: 'IDEA',
  },
  {
    file: 'audit.png',
    eyebrow: 'FREE HUMAN-REVIEWED WEBSITE AUDIT',
    title: ['Find what is holding', 'your website back'],
    subtitle: 'A practical review of SEO, speed, security and accessibility.',
    tags: ['Clear priorities', 'No obligation', 'Actionable report'],
    accent: '#008C72',
    secondary: '#F26722',
    mark: '✓',
  },
];

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function tagRow(tags) {
  let x = 70;
  return tags.map((tag) => {
    const width = Math.max(112, tag.length * 15 + 38);
    const item = `
      <rect x="${x}" y="535" width="${width}" height="42" rx="13" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.18"/>
      <text x="${x + 19}" y="562" class="tag">${escapeXml(tag)}</text>`;
    x += width + 13;
    return item;
  }).join('');
}

function renderCard(card) {
  return `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
        <stop stop-color="#071327"/>
        <stop offset="0.58" stop-color="#0B1E38"/>
        <stop offset="1" stop-color="#102C4D"/>
      </linearGradient>
      <linearGradient id="orb" x1="790" y1="120" x2="1120" y2="520" gradientUnits="userSpaceOnUse">
        <stop stop-color="${card.accent}"/>
        <stop offset="1" stop-color="${card.secondary}"/>
      </linearGradient>
      <radialGradient id="glow">
        <stop stop-color="${card.secondary}" stop-opacity="0.62"/>
        <stop offset="1" stop-color="${card.secondary}" stop-opacity="0"/>
      </radialGradient>
      <filter id="blur"><feGaussianBlur stdDeviation="72"/></filter>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="26" stdDeviation="28" flood-color="#000000" flood-opacity="0.34"/>
      </filter>
      <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
        <path d="M44 0H0V44" fill="none" stroke="#FFFFFF" stroke-opacity="0.045"/>
      </pattern>
      <style>
        .eyebrow { font: 700 17px Arial, sans-serif; letter-spacing: 3.2px; fill: ${card.accent}; }
        .title { font: 800 58px Arial, sans-serif; letter-spacing: -1.8px; fill: #FFFFFF; }
        .subtitle { font: 400 24px Arial, sans-serif; fill: #C4D0E1; }
        .tag { font: 700 15px Arial, sans-serif; fill: #F4F7FB; }
        .mark { font: 800 70px Arial, sans-serif; letter-spacing: -2px; fill: #FFFFFF; }
        .url { font: 700 16px Arial, sans-serif; letter-spacing: 1px; fill: #D8E2EF; }
      </style>
    </defs>

    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <circle cx="1060" cy="280" r="330" fill="url(#glow)" filter="url(#blur)"/>
    <circle cx="180" cy="700" r="260" fill="${card.accent}" fill-opacity="0.20" filter="url(#blur)"/>
    <path d="M690 612C812 526 887 509 1210 418" fill="none" stroke="${card.accent}" stroke-width="16" stroke-opacity="0.78"/>
    <path d="M706 630C851 554 971 542 1215 506" fill="none" stroke="${card.secondary}" stroke-width="7" stroke-opacity="0.85"/>

    <rect x="56" y="42" width="286" height="64" rx="16" fill="#FFFFFF" fill-opacity="0.96"/>
    <image href="${logoData}" x="75" y="56" width="246" height="34" preserveAspectRatio="xMinYMid meet"/>
    <rect x="995" y="50" width="143" height="42" rx="14" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.20"/>
    <text x="1019" y="77" class="url">SINCE 2002</text>

    <text x="70" y="175" class="eyebrow">${escapeXml(card.eyebrow)}</text>
    <text x="70" y="252" class="title">${escapeXml(card.title[0])}</text>
    <text x="70" y="319" class="title">${escapeXml(card.title[1])}</text>
    <text x="70" y="376" class="subtitle">${escapeXml(card.subtitle)}</text>
    <text x="70" y="470" class="url">ELAN-TECH.NET</text>

    <g opacity="0.70">
      <circle cx="956" cy="320" r="215" fill="none" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="2"/>
      <circle cx="956" cy="320" r="168" fill="none" stroke="#FFFFFF" stroke-opacity="0.12" stroke-width="2" stroke-dasharray="9 12"/>
    </g>
    <g filter="url(#shadow)" transform="rotate(-6 956 320)">
      <rect x="815" y="165" width="282" height="310" rx="48" fill="#FFFFFF" fill-opacity="0.10" stroke="#FFFFFF" stroke-opacity="0.28" stroke-width="2"/>
      <rect x="842" y="192" width="228" height="256" rx="38" fill="url(#orb)"/>
    </g>
    <text x="956" y="344" text-anchor="middle" class="mark">${escapeXml(card.mark)}</text>
    <rect x="1070" y="148" width="92" height="92" rx="28" fill="#FFFFFF" fill-opacity="0.11" stroke="#FFFFFF" stroke-opacity="0.20"/>
    <circle cx="1116" cy="194" r="17" fill="${card.secondary}"/>
    <rect x="758" y="392" width="92" height="92" rx="28" fill="#FFFFFF" fill-opacity="0.11" stroke="#FFFFFF" stroke-opacity="0.20"/>
    <circle cx="804" cy="438" r="17" fill="${card.accent}"/>

    ${tagRow(card.tags)}
  </svg>`;
}

await mkdir(outputDir, { recursive: true });

for (const card of cards) {
  await sharp(Buffer.from(renderCard(card)))
    .png({ compressionLevel: 9, palette: true, quality: 92 })
    .toFile(join(outputDir, card.file));
  console.log(`Generated public/images/og/${card.file}`);
}
