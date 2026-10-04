import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const layout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
const analytics = layout.match(/<!-- Optional analytics:[\s\S]*?<script is:inline>([\s\S]*?)<\/script>/)[1];
const confirmation = readFileSync('src/pages/thank-you.astro', 'utf8').match(/<script is:inline>([\s\S]*?)<\/script>/)[1];
function runtime({ consent = null, hostname = 'elan-tech.net', pending = null, signal = false } = {}) {
  const scripts = [], events = {}, store = new Map(pending ? [['elan:lead-conversion-pending', JSON.stringify(pending)]] : []);
  const sandbox = {
    URL, URLSearchParams, Date, Object, Element: class {}, Event: class { constructor(type) { this.type = type; } },
    location: { hostname, href: `https://${hostname}/thank-you/?form=contact&email=private@example.com&utm_source=linkedin`, pathname: '/thank-you/', search: '?form=contact' },
    navigator: { globalPrivacyControl: signal },
    localStorage: { getItem: () => consent && JSON.stringify(consent) },
    sessionStorage: { getItem: key => store.get(key), removeItem: key => store.delete(key) },
    document: { cookie: '', referrer: 'https://example.com/article/?email=private@example.com',
      createElement: () => ({}), head: { appendChild: item => scripts.push(item.src) },
      getElementsByTagName: () => [{ parentNode: { insertBefore: item => scripts.push(item.src) } }],
      addEventListener: (type, callback) => { events[`document:${type}`] = callback; } },
    addEventListener: (type, callback) => { (events[type] ||= []).push(callback); },
    dispatchEvent: event => { for (const callback of events[event.type] || []) callback(); },
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(analytics, sandbox);
  return { sandbox, scripts, store, runConfirmation: () => vm.runInContext(confirmation, sandbox),
    calls: () => sandbox.dataLayer.map(args => Array.from(args)) };
}
const optedIn = { version: 2, analytics: true };
const denied = runtime();
assert.equal(denied.scripts.length, 0, 'No analytics requests before consent');
assert.equal(denied.sandbox.__elanTrackEvent('phone_click', {}), false);
const accepted = runtime({ consent: optedIn });
assert.equal(accepted.scripts.filter(src => src.includes('/gtag/js?id=G-EC0W1VE3NS')).length, 1);
assert.ok(!accepted.scripts.some(src => src.includes('/gtm.js')), 'No duplicate GTM route');
const config = accepted.calls().find(call => call[0] === 'config')[2];
assert.ok(!config.page_location.includes('email='));
assert.ok(!config.page_referrer.includes('?'));
assert.ok(!('debug_mode' in config), 'Normal visitors must not match developer filters');
accepted.runConfirmation();
assert.equal(accepted.calls().filter(call => call[1] === 'generate_lead').length, 0, 'Direct thank-you visits do not convert');
const lead = runtime({ consent: optedIn, pending: { formType: 'contact', createdAt: Date.now() } });
lead.runConfirmation(); lead.runConfirmation();
assert.equal(lead.calls().filter(call => call[1] === 'generate_lead').length, 1, 'Confirmed lead is counted once');
const delayed = runtime({ pending: { formType: 'contact', createdAt: Date.now() } });
delayed.runConfirmation();
assert.equal(delayed.calls().filter(call => call[1] === 'generate_lead').length, 0);
delayed.sandbox.__elanLoadOptionalAnalytics();
assert.equal(delayed.calls().filter(call => call[1] === 'generate_lead').length, 1);
accepted.sandbox.__elanRevokeOptionalAnalytics();
assert.equal(accepted.sandbox.__elanTrackEvent('whatsapp_click', {}), false);
accepted.sandbox.__elanLoadOptionalAnalytics();
assert.equal(accepted.sandbox.__elanTrackEvent('whatsapp_click', {}), true);
assert.equal(accepted.scripts.length, 2, 'Re-consenting does not duplicate tags');
assert.equal(runtime({ consent: optedIn, hostname: 'localhost' }).scripts.length, 0);
assert.equal(runtime({ consent: optedIn, signal: true }).scripts.length, 0);
assert.equal(runtime({ consent: { ...optedIn, signalOverride: true }, signal: true }).scripts.length, 2);
console.log('Measurement checks passed: consent, single GA4 route, privacy-safe URL, confirmed-lead deduplication, withdrawal, development and browser privacy signal.');
