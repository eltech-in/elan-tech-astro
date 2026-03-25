export type Currency = 'INR' | 'USD' | 'AUD' | 'AED' | 'GBP';

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  prices: Record<Currency, number>;
  features: string[];
  highlighted: boolean; // most popular
  cta: string;
  ctaHref: string;
  deliveryDays: number;
  revisions: number | 'Unlimited';
  support: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Perfect for small businesses and startups',
    prices: {
      INR: 25000,
      USD: 300,
      AUD: 450,
      AED: 1100,
      GBP: 240,
    },
    features: [
      'Up to 5 Pages',
      'Responsive (Mobile-Friendly) Design',
      'Contact Form Integration',
      'Basic On-Page SEO Setup',
      'Google Analytics Integration',
      'Social Media Links',
      'SSL Certificate Setup',
      '30-Day Post-Launch Support',
    ],
    highlighted: false,
    cta: 'Get Started',
    ctaHref: '/contact?plan=starter',
    deliveryDays: 14,
    revisions: 3,
    support: '30 days',
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'The complete package for growing businesses',
    prices: {
      INR: 60000,
      USD: 720,
      AUD: 1080,
      AED: 2640,
      GBP: 576,
    },
    features: [
      'Up to 15 Pages',
      'Custom UI/UX Design',
      'CMS Integration (WordPress / Headless)',
      'Advanced On-Page SEO',
      'Google Analytics & Search Console',
      'Blog / News Section',
      'Speed Optimization (Core Web Vitals)',
      'Contact & Lead Forms',
      'Social Media Integration',
      'SSL Certificate Setup',
      '90-Day Post-Launch Support',
    ],
    highlighted: true,
    cta: 'Most Popular — Get a Quote',
    ctaHref: '/contact?plan=professional',
    deliveryDays: 30,
    revisions: 10,
    support: '90 days',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Full-scale solutions for large organizations',
    prices: {
      INR: 120000,
      USD: 1440,
      AUD: 2160,
      AED: 5280,
      GBP: 1152,
    },
    features: [
      'Unlimited Pages',
      'Custom Design System',
      'Headless CMS / Custom CMS Development',
      'Full SEO Audit & Strategy',
      'Advanced Analytics & Reporting Dashboard',
      'Custom API & Third-Party Integrations',
      'eCommerce / Booking / Portal Features',
      'Performance Optimization (sub-2s load)',
      'WCAG AA Accessibility Compliance',
      'Security Hardening & Firewall Setup',
      'Daily Automated Backups',
      '1-Year Post-Launch Support',
      'Dedicated Project Manager',
    ],
    highlighted: false,
    cta: 'Request a Custom Quote',
    ctaHref: '/contact?plan=enterprise',
    deliveryDays: 60,
    revisions: 'Unlimited',
    support: '1 year',
  },
];

export const currencySymbols: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  AUD: 'A$',
  AED: 'AED ',
  GBP: '£',
};

export const currencyNames: Record<Currency, string> = {
  INR: 'Indian Rupee',
  USD: 'US Dollar',
  AUD: 'Australian Dollar',
  AED: 'UAE Dirham',
  GBP: 'British Pound',
};
