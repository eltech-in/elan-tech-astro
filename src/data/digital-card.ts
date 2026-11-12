/** Add a design ID here only after its scoped styles and responsive checks exist. */
export const cardDesigns = [
  { id: 'classic', label: 'Classic' },
  { id: 'studio', label: 'Studio' },
  { id: 'midnight', label: 'Midnight' },
  { id: 'aurora', label: 'Aurora' },
] as const;

/** Shared by every visual design: capabilities already offered on the website. */
export const cardServices = [
  { label: 'DPDP Implementation', href: '/services/dpdp-compliance-implementation/' },
  { label: 'CRM & ERP / ERPNext', href: '/services/custom-crm-erp-solutions/' },
  { label: 'Headless CMS', href: '/services/headless-cms-development/' },
  { label: 'Website Design', href: '/services/website-design/' },
  { label: 'Web Applications', href: '/services/web-development/' },
  { label: 'eCommerce', href: '/services/ecommerce/' },
  { label: 'SEO', href: '/services/seo/' },
  { label: 'Accessibility', href: '/services/ada-compliant-web-design/' },
  { label: 'Security & Care', href: '/services/maintenance-security/' },
  { label: 'API Integrations', href: '/services/integrations/' },
];
