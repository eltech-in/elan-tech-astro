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
  /**
   * Lowest implementation price in INR, for products where we are willing to
   * publish one. Setting it does two things at once: the figure is rendered on
   * the product page AND emitted as schema.org `offers`. Google requires the
   * markup to match what a visitor can see, so never set this without the
   * page showing it; the template handles that automatically.
   * Leave undefined for products that stay quote-only.
   */
  startingPriceINR?: number;
  /**
   * Technology stack of the current product build, grouped for display.
   * List only what is confirmed. Leave undefined and the page shows no stack.
   */
  stack?: { group: string; items: string[] }[];
  /** Who buys it, in a few words (Products hub buying guide). */
  buyer: string;
  /** The primary workflow, as 3-4 short steps (Products hub buying guide). */
  workflow: string[];
  /** Live demo URL - undefined means "coming soon" */
  demoUrl?: string;
  /** If true, replace "Try Demo" with call/contact CTA instead of linking to demoUrl */
  contactForDemo?: boolean;
}

export const products: Product[] = [
  {
    id: 'elan-central-cms',
    title: 'eLan Central CMS',
    slug: 'elan-central-cms',
    buyer: "Businesses and teams running Astro websites",
    workflow: ["Edit", "Review", "Publish", "Static site goes live"],
    desc: 'Our customised Payload CMS for Astro websites: one place to edit content, with fast static pages published to the website’s own hosting.',
    longDesc:
      'eLan Central CMS is the content system behind the Astro websites we build. Editors update pages, posts, media and settings in one dashboard, then publish. The website is rebuilt as static files and uploaded to its own hosting, so visitors always get fast pages and never touch the CMS.',
    accent: '#06B6D4',
    cssVar: '--ac-cyan',
    features: [
      'One dashboard for many websites, with each client limited to their own site.',
      'Pages built from a shared block library.',
      'SEO fields, redirects and required image alt text built in.',
      'Publishing rebuilds only that website as static files.',
      'Live websites keep working even when the CMS is offline.',
    ],
    benefits: [
      'Static-site speed with an editing experience clients can use.',
      'Works with ordinary hosting; no Node.js needed on the website’s server.',
      'One platform to maintain instead of one CMS per website.',
    ],
    targetAudience: ['Businesses editing their own website', 'Organisations with several sites', 'Marketing and content teams', 'Sites moving off WordPress'],
    schemaCategory: 'BusinessApplication',
    stack: [
      { group: 'CMS', items: ['Payload CMS', 'Next.js', 'TypeScript'] },
      { group: 'Websites', items: ['Astro'] },
      { group: 'Database', items: ['PostgreSQL'] },
      { group: 'Delivery', items: ['Cloudflare'] },
    ],
    contactForDemo: true,
  },
  {
    id: 'real-estate-portal',
    title: 'Real Estate Portal',
    slug: 'real-estate-portal',
    buyer: "Property developers, brokers and portal operators",
    workflow: ["Listing", "Buyer enquiry", "Agent follow-up"],
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
    startingPriceINR: 100000,
    stack: [
      { group: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'] },
      { group: 'Backend', items: ['Node.js', 'Express'] },
      { group: 'Database', items: ['MongoDB'] },
      { group: 'Integrations', items: ['Google Maps', 'Razorpay', 'AWS S3'] },
      { group: 'Delivery', items: ['Cloudflare'] },
    ],
    demoUrl: 'https://propertycab.elantech.cloud/',
  },
  {
    id: 'medical-conference-portal',
    title: 'Medical Conference Portal',
    slug: 'medical-conference-portal',
    buyer: "Organising committees of medical conferences",
    workflow: ["Abstracts", "Programme", "Registration", "Certificates"],
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
    startingPriceINR: 100000,
    stack: [
      { group: 'Frontend', items: ['React', 'Vite', 'Radix UI', 'Tailwind CSS', 'TypeScript'] },
      { group: 'Backend', items: ['Node.js', 'Express', 'REST API'] },
      { group: 'Database', items: ['MongoDB'] },
      { group: 'Payments', items: ['Razorpay', 'PhonePe'] },
      { group: 'Integrations', items: ['AWS S3', 'NodeMailer', 'Google Maps'] },
      { group: 'Delivery', items: ['Cloudflare'] },
    ],
    demoUrl: 'https://elanconf.elantech.cloud/',
    contactForDemo: true,
  },
  {
    id: 'ima-society-portal',
    title: 'IMA Society Portal',
    slug: 'ima-society-portal',
    buyer: "Medical associations and their office bearers",
    workflow: ["Membership", "Dues and renewals", "Events and CME", "Documents"],
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
    startingPriceINR: 100000,
    // Live demo coming soon
    stack: [
      { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'] },
      { group: 'Backend', items: ['Node.js', 'Express'] },
      { group: 'Database', items: ['MongoDB'] },
      { group: 'Payments', items: ['Razorpay'] },
      { group: 'Integrations', items: ['AWS S3', 'NodeMailer'] },
    ],
  },
  {
    id: 'resort-management-system',
    title: 'Resort Management Portal',
    slug: 'resort-management-system',
    buyer: "Resort owners and boutique stay operators",
    workflow: ["Online booking", "Check-in and housekeeping", "Billing"],
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
    startingPriceINR: 100000,
    stack: [
      { group: 'Frontend', items: ['React', 'Vite', 'Radix UI', 'Tailwind CSS', 'TypeScript'] },
      { group: 'Backend', items: ['Node.js', 'Express', 'REST API'] },
      { group: 'Database', items: ['MongoDB'] },
      { group: 'Payments', items: ['Razorpay'] },
      { group: 'Integrations', items: ['AWS S3', 'NodeMailer'] },
      { group: 'Delivery', items: ['Cloudflare'] },
    ],
    demoUrl: 'https://resort.elantech.cloud/auth',
    contactForDemo: true,
  },
  {
    id: 'project-management-system',
    title: 'Project Management System',
    slug: 'project-management-system',
    buyer: "Agencies and IT service teams",
    workflow: ["Enquiry", "Project and tasks", "Billing", "Renewal reminder"],
    desc: 'A configurable project management system for agencies and service businesses, covering clients, projects, tasks, billing, enquiries and renewal reminders.',
    longDesc:
      'Our Project Management System brings client records, projects, tasks, team schedules, billing, enquiries and reminders into one workspace. We run our own client engagements on it. Modules, roles, branding, deployment and integrations are agreed for each implementation.',
    accent: '#60A5FA',
    cssVar: '--ac-blue',
    features: [
      'Portfolio dashboard for active projects, enquiries, renewals, reminders and outstanding payments.',
      'Client records and project codes with a project status tracker.',
      'Tasks, schedule and team management.',
      'Billing with pending and overdue payment tracking.',
      'Domain renewal tracking and reminders.',
    ],
    benefits: [
      'One place for delivery, billing and follow-up.',
      'Renewals and payments surfaced before they are missed.',
      'Role-based access for administrators and team members.',
    ],
    targetAudience: ['Digital agencies', 'IT service companies', 'Consultancies', 'Project teams'],
    schemaCategory: 'BusinessApplication',
    stack: [
      { group: 'Frontend', items: ['React', 'Vite'] },
    ],
    contactForDemo: true,
  },
  {
    id: 'insurance-agency-management-portal',
    title: 'Insurance Agency Management Portal',
    slug: 'insurance-agency-management-portal',
    buyer: "Insurance agencies with sub-agent networks",
    workflow: ["Policy", "Renewal", "Commission", "Sub-agent records"],
    desc: 'A configurable management portal for insurance agencies, covering LIC, health, motor and general policies, deposits, renewals, commissions, sub-agents and customer records.',
    longDesc:
      'Our Insurance Agency Management Portal helps an agency manage policies, customers and commissions in one system: LIC, health, motor and general insurance, recurring and fixed deposits, renewals, quotations and sub-agents. Modules, branding, deployment and integrations are agreed for each implementation.',
    accent: '#10B981',
    cssVar: '--ac-emerald',
    features: [
      'LIC, health, motor and general insurance management.',
      'Recurring deposit (RD) and fixed deposit (FD) management.',
      'Renewal tracking and quotation management.',
      'Commission management and sub-agent management.',
      'CRM with customer family records.',
    ],
    benefits: [
      'Policies, customers and commissions in one system.',
      'Renewals tracked across every policy type.',
      'Sub-agents and their commissions managed centrally.',
    ],
    targetAudience: ['Insurance agencies', 'Insurance agents and advisors', 'Sub-agent networks', 'Financial product distributors'],
    schemaCategory: 'BusinessApplication',
    stack: [
      { group: 'Frontend', items: ['Next.js'] },
      { group: 'Backend', items: ['NestJS'] },
      { group: 'Database', items: ['MySQL'] },
    ],
    demoUrl: 'https://insurems.elantech.cloud/',
    contactForDemo: true,
  },
];

/** Helper: find a product by slug (throws if not found) */
/** A public demo exists only when a URL is set and the product is not walkthrough-only. */
export const hasPublicDemo = (product: Product): boolean => Boolean(product.demoUrl && !product.contactForDemo);
/** The shared request form, with this product preselected. */
export const demoRequestHref = (slug: string): string => `/request-demo/?product=${slug}`;

export function getProductBySlug(slug: string): Product {
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new Error(`Product not found: ${slug}`);
  return product;
}
