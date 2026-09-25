import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { redirectToThankYou, submitLead } from '../lib/submitLead';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email'),
  phone: z.string().refine((val) => val === undefined || val === '' || /^[\d\s+\-()]{7,20}$/.test(val), { message: 'Please enter a valid phone number' }).optional(),
  company: z.string().optional(),
  website: z.url('Please enter a valid URL').optional().or(z.literal('')),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  privacyAccepted: z.boolean().refine((value) => value, {
    message: 'Please confirm that you have read the enquiry privacy notice',
  }),
});

type FormValues = z.infer<typeof schema>;

const SERVICES = [
  'Website Design',
  'Web Development',
  'eCommerce',
  'Digital Marketing',
  'Mobile App Development',
  'Branding',
  'API Integration',
  'SEO / Audits',
  'Maintenance & Security',
  'ADA & WCAG Compliance',
  'Other',
];

function validate(values: FormValues): Partial<Record<keyof FormValues, string>> {
  const result = schema.safeParse(values);
  if (result.success) return {};
  const errors: Partial<Record<keyof FormValues, string>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof FormValues;
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      service: '',
      message: '',
      privacyAccepted: false,
    },
    resolver: (values) => {
      const errs = validate(values);
      const hasErrors = Object.keys(errs).length > 0;
      return {
        values: hasErrors ? {} : values,
        errors: hasErrors
          ? Object.fromEntries(
            Object.entries(errs).map(([k, v]) => [k, { type: 'manual', message: v }])
          )
          : {},
      };
    },
  });

  type Status = 'idle' | 'success' | 'error';
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const startedAt = useRef(Date.now());

  async function onSubmit(data: FormValues) {
    setStatus('idle');

    if (honeypot) {
      setStatus('success');
      return;
    }

    if (Date.now() - startedAt.current < 2000) {
      setStatus('error');
      setErrorMsg('Please wait a moment, then submit the form again.');
      return;
    }

    try {
      await submitLead('contact', {
        _subject: `New Contact Request from ${data.name}`,
        _honey: honeypot,
        _privacyNoticeVersion: 'contact-2026-09-23',
        ...data,
      });
      reset();
      redirectToThankYou('contact');
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
        <h3 className="text-xl font-bold text-[var(--text)] mb-2">Thank you!</h3>
        <p className="text-sm text-[var(--text-dim)]">
          We've received your message and will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" aria-describedby="contact-form-privacy-summary">
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-website-check">Leave this field empty</label>
        <input
          id="cf-website-check"
          name="website_check"
          type="text"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="cf-name" className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Name <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-describedby={errors.name ? 'cf-name-error' : undefined}
            {...register('name')}
            className={inputClass}
            placeholder="Your full name"
          />
          {errors.name && (
            <p id="cf-name-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Email <span aria-hidden="true" className="text-red-400">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-describedby={errors.email ? 'cf-email-error' : undefined}
            {...register('email')}
            className={inputClass}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="cf-email-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Phone + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-medium text-[var(--text)] mb-1.5">Phone <span className="text-xs font-normal text-[var(--text-muted)]">(optional)</span></label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            aria-describedby={errors.phone ? 'cf-phone-error' : undefined}
            {...register('phone')}
            className={inputClass}
            placeholder="+1 or +91..."
          />
          {errors.phone && (
            <p id="cf-phone-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-company" className="block text-sm font-medium text-[var(--text)] mb-1.5">Company <span className="text-xs font-normal text-[var(--text-muted)]">(optional)</span></label>
          <input
            id="cf-company"
            type="text"
            autoComplete="organization"
            aria-describedby={errors.company ? 'cf-company-error' : undefined}
            {...register('company')}
            className={inputClass}
            placeholder="Your company name"
          />
          {errors.company && (
            <p id="cf-company-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      {/* Website URL */}
      <div>
        <label htmlFor="cf-website" className="block text-sm font-medium text-[var(--text)] mb-1.5">Website URL <span className="text-xs font-normal text-[var(--text-muted)]">(optional)</span></label>
        <input
          id="cf-website"
          type="url"
          aria-describedby={errors.website ? 'cf-website-error' : undefined}
          {...register('website')}
          className={inputClass}
          placeholder="https://yourwebsite.com"
        />
        {errors.website && (
          <p id="cf-website-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">
            {errors.website.message}
          </p>
        )}
      </div>

      {/* Service */}
      <div>
        <label htmlFor="cf-service" className="block text-sm font-medium text-[var(--text)] mb-1.5">Service <span className="text-xs font-normal text-[var(--text-muted)]">(optional)</span></label>
        <select
          id="cf-service"
          aria-describedby={errors.service ? 'cf-service-error' : undefined}
          {...register('service')}
          className={inputClass}
        >
          <option value="">Select a service</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service && (
          <p id="cf-service-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">
            {errors.service.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-[var(--text)] mb-1.5">
          Message <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={5}
          aria-required="true"
          aria-describedby={errors.message ? 'cf-message-help cf-message-error' : 'cf-message-help'}
          {...register('message')}
          className={inputClass}
          placeholder="Tell us about your project..."
        />
        <p id="cf-message-help" className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
          Please do not include passwords, payment details, health information or other sensitive personal data.
        </p>
        {errors.message && (
          <p id="cf-message-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <div id="contact-form-privacy-summary" className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/70 p-4">
        <p className="text-sm font-semibold text-[var(--text)]">How we use this enquiry</p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--text-dim)]">
          We use the details you provide only to review and respond to this enquiry. They are stored in our private
          hosting area and may be sent through Brevo for the reply notification. If that delivery route is unavailable,
          FormSubmit may be used as a temporary fallback. An unconverted enquiry is retained for up to 12 months,
          unless a longer period is required for an active project or by law. We do not add you to marketing lists from this form.
        </p>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          Read our <a href="/privacy-policy/" className="font-semibold text-[var(--accent)] underline underline-offset-2">Privacy Policy</a>
          {' '}or contact <a href="mailto:privacy@elan-tech.net" className="font-semibold text-[var(--accent)] underline underline-offset-2">privacy@elan-tech.net</a> to exercise your data rights.
        </p>
      </div>

      <div>
        <label htmlFor="cf-privacy" className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--border)] p-3.5 transition-colors hover:bg-[var(--bg)]">
          <input
            id="cf-privacy"
            type="checkbox"
            aria-required="true"
            aria-describedby={errors.privacyAccepted ? 'cf-privacy-error' : 'contact-form-privacy-summary'}
            {...register('privacyAccepted')}
            className="mt-0.5 h-5 w-5 flex-none rounded border-[var(--border)] accent-[var(--accent)]"
          />
          <span className="text-sm leading-relaxed text-[var(--text-dim)]">
            I have read the enquiry privacy notice and agree that eLan Technology may use my details to respond.
            <span aria-hidden="true" className="text-red-400"> *</span>
          </span>
        </label>
        {errors.privacyAccepted && (
          <p id="cf-privacy-error" role="alert" aria-live="polite" className="mt-1.5 text-xs text-red-400">
            {errors.privacyAccepted.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" aria-live="polite" className="text-xs text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[var(--accent)] py-3 font-semibold text-[var(--bg)] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}
