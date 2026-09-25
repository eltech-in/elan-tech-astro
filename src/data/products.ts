// Ported from: elanttechnology/lib/data/products.tsx
// Icons removed (React-free) - use product.accent for colour cues in Astro components.

export interface Product {
  id: string;
  title: string;
  slug: string;
  /** Short marketing description (used on cards/index) */
  desc: string;
  /** Full prose description (used on individual product page hero) */
  longDesc: string;
  /** Brand accent hex colour for this product (dark-mode decorative use only) */
  accent: string;
  /** CSS custom property - WCAG AA on both dark & light bg */
  cssVar: string;
  /** Feature list - short strings shown as bullet points */
  features: string[];
  /** Why-choose-us bullet points */
  benefits: string[];
  /** Target buyer personas */
  targetAudience: string[];
  /** applicationCategory for SoftwareApplication schema */
  schemaCategory: string;
  /** Live demo URL - undefined means "coming soon" */
  demoUrl?: string;
  /** If true, replace "Try Demo" with call/contact CTA instead of linking to demoUrl */
  contactForDemo?: boolean;
}

export const products: Product[] = [
  {
    id: 'real-estate-portal',
    title: 'Real Estate Portal',
    slug: 'real-estate-portal',
    desc: 'A configurable property portal foundation with listings, agent dashboards, maps and lead capture, adapted to each client’s operating model.',
    longDesc:
      'Our Real Estate Portal is a configurable product foundation for agencies, developers and property businesses. Features, branding, deployment, integrations, commercial terms and source-code rights are agreed for each implementation rather than assumed from a fixed package.',
    accent: '#00E5A0',
    cssVar: '--ac-teal',
    features: [
      'Comprehensive Listings for buying, renting, and selling properties.',
      'Advanced Search filters by location, budget, BHK, and property type.',
      'RERA information fields and optional status badges managed by the portal operator.',
      'Joint Ventures platform for land owners and investors.',
      'Specialized categories (Agricultural, Commercial, Residential Land).',
    ],
    benefits: [
      'Structured property information managed by the client’s authorised team.',
      'A foundation that can be adapted to the client’s review and compliance process.',
      'Next-generation property search experience.',
    ],
    targetAudience: ['Home buyers', 'Renters', 'Property developers', 'Real estate investors'],
    schemaCategory: 'RealEstateApplication',
    demoUrl: 'https://propertycab.elantech.cloud/',
  },
  {
    id: 'medical-conference-portal',
    title: 'Medical Conference Portal',
    slug: 'medical-conference-portal',
    desc: 'A configurable portal for medical conference registration, abstracts, speakers, schedules and certificates.',
    longDesc:
      'eLanCON is a configurable medical-conference portal foundation for registration, abstract submissions, scientific programmes and organiser-approved communications. Modules, access, integrations, data fields and support are agreed for each event.',
    accent: '#6366F1',
    cssVar: '--ac-indigo',
    features: [
      'Multi-tier Registration (Delegates, PG Students, AC Members).',
      'Online Abstract Submission for speakers.',
      'Scientific Program highlights and detailed schedule.',
      'Faculty and Committee management grids.',
      'Live countdown timer for the event.',
    ],
    benefits: [
      'Bring key organiser and delegate journeys into one portal.',
      'Adapt registration and content workflows to the event.',
      'Present a consistent, professional conference experience.',
    ],
    targetAudience: [
      'Medical doctors',
      'Specialists',
      'Post-graduate students',
      'Pharmaceutical sponsors',
    ],
    schemaCategory: 'HealthApplication',
    demoUrl: 'https://elanconf.elantech.cloud/',
    contactForDemo: true,
  },
  {
    id: 'ima-society-portal',
    title: 'IMA Society Portal',
    slug: 'ima-society-portal',
    desc: 'A configurable member portal for medical associations, with memberships, events, documents and payments.',
    longDesc:
      'The IMA Society Portal is a configurable membership platform for medical associations. Membership, events, documents, payments, communication and optional governance modules are selected and adapted to the society’s approved requirements.',
    accent: '#EC4899',
    cssVar: '--ac-pink',
    features: [
      'Online membership workflows with optional e-cards and renewals.',
      'Event & CME Management with online registration and certificates.',
      'Photo Gallery and society news publishing.',
      'Online Fee & Dues Payment with Razorpay integration.',
      'Executive Committee, Circulars & Document Library.',
    ],
    benefits: [
      'Keep membership and society information in one place.',
      'Reduce repetitive administration with agreed digital workflows.',
      'Make approved circulars, policies and records easier to access.',
    ],
    targetAudience: [
      'Allopathic doctors',
      'Medical students',
      'Indian healthcare policy makers',
    ],
    schemaCategory: 'BusinessApplication',
    // Live demo coming soon
  },
  {
    id: 'resort-management-system',
    title: 'Resort Management Portal',
    slug: 'resort-management-system',
    desc: 'A configurable operations portal for resorts and boutique stays, covering bookings and selected day-to-day workflows.',
    longDesc:
      'Our Resort Management Portal is a configurable, white-label-capable foundation for selected hospitality workflows. Booking, billing, housekeeping, staff, reporting, integrations, data handling and support are defined for each property rather than assumed as one fixed package.',
    accent: '#F59E0B',
    cssVar: '--ac-amber',
    features: [
      'Online Room Booking Engine with Razorpay Payment Gateway.',
      'Occupancy Dashboard with live check-in/check-out tracking.',
      'Configurable billing, invoicing and multi-payment settlement workflows.',
      'Staff Scheduling & Housekeeping Management Dashboard.',
      'Automated Email/SMS Booking & Reminder Notifications.',
    ],
    benefits: [
      'Support direct booking journeys when included in the scope.',
      'Bring selected resort and staff workflows into one system.',
      'Add practical guest self-service options where required.',
    ],
    targetAudience: [
      'Resort Owners',
      'Hotel Managers',
      'Boutique Stay Operators',
      'Hospitality Groups',
    ],
    schemaCategory: 'TravelApplication',
    demoUrl: 'https://resort.elantech.cloud/auth',
    contactForDemo: true,
  },
];

/** Helper: find a product by slug (throws if not found) */
export function getProductBySlug(slug: string): Product {
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new Error(`Product not found: ${slug}`);
  return product;
}
