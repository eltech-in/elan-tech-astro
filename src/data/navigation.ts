/**
 * Menu data for the header dropdown, the mobile menu and the footer, built from the product and
 * service data so a new product or service appears everywhere on the next build.
 *
 * Header.astro passes these lists into the MegaMenu and MobileNav islands as props, so the full
 * product data never ships to the browser as JavaScript.
 */
import { products } from './products';

export interface NavLink { label: string; href: string; blurb?: string }

/** One-line menu blurbs. A product without one falls back to a shortened description. */
const PRODUCT_BLURB: Record<string, string> = {
  'insurance-agency-management-portal': 'Policies, renewals, commissions and sub-agents.',
  'real-estate-portal': 'Listings, agent dashboards, maps and lead capture.',
  'resort-management-system': 'Bookings, occupancy, billing and housekeeping.',
  'medical-conference-portal': 'Registration, abstracts, speakers and certificates.',
  'ima-society-portal': 'Memberships, events, documents and payments.',
  'project-management-system': 'Clients, projects, tasks, billing and renewals.',
  'elan-central-cms': 'Edit content in one place; publish fast static pages.',
};

const shorten = (text: string, max = 64) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
};

/** Digital Biz ID lives under Ventures but is offered as a product. */
const DIGITAL_BIZ_ID: NavLink = { label: 'Digital Biz ID', href: '/ventures/digibizid/', blurb: 'Digital business cards with QR sharing and analytics.' };

export const navProducts: NavLink[] = [
  ...products.map((p) => ({ label: p.title, href: `/products/${p.slug}/`, blurb: PRODUCT_BLURB[p.slug] ?? shorten(p.desc) })),
  DIGITAL_BIZ_ID,
];

/** Service links in menu order (the services index has every service; these are the menu entries). */
export const navServices: NavLink[] = [
  { label: 'Website Design', href: '/services/website-design/' },
  { label: 'Web Development', href: '/services/web-development/' },
  { label: 'eCommerce', href: '/services/ecommerce/' },
  { label: 'Custom Shopify Development', href: '/services/ecommerce/#shopify' },
  { label: 'Medusa.js Development', href: '/services/ecommerce/medusa-js-development/' },
  { label: 'Zoho Commerce Implementation', href: '/services/ecommerce/#zoho-commerce' },
  { label: 'Headless CMS (Payload & Directus)', href: '/services/headless-cms-development/' },
  { label: 'Custom CRM & ERP', href: '/services/custom-crm-erp-solutions/' },
  { label: 'API Integrations', href: '/services/integrations/' },
  { label: 'SEO', href: '/services/seo/' },
  { label: 'Digital Marketing', href: '/services/digital-marketing/' },
  { label: 'Mobile Apps', href: '/services/mobile-app-development/' },
  { label: 'Branding', href: '/services/branding/' },
  { label: 'Maintenance & Security', href: '/services/maintenance-security/' },
  { label: 'ADA & WCAG Compliance', href: '/services/ada-compliant-web-design/' },
  { label: 'DPDP Implementation', href: '/services/dpdp-compliance-implementation/' },
];
