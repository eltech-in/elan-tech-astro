import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const essentialBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      // Focus first button when dialog appears
      const raf = requestAnimationFrame(() => {
        essentialBtnRef.current?.focus();
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [visible]);

  function accept(type: 'essential' | 'all') {
    localStorage.setItem(STORAGE_KEY, type);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      className="cookie-consent fixed bottom-0 left-0 right-0 z-[9999] border-t border-[var(--border)] bg-[var(--bg-card)]/95 backdrop-blur-md px-4 py-4 shadow-2xl"
    >
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="flex-1">
          <p id="cookie-title" className="text-sm font-semibold text-[var(--text)] mb-1">
            We use cookies
          </p>
          <p className="text-xs text-[var(--text-dim)] leading-relaxed">
            We use cookies to improve your experience, analyze traffic, and personalize content.
            You can choose to accept only essential cookies or all cookies.{' '}
            <a href="/privacy-policy" className="underline hover:text-[var(--accent)] transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            ref={essentialBtnRef}
            type="button"
            onClick={() => accept('essential')}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--text)] hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => accept('all')}
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[#0A0E1A] hover:opacity-90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
