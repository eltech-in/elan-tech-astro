import { useEffect, useRef, useState, useCallback } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

interface Props {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={star <= rating ? 'text-yellow-400' : 'text-[var(--border)]'}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCarousel({ testimonials }: Props) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const total = testimonials.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  function startInterval() {
    if (reduced) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
  }

  function stopInterval() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    if (!isPaused) startInterval();
    return stopInterval;
  }, [isPaused, total]);

  if (!testimonials || testimonials.length === 0) return null;

  const item = testimonials[current];

  return (
    <section
      role="region"
      aria-label="Customer testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative"
    >
      {/* Slide content */}
      <div aria-live="polite" aria-atomic="true" className="min-h-[220px] flex flex-col justify-center">
        <blockquote className="text-center">
          <StarRating rating={item.rating} />
          <p className="mt-4 text-lg text-[var(--text)] leading-relaxed italic max-w-3xl mx-auto">
            &ldquo;{item.quote}&rdquo;
          </p>
          <footer className="mt-6">
            <cite className="not-italic">
              <span className="block font-bold text-[var(--text)]">{item.author}</span>
              <span className="text-sm text-[var(--text-muted)]">
                {item.role} — {item.company}
              </span>
            </cite>
          </footer>
        </blockquote>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* Prev */}
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => goTo(current - 1)}
          className="rounded-full border border-[var(--border)] p-2 text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`Go to testimonial ${i + 1}`}
              aria-selected={i === current}
              aria-current={i === current ? 'true' : undefined}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                i === current
                  ? 'bg-[var(--accent)] scale-125'
                  : 'bg-[var(--border)] hover:bg-[var(--text-muted)]'
              }`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => goTo(current + 1)}
          className="rounded-full border border-[var(--border)] p-2 text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Pause/Play */}
        {!reduced && (
          <button
            type="button"
            aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            onClick={() => setIsPaused((p) => !p)}
            className="rounded-full border border-[var(--border)] p-2 text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          >
            {isPaused ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
              </svg>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
