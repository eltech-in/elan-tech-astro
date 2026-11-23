import { PACKAGE_PRICES, type Currency } from './auditPricing';

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  prices: Readonly<Record<Currency, number>>;
  customPricing?: boolean;
  features: string[];
  highlighted: boolean; // most popular
  cta: string;
  ctaHref: string;
  deliveryDays: number;
  revisions: number | 'As agreed';
  support: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Perfect for small businesses and startups',
    prices: PACKAGE_PRICES.starter,
    features: [
      'Up to 10 Pages',
      'Responsive (Mobile-Friendly) Design',
      'Contact Form Integration',
      'Basic On-Page SEO Setup',
      'Google Analytics Integration',
      'Social Media Links',
      'SSL Certificate Setup',
      '30-Day Post-Launch Support',
    ],
    highlighted: false,
    cta: 'Get a Quote',
    ctaHref: '/get-quote/',
    deliveryDays: 14,
    revisions: 2,
    support: '30 days',
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'The complete package for growing businesses',
    prices: PACKAGE_PRICES.professional,
    features: [
      'Up to 20 Pages',
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
    cta: 'Get a Quote',
    ctaHref: '/get-quote/',
    deliveryDays: 30,
    revisions: 4,
    support: '90 days',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Full-scale solutions for large organizations',
    customPricing: true,
    prices: { INR: 0, USD: 0, CAD: 0, AUD: 0, NZD: 0, JPY: 0, AED: 0, GBP: 0, EUR: 0 },
    features: [
      'Pages and modules based on final requirements',
      'Custom Design System',
      'Headless CMS / Custom CMS Development',
      'Full SEO Audit & Strategy',
      'Advanced Analytics & Reporting Dashboard',
      'Custom API & Third-Party Integrations',
      'eCommerce / Booking / Portal Features',
      'Performance optimisation for the agreed pages and content',
      'WCAG AA Accessibility Compliance',
      'Security Hardening & Firewall Setup',
      'Daily Automated Backups',
      '1-Year Post-Launch Support',
      'Dedicated Project Manager',
    ],
    highlighted: false,
    cta: 'Contact for Pricing',
    ctaHref: '/contact/',
    deliveryDays: 60,
    revisions: 'As agreed',
    support: '1 year',
  },
];
