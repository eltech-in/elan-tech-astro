// JSON-LD Schema generator functions for every page type
// Used by SEOHead.astro and SchemaMarkup.astro

const SITE_URL = 'https://elan-tech.net';
const ORG_NAME = 'eLan Technology';
const OFFICE_PHONE = '+91-9822231642';
const WHATSAPP_PHONE = '+91-8788834630';
const STREET_ADDRESS = 'Basement Floor, PTG IT Park, Plot No. 21, IT Park Rd, Gayatri Nagar';
const ADDRESS_LOCALITY = 'Nagpur';
const ADDRESS_REGION = 'Maharashtra';
const POSTAL_CODE = '440022';
const ADDRESS_COUNTRY = 'IN';

// ─── WebSite (Homepage — enables sitelinks search box) ───────────────────────
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ORG_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ─── Organization (Homepage) ──────────────────────────────────────────────────
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORG_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/elan-tech-logo.svg`,
      width: 200,
      height: 50,
    },
    foundingDate: '2002',
    description:
      'Award-winning web design & digital marketing agency. Building impactful digital experiences since 2002.',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET_ADDRESS,
      addressLocality: ADDRESS_LOCALITY,
      addressRegion: ADDRESS_REGION,
      postalCode: POSTAL_CODE,
      addressCountry: ADDRESS_COUNTRY,
    },
    telephone: OFFICE_PHONE,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: OFFICE_PHONE,
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi', 'Marathi'],
        areaServed: 'IN',
      },
      {
        '@type': 'ContactPoint',
        telephone: WHATSAPP_PHONE,
        contactType: 'sales',
        availableLanguage: ['English', 'Hindi', 'Marathi'],
        contactOption: 'TollFree',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/elan-technology',
      'https://www.facebook.com/eLanTechnology',
      'https://www.instagram.com/elan_tech',
      'https://x.com/eLanTechnology',
      'https://www.youtube.com/c/eLanTechnology',
    ],
  };
}

// ─── LocalBusiness (City landing pages) ──────────────────────────────────────
export interface LocalBusinessOverrides {
  city?: string;
  geo?: { latitude: number; longitude: number };
  telephone?: string;
  url?: string;
  description?: string;
}

export function localBusinessSchema(city = 'Nagpur', overrides: LocalBusinessOverrides = {}) {
  const defaultGeo = { latitude: 21.1458, longitude: 79.0882 };
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: `${ORG_NAME} — Web Design Company in ${city}`,
    url: overrides.url ?? SITE_URL,
    telephone: overrides.telephone ?? OFFICE_PHONE,
    email: 'info@elan-tech.net',
    description:
      overrides.description ??
      `Professional web design & digital marketing services in ${city}. WCAG/ADA compliant websites.`,
    priceRange: '₹₹',
    image: `${SITE_URL}/images/elan-tech-logo.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET_ADDRESS,
      addressLocality: city,
      addressRegion: ADDRESS_REGION,
      postalCode: POSTAL_CODE,
      addressCountry: ADDRESS_COUNTRY,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: overrides.geo?.latitude ?? defaultGeo.latitude,
      longitude: overrides.geo?.longitude ?? defaultGeo.longitude,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: OFFICE_PHONE,
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi', 'Marathi'],
      },
      {
        '@type': 'ContactPoint',
        telephone: WHATSAPP_PHONE,
        contactType: 'sales',
        availableLanguage: ['English', 'Hindi', 'Marathi'],
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/elan-technology',
      'https://www.facebook.com/eLanTechnology',
      'https://www.instagram.com/elantechnology',
      'https://twitter.com/elantechnology',
      'https://www.youtube.com/@elantechnology',
    ],
  };
}

// ─── Service-area (non-HQ city landing pages) ────────────────────────────────
// Use this on every city page that ISN'T the Nagpur HQ. Declares we serve the
// area without claiming a physical address there — avoids NAP pollution that
// would otherwise tell Google our office exists in every city.
export interface ServiceAreaOverrides {
  url?: string;
  description?: string;
  geo?: { latitude: number; longitude: number };
}

export function serviceAreaBusinessSchema(
  city: string,
  state: string,
  overrides: ServiceAreaOverrides = {}
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${ORG_NAME} — Web Design Company serving ${city}`,
    url: overrides.url ?? SITE_URL,
    telephone: OFFICE_PHONE,
    email: 'info@elan-tech.net',
    description:
      overrides.description ??
      `Professional web design & digital marketing services for businesses in ${city}, ${state}. Remote delivery from our Nagpur HQ. WCAG/ADA compliant. Since 2002.`,
    priceRange: '₹₹',
    image: `${SITE_URL}/images/elan-tech-logo.svg`,
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: { '@type': 'AdministrativeArea', name: state },
    },
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#localbusiness`,
      name: ORG_NAME,
      url: SITE_URL,
    },
    ...(overrides.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: overrides.geo.latitude,
            longitude: overrides.geo.longitude,
          },
        }
      : {}),
    sameAs: [
      'https://www.linkedin.com/company/elan-technology',
      'https://www.facebook.com/eLanTechnology',
    ],
  };
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ─── AggregateRating + Reviews ────────────────────────────────────────────────
export interface ReviewItem {
  author: string;
  reviewBody: string;
  ratingValue: number;
  datePublished?: string;
}

export function reviewSchema(reviews: ReviewItem[], itemName = ORG_NAME) {
  const avgRating = reviews.reduce((sum, r) => sum + r.ratingValue, 0) / reviews.length;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: itemName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      reviewBody: r.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.ratingValue,
        bestRating: 5,
      },
      author: { '@type': 'Person', name: r.author },
      ...(r.datePublished ? { datePublished: r.datePublished } : {}),
    })),
  };
}

// ─── Service ──────────────────────────────────────────────────────────────────
export function serviceSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };
}

// ─── SoftwareApplication (Product pages) ─────────────────────────────────────
export interface SoftwareAppData {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
}

export function softwareAppSchema(product: SoftwareAppData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    url: product.url.startsWith('http') ? product.url : `${SITE_URL}${product.url}`,
    applicationCategory: product.applicationCategory ?? 'BusinessApplication',
    operatingSystem: product.operatingSystem ?? 'Web',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
    },
    author: {
      '@type': 'Organization',
      name: ORG_NAME,
      url: SITE_URL,
    },
  };
}

// ─── Article (Blog posts) ─────────────────────────────────────────────────────
export interface ArticleData {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
}

export function articleSchema(post: ArticleData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: post.url.startsWith('http') ? post.url : `${SITE_URL}${post.url}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: {
      '@type': 'Person',
      name: post.authorName ?? 'eLan Technology Team',
    },
    publisher: {
      '@type': 'Organization',
      name: ORG_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/elan-tech-logo.svg`,
      },
    },
    ...(post.imageUrl
      ? {
          image: {
            '@type': 'ImageObject',
            url: post.imageUrl.startsWith('http') ? post.imageUrl : `${SITE_URL}${post.imageUrl}`,
          },
        }
      : {}),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.url.startsWith('http') ? post.url : `${SITE_URL}${post.url}`,
    },
  };
}

// ─── WebPage (Legal / generic pages) ─────────────────────────────────────────
export function webPageSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: ORG_NAME },
  };
}

// ─── Speakable (AEO — voice/answer surfaces) ─────────────────────────────────
// Tells Google Assistant / answer engines which parts of the page are safe to
// read aloud. Pass CSS selectors that point at the highest-signal answer text:
// the H1, the lede paragraph, FAQ answers, etc.
//
// Usage: speakableSchema(['/services/website-design/', ['h1', '.tldr', '.faq-answer']])
export function speakableSchema(url: string, cssSelectors: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}

// ─── HowTo (step-by-step guides) ─────────────────────────────────────────────
// Use on guide-style blog posts where the answer is a sequence of steps
// (e.g. checklists, "how to fix X", remediation playbooks). LLMs and Google
// rich results both prefer this format for procedural queries.
export interface HowToStep {
  name: string;
  text: string;
  url?: string; // anchor to the step section, optional
}

export function howToSchema(opts: {
  name: string;
  description: string;
  url: string;
  totalTime?: string; // ISO 8601 duration, e.g. 'PT30M'
  steps: HowToStep[];
}) {
  const fullUrl = opts.url.startsWith('http') ? opts.url : `${SITE_URL}${opts.url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url
        ? {
            url: s.url.startsWith('http')
              ? s.url
              : `${fullUrl}${s.url.startsWith('#') ? s.url : `#${s.url}`}`,
          }
        : {}),
    })),
  };
}
