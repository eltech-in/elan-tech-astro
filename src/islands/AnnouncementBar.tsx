/**
 * AnnouncementBar - dismissible orange top bar for the Digital Launchpad offer.
 *
 * Behaviour:
 *  - Renders nothing if the final offer has expired.
 *  - Renders nothing if user has previously dismissed the final offer.
 *  - Dismiss button sets localStorage and removes the bar (no page reload needed).
 *  - Uses client:load so it mounts immediately, avoiding layout shift from a
 *    delayed hydration strategy.
 *  - WCAG: role="region", aria-label, dismiss button has aria-label, focus ring.
 *  - prefers-reduced-motion: no animations used - just show/hide.
 */

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lp-bar-final';
const OFFER_END = new Date('2026-08-15T18:29:59Z'); // 23:59:59 IST as UTC

export default function AnnouncementBar() {
  // Start hidden to avoid SSR/hydration flicker; show only after mount check.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new Date() > OFFER_END) return;
    if (localStorage.getItem(STORAGE_KEY) === '1') return;
    setVisible(true);
  }, []);

  const dismiss = () => {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (_) { /* private mode */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Digital Launchpad limited-time offer"
      className="relative z-[60] flex items-center justify-center gap-3 px-10 py-2.5 text-sm text-white"
      style={{ background: '#F26722' }}
    >
      {/* Fire emoji - purely decorative */}
      <span aria-hidden="true" className="hidden sm:inline text-base leading-none">🔥</span>

      <p className="text-center leading-snug">
        <strong className="font-bold">Digital Launchpad</strong>
        {' - '}All-in website from ₹28,800.{' '}
        <a
          href="/pricing/digital-launchpad/"
          className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-sm"
        >
          Reserve your slot →
        </a>
        <span className="ml-2 hidden sm:inline opacity-80 text-xs">
          Final offer ends 15 Aug 2026.
        </span>
      </p>

      {/* Dismiss button */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss this announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full opacity-70 hover:opacity-100 hover:bg-white/20 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:opacity-100"
        style={{ minWidth: '28px', minHeight: '28px' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
