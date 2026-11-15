// Builds the self-contained presentation: node outputs/dubai-trip/presentation/build.mjs [edition]
// Editions: dubai (default), bni-raipur. Output goes next to the presentation folder.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const edition = process.argv[2] || 'dubai';
// --site writes a copy for the website (elan-tech.net/<edition>/presentation/) that loads the
// site's own font files, because the site's security policy does not allow embedded fonts.
const SITE = process.argv.includes('--site');

// Both QR codes save a contact card. They need no website and no internet: the phone
// reads the contact straight from the code. The note records where you met.
const EDITIONS = {
  dubai: { out: 'elan-dubai-presentation.html', met: 'Met in Dubai, December 2026', template: 'deck.template.html' },
  // Raipur has its own look (bento board); it borrows the product screens from the Dubai template.
  'bni-raipur': { out: 'elan-bni-raipur-presentation.html', met: 'Met at the BNI Conclave, Raipur, 21 November 2026', template: 'raipur.template.html' },
};
const vcard = (met) => [
  'BEGIN:VCARD', 'VERSION:3.0', 'N:Barde;Nishant;;;', 'FN:Nishant Barde', 'ORG:eLan Technology', 'TITLE:Digital Growth Consultant',
  'TEL;TYPE=CELL,VOICE:+918788834630', 'EMAIL;TYPE=INTERNET,WORK:nishant@elan-tech.net', 'EMAIL;TYPE=INTERNET,WORK:info@elan-tech.net',
  'URL:https://elan-tech.net/', 'NOTE:' + met + '. Websites, online stores and business software, Nagpur, India.', 'END:VCARD',
].join('\r\n');
const cfg = EDITIONS[edition];
if (!cfg) throw new Error(`Unknown edition "${edition}". Use: ${Object.keys(EDITIONS).join(', ')}`);

const b64 = (file) => fs.readFileSync(path.join(root, file)).toString('base64');
// Keep only this edition's blocks. Markers: <!--if dubai-->...<!--endif--> and /*if dubai*/...//endif*/
const keep = (name) => name.split(',').includes(edition);
const editionOnly = (src) => src
  .replace(/<!--if ([a-z,-]+)-->([\s\S]*?)<!--endif-->/g, (_, names, body) => (keep(names) ? body : ''))
  .replace(/\/\*if ([a-z,-]+)\*\/([\s\S]*?)\/\*endif\*\//g, (_, names, body) => (keep(names) ? body : ''));
const read = (f) => editionOnly(fs.readFileSync(path.join(here, f), 'utf8'));
let html = read(cfg.template);

// The product-screen styles and the PMS and CMS screens live in the Dubai template.
const dubaiSrc = read('deck.template.html');
const between = (src, a, b) => { const i = src.indexOf(a), j = src.indexOf(b, i); if (i < 0 || j < 0) throw new Error('Marker not found: ' + a); return src.slice(i, j); };
const mockCss = between(dubaiSrc, '.win{', '/* ---------- HUD');
const mockJs = between(dubaiSrc, 'const NAVS', '{{VISUALS_JS}}');

const qrSvg = (await QRCode.toString(vcard(cfg.met), { type: 'svg', margin: 0, errorCorrectionLevel: 'M' })).replace(/<\?xml[^>]*>/, '');

html = html
  .replace('data:font/woff2;base64,{{SORA}}', SITE ? '/fonts/sora-latin.woff2' : 'data:font/woff2;base64,' + b64('public/fonts/sora-latin.woff2'))
  .replace('data:font/woff2;base64,{{DMSANS}}', SITE ? '/fonts/dm-sans-latin.woff2' : 'data:font/woff2;base64,' + b64('public/fonts/dm-sans-latin.woff2'))
  .replace('{{LOGO}}', 'data:image/png;base64,' + b64('public/images/elan-tech-logo.png'))
  .replace('{{QR}}', qrSvg)
  .replace('{{MOCK_CSS}}', () => mockCss)
  .replace('{{MOCK_JS}}', () => mockJs)
  .replace('{{VISUALS_CSS}}', () => fs.readFileSync(path.join(here, 'visuals.css'), 'utf8'))
  .replace('{{VISUALS_JS}}', () => fs.readFileSync(path.join(here, 'visuals.js'), 'utf8'))
  .replace('{{EDITION}}', edition);

let outFile = path.resolve(here, '..', cfg.out);
if (SITE) {
  const dir = path.join(root, 'public', edition);
  fs.mkdirSync(path.join(dir, 'presentation'), { recursive: true });
  outFile = path.join(dir, 'presentation', 'index.html');
  // The same contact card as the QR code, as a file people can tap to save.
  fs.writeFileSync(path.join(dir, 'nishant-barde.vcf'), vcard(cfg.met) + '\r\n');
}
fs.writeFileSync(outFile, html);
console.log(`${edition}: wrote ${path.relative(root, outFile)} (${(html.length / 1024).toFixed(0)} KB)`);
console.log(`QR saves a contact card: ${cfg.met}`);
