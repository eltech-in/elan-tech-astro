import assert from 'node:assert/strict';
import { submitLead, redirectToThankYou } from '../src/lib/submitLead.ts';

// Isolated transport tests: no real email, server record or analytics request.
const fields = { name: 'Synthetic test', email: 'info@elan-tech.net', privacyAccepted: true };
const originalFetch = globalThis.fetch;
let calls;
function responses(sequence) {
  calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, body: JSON.parse(options.body) });
    const next = sequence.shift();
    if (next instanceof Error) throw next;
    assert.ok(next, 'Unexpected extra delivery request');
    return new Response(JSON.stringify(next.body), { status: next.status || 200 });
  };
}
try {
  responses([{ body: { ok: true, stored: true, notified: true, notificationReliable: true } }]);
  await submitLead('contact', fields);
  assert.equal(calls.length, 1, 'Reliable server alert avoids a duplicate fallback');
  assert.equal(calls[0].body.notify, true);
  responses([{ body: { ok: true, stored: true, notified: false } }, { body: { success: true } }]);
  await submitLead('contact', fields);
  assert.equal(calls.length, 2, 'Unalerted backup attempts independent email fallback');
  responses([new Error('Server unavailable'), { body: { success: 'true' } }]);
  await submitLead('contact', fields);
  responses([{ body: { ok: true, stored: true, notified: false } }, new Error('Provider unavailable')]);
  await submitLead('contact', fields); // Safely stored even when email fails.
  responses([{ status: 422, body: { ok: false } }]);
  await assert.rejects(submitLead('contact', fields));
  assert.equal(calls.length, 1, 'Validation rejection never bypasses privacy checks');
  responses([new Error('Server unavailable'), new Error('Provider unavailable')]);
  await assert.rejects(submitLead('contact', fields), /No lead-delivery channel/);
  let destination;
  let receipt;
  globalThis.sessionStorage = { setItem: (_key, value) => { receipt = JSON.parse(value); } };
  globalThis.window = { location: { search: '?analytics_debug=1&email=private@example.com', assign: url => { destination = url; } } };
  redirectToThankYou('contact');
  assert.equal(destination, '/thank-you/?form=contact&analytics_debug=1', 'QA flag survives confirmation without personal query data');
  assert.equal(receipt.formType, 'contact');
  window.location.search = '';
  redirectToThankYou('website-audit');
  assert.equal(destination, '/thank-you/?form=website-audit', 'Ordinary enquiries are not marked as developer traffic');
  console.log('Lead-delivery checks passed: reliable alert, fallback, storage-only capture, validation failure, total outage, QA redirect and ordinary redirect.');
} finally {
  globalThis.fetch = originalFetch;
  delete globalThis.window;
  delete globalThis.sessionStorage;
}
