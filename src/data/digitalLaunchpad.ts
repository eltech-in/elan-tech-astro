// Digital Launchpad: single source of truth for the September 2026 offer.

export const OFFER_START_ISO = '2026-09-14T00:00:00+05:30';
export const OFFER_END_ISO = '2026-09-25T23:59:59+05:30';
export const OFFER_START = new Date(OFFER_START_ISO);
export const OFFER_END = new Date(OFFER_END_ISO);
export const OFFER_PRICE = 32000;
export const OFFER_LABEL = 'Ganesh Chaturthi offer: 14 to 25 September 2026';
export const WHATSAPP_URL =
  'https://wa.me/918788834630?text=Hi%20eLan%20Technology%2C%20I%27m%20interested%20in%20the%20Digital%20Launchpad%20plan%20at%20%E2%82%B932%2C000%20plus%20GST.%20Please%20share%20the%20scope%20and%20booking%20terms.';

export function isOfferActive(now = new Date()): boolean {
  return now >= OFFER_START && now <= OFFER_END;
}

export type OfferPhase = 'upcoming' | 'active' | 'ended';

export function getOfferPhase(now = new Date()): OfferPhase {
  if (now < OFFER_START) return 'upcoming';
  if (now <= OFFER_END) return 'active';
  return 'ended';
}

export interface LaunchpadPlan {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  price: number;
  pages: string;
  monthlyReframe: string;
  featured: boolean;
  features: string[];
  baseFeatures: string[];
  whatsappText: string;
}

const BASE_FEATURES: string[] = [
  '.in or .co.in domain registration for 4 years, subject to availability',
  'Shared website hosting and SSL for 4 years',
  'Mobile-friendly responsive design',
  'Contact form with email notification',
  'WhatsApp contact link and Google Maps integration where required',
  'Basic on-page SEO setup for the agreed pages',
  'Google Analytics 4 setup when the client provides or approves the account',
];

export const PLANS: LaunchpadPlan[] = [
  {
    id: 'launchpad',
    emoji: '🚀',
    name: 'Digital Launchpad',
    tagline: 'A practical business website package for small organisations and professionals',
    price: OFFER_PRICE,
    pages: 'Up to 20 agreed pages',
    monthlyReframe: '₹667/month equivalent',
    featured: true,
    features: [
      'Custom-designed business website with up to 20 agreed pages',
      'Home, about, services or products, and contact journeys planned around the business',
      'One small content-update request per month during the included 4-year period',
      'Uptime monitoring and an annual backup',
      'Content, integrations and functions outside the written scope are quoted separately',
      'Delivery schedule begins after content, payment and approvals are available',
    ],
    baseFeatures: BASE_FEATURES,
    whatsappText:
      'Hi%20eLan%20Technology%2C%20I%27m%20interested%20in%20the%20Digital%20Launchpad%20plan%20at%20%E2%82%B932%2C000%20plus%20GST.%20Please%20share%20the%20scope%20and%20booking%20terms.',
  },
];

export const FAQS = [
  {
    question: 'What does the ₹32,000 price cover?',
    answer:
      'The Digital Launchpad package covers the website, domain, hosting and maintenance items listed on this page. GST is extra. The written proposal confirms the pages, content responsibilities, delivery dependencies and any exclusions before work begins.',
  },
  {
    question: 'Is GST included?',
    answer:
      'No. The offer price is ₹32,000 plus applicable GST. The quotation and invoice show the tax separately.',
  },
  {
    question: 'When can I book the offer?',
    answer:
      'Bookings are open from 14 September through 25 September 2026. An enquiry does not reserve the package. A booking is confirmed only after the written scope and payment terms are accepted.',
  },
  {
    question: 'Will the domain be registered in my name?',
    answer:
      'The included .in or .co.in domain can be registered using the client’s approved ownership details, subject to availability and the registrar’s requirements. Other domain extensions are quoted separately.',
  },
  {
    question: 'What happens after the included 4-year period?',
    answer:
      'Before the included period ends, we share the available renewal, transfer or upgrade options and their current costs. Domain, hosting and third-party services remain subject to their providers’ terms.',
  },
  {
    question: 'What counts as a small content update?',
    answer:
      'A small update may include replacing supplied text or images, changing business hours, or correcting contact details on an existing page. New pages, redesigns, integrations and new functions are quoted separately. Unused monthly requests do not accumulate.',
  },
  {
    question: 'Can I add more pages or functions?',
    answer:
      'Yes. Requirements outside the package can be added through a separate written estimate. The revised scope may affect the delivery schedule and ongoing costs.',
  },
  {
    question: 'When will the website be delivered?',
    answer:
      'The proposal provides the project schedule after the page list, content readiness, integrations and approval process are understood. Delays in client content, approvals or third-party access can change the schedule.',
  },
];
