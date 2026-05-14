import { useState, useEffect } from 'react';
import RazorpayButton from './RazorpayButton';

export default function AuditPricingButton() {
  const [country, setCountry] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(true);

  useEffect(() => {
    fetch('https://ipapi.co/country/')
      .then((r) => r.text())
      .then((code) => setCountry(code.trim().toUpperCase()))
      .catch(() => setCountry('IN'))
      .finally(() => setDetecting(false));
  }, []);

  const isIndia = !detecting && country === 'IN';
  const isInternational = !detecting && country !== 'IN';

  return (
    <div className="flex flex-col items-start md:items-center text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Flat fee</p>

      {detecting && (
        <div className="mt-2 mb-5 h-14 w-36 rounded-xl bg-[var(--bg-card)] animate-pulse" aria-label="Loading price…" />
      )}

      {isIndia && (
        <>
          <p className="font-heading text-5xl font-extrabold mt-2" style={{ color: 'var(--ac-blue)' }}>₹9,999</p>
          <p className="text-xs text-[var(--text-muted)] mb-5">per domain · PDF + VPAT · 5-day turnaround</p>
          <RazorpayButton
            amount={999900}
            description="ADA / WCAG 2.2 AA Accessibility Audit"
            buttonText="Buy ADA/WCAG Audit"
          />
        </>
      )}

      {isInternational && (
        <>
          <p className="font-heading text-5xl font-extrabold mt-2" style={{ color: 'var(--ac-blue)' }}>$119</p>
          <p className="text-xs text-[var(--text-muted)] mb-5">per domain · PDF + VPAT · 5-day turnaround</p>
          <a
            href="/get-quote?service=ada-audit&currency=usd"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#A855F7] to-[#6366F1] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A855F7]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Get ADA Audit — $119 USD
          </a>
          <p className="mt-2 text-[11px] text-[var(--text-muted)]">Invoice issued · secure payment via wire or card</p>
        </>
      )}

      <p className="mt-4 text-[11px] text-[var(--text-muted)] max-w-[240px]">
        Detailed PDF report with WCAG 2.2 AA findings, severity ratings, code-level remediation and VPAT template.
      </p>
    </div>
  );
}
