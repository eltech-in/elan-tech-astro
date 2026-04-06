// JSON-LD Schema generator functions for every page type
// Used by SEOHead.astro and SchemaMarkup.astro

const SITE_URL = 'https://elan-tech.net';
const ORG_NAME = 'eLan Technology';

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
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 30 },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Basement Floor, PTG IT Park, Plot No. 21, IT Park Rd, Gayatri Nagar',
      addressLocality: 'Nagpur',
      addressRegion: 'Maharashtra',
      postalCode: '440022',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8788834630',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi', 'Marathi'],
    },
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
    name: `${ORG_NAME} — Web Design Company in ${city}`,
    url: overrides.url ?? SITE_URL,
    telephone: overrides.telephone ?? '+91-8788834630',
    email: 'info@elan-tech.net',
    description:
      overrides.description ??
      `Professional web design & digital marketing services in ${city}. WCAG/ADA compliant websites.`,
    priceRange: '₹₹',
    image: `${SITE_URL}/images/elan-tech-logo.svg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Basement Floor, PTG IT Park, Plot No. 21, IT Park Rd, Gayatri Nagar',
      addressLocality: city,
      addressRegion: 'Maharashtra',
      postalCode: '440022',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: overrides.geo?.latitude ?? defaultGeo.latitude,
      longitude: overrides.geo?.longitude ?? defaultGeo.longitude,
    },
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
