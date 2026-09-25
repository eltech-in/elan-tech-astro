import { useCallback, useEffect, useState, type FocusEvent } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating?: number;
  industry?: string;
  source: string;
}

interface Props {
  testimonials: Testimonial[];
}

const AUTOPLAY_DELAY = 6500;

function StarRating({ rating }: { rating: number }) {
  return (
    <div role="img" aria-label={`${rating} out of 5 stars`} className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill={star <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={star <= rating ? 'text-amber-400' : 'text-[var(--border)]'}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function sourceStyle(source: string): string {
  if (source === 'Google review') return 'border-amber-400/30 bg-amber-400/10 text-amber-700 dark:text-amber-300';
  if (source === 'LinkedIn recommendation') return 'border-blue-400/30 bg-blue-400/10 text-blue-700 dark:text-blue-300';
  return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300';
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function TestimonialCarousel({ testimonials }: Props) {
  const [current, setCurrent] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const total = testimonials.length;
  const paused = manualPaused || interactionPaused;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  const goTo = useCallback((index: number) => {
    if (total > 0) setCurrent(((index % total) + total) % total);
  }, [total]);

  useEffect(() => {
    if (total < 2 || paused || reducedMotion) return;
    const timer = window.setTimeout(() => setCurrent((value) => (value + 1) % total), AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [current, paused, reducedMotion, total]);

  if (total === 0) return null;

  const visibleCount = Math.min(total, 3);
  const visibleItems = Array.from({ length: visibleCount }, (_, offset) => ({
    item: testimonials[(current + offset) % total],
    offset,
  }));

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setInteractionPaused(false);
    }
  }

  return (
    <section
      aria-label="Client testimonial carousel"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={handleBlur}
      className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.35)] sm:p-6 lg:p-8"
    >
      <style>{`
        @keyframes testimonial-card-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-card { animation: none !important; }
        }
      `}</style>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -bottom-28 right-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <svg className="absolute right-8 top-5 h-24 w-24 text-[var(--accent)] opacity-[0.07]" viewBox="0 0 80 80" fill="currentColor">
          <path d="M10 42C10 24 19 13 37 9v13c-8 3-12 8-13 15h13v31H10V42Zm38 0c0-18 9-29 27-33v13c-8 3-12 8-13 15h13v31H48V42Z" />
        </svg>
      </div>

      <div className="relative mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Client voices</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Rotating through {total} approved testimonials, with three visible on larger screens</p>
        </div>
        <a href="/testimonials/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text)] transition hover:text-[var(--accent)]">
          Read all testimonials
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <div aria-live={paused ? 'polite' : 'off'} className="relative grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map(({ item, offset }) => (
          <blockquote
            key={`${current}-${offset}-${item.author}`}
            className={`testimonial-card relative min-h-[330px] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)]/85 p-6 shadow-sm backdrop-blur-sm ${offset === 0 ? 'flex' : offset === 1 ? 'hidden md:flex' : 'hidden xl:flex'}`}
            style={{ animation: `testimonial-card-in 500ms ease-out ${offset * 80}ms both` }}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className={`inline-flex rounded-lg border px-2.5 py-1 text-[11px] font-bold ${sourceStyle(item.source)}`}>{item.source}</span>
              {item.rating ? <StarRating rating={item.rating} /> : <span className="text-3xl font-bold leading-none text-[var(--accent)]/25" aria-hidden="true">“</span>}
            </div>

            <p className="flex-1 text-[15px] leading-7 text-[var(--text)] sm:text-base">“{item.quote}”</p>

            <footer className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-500 text-sm font-bold text-white shadow-md" aria-hidden="true">
                {initials(item.author)}
              </div>
              <cite className="min-w-0 not-italic">
                <span className="block truncate font-bold text-[var(--text)]">{item.author}</span>
                <span className="block truncate text-xs text-[var(--text-muted)]">{item.role}, {item.company}</span>
                {item.industry && <span className="mt-1 block text-[11px] font-semibold text-[var(--accent)]">{item.industry}</span>}
              </cite>
            </footer>
          </blockquote>
        ))}
      </div>

      <div className="relative mt-6 flex flex-col gap-4 border-t border-[var(--border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="shrink-0 text-xs font-semibold tabular-nums text-[var(--text-muted)]">{current + 1} / {total}</span>
          <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--border)]" aria-hidden="true">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 transition-[width] duration-500" style={{ width: `${((current + 1) / total) * 100}%` }} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous testimonials" onClick={() => goTo(current - 1)} className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--border)] px-3 text-sm font-semibold text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            <span className="hidden sm:inline">Previous</span>
          </button>
          {!reducedMotion && (
            <button type="button" aria-label={manualPaused ? 'Resume testimonial carousel' : 'Pause testimonial carousel'} aria-pressed={manualPaused} onClick={() => setManualPaused((value) => !value)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] px-3 text-sm font-semibold text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
              {manualPaused ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m7 4 13 8-13 8V4Z" /></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
              )}
              <span>{manualPaused ? 'Play' : 'Pause'}</span>
            </button>
          )}
          <button type="button" aria-label="Next testimonials" onClick={() => goTo(current + 1)} className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--border)] px-3 text-sm font-semibold text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]">
            <span className="hidden sm:inline">Next</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
