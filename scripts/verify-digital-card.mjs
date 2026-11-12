import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync('dist/about/nishant-barde/index.html', 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(match => match[1]);
const selector = scripts.find(script => script.includes('dataset.cardDesign = selected'));
assert.ok(selector, 'Pre-paint design selector must be present');
assert.ok(html.indexOf(selector) < html.indexOf('</head>'), 'Selection must run in the head');
assert.ok(!/localStorage|sessionStorage|document\.cookie|fetch\(/.test(selector), 'Selection must not store or transmit data');
function choose({ sample = 0, hash = '', crypto = true, random = 0 } = {}) {
  const document = { documentElement: { dataset: {} } };
  runInNewContext(selector, { document, location: { hash }, URLSearchParams, Uint32Array,
    window: { crypto: crypto ? { getRandomValues: array => { array[0] = sample; return array; } } : undefined },
    Math: { floor: Math.floor, random: () => random },
  });
  return document.documentElement.dataset.cardDesign;
}
assert.equal(choose({ sample: 0 }), 'classic');
assert.equal(choose({ sample: 1073741824 }), 'studio');
assert.equal(choose({ sample: 2147483648 }), 'midnight');
assert.equal(choose({ sample: 4294967295 }), 'aurora');
assert.equal(choose({ hash: '#design=classic', sample: 4294967295 }), 'classic');
assert.equal(choose({ hash: '#design=studio', sample: 0 }), 'studio');
assert.equal(choose({ hash: '#design=midnight', sample: 0 }), 'midnight');
assert.equal(choose({ hash: '#design=aurora', sample: 0 }), 'aurora');
assert.equal(choose({ hash: '#design=unknown', sample: 0 }), 'classic');
assert.equal(choose({ crypto: false, random: .99 }), 'aurora');
assert.equal(choose({ sample: 0 }), 'classic', 'A later load must make a fresh selection');
assert.equal(choose({ sample: 4294967295 }), 'aurora');
const contact = readFileSync('dist/contact/nishant-barde.vcf', 'utf8');
assert.ok(contact.includes('DPDP implementation'));
for (const value of ['+918788834630', 'nishant@elan-tech.net', 'VERSION:3.0']) assert.ok(contact.includes(value));
for (const path of ['dpdp-compliance-implementation', 'custom-crm-erp-solutions', 'headless-cms-development']) {
  assert.ok(html.includes(`/services/${path}/`));
}
assert.ok(html.includes('data-qr-dialog') && html.includes('data-share-card'));
assert.equal([...html.matchAll(/data-card-portrait-new/g)].length, 2, 'Both portrait placements must support the new photo');
assert.ok(html.includes('/images/nishant-pp01.avif'));
assert.ok(readFileSync('dist/images/nishant-pp01.avif').length > 0, 'New portrait must be packaged');
console.log('Digital-card checks passed: all four random outcomes, preview allowlist, fresh selection, no storage/requests, head placement and current services/contact.');
