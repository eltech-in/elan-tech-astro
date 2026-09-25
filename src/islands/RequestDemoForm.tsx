import { useRef, useState, type SubmitEvent } from 'react';
import { redirectToThankYou, submitLead } from '../lib/submitLead';

const PRODUCTS = [
  { value: 'real-estate-portal', label: 'Real Estate Portal' },
  { value: 'medical-conference-portal', label: 'Medical Conference Portal' },
  { value: 'ima-society-portal', label: 'IMA Society Portal' },
  { value: 'resort-management-system', label: 'Resort Management System' },
];

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all';

type Fields = {
  product: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: string;
};

const EMPTY_FIELDS: Fields = {
  product: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  notes: '',
};

export default function RequestDemoForm() {
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [honeypot, setHoneypot] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const startedAt = useRef(Date.now());

  function setField(field: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!fields.product) errors.product = 'Please choose a product.';
    if (fields.name.trim().length < 2) errors.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (fields.phone && !/^[\d\s+\-()]{7,20}$/.test(fields.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (fields.notes.length > 2000) errors.notes = 'Please keep your message under 2,000 characters.';
    if (!privacyAccepted) errors.privacyAccepted = 'Please confirm the privacy notice before requesting a demo.';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');

    if (!validate()) return;

    // Quietly reject obvious automated submissions.
    if (honeypot) {
      setStatus('success');
      return;
    }

    if (Date.now() - startedAt.current < 2000) {
      setStatus('error');
      setErrorMessage('Please wait a moment, then submit the form again.');
      return;
    }

    setStatus('submitting');

    try {
      await submitLead('request-demo', {
        _subject: `Product demo request from ${fields.name.trim()}`,
        _template: 'table',
        _honey: honeypot,
        product: PRODUCTS.find((product) => product.value === fields.product)?.label ?? fields.product,
        name: fields.name.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim(),
        company: fields.company.trim(),
        notes: fields.notes.trim(),
        privacyAccepted,
        _privacyNoticeVersion: 'request-demo-2026-09-24',
      });

      setFields(EMPTY_FIELDS);
      redirectToThankYou('request-demo');
    } catch {
      setStatus('error');
      setErrorMessage('We could not send your request. Please try again or WhatsApp us at +91 87888 34630.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg)]" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-[var(--text)]">Your demo request is on its way</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">
          Thank you. We will contact you at the email address provided to arrange a suitable time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="demo-website-check">Leave this field empty</label>
        <input
          id="demo-website-check"
          name="website_check"
          type="text"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <fieldset>
        <legend className="mb-3 font-semibold text-[var(--text)]">
          Which product would you like to see? <span aria-hidden="true" className="text-red-400">*</span>
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PRODUCTS.map((product) => (
            <label
              key={product.value}
              className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-[var(--border)] p-4 transition-colors has-[:checked]:border-[var(--accent)] has-[:checked]:bg-[var(--accent)]/5"
            >
              <input
                type="radio"
                name="product"
                value={product.value}
                checked={fields.product === product.value}
                onChange={(event) => setField('product', event.target.value)}
                aria-describedby={fieldErrors.product ? 'demo-product-error' : undefined}
                className="accent-[var(--accent)]"
              />
              <span className="text-sm font-medium text-[var(--text)]">{product.label}</span>
            </label>
          ))}
        </div>
        {fieldErrors.product && (
          <p id="demo-product-error" role="alert" className="mt-2 text-xs text-red-400">{fieldErrors.product}</p>
        )}
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-name" className="mb-1.5 block text-sm font-medium text-[var(--text)]">
            Full name <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="demo-name"
            type="text"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => setField('name', event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'demo-name-error' : undefined}
            className={inputClass}
            placeholder="Your full name"
          />
          {fieldErrors.name && <p id="demo-name-error" role="alert" className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="demo-email" className="mb-1.5 block text-sm font-medium text-[var(--text)]">
            Email <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="demo-email"
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={(event) => setField('email', event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'demo-email-error' : undefined}
            className={inputClass}
            placeholder="you@company.com"
          />
          {fieldErrors.email && <p id="demo-email-error" role="alert" className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="demo-phone" className="mb-1.5 block text-sm font-medium text-[var(--text)]">Phone (optional)</label>
          <input
            id="demo-phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={(event) => setField('phone', event.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? 'demo-phone-error' : undefined}
            className={inputClass}
            placeholder="+91 98765 43210"
          />
          {fieldErrors.phone && <p id="demo-phone-error" role="alert" className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>}
        </div>

        <div>
          <label htmlFor="demo-company" className="mb-1.5 block text-sm font-medium text-[var(--text)]">Company (optional)</label>
          <input
            id="demo-company"
            type="text"
            autoComplete="organization"
            value={fields.company}
            onChange={(event) => setField('company', event.target.value)}
            className={inputClass}
            placeholder="Your company"
          />
        </div>
      </div>

      <div>
        <label htmlFor="demo-notes" className="mb-1.5 block text-sm font-medium text-[var(--text)]">Notes or questions (optional)</label>
        <textarea
          id="demo-notes"
          rows={4}
          value={fields.notes}
          onChange={(event) => setField('notes', event.target.value)}
          aria-invalid={Boolean(fieldErrors.notes)}
          aria-describedby={fieldErrors.notes ? 'demo-notes-help demo-notes-error' : 'demo-notes-help'}
          className={`${inputClass} resize-y`}
          placeholder="Tell us what you would like to see during the demo"
        />
        <div className="mt-1 flex items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <span id="demo-notes-help">Do not include passwords, payment details or sensitive personal data.</span>
          <span>{fields.notes.length}/2000</span>
        </div>
        {fieldErrors.notes && <p id="demo-notes-error" role="alert" className="mt-1 text-xs text-red-400">{fieldErrors.notes}</p>}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
        <h3 className="text-sm font-semibold text-[var(--text)]">How we use your demo request</h3>
        <p id="demo-privacy-notice" className="mt-2 text-xs leading-relaxed text-[var(--text-dim)]">
          We use your product choice, name and email, together with any optional details you provide,
          to review the request, tailor and arrange the demo, and communicate about it. The request is
          stored privately and may be retained for up to 12 months if no engagement follows. We do not
          add you to a marketing list. See our{' '}
          <a href="/privacy-policy/" className="font-semibold text-[var(--accent)] underline underline-offset-2">Privacy Policy</a>.
        </p>
        <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm text-[var(--text)]">
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(event) => {
              setPrivacyAccepted(event.target.checked);
              if (event.target.checked) {
                setFieldErrors((current) => {
                  const { privacyAccepted: _removed, ...rest } = current;
                  return rest;
                });
              }
            }}
            aria-required="true"
            aria-describedby={`demo-privacy-notice${fieldErrors.privacyAccepted ? ' demo-privacy-error' : ''}`}
            className="mt-0.5 h-4 w-4 flex-none rounded border-[var(--border)] accent-[var(--accent)]"
          />
          <span>
            I agree to the processing described above so eLan Technology can respond to my demo request.
            <span aria-hidden="true" className="text-red-400"> *</span>
          </span>
        </label>
        {fieldErrors.privacyAccepted && (
          <p id="demo-privacy-error" role="alert" aria-live="polite" className="mt-2 text-xs text-red-400">{fieldErrors.privacyAccepted}</p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" aria-live="polite" className="rounded-lg border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3 text-base font-semibold text-[var(--bg)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8z" />
            </svg>
            Sending request...
          </>
        ) : (
          'Request My Demo'
        )}
      </button>

      <p className="text-center text-xs text-[var(--text-muted)]">
        No obligation · No marketing signup · Optional details may be left blank
      </p>
    </form>
  );
}
