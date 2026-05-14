import { useEffect, useRef, useState } from 'react';

interface Stat {
  end: number;
  suffix: string;
  label: string;
  sub: string;
  kind: 'spark' | 'ring' | 'bars' | 'arrow';
  color: string; // CSS var
}

const stats: Stat[] = [
  {
    end: new Date().getFullYear() - 2002,
    suffix: '+',
    label: 'Years of craft',
    sub: 'Founded 2002',
    kind: 'arrow',
    color: 'var(--ac-teal)',
  },
  {
    end: 500,
    suffix: '+',
    label: 'Clients served',
    sub: 'Across industries',
    kind: 'spark',
    color: 'var(--ac-indigo)',
  },
  {
    end: 1200,
    suffix: '+',
    label: 'Projects delivered',
    sub: 'On time, on scope',
    kind: 'bars',
    color: 'var(--ac-amber)',
  },
  {
    end: 10,
    suffix: '+',
    label: 'Countries reached',
    sub: 'Across 6 continents',
    kind: 'ring',
    color: 'var(--ac-pink)',
  },
];

function useCountUp(end: number) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setCount(end);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);

  useEffect(() => {
    if (!started) return;
    const dur = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, end]);

  return { count, ref, started };
}

function Sparkline({ color, active }: { color: string; active: boolean }) {
  const points = [30, 24, 28, 20, 24, 16, 22, 12, 18, 10, 14, 6];
  const d = points
    .map((y, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * 96} ${y}`)
    .join(' ');
  return (
    <svg width="96" height="32" viewBox="0 0 96 32" aria-hidden="true" style={{ overflow: 'visible' }}>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="200"
        strokeDashoffset={active ? '0' : '200'}
        style={{ transition: 'stroke-dashoffset 1.6s ease-out' }}
      />
    </svg>
  );
}

function Bars({ color, active }: { color: string; active: boolean }) {
  const heights = [8, 14, 10, 20, 16, 26];
  return (
    <svg width="96" height="32" viewBox="0 0 96 32" aria-hidden="true">
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 16}
          y={active ? 32 - h : 32}
          width="10"
          height={active ? h : 0}
          rx="2"
          fill={color}
          style={{ transition: `y 700ms ${i * 80}ms ease-out, height 700ms ${i * 80}ms ease-out` }}
        />
      ))}
    </svg>
  );
}

function Ring({ color, active }: { color: string; active: boolean }) {
  const r = 14;
  const c = 2 * Math.PI * r;
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r={r} fill="none" stroke={color} strokeOpacity="0.18" strokeWidth="3"/>
      <circle
        cx="18"
        cy="18"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={active ? c * 0.15 : c}
        transform="rotate(-90 18 18)"
        style={{ transition: 'stroke-dashoffset 1.6s ease-out' }}
      />
    </svg>
  );
}

function Arrow({ color, active }: { color: string; active: boolean }) {
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" aria-hidden="true">
      <path
        d="M 4 28 L 20 12 L 28 20 L 36 10"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="60"
        strokeDashoffset={active ? 0 : 60}
        style={{ transition: 'stroke-dashoffset 1.4s ease-out' }}
      />
      <path
        d="M 30 10 L 36 10 L 36 16"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={active ? 1 : 0}
        style={{ transition: 'opacity 500ms 1.2s ease-out' }}
      />
    </svg>
  );
}

function Tile({ stat }: { stat: Stat }) {
  const { count, ref, started } = useCountUp(stat.end);
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 md:p-7"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-20 blur-3xl"
        style={{ background: stat.color }}
      />
      <div className="relative flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <span
            className="font-heading text-4xl md:text-5xl font-extrabold leading-none"
            style={{ color: stat.color }}
          >
            {count}
            {stat.suffix}
          </span>
          <div className="shrink-0">
            {stat.kind === 'spark' && <Sparkline color={stat.color} active={started} />}
            {stat.kind === 'bars' && <Bars color={stat.color} active={started} />}
            {stat.kind === 'ring' && <Ring color={stat.color} active={started} />}
            {stat.kind === 'arrow' && <Arrow color={stat.color} active={started} />}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">{stat.label}</p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{stat.sub}</p>
        </div>
      </div>
    </div>
  );
}

export default function StatsRebuild() {
  return (
    <div className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {stats.map((s) => (
        <Tile key={s.label} stat={s} />
      ))}
    </div>
  );
}
