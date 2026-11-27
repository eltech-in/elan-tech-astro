import { useEffect, useMemo, useState } from 'react';
import { submitLead, redirectToThankYou } from '../lib/submitLead';
import { PAY_PRICES, currencyFromTimeZone, formatPrice, type Currency, type PayProduct } from '../data/auditPricing';

/**
 * Pay-and-book checkout using the Razorpay Orders API (no payment buttons).
 * 1. /api/razorpay-order.php creates an order at the fixed server-side price.
 * 2. Razorpay Checkout (loaded only when the visitor presses Pay) takes the payment.
 * 3. /api/razorpay-verify.php checks the signature with the server-side secret.
 * 4. The booking is sent through the normal lead pipeline, which accepts it only for that paid order.
 */
interface Props {
  product: PayProduct;
  /** Charge in this currency (country pages). Otherwise the visitor's currency from their time zone. */
  currency?: Currency;
  /** Ask for the website address (audits). */
  needsUrl?: boolean;
  /** Ask for the payment reference from eLan's written instructions (booking advance). */
  needsReference?: boolean;
  payLabel?: string;
  /** Lead form type: website-audit for the audit, paid-booking for the others. */
  formType: 'website-audit' | 'paid-booking';
  privacyNoticeVersion: string;
}

declare global {
  interface Window { Razorpay?: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, cb: (r: unknown) => void) => void } }
}

const whatsapp = 'https://wa.me/918788834630?text=' + encodeURIComponent('Hi, I would like to pay online for an eLan Technology service. Please send a payment link.');

function loadCheckout(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.async = true;
    s.onload = () => (window.Razorpay ? resolve() : reject(new Error('Razorpay did not load')));
    s.onerror = () => reject(new Error('Razorpay did not load'));
    document.head.appendChild(s);
  });
}

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(25000) });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, data: data as Record<string, any> };
}

export default function PaidCheckout({ product, currency: pinned, needsUrl = false, needsReference = false, payLabel = 'Pay and book', formType, privacyNoticeVersion }: Props) {
  const prices = PAY_PRICES[product];
  const [currency, setCurrency] = useState<Currency>(pinned ?? 'INR');
  const [local, setLocal] = useState<Currency>(pinned ?? 'INR');
  // The server-rendered button stays disabled until this island has loaded, so an early click
  // cannot submit the form natively (a plain page reload).
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', url: '', reference: '', notes: '', _honey: '' });
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    setReady(true);
    if (pinned) return;
    try {
      const detected = currencyFromTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || '');
      setCurrency(detected);
      setLocal(detected);
    } catch { /* keep INR */ }
  }, [pinned]);

  const price = useMemo(() => formatPrice(prices[currency], currency), [currency, prices]);
  const options = [...new Set<Currency>([local, 'INR', 'USD'])];
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function pay(e: { preventDefault: () => void }) {
    e.preventDefault();
    setError('');
    if (!consent) { setError('Please accept the privacy notice to continue.'); return; }
    setBusy(true);
    try {
      const fields = { ...form, privacyAccepted: true };
      const order = await postJson('/api/razorpay-order.php', { product, currency, fields });
      if (order.status === 503 && order.data.code === 'not_configured') { setUnavailable(true); setBusy(false); return; }
      if (order.status !== 200 || !order.data.ok) throw new Error(order.data.error || 'Payment could not be started. Please try again.');
      await loadCheckout();
      const o = order.data;
      const rzp = new window.Razorpay!({
        key: o.keyId,
        order_id: o.orderId,
        amount: o.amount,
        currency: o.currency,
        name: 'eLan Technology',
        description: o.description,
        prefill: o.prefill,
        notes: { website: form.url },
        theme: { color: '#4F46E5' },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (resp: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const v = await postJson('/api/razorpay-verify.php', { orderId: resp.razorpay_order_id, paymentId: resp.razorpay_payment_id, signature: resp.razorpay_signature });
            if (v.status !== 200 || !v.data.ok) throw new Error(v.data.error || 'Payment could not be verified.');
            await submitLead(formType, {
              name: form.name, email: form.email, phone: form.phone, url: form.url, reference: form.reference, notes: form.notes,
              privacyAccepted: true, _privacyNoticeVersion: privacyNoticeVersion,
              _razorpayOrderId: resp.razorpay_order_id, _razorpayPaymentId: resp.razorpay_payment_id,
              _subject: `Paid booking (${o.description}) from ${form.name}`,
            }).catch(() => { /* payment is recorded server-side and in Razorpay even if the alert fails */ });
            redirectToThankYou(formType);
          } catch (err) {
            setBusy(false);
            setError(`${(err as Error).message} Your payment reference is ${resp.razorpay_payment_id}. Please contact us with it.`);
          }
        },
      });
      rzp.on('payment.failed', (r) => {
        const reason = (r as { error?: { description?: string } })?.error?.description;
        setError(`Payment was not completed${reason ? `: ${reason}` : ''}. You have not been charged for this attempt.`);
        setBusy(false);
      });
      rzp.open();
    } catch (err) {
      setError((err as Error).message || 'Payment could not be started. Please try again.');
      setBusy(false);
    }
  }

  if (unavailable) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
        <p className="font-semibold text-[var(--text)]">Online payment opens shortly.</p>
        <p className="mt-2 text-sm leading-6 text-[var(--text-dim)]">Message us and we will send a secure Razorpay payment link. Your booking is confirmed once payment is received.</p>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" data-analytics-placement={`${product}-payment`} className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-[var(--accent)] px-5 py-2.5 font-semibold text-[var(--bg)]">Get a payment link on WhatsApp<span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    );
  }

  const input = 'mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3.5 py-2.5 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none';
  const label = 'block text-sm font-semibold text-[var(--text)]';
  return (
    <form onSubmit={pay} className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 sm:p-7" data-paid-checkout={product} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>Your name<input required autoComplete="name" className={input} value={form.name} onChange={set('name')} /></label>
        <label className={label}>Email<input required type="email" autoComplete="email" className={input} value={form.email} onChange={set('email')} /></label>
        <label className={label}>Phone or WhatsApp <span className="font-normal text-[var(--text-muted)]">(optional)</span><input type="tel" autoComplete="tel" className={input} value={form.phone} onChange={set('phone')} /></label>
        {needsUrl && <label className={label}>Website address<input required type="url" inputMode="url" placeholder="https://" className={input} value={form.url} onChange={set('url')} /></label>}
        {needsReference && <label className={label}>Payment reference <span className="font-normal text-[var(--text-muted)]">(from our written instructions)</span><input className={input} value={form.reference} onChange={set('reference')} /></label>}
      </div>
      <label className={`${label} mt-4`}>{needsUrl ? 'What concerns you most?' : 'Notes'} <span className="font-normal text-[var(--text-muted)]">(optional)</span>
        <textarea rows={3} className={input} value={form.notes} onChange={set('notes')} placeholder={needsUrl ? 'For example: slow pages, few enquiries, search visibility' : ''} />
      </label>
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form._honey} onChange={set('_honey')} />

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-[var(--text)]">Pay in</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {options.map((c) => (
            <label key={c} className={`cursor-pointer rounded-md border px-4 py-2 text-sm font-semibold ${currency === c ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)]' : 'border-[var(--border)] text-[var(--text-dim)]'}`}>
              <input type="radio" name={`cur-${product}`} value={c} checked={currency === c} onChange={() => setCurrency(c)} className="sr-only" />
              {formatPrice(prices[c], c)} {c === 'INR' ? '· India' : c === 'USD' ? '· US dollars' : `· ${c}`}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text-dim)]">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]" />
        <span>I agree that eLan Technology uses these details for this booking (<a href="/privacy-policy/" target="_blank" rel="noopener noreferrer" className="font-semibold underline">Privacy Policy</a>), and that Razorpay loads to take the payment under its own terms (<a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="font-semibold underline">Razorpay Privacy</a>, <a href="/cancellation-refund-policy/" target="_blank" rel="noopener noreferrer" className="font-semibold underline">Refund Policy</a>).</span>
      </label>

      {error && <p role="alert" className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-[var(--text)]">{error}</p>}

      <button type="submit" disabled={busy || !ready} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-bold text-[var(--bg)] transition hover:brightness-110 disabled:opacity-60 sm:w-auto">
        {busy ? 'Opening secure payment…' : `${payLabel} · ${price}`}
      </button>
      <p className="mt-3 text-xs text-[var(--text-muted)]">Secure payment by Razorpay: {currency === 'INR' ? 'UPI, cards, netbanking and wallets' : 'international cards'}. Do not enter passwords or customer records here.</p>
    </form>
  );
}
