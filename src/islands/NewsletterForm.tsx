import { useState, type FormEvent } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setMessage("You're subscribed! Thank you for joining.");
        setEmail('');
      } else {
        throw new Error('Server error');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Newsletter subscription form"
        className="flex flex-col sm:flex-row gap-2"
      >
        <div className="flex-1">
          <label htmlFor="nl-email" className="block text-sm font-medium text-[var(--text-dim)] mb-1">
            Your email address
          </label>
          <input
            id="nl-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            placeholder="you@example.com"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-bold text-[#0A0E1A] hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-all whitespace-nowrap flex items-center gap-2"
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </form>

      {/* Live feedback */}
      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-2 text-xs ${status === 'success' ? 'text-[var(--accent)]' : 'text-red-400'}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
