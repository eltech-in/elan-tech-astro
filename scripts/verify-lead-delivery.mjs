import assert from 'node:assert/strict';
import { submitLead, redirectToThankYou } from '../src/lib/submitLead.ts';

// Isolated transport tests: no real email, server record or analytics request.
const fields = { name: 'Synthetic test', email: 'info@elan-tech.net', privacyAccepted: true };
const originalFetch = globalThis.fetch;
let calls;
let tokenRequests;
function responses(sequence) {
  calls = [];
  tokenRequests = 0;
  globalThis.fetch = async (url, options = {}) => {
    assert.ok(!String(url).includes('formsubmit'), 'No third-party form fallback is used');
    if (String(url).includes('/api/form-token.php')) {
      tokenRequests += 1;
      return new Response(JSON.stringify({ ok: true, token: '1795000000.0123456789abcdef.' + 'a'.repeat(64) }), { status: 200 });
    }
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
  assert.equal(calls.length, 1, 'One request to our own server');
  assert.equal(calls[0].url, '/api/submit-lead.php');
  assert.equal(calls[0].body.notify, true);
  assert.equal(tokenRequests, 1, 'A spam-protection form token is requested');
  assert.match(calls[0].body.formToken, /^\d{10}\.[0-9a-f]{16}\.[0-9a-f]{64}$/, 'The form token is sent with the lead');
  responses([{ body: { ok: true, stored: true, notified: false } }]);
  await submitLead('contact', fields); // Stored on the server even when the alert email fails.
  assert.equal(calls.length, 1, 'No fallback request when the server stored the lead');
  responses([{ status: 422, body: { ok: false } }]);
  await assert.rejects(submitLead('contact', fields));
  assert.equal(calls.length, 1, 'Validation rejection never bypasses privacy checks');
  responses([{ status: 403, body: { ok: false, error: 'Security check failed' } }]);
  await assert.rejects(submitLead('contact', fields), /did not pass server validation/, 'Spam-check rejection is reported');
  responses([{ body: { ok: true, stored: false } }]);
  await assert.rejects(submitLead('contact', fields), /not stored/, 'An unstored lead is not reported as sent');
  responses([new Error('Server unavailable')]);
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
  console.log('Lead-delivery checks passed: server alert, form token, storage-only capture, validation failure, spam-check rejection, unstored lead, outage, QA redirect and ordinary redirect (no third-party fallback).');
} finally {
  globalThis.fetch = originalFetch;
  delete globalThis.window;
  delete globalThis.sessionStorage;
}
