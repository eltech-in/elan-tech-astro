import { useState, useEffect, useRef } from 'react';

// Target: August 15, 2026 23:59:59 IST (final offer close)
const OFFER_END = new Date('2026-08-15T23:59:59+05:30');

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
  expired: boolean;
}

function getTimeLeft(): TimeLeft {
  const diff = OFFER_END.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, expired: true };
  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins  = Math.floor((diff / (1000 * 60)) % 60);
  const secs  = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs, expired: false };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft);
  const [reducedMotion, setReducedMotion] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [reducedMotion]);

  // ── Expired state ────────────────────────────────────────────────────────
  if (time.expired) {
    return (
      <div
        aria-label="Offer countdown timer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          borderRadius: '999px',
          border: '1px solid rgba(242,103,34,0.3)',
          background: 'rgba(242,103,34,0.06)',
          color: 'var(--text-muted)',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        This offer has ended.
      </div>
    );
  }

  // ── Reduced-motion: static text ──────────────────────────────────────────
  if (reducedMotion) {
    return (
      <div
        aria-label="Offer countdown timer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '10px 20px',
          borderRadius: '999px',
          border: '1px solid rgba(242,103,34,0.4)',
          background: 'rgba(242,103,34,0.07)',
          color: 'var(--text-dim)',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        🎉 Offer ends on our 21st Anniversary — Aug 15, 2026
      </div>
    );
  }

  // ── Live ticking timer ───────────────────────────────────────────────────
  const units = [
    { label: 'Days',  value: time.days  },
    { label: 'Hours', value: time.hours },
    { label: 'Mins',  value: time.mins  },
    { label: 'Secs',  value: time.secs  },
  ];

  return (
    <div aria-label="Offer countdown timer">
      <div
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '12px 24px',
          borderRadius: '999px',
          border: '1px solid rgba(242,103,34,0.45)',
          background: 'rgba(242,103,34,0.07)',
          boxShadow: '0 0 24px rgba(242,103,34,0.12)',
        }}
      >
        {units.map((u, i) => (
          <span
            key={u.label}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            {/* Separator colon */}
            {i > 0 && (
              <span
                aria-hidden="true"
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: '#F26722',
                  lineHeight: 1,
                  padding: '0 2px',
                  opacity: 0.7,
                  fontFamily: 'var(--font-heading, Sora, sans-serif)',
                }}
              >
                :
              </span>
            )}

            {/* Unit block */}
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '52px' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: '#F26722',
                  fontFamily: 'var(--font-heading, Sora, sans-serif)',
                  letterSpacing: '-0.02em',
                }}
              >
                {pad(u.value)}
              </span>
              <span
                aria-hidden="true"
                style={{
                  display: 'block',
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  marginTop: '2px',
                }}
              >
                {u.label}
              </span>
              {/* Screen-reader only label */}
              <span className="sr-only">{`${u.value} ${u.label.toLowerCase()}`}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
