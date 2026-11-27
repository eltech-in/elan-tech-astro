/**
 * Paid audit prices, from 15 November 2026. Nothing on the site is free any more.
 *
 * India pays the INR price (ADA / WCAG accessibility services are international only and have no INR
 * price). Other countries pay international prices chosen by eLan Technology on
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
  /** Accessibility quick check (ADA / WCAG). International only: no INR price (see ACCESSIBILITY_PRICES). */
  accessibility: { USD: 99, CAD: 139, AUD: 149, NZD: 169, JPY: 14900, AED: 369, GBP: 79, EUR: 89 },
} as const satisfies Record<string, Partial<Record<Currency, number>>>;

/** Currencies the ADA / WCAG accessibility services are sold in. */
export type IntlCurrency = Exclude<Currency, 'INR'>;

/**
 * ADA / WCAG accessibility price ladder (owner, 27 Nov 2026). These services are for the US and other
 * international markets only, so there is no INR price; visitors in India see US dollars. Local prices
 * follow the same ratios as the quick check, rounded to clean price points.
 */
export const ACCESSIBILITY_PRICES = {
  /** Automated scan plus manual spot checks of the homepage and one key journey. Paid online. */
  quickCheck: AUDIT_PRICES.accessibility,
  /** Full WCAG 2.2 AA audit and remediation plan, up to about 10 page templates and 2 to 3 journeys. */
  audit: { USD: 1500, CAD: 2090, AUD: 2290, NZD: 2590, JPY: 225000, AED: 5590, GBP: 1190, EUR: 1290 },
  remediationFrom: { USD: 2500, CAD: 3490, AUD: 3790, NZD: 4290, JPY: 375000, AED: 9290, GBP: 1990, EUR: 2190 },
  remediationTo: { USD: 8000, CAD: 11190, AUD: 11990, NZD: 13690, JPY: 1200000, AED: 29790, GBP: 6390, EUR: 7190 },
  redesignFrom: { USD: 3000, CAD: 4190, AUD: 4490, NZD: 5090, JPY: 450000, AED: 11190, GBP: 2390, EUR: 2690 },
  redesignTo: { USD: 12000, CAD: 16790, AUD: 18090, NZD: 20490, JPY: 1800000, AED: 44690, GBP: 9590, EUR: 10790 },
  /** Accessibility Conformance Report (VPAT template), after an audit. */
  acr: { USD: 750, CAD: 1090, AUD: 1190, NZD: 1290, JPY: 115000, AED: 2790, GBP: 599, EUR: 669 },
  /** Monitoring, per month. */
  monitoring: { USD: 199, CAD: 279, AUD: 299, NZD: 339, JPY: 29900, AED: 739, GBP: 159, EUR: 179 },
  /** One quarterly retest. */
  retest: { USD: 499, CAD: 699, AUD: 749, NZD: 849, JPY: 74900, AED: 1890, GBP: 399, EUR: 449 },
} as const satisfies Record<string, Record<IntlCurrency, number>>;

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
 * The accessibility quick check has no INR price (international only); the booking advance has every currency.
 */
export const PAY_PRICES = {
  'website-audit': AUDIT_PRICES.website,
  /** The accessibility quick check: international currencies only. */
  'accessibility-audit': AUDIT_PRICES.accessibility,
  'booking-advance': { INR: 9999, USD: 99, CAD: 139, AUD: 149, NZD: 169, JPY: 14900, AED: 369, GBP: 79, EUR: 89 },
} as const satisfies Record<string, Partial<Record<Currency, number>>>;
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

/** The currency a price table is shown in: the requested one if the table has it, otherwise US dollars. */
export const priceCurrency = (prices: Readonly<Partial<Record<Currency, number>>>, currency: Currency = 'INR'): Currency =>
  prices[currency] != null ? currency : 'USD';
/** Format a price from a table, falling back to US dollars when the table has no price in that currency. */
export const tablePrice = (prices: Readonly<Partial<Record<Currency, number>>>, currency: Currency = 'INR'): string => {
  const cur = priceCurrency(prices, currency);
  return formatPrice(prices[cur] as number, cur);
};
export const auditPrice = (kind: AuditKind, currency: Currency = 'INR') => tablePrice(AUDIT_PRICES[kind], currency);

/** Country slug (src/data/countries.ts) to the currency its page shows. */
export const COUNTRY_CURRENCY: Record<string, Currency> = {
  india: 'INR', usa: 'USD', canada: 'CAD', australia: 'AUD', 'new-zealand': 'NZD', japan: 'JPY', 'dubai-uae': 'AED',
  uk: 'GBP', 'united-kingdom': 'GBP', 'european-union': 'EUR',
};
export const currencyForCountry = (slug: string): Currency => COUNTRY_CURRENCY[slug] ?? 'USD';

/** Symbols and grouping, shared with the browser script that localises prices. */
export const PRICE_SYMBOLS = SYMBOL;
