import { useState, useEffect } from 'react';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

interface Props {
  amount: number; // in paise (e.g. 499900 = ₹4,999)
  name?: string;
  description?: string;
  buttonText?: string;
}

export default function RazorpayButton({
  amount,
  name = 'eLan Technology',
  description = 'ADA / WCAG Accessibility Audit',
  buttonText = 'Buy ADA/WCAG Audit',
}: Props) {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (document.querySelector('script[src*="checkout.razorpay.com"]')) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!scriptLoaded || !window.Razorpay) return;

    const key = (import.meta as Record<string, Record<string, string>>).env?.PUBLIC_RAZORPAY_KEY_ID;
    if (!key) {
      alert('Payment gateway is being configured. Please contact us directly.');
      return;
    }

    setLoading(true);

    const options = {
      key,
      amount,
      currency: 'INR',
      name,
      description,
      image: '/images/elan-tech-logo.svg',
      handler: (response: { razorpay_payment_id: string }) => {
        setLoading(false);
        window.location.href = `/thank-you?payment_id=${response.razorpay_payment_id}&service=ada-audit`;
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      theme: {
        color: '#00E5A0',
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const displayAmount = `₹${(amount / 100).toLocaleString('en-IN')}`;

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading || !scriptLoaded}
      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#A855F7] to-[#6366F1] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A855F7]"
      aria-label={`${buttonText} for ${displayAmount}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Processing...
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          {buttonText} — {displayAmount}
        </>
      )}
    </button>
  );
}
