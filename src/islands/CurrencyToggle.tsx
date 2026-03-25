import { useEffect, useState } from 'react';

type CurrencyCode = 'INR' | 'USD' | 'AUD' | 'AED' | 'GBP';

const CURRENCIES: { code: CurrencyCode; symbol: string; label: string }[] = [
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'AED', symbol: 'AED', label: 'UAE Dirham' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
];

const STORAGE_KEY = 'preferred-currency';

export default function CurrencyToggle() {
  const [selected, setSelected] = useState<CurrencyCode>('INR');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (stored && CURRENCIES.find((c) => c.code === stored)) {
      setSelected(stored);
    }
  }, []);

  function selectCurrency(code: CurrencyCode) {
    setSelected(code);
    localStorage.setItem(STORAGE_KEY, code);
    window.dispatchEvent(new CustomEvent('currencyChange', { detail: { currency: code } }));
  }

  return (
    <div
      role="group"
      aria-label="Select currency"
      className="flex flex-wrap gap-1"
    >
      {CURRENCIES.map(({ code, symbol, label }) => (
        <button
          key={code}
          type="button"
          aria-pressed={selected === code}
          aria-label={`${label} (${code})`}
          onClick={() => selectCurrency(code)}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
            selected === code
              ? 'bg-[var(--accent)] text-[#0A0E1A]'
              : 'border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
          }`}
        >
          {symbol} {code}
        </button>
      ))}
    </div>
  );
}
