import { useEffect, useState } from 'react';

/**
 * KineticPhrase
 * Rotating phrase with a gradient treatment. Cycles through values,
 * respects prefers-reduced-motion (shows first value only), and
 * uses aria-live="polite" so assistive tech announces changes calmly.
 */
interface Props {
  phrases: string[];
  intervalMs?: number;
}

export default function KineticPhrase({ phrases, intervalMs = 2400 }: Props) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return; // freeze on first phrase

    const id = window.setInterval(() => {
      setAnimating(true);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % phrases.length);
        setAnimating(false);
      }, 260); // fade-out duration before swap
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [phrases.length, intervalMs]);

  return (
    <span
      aria-live="polite"
      aria-atomic="true"
      className="kinetic-phrase"
      style={{
        display: 'inline-block',
        background: 'linear-gradient(to right, var(--ac-teal), var(--ac-indigo))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        transition: 'opacity 260ms ease, transform 260ms ease',
        opacity: animating ? 0 : 1,
        transform: animating ? 'translateY(-6px)' : 'translateY(0)',
        willChange: 'opacity, transform',
      }}
    >
      {phrases[index]}
    </span>
  );
}
