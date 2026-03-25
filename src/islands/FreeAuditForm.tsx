import { useState, type FormEvent } from 'react';

type Step1 = { url: string; name: string; email: string };
type Step2 = { phone: string; company: string; aspects: string[] };
type Step3 = { notes: string };

const AUDIT_ASPECTS = [
  'Security',
  'SEO',
  'Performance',
  'Accessibility',
  'Mobile-friendliness',
];

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all';

export default function FreeAuditForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [step1, setStep1] = useState<Step1>({ url: '', name: '', email: '' });
  const [step2, setStep2] = useState<Step2>({ phone: '', company: '', aspects: [] });
  const [step3, setStep3] = useState<Step3>({ notes: '' });

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

  function nextStep() {
    if (step === 1 && !validateStep1()) return;
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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...step1,
          ...step2,
          notes: step3.notes,
        }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        throw new Error('Server error');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or contact us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-[#0A0E1A]">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[var(--text)] mb-2">Audit Requested!</h3>
        <p className="text-sm text-[var(--text-dim)]">
          We've received your request. Our team will analyze your site and send the report to {step1.email} within 24-48 hours.
        </p>
        <button
          onClick={() => { setStatus('idle'); setStep(1); setStep1({ url: '', name: '', email: '' }); setStep2({ phone: '', company: '', aspects: [] }); setStep3({ notes: '' }); }}
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
                ? 'bg-[var(--accent)] text-[#0A0E1A]'
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
                <label htmlFor="fa-phone" className="block text-sm font-medium text-[var(--text)] mb-1.5">Phone</label>
                <input
                  id="fa-phone"
                  type="tel"
                  value={step2.phone}
                  onChange={(e) => setStep2((p) => ({ ...p, phone: e.target.value }))}
                  className={inputClass}
                  placeholder="+1 or +91..."
                />
              </div>
              <div>
                <label htmlFor="fa-company" className="block text-sm font-medium text-[var(--text)] mb-1.5">Company</label>
                <input
                  id="fa-company"
                  type="text"
                  value={step2.company}
                  onChange={(e) => setStep2((p) => ({ ...p, company: e.target.value }))}
                  className={inputClass}
                  placeholder="Company name"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--text)] mb-2">What aspects to audit?</p>
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
          <legend className="text-base font-semibold text-[var(--text)] mb-4">Any Additional Notes?</legend>
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
            />
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
            className="flex-1 rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-[#0A0E1A] hover:opacity-90 transition-all"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="flex-1 rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-[#0A0E1A] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
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
        Report delivered in 24-48 hours · No credit card required
      </p>
    </form>
  );
}
