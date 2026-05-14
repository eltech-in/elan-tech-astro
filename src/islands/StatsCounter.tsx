import { useEffect, useRef, useState } from 'react';

const stats = [
  { label: 'Years of Excellence', end: new Date().getFullYear() - 2002, suffix: '+' },
  { label: 'Clients Served', end: 500, suffix: '+' },
  { label: 'Projects Delivered', end: 1200, suffix: '+' },
  { label: 'Countries Reached', end: 25, suffix: '+' },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) {
      setCount(end);
      return;
    }
    if (started) return;

    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || reduced) return;
    const duration = 1500;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [started, end, reduced]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 max-w-5xl mx-auto px-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#00E5A0] to-[#6366F1] bg-clip-text text-transparent mb-2">
            <CountUp end={stat.end} suffix={stat.suffix} />
          </div>
          <p className="text-sm text-[var(--text-dim)] font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
