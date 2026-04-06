export interface Country {
  name: string;
  code: string; // ISO 3166-1 alpha-2
  slug: string;
  currency: string; // 'INR'|'USD'|'AUD'|'AED'|'GBP'|'JPY'
  hasLandingPage: boolean;
  isFeatured: boolean;
}

export const countries: Country[] = [
  {
    name: 'India',
    code: 'IN',
    slug: 'india',
    currency: 'INR',
    hasLandingPage: true,
    isFeatured: true,
  },
  {
    name: 'United States',
    code: 'US',
    slug: 'usa',
    currency: 'USD',
    hasLandingPage: true,
    isFeatured: true,
  },
  {
    name: 'Canada',
    code: 'CA',
    slug: 'canada',
    currency: 'USD',
    hasLandingPage: true,
    isFeatured: true,
  },
  {
    name: 'Australia',
    code: 'AU',
    slug: 'australia',
    currency: 'AUD',
    hasLandingPage: true,
    isFeatured: true,
  },
  {
    name: 'Japan',
    code: 'JP',
    slug: 'japan',
    currency: 'JPY',
    hasLandingPage: true,
    isFeatured: true,
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    slug: 'dubai-uae',
    currency: 'AED',
    hasLandingPage: true,
    isFeatured: true,
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    slug: 'uk',
    currency: 'GBP',
    hasLandingPage: false,
    isFeatured: true,
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    slug: 'saudi-arabia',
    currency: 'AED',
    hasLandingPage: true,
    isFeatured: true,
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    slug: 'new-zealand',
    currency: 'AUD',
    hasLandingPage: true,
    isFeatured: false,
  },
  {
    name: 'Brazil',
    code: 'BR',
    slug: 'brazil',
    currency: 'USD',
    hasLandingPage: true,
    isFeatured: false,
  },
  {
    name: 'Argentina',
    code: 'AR',
    slug: 'argentina',
    currency: 'USD',
    hasLandingPage: true,
    isFeatured: false,
  },
  {
    name: 'Ghana',
    code: 'GH',
    slug: 'ghana',
    currency: 'USD',
    hasLandingPage: true,
    isFeatured: false,
  },
  {
    name: 'Singapore',
    code: 'SG',
    slug: 'singapore',
    currency: 'USD',
    hasLandingPage: false,
    isFeatured: false,
  },
  {
    name: 'South Africa',
    code: 'ZA',
    slug: 'south-africa',
    currency: 'USD',
    hasLandingPage: false,
    isFeatured: false,
  },
  {
    name: 'Germany',
    code: 'DE',
    slug: 'germany',
    currency: 'GBP',
    hasLandingPage: false,
    isFeatured: false,
  },
];
