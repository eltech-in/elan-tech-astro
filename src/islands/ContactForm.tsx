import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
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
  'Maintenance & Security',
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

  async function onSubmit(data: FormValues) {
    setStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        reset();
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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

      {/* Phone + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-medium text-[var(--text)] mb-1.5">Phone</label>
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
          <label htmlFor="cf-company" className="block text-sm font-medium text-[var(--text)] mb-1.5">Company</label>
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
        <label htmlFor="cf-website" className="block text-sm font-medium text-[var(--text)] mb-1.5">Website URL</label>
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
        <label htmlFor="cf-service" className="block text-sm font-medium text-[var(--text)] mb-1.5">Service</label>
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
          aria-describedby={errors.message ? 'cf-message-error' : undefined}
          {...register('message')}
          className={inputClass}
          placeholder="Tell us about your project..."
        />
        {errors.message && (
          <p id="cf-message-error" role="alert" aria-live="polite" className="mt-1 text-xs text-red-400">
            {errors.message.message}
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
        className="w-full rounded-lg bg-[var(--accent)] py-3 font-semibold text-[#0A0E1A] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] flex items-center justify-center gap-2"
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

