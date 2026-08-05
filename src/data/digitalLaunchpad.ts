// ─────────────────────────────────────────────────────────────────────────────
// Digital Launchpad - Single source of truth for all plan data, FAQs & config.
// NEVER hardcode plan data inside component or page files - import from here.
// Final anniversary offer: valid through August 15, 2026 · 9 slots total
// ─────────────────────────────────────────────────────────────────────────────

export const OFFER_END     = new Date('2026-08-15T23:59:59+05:30');
export const TOTAL_SLOTS   = 9;
export const FINAL_OFFER_LABEL =
  '+20% final anniversary price - offer closes 15 Aug 2026';
export const WHATSAPP_URL  =
  'https://wa.me/918788834630?text=Hi%20I%27m%20interested%20in%20the%20Digital%20Launchpad%20plan';

function monthlyReframe(price: number): string {
  return `₹${Math.round(price / 48).toLocaleString('en-IN')}/month`;
}

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface LaunchpadPlan {
  id:             string;
  emoji:          string;
  name:           string;
  tagline:        string;
  price:          number;
  pages:          string;
  monthlyReframe: string;   // e.g. "₹417/month" - cost amortised over 48 months
  featured:       boolean;
  features:       string[]; // tier-specific features (shown on card)
  baseFeatures:   string[]; // identical across all tiers (render once or toggle)
  whatsappText:   string;   // URL-encoded pre-fill for wa.me link
}

// ─── Base features - common to ALL tiers ─────────────────────────────────────

export const BASE_FEATURES: string[] = [
  '.in or .co.in domain registered in <strong>YOUR NAME</strong> - 4 years paid (.com / .org at actual cost)',
  'Free SSL certificate (https://)',
  'Contact form with email notifications',
  'Floating WhatsApp chat button',
  'Google Maps location embed',
  'Google Analytics 4 setup',
  'Mobile-first responsive design',
];

// ─── Plans ────────────────────────────────────────────────────────────────────

export const PLANS: LaunchpadPlan[] = [
  {
    id:             'starter',
    emoji:          '🌱',
    name:           'eLan Starter',
    tagline:        'Freelancers, consultants, solo professionals',
    price:          28800,
    pages:          '5–6 pages',
    monthlyReframe: monthlyReframe(28800),
    featured:       false,
    features: [
      '5–6 page custom HTML website',
      'Home · About · Services · Contact · Gallery',
      'Fast, secure shared hosting - 4 years paid',
      'Basic on-page SEO (meta tags, schema markup)',
      '1 content update per month based on GSC data',
      'No admin access - all updates managed by eLan Tech team',
      'Uptime monitoring + annual backup',
      'Delivered in 10 working days',
    ],
    baseFeatures: BASE_FEATURES,
    whatsappText:
      'Hi%2C%20I%27m%20interested%20in%20the%20eLan%20Starter%20plan%20%28%E2%82%B928%2C800%29.%20Please%20share%20details.',
  },
  {
    id:             'business',
    emoji:          '🏪',
    name:           'eLan Business',
    tagline:        'Clinics, salons, retailers, NGOs, coaching centres',
    price:          37400,
    pages:          '8–10 pages',
    monthlyReframe: monthlyReframe(37400),
    featured:       true,
    features: [
      '8–10 page custom UI/UX designed website',
      'Services or Products detail pages',
      'Photo gallery or portfolio section',
      'Testimonials section',
      'FAQ page',
      'Blog (static, up to 5 posts included)',
      'Monthly blog posting at extra cost',
      'WCAG accessibility basics',
      'Annual website performance review call',
      'Fast, secure shared hosting - 4 years paid',
      'Basic on-page SEO (meta tags, schema markup)',
      '1 content update per month for 4 years',
      'Uptime monitoring + annual backup',
      'Delivered in 15 working days',
    ],
    baseFeatures: BASE_FEATURES,
    whatsappText:
      'Hi%2C%20I%27m%20interested%20in%20the%20eLan%20Business%20plan%20%28%E2%82%B937%2C400%29.%20Please%20share%20details.',
  },
  {
    id:             'complete',
    emoji:          '🎯',
    name:           'eLan Complete',
    tagline:        'Professional services, manufacturers, B2B companies',
    price:          46100,
    pages:          'Up to 20 pages',
    monthlyReframe: monthlyReframe(46100),
    featured:       false,
    features: [
      'Everything in eLan Business',
      'Up to 20 pages',
      'Brand colour palette + typography guidelines',
      'Copywriting for all pages (up to 1,500 words)',
      'Social media banner set (3 platforms)',
      'Google Business Profile setup + optimisation',
      'Business email setup guidance',
      'Priority WhatsApp support response',
      'Fast, secure dedicated hosting - 4 years paid',
      'Advanced on-page SEO with 1 blog post per month',
      '2 content updates per month based on GSC data',
      'Uptime monitoring + monthly backup',
      'Delivered in 15 working days',
    ],
    baseFeatures: BASE_FEATURES,
    whatsappText:
      'Hi%2C%20I%27m%20interested%20in%20the%20eLan%20Complete%20plan%20%28%E2%82%B946%2C100%29.%20Please%20share%20details.',
  },
];

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export const FAQS = [
  {
    question: 'Will the domain be registered in my name?',
    answer:
      'Yes. Your .in or .co.in domain is registered directly in your name with NIXI - the official .in registry in India. You are the legal owner. eLan Technology manages the DNS settings on your behalf. If you ever want to transfer to another provider after the 4 years, you can do so at no transfer charge from us.',
  },
  {
    question: 'What happens after 4 years?',
    answer:
      'You have three options: renew the maintenance plan with eLan at the prevailing rate; transfer everything (domain + files) to your own hosting provider; or upgrade to a new eLan package. All your website files, content, and the domain belong to you. There is no exit lock-in.',
  },
  {
    question: 'Can I choose a .com domain instead?',
    answer:
      'This plan includes .in or .co.in domains only. These are actually better for local SEO - Google gives strong preference to country-code domains for local search results. For Nagpur and central India-focused businesses, .in or .co.in ranks faster than .com. If you need a .com specifically, contact us for a custom quote.',
  },
  {
    question: 'What counts as a "content update"?',
    answer:
      'Starter & Business plans include 1 update request per month; Complete includes 2. Typical requests: text changes, new photos, updated business hours, contact number change, adding or removing items from a list, etc. Requests are fulfilled within 5 business days. Adding new pages, redesigning sections, or integrating new features are quoted separately.',
  },
  {
    question: 'Why full advance payment only?',
    answer:
      'On day one, we purchase your domain and 4 years of hosting - costs that are non-refundable from our suppliers. Full advance payment ensures we can deliver and maintain your site uninterrupted for the complete 4-year period without billing disputes.',
  },
  {
    question: 'When does the final anniversary offer end?',
    answer:
      'The final Digital Launchpad anniversary offer closes at 11:59 PM IST on August 15, 2026, or earlier if all 9 slots are reserved. The prices shown on this page are the final offer prices.',
  },
  {
    question: 'Can I upgrade to a larger plan later?',
    answer:
      'Yes. At any point during the 4 years, you can upgrade. The new plan cost is quoted at the prevailing rate, with a credit for the remaining months on your current plan.',
  },
  {
    question: 'Is GST included in these prices?',
    answer:
      'No. Prices shown are exclusive of GST (18%). For example, eLan Business at ₹37,400 + 18% GST = ₹44,132 total. A GST invoice is provided for all Indian clients, eligible for input tax credit.',
  },
];
