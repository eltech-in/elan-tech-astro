import { useState, type SubmitEvent } from 'react';

// Rush assessment form for the Emergency ADA Remediation page.
// Submits to the same FormSubmit endpoint as the Free Website Audit form,
// tagged "Emergency ADA" so submissions are triaged first.

const PLATFORMS = ['Shopify', 'WooCommerce', 'Custom', 'Not sure'];

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all';

export default function RushAssessmentForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fields, setFields] = useState({
    name: '',
    email: '',
    url: '',
    deadline: '',
    platform: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function set(field: keyof typeof fields, value: string) {
    setFields((p) => ({ ...p, [field]: value }));
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!fields.name.trim() || fields.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Please enter a valid email';
    if (!fields.url) errs.url = 'Website URL is required';
    else if (!/^https?:\/\/.+/.test(fields.url)) errs.url = 'Enter a valid URL (starting with http/https)';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@elantech.in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `EMERGENCY ADA - Rush assessment from ${fields.name}`,
          priority: 'Emergency ADA',
          ...fields,
        }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        throw new Error('Server error');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again, or WhatsApp us at +91 87888 34630.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[var(--text)] mb-2">Rush assessment requested</h3>
        <p className="text-sm text-[var(--text-dim)]">
          Your request is flagged as priority. We'll reply to {fields.email} within a few business hours with scope, timeline, and a fixed price.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ra-name" className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Name <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="ra-name"
            type="text"
            value={fields.name}
            onChange={(e) => set('name', e.target.value)}
            aria-required="true"
            aria-describedby={fieldErrors.name ? 'ra-name-error' : undefined}
            className={inputClass}
            placeholder="Your full name"
          />
          {fieldErrors.name && (
            <p id="ra-name-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="ra-email" className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Work email <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="ra-email"
            type="email"
            value={fields.email}
            onChange={(e) => set('email', e.target.value)}
            aria-required="true"
            aria-describedby={fieldErrors.email ? 'ra-email-error' : undefined}
            className={inputClass}
            placeholder="you@company.com"
          />
          {fieldErrors.email && (
            <p id="ra-email-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="ra-url" className="block text-sm font-medium text-[var(--text)] mb-1.5">
          Website / store URL <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <input
          id="ra-url"
          type="url"
          value={fields.url}
          onChange={(e) => set('url', e.target.value)}
          aria-required="true"
          aria-describedby={fieldErrors.url ? 'ra-url-error' : undefined}
          className={inputClass}
          placeholder="https://yourstore.com"
        />
        {fieldErrors.url && (
          <p id="ra-url-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">{fieldErrors.url}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ra-deadline" className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Deadline or demand-letter date <span className="text-[var(--text-muted)] font-normal">(optional)</span>
          </label>
          <input
            id="ra-deadline"
            type="text"
            value={fields.deadline}
            onChange={(e) => set('deadline', e.target.value)}
            className={inputClass}
            placeholder="e.g. 30 days from July 1"
          />
        </div>
        <div>
          <label htmlFor="ra-platform" className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Platform
          </label>
          <select
            id="ra-platform"
            value={fields.platform}
            onChange={(e) => set('platform', e.target.value)}
            className={inputClass}
          >
            <option value="">Select platform…</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" aria-live="polite" className="text-xs text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-lg bg-[var(--accent)] py-3 text-sm font-semibold text-[var(--bg)] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Submitting…
          </>
        ) : (
          'Request my rush assessment'
        )}
      </button>

      <p className="text-xs text-[var(--text-muted)] text-center">
        No obligation. We serve US, Canadian, UK, EU &amp; Australian businesses.
      </p>
    </form>
  );
}
