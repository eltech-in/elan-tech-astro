// Ported from: elanttechnology/lib/data/products.tsx
// Icons removed (React-free) — use product.accent for colour cues in Astro components.

export interface Product {
  id: string;
  title: string;
  slug: string;
  /** Short marketing description (used on cards/index) */
  desc: string;
  /** Full prose description (used on individual product page hero) */
  longDesc: string;
  /** Brand accent hex colour for this product */
  accent: string;
  /** Feature list — short strings shown as bullet points */
  features: string[];
  /** Why-choose-us bullet points */
  benefits: string[];
  /** Target buyer personas */
  targetAudience: string[];
  /** applicationCategory for SoftwareApplication schema */
  schemaCategory: string;
}

export const products: Product[] = [
  {
    id: 'real-estate-portal',
    title: 'Real Estate Portal',
    slug: 'real-estate-portal',
    desc: 'Property listings, agent dashboards, map integration, and lead capture. Deployed for multiple real estate businesses across India.',
    longDesc:
      'Our Real Estate Portal is a high-performance solution designed to streamline property transactions. It features a robust search engine, verified listing management, and a dedicated portal for joint ventures, ensuring a secure and transparent experience for all stakeholders.',
    accent: '#00E5A0',
    features: [
      'Comprehensive Listings for buying, renting, and selling properties.',
      'Advanced Search filters by location, budget, BHK, and property type.',
      'Verified Listings with RERA badges.',
      'Joint Ventures platform for land owners and investors.',
      'Specialized categories (Agricultural, Commercial, Residential Land).',
    ],
    benefits: [
      'Premium and authenticity-checked property listings.',
      'Expert feasibility and legal security provided by the core team.',
      'Next-generation property search experience.',
    ],
    targetAudience: ['Home buyers', 'Renters', 'Property developers', 'Real estate investors'],
    schemaCategory: 'RealEstateApplication',
  },
  {
    id: 'medical-conference-portal',
    title: 'Medical Conference Portal',
    slug: 'medical-conference-portal',
    desc: 'Event registration, abstract submission, speaker management, and certificate generation. Handles 500–5000+ delegates per event.',
    longDesc:
      'eLanCON is a specialized national medical conference portal designed to handle the complexities of academic events. From multi-tiered registrations to abstract submissions and scientific program management, it provides a seamless experience for organizers and delegates alike.',
    accent: '#6366F1',
    features: [
      'Multi-tier Registration (Delegates, PG Students, AC Members).',
      'Online Abstract Submission for speakers.',
      'Scientific Program highlights and detailed schedule.',
      'Faculty and Committee management grids.',
      'Live countdown timer for the event.',
    ],
    benefits: [
      'Streamlined management of large-scale medical events.',
      'Centralized platform for all attendee and speaker needs.',
      'Professional branding for high-end academic networking.',
    ],
    targetAudience: [
      'Medical doctors',
      'Specialists',
      'Post-graduate students',
      'Pharmaceutical sponsors',
    ],
    schemaCategory: 'HealthApplication',
  },
  {
    id: 'ima-society-portal',
    title: 'IMA Society Portal',
    slug: 'ima-society-portal',
    desc: 'Member directory, election module, publication library, and CPD tracking. Used by Indian Medical Association specialty societies.',
    longDesc:
      'The IMA Society Portal is a comprehensive membership management platform built for medical associations. It integrates career opportunities, professional networking, and advocacy tools into a single, unified digital ecosystem.',
    accent: '#EC4899',
    features: [
      'Exclusive Job Portal for IMA members.',
      'Member e-Connect for membership and profile management.',
      'News, Media, and Journal (JIMA) access.',
      'Professional wings and social security schemes.',
      'Policy and advocacy updates for the medical community.',
    ],
    benefits: [
      'Unified representation for modern medicine practitioners in India.',
      'Access to career opportunities and continuous medical education.',
      'Social security and professional protection for member doctors.',
    ],
    targetAudience: [
      'Allopathic doctors',
      'Medical students',
      'Indian healthcare policy makers',
    ],
    schemaCategory: 'BusinessApplication',
  },
  {
    id: 'resort-management-system',
    title: 'Resort Management Portal',
    slug: 'resort-management-system',
    desc: 'End-to-end management for resorts and boutique stays. Handles online room booking, dining POS, and housekeeping operations.',
    longDesc:
      'Our Resort Management System offers a complete, white-labelled solution to manage every aspect of your hospitality business. From an intuitive online booking engine for direct reservations to deep operational tools for housekeeping and dining POS, it provides full control over your guest experience and business logic.',
    accent: '#F59E0B',
    features: [
      'Online Room Booking Engine with Payment Gateway.',
      'Staff scheduling and Housekeeping management dashboard.',
      'Dining & Restaurant Inventory / POS integration.',
      'Customer Relationship Management (CRM) for guests.',
      'Automated email/SMS notifications for bookings.',
    ],
    benefits: [
      'Increase direct bookings and reduce commissions.',
      'Streamline daily resort and staff operations.',
      'Enhance guest experience with self-service options.',
    ],
    targetAudience: [
      'Resort Owners',
      'Hotel Managers',
      'Boutique Stay Operators',
      'Hospitality Groups',
    ],
    schemaCategory: 'TravelApplication',
  },
];

/** Helper: find a product by slug (throws if not found) */
export function getProductBySlug(slug: string): Product {
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new Error(`Product not found: ${slug}`);
  return product;
}
