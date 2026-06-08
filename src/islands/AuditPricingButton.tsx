import { useState, useEffect, useRef } from 'react';

// Razorpay hosted Payment Button IDs (created in Razorpay dashboard).
// Each has a fixed amount + currency set on Razorpay's side.
const RAZORPAY_BUTTON_INR_9999 = 'pl_Sqm5fZAebJ6xx7';
const RAZORPAY_BUTTON_USD_99 = 'pl_FdcrA4b2oE0mIl';

// Renders a Razorpay hosted Payment Button. Razorpay's payment-button.js
// reads the data-payment_button_id from a <script> nested inside a <form>
// and replaces the script with the actual button UI. We inject via
// useEffect so the script executes (React doesn't run <script> tags
// rendered through JSX reliably).
function HostedPaymentButton({ buttonId }: { buttonId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    form.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.async = true;
    script.setAttribute('data-payment_button_id', buttonId);
    form.appendChild(script);
  }, [buttonId]);

  return <form ref={formRef} />;
}

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
          <HostedPaymentButton buttonId={RAZORPAY_BUTTON_INR_9999} />
        </>
      )}

      {isInternational && (
        <>
          <p className="font-heading text-5xl font-extrabold mt-2" style={{ color: 'var(--ac-blue)' }}>$99</p>
          <p className="text-xs text-[var(--text-muted)] mb-5">per domain · PDF + VPAT · 5-day turnaround</p>
          <HostedPaymentButton buttonId={RAZORPAY_BUTTON_USD_99} />
        </>
      )}

      <p className="mt-4 text-[11px] text-[var(--text-muted)] max-w-[240px]">
        Detailed PDF report with WCAG 2.2 AA findings, severity ratings, code-level remediation and VPAT template.
      </p>
    </div>
  );
}
