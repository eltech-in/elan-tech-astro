/**
 * Paid audit prices, from 15 November 2026. Nothing on the site is free any more.
 *
 * India pays the INR price. Other countries pay international prices chosen by eLan Technology on
 * 16 November 2026: clean local price points above a straight conversion of the INR price.
 * Change any value here and every page, CTA and schema node updates on the next build.
 *
 * Pages show INR by default; a small script in BaseLayout switches to the visitor's currency from
 * their device time zone (no IP lookup). Country pages pin their own currency (UAE = AED, etc.).
 */
export type Currency = 'INR' | 'USD' | 'CAD' | 'AUD' | 'NZD' | 'JPY' | 'AED' | 'GBP' | 'EUR';

export const AUDIT_PRICES = {
  /** Website audit: public-page review of SEO, speed, mobile and public security signals. */
  website: { INR: 999, USD: 19, CAD: 25, AUD: 29, NZD: 29, JPY: 2900, AED: 69, GBP: 15, EUR: 19 },
  /** Accessibility (ADA / WCAG) audit: starting price; the final fee depends on pages and journeys. */
  accessibility: { INR: 4999, USD: 99, CAD: 139, AUD: 149, NZD: 169, JPY: 14900, AED: 369, GBP: 79, EUR: 89 },
} as const satisfies Record<string, Record<Currency, number>>;

export type AuditKind = keyof typeof AUDIT_PRICES;

const SYMBOL: Record<Currency, string> = {
  INR: '₹', USD: 'US$', CAD: 'C$', AUD: 'A$', NZD: 'NZ$', JPY: '¥', AED: 'AED ', GBP: '£', EUR: '€',
};

export function formatPrice(amount: number, currency: Currency): string {
  return SYMBOL[currency] + amount.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US');
}

export const auditPrice = (kind: AuditKind, currency: Currency = 'INR') => formatPrice(AUDIT_PRICES[kind][currency], currency);

/** Country slug (src/data/countries.ts) to the currency its page shows. */
export const COUNTRY_CURRENCY: Record<string, Currency> = {
  india: 'INR', usa: 'USD', canada: 'CAD', australia: 'AUD', 'new-zealand': 'NZD', japan: 'JPY', 'dubai-uae': 'AED',
  uk: 'GBP', 'united-kingdom': 'GBP', 'european-union': 'EUR',
};
export const currencyForCountry = (slug: string): Currency => COUNTRY_CURRENCY[slug] ?? 'USD';

/** Symbols and grouping, shared with the browser script that localises prices. */
export const PRICE_SYMBOLS = SYMBOL;
