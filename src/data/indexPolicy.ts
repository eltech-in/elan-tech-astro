/**
 * Which location pages are allowed in Google's index.
 *
 * Rule: a city or country page is indexable only when eLan can point to real
 * delivery for that place, or when the owner is actively entering that market
 * and the page says plainly that no local client work is claimed. Everything else stays live for visitors who land
 * on it but is marked noindex and kept out of the sitemap, so the site is not
 * asking Google to rank dozens of near-identical location pages.
 *
 * This file is the single source of truth. CityLayout and InternationalLayout
 * read it for the robots meta, and astro.config.mjs reads it for the sitemap
 * filter. A new location page is noindex until its slug is added here.
 *
 * Evidence behind each entry (owner-confirmed, 2026-11-05):
 *   Cities    nagpur (HQ), pune and raipur (delivered projects)
 *   Countries usa and canada (20 years of client work, much of it under NDA),
 *             australia (Rushmore Group), japan (one launched project, more
 *             in progress), new-zealand (Auckland project in the portfolio)
 * Market entry (owner decision, 2026-11-12):
 *   dubai-uae  owner visits Dubai in December 2026; the page states "not UAE
 *              client claims" and names no UAE office or project
 */
export const INDEXED_CITY_SLUGS = ['nagpur', 'pune', 'raipur'] as const;

export const INDEXED_COUNTRY_SLUGS = ['usa', 'canada', 'australia', 'japan', 'new-zealand', 'dubai-uae'] as const;

const indexed = new Set<string>([...INDEXED_CITY_SLUGS, ...INDEXED_COUNTRY_SLUGS]);

/** True when /web-design-company-<slug>/ should be indexable. */
export function isIndexedLocationSlug(slug: string): boolean {
  return indexed.has(slug);
}
