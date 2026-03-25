import { useState, type FormEvent } from 'react';

const PROJECT_TYPES = [
  'Website Design',
  'Web Development',
  'eCommerce',
  'Mobile App',
  'Digital Marketing',
  'Branding',
];

const BUDGETS = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'Not sure yet',
];

const TIMELINES = [
  'ASAP',
  '1 – 2 months',
  '3 – 6 months',
  '6 – 12 months',
  'Flexible',
];

const REFERRALS = [
  'Google Search',
  'Social Media',
  'Friend / Colleague',
  'Previous Client',
  'Blog / Article',
  'Other',
];

const inputClass =
  'w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all';

export default function GetQuoteForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [projectType, setProjectType] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', phone: '', company: '' });
  const [project, setProject] = useState({ budget: '', timeline: '', description: '' });
  const [referral, setReferral] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validateStep(n: number): boolean {
    const errs: Record<string, string> = {};
    if (n === 1 && !projectType) errs.projectType = 'Please select a project type';
    if (n === 2) {
      if (!contact.name.trim() || contact.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
      if (!contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errs.email = 'Please enter a valid email';
      if (!contact.phone.trim()) errs.phone = 'Phone number is required';
    }
    if (n === 3 && !project.description.trim()) errs.description = 'Project description is required';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    setFieldErrors({});
    setStep((s) => s + 1);
  }

  function prevStep() {
    setFieldErrors({});
    setStep((s) => s - 1);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/get-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectType, ...contact, ...project, referral }),
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
        <h3 className="text-xl font-bold text-[var(--text)] mb-2">Quote Request Received!</h3>
        <p className="text-sm text-[var(--text-dim)]">
          Thank you! We'll review your project details and get back to you within 24-48 hours with a tailored quote.
        </p>
        <button
          onClick={() => { setStatus('idle'); setStep(1); setProjectType(''); setContact({ name: '', email: '', phone: '', company: '' }); setProject({ budget: '', timeline: '', description: '' }); setReferral(''); }}
          className="mt-6 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-6" aria-label={`Step ${step} of 4`}>
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="flex items-center gap-1">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
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
          {n < 4 && <div className={`w-6 h-0.5 ${n < step ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <StepIndicator />

      {step === 1 && (
        <fieldset>
          <legend className="text-base font-semibold text-[var(--text)] mb-4">What type of project?</legend>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PROJECT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setProjectType(type)}
                aria-pressed={projectType === type}
                className={`rounded-lg border p-3 text-sm font-medium text-center transition-all ${
                  projectType === type
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text)]'
                    : 'border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {fieldErrors.projectType && (
            <p role="alert" aria-live="polite" className="mt-2 text-xs text-red-400">{fieldErrors.projectType}</p>
          )}
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="text-base font-semibold text-[var(--text)] mb-4">Your Contact Details</legend>
          <div className="space-y-4">
            <div>
              <label htmlFor="gq-name" className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Name <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <input
                id="gq-name"
                type="text"
                value={contact.name}
                onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
                aria-required="true"
                aria-describedby={fieldErrors.name ? 'gq-name-error' : undefined}
                className={inputClass}
                placeholder="Your full name"
              />
              {fieldErrors.name && <p id="gq-name-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="gq-email" className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Email <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <input
                id="gq-email"
                type="email"
                value={contact.email}
                onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                aria-required="true"
                aria-describedby={fieldErrors.email ? 'gq-email-error' : undefined}
                className={inputClass}
                placeholder="you@example.com"
              />
              {fieldErrors.email && <p id="gq-email-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gq-phone" className="block text-sm font-medium text-[var(--text)] mb-1.5">
                  Phone <span aria-hidden="true" className="text-red-400">*</span>
                </label>
                <input
                  id="gq-phone"
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                  aria-required="true"
                  aria-describedby={fieldErrors.phone ? 'gq-phone-error' : undefined}
                  className={inputClass}
                  placeholder="+1 or +91..."
                />
                {fieldErrors.phone && <p id="gq-phone-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>}
              </div>
              <div>
                <label htmlFor="gq-company" className="block text-sm font-medium text-[var(--text)] mb-1.5">Company</label>
                <input
                  id="gq-company"
                  type="text"
                  value={contact.company}
                  onChange={(e) => setContact((p) => ({ ...p, company: e.target.value }))}
                  className={inputClass}
                  placeholder="Company name"
                />
              </div>
            </div>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="text-base font-semibold text-[var(--text)] mb-4">Project Details</legend>
          <div className="space-y-4">
            <div>
              <label htmlFor="gq-budget" className="block text-sm font-medium text-[var(--text)] mb-1.5">Budget Range</label>
              <select id="gq-budget" value={project.budget} onChange={(e) => setProject((p) => ({ ...p, budget: e.target.value }))} className={inputClass}>
                <option value="">Select budget range</option>
                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="gq-timeline" className="block text-sm font-medium text-[var(--text)] mb-1.5">Timeline</label>
              <select id="gq-timeline" value={project.timeline} onChange={(e) => setProject((p) => ({ ...p, timeline: e.target.value }))} className={inputClass}>
                <option value="">Select timeline</option>
                {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="gq-description" className="block text-sm font-medium text-[var(--text)] mb-1.5">
                Project Description <span aria-hidden="true" className="text-red-400">*</span>
              </label>
              <textarea
                id="gq-description"
                rows={4}
                value={project.description}
                onChange={(e) => setProject((p) => ({ ...p, description: e.target.value }))}
                aria-required="true"
                aria-describedby={fieldErrors.description ? 'gq-desc-error' : undefined}
                className={inputClass}
                placeholder="Describe your project goals, features needed..."
              />
              {fieldErrors.description && <p id="gq-desc-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">{fieldErrors.description}</p>}
            </div>
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset>
          <legend className="text-base font-semibold text-[var(--text)] mb-4">One Last Thing</legend>
          <div>
            <label htmlFor="gq-referral" className="block text-sm font-medium text-[var(--text)] mb-1.5">
              How did you hear about us?
            </label>
            <select id="gq-referral" value={referral} onChange={(e) => setReferral(e.target.value)} className={inputClass}>
              <option value="">Select an option</option>
              {REFERRALS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {status === 'error' && (
            <p role="alert" aria-live="polite" className="mt-3 text-xs text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              {errorMsg}
            </p>
          )}
        </fieldset>
      )}

      <div className="flex gap-3 pt-2">
        {step > 1 && (
          <button type="button" onClick={prevStep} className="flex-1 rounded-lg border border-[var(--border)] py-2.5 text-sm font-semibold text-[var(--text)] hover:bg-white/5 transition-all">
            Back
          </button>
        )}
        {step < 4 ? (
          <button type="button" onClick={nextStep} className="flex-1 rounded-lg bg-[var(--accent)] py-2.5 text-sm font-semibold text-[#0A0E1A] hover:opacity-90 transition-all">
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
              'Submit Quote Request'
            )}
          </button>
        )}
      </div>
    </form>
  );
}
