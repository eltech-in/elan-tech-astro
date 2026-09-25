import { useRef, useState, type SubmitEvent } from 'react';
import { redirectToThankYou, submitLead } from '../lib/submitLead';

type Step1 = { url: string; name: string; email: string };
type Step2 = { phone: string; company: string; aspects: string[] };
type Step3 = { notes: string };

const AUDIT_ASPECTS = [
  'Security',
  'SEO',
  'Performance',
  'Mobile-friendliness',
];

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all';

export default function FreeAuditForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const startedAt = useRef(Date.now());

  const [step1, setStep1] = useState<Step1>({ url: '', name: '', email: '' });
  const [step2, setStep2] = useState<Step2>({ phone: '', company: '', aspects: [] });
  const [step3, setStep3] = useState<Step3>({ notes: '' });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validateStep1(): boolean {
    const errs: Record<string, string> = {};
    if (!step1.url) errs.url = 'Website URL is required';
    else if (!/^https?:\/\/.+/.test(step1.url)) errs.url = 'Enter a valid URL (starting with http/https)';
    if (!step1.name.trim() || step1.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!step1.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step1.email)) errs.email = 'Please enter a valid email';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2(): boolean {
    const errs: Record<string, string> = {};
    if (step2.phone && !/^[\d\s+\-()]{7,20}$/.test(step2.phone.trim())) errs.phone = 'Please enter a valid phone number';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep3(): boolean {
    const errs: Record<string, string> = {};
    if (!privacyAccepted) {
      errs.privacyAccepted = 'Please confirm the privacy notice and your authority to request this audit';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function nextStep() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setFieldErrors({});
    setStep((s) => s + 1);
  }

  function prevStep() {
    setFieldErrors({});
    setStep((s) => s - 1);
  }

  function toggleAspect(aspect: string) {
    setStep2((prev) => ({
      ...prev,
      aspects: prev.aspects.includes(aspect)
        ? prev.aspects.filter((a) => a !== aspect)
        : [...prev.aspects, aspect],
    }));
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateStep3()) return;

    if (honeypot) {
      setStatus('success');
      return;
    }

    if (Date.now() - startedAt.current < 2000) {
      setStatus('error');
      setErrorMsg('Please wait a moment, then submit the form again.');
      return;
    }

    setStatus('submitting');
    try {
      await submitLead('free-audit', {
        _subject: `Free Audit Request from ${step1.name}`,
        _honey: honeypot,
        ...step1,
        ...step2,
        notes: step3.notes,
        privacyAccepted,
        _privacyNoticeVersion: 'free-audit-2026-09-23',
      });
      redirectToThankYou('free-audit');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or contact us directly.');
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
        <h3 className="text-xl font-bold text-[var(--text)] mb-2">Audit Requested!</h3>
        <p className="text-sm text-[var(--text-dim)]">
          We've received your request. We will review the website and confirm the audit scope and expected delivery time at {step1.email}.
        </p>
        <button
          onClick={() => { setStatus('idle'); setStep(1); setStep1({ url: '', name: '', email: '' }); setStep2({ phone: '', company: '', aspects: [] }); setStep3({ notes: '' }); setPrivacyAccepted(false); }}
          className="mt-6 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  // Step indicator
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6" aria-label={`Step ${step} of 3`}>
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              n === step
                ? 'bg-[var(--accent)] text-[var(--bg)]'
                : n < step
                ? 'bg-[var(--accent)]/40 text-[var(--text)]'
                : 'border border-[var(--border)] text-[var(--text-muted)]'
            }`}
            aria-current={n === step ? 'step' : undefined}
          >
            {n < step ? '✓' : n}
          </div>
          {n < 3 && <div className={`w-8 h-0.5 ${n < step ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="fa-website-check">Leave this field empty</label>
        <input
          id="fa-website-check"
          name="website_check"
          type="text"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <StepIndicator />

      {step === 1 && (
        <fieldset>
          <legend className="text-base font-semibold text-[var(--text)] mb-4">Your Website &amp; Contact Info</legend>

          <div className="space-y-4">
            <div>
              <label htmlFor="fa-url" className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Website URL <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <input
                id="fa-url"
                type="url"
                value={step1.url}
                onChange={(e) => setStep1((p) => ({ ...p, url: e.target.value }))}
                aria-required="true"
                aria-describedby={fieldErrors.url ? 'fa-url-error' : undefined}
                className={inputClass}
                placeholder="https://yourwebsite.com"
                autoComplete="url"
              />
              {fieldErrors.url && (
                <p id="fa-url-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">{fieldErrors.url}</p>
              )}
            </div>
            <div>
              <label htmlFor="fa-name" className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Full Name <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <input
                id="fa-name"
                type="text"
                value={step1.name}
                onChange={(e) => setStep1((p) => ({ ...p, name: e.target.value }))}
                aria-required="true"
                aria-describedby={fieldErrors.name ? 'fa-name-error' : undefined}
                className={inputClass}
                placeholder="Your full name"
                autoComplete="name"
              />
              {fieldErrors.name && (
                <p id="fa-name-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="fa-email" className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Email <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <input
                id="fa-email"
                type="email"
                value={step1.email}
                onChange={(e) => setStep1((p) => ({ ...p, email: e.target.value }))}
                aria-required="true"
                aria-describedby={fieldErrors.email ? 'fa-email-error' : undefined}
                className={inputClass}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {fieldErrors.email && (
                <p id="fa-email-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
              )}
            </div>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="text-base font-semibold text-[var(--text)] mb-4">Additional Details</legend>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fa-phone" className="block text-sm font-medium text-[var(--text)] mb-1.5">Phone (optional)</label>
                <input
                  id="fa-phone"
                  type="tel"
                  value={step2.phone}
                  onChange={(e) => setStep2((p) => ({ ...p, phone: e.target.value }))}
                  aria-describedby={fieldErrors.phone ? 'fa-phone-error' : undefined}
                  className={inputClass}
                  placeholder="+1 or +91..."
                  autoComplete="tel"
                />
                {fieldErrors.phone && (
                  <p id="fa-phone-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>
                )}
              </div>
              <div>
                <label htmlFor="fa-company" className="block text-sm font-medium text-[var(--text)] mb-1.5">Company (optional)</label>
                <input
                  id="fa-company"
                  type="text"
                  value={step2.company}
                  onChange={(e) => setStep2((p) => ({ ...p, company: e.target.value }))}
                  className={inputClass}
                  placeholder="Company name"
                  autoComplete="organization"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--text)] mb-2">What aspects should we audit? (optional)</p>
              <div className="flex flex-wrap gap-2">
                {AUDIT_ASPECTS.map((aspect) => (
                  <label
                    key={aspect}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer text-sm transition-colors ${
                      step2.aspects.includes(aspect)
                        ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)]'
                        : 'border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={step2.aspects.includes(aspect)}
                      onChange={() => toggleAspect(aspect)}
                      className="sr-only"
                    />
                    {aspect}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="text-base font-semibold text-[var(--text)] mb-4">Final Details &amp; Privacy</legend>
          <div className="space-y-4">
            <div>
            <label htmlFor="fa-notes" className="block text-sm font-medium text-[var(--text)] mb-1.5">
              Notes / Special Instructions (optional)
            </label>
            <textarea
              id="fa-notes"
              rows={5}
              value={step3.notes}
              onChange={(e) => setStep3({ notes: e.target.value })}
              className={inputClass}
              placeholder="Anything specific you'd like us to focus on..."
              aria-describedby="fa-notes-help"
            />
            <p id="fa-notes-help" className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
              Do not include passwords, admin access, payment information or sensitive personal data. This free audit reviews only publicly accessible content.
            </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
              <h3 className="text-sm font-semibold text-[var(--text)]">How we use your audit request</h3>
              <p id="fa-privacy-notice" className="mt-2 text-xs leading-relaxed text-[var(--text-dim)]">
                We use your website URL and contact details to check eligibility, review the public-facing website, prepare and deliver the requested audit, and communicate about this request. Requests are stored privately and may be retained for up to 12 months if no engagement follows. We do not add you to a marketing list. See our{' '}
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
                  aria-describedby={`fa-privacy-notice${fieldErrors.privacyAccepted ? ' fa-privacy-error' : ''}`}
                  className="mt-0.5 h-4 w-4 flex-none rounded border-[var(--border)] accent-[var(--accent)]"
                />
                <span>
                  I confirm that I am authorised to request a review of this website and agree to the processing described above.
                  <span aria-hidden="true" className="text-red-400"> *</span>
                </span>
              </label>
              {fieldErrors.privacyAccepted && (
                <p id="fa-privacy-error" role="alert" aria-live="polite" className="mt-2 text-xs text-red-400">{fieldErrors.privacyAccepted}</p>
              )}
            </div>
          </div>

          {status === 'error' && (
            <p role="alert" aria-live="polite" className="text-xs text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20 mt-2">
              {errorMsg}
            </p>
          )}
        </fieldset>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 pt-2">
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="flex-1 rounded-lg border border-[var(--border)] py-2.5 text-sm font-semibold text-[var(--text)] hover:bg-white/5 transition-all"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex-1 rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-[var(--bg)] hover:opacity-90 transition-all"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="flex-1 rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-[var(--bg)] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Submitting...
              </>
            ) : (
              'Request Free Audit'
            )}
          </button>
        )}
      </div>

      <p className="text-xs text-[var(--text-muted)] text-center">
        Public-site review only · No credit card · No marketing signup
      </p>
    </form>
  );
}
