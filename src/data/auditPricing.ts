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

/**
 * Website packages (pricing page and country pages), international premium prices chosen by
 * eLan Technology on 23 November 2026. Enterprise is always quoted.
 */
export const PACKAGE_PRICES = {
  starter: { INR: 20999, USD: 590, CAD: 790, AUD: 890, NZD: 990, JPY: 89000, AED: 2190, GBP: 469, EUR: 549 },
  professional: { INR: 30999, USD: 1190, CAD: 1590, AUD: 1790, NZD: 1990, JPY: 179000, AED: 4390, GBP: 949, EUR: 1099 },
} as const satisfies Record<string, Record<Currency, number>>;

/**
 * What can be paid online, in every currency (Razorpay international payments are enabled).
 * public/api/payments-common.php must charge exactly these amounts (verify-build.mjs checks it).
 * The booking advance uses the same table as the accessibility audit (US$99 base).
 */
export const PAY_PRICES = {
  'website-audit': AUDIT_PRICES.website,
  'accessibility-audit': { ...AUDIT_PRICES.accessibility, INR: 9999 },
  'booking-advance': { ...AUDIT_PRICES.accessibility, INR: 9999 },
} as const satisfies Record<string, Record<Currency, number>>;
export type PayProduct = keyof typeof PAY_PRICES;
export const CURRENCIES: Currency[] = ['INR', 'USD', 'CAD', 'AUD', 'NZD', 'JPY', 'AED', 'GBP', 'EUR'];

/** The visitor's currency from the device time zone (no location lookup). Mirrors BaseLayout's script. */
export function currencyFromTimeZone(tz: string): Currency {
  if (/^Asia\/(Kolkata|Calcutta)$/.test(tz)) return 'INR';
  if (tz === 'Asia/Dubai') return 'AED';
  if (/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal|Moncton|Whitehorse|Yellowknife|Iqaluit|Glace_Bay|Goose_Bay|Swift_Current|Dawson_Creek|Fort_Nelson|Rankin_Inlet|Resolute|Cambridge_Bay|Inuvik|Atikokan|Thunder_Bay|Nipigon|Rainy_River)$/.test(tz)) return 'CAD';
  if (/^(America\/|Pacific\/Honolulu$)/.test(tz)) return 'USD';
  if (/^Australia\//.test(tz)) return 'AUD';
  if (/^Pacific\/(Auckland|Chatham)$/.test(tz)) return 'NZD';
  if (tz === 'Asia/Tokyo') return 'JPY';
  if (/^Europe\/(London|Belfast|Guernsey|Jersey|Isle_of_Man)$/.test(tz)) return 'GBP';
  if (/^Europe\//.test(tz)) return 'EUR';
  return tz ? 'USD' : 'INR';
}

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
