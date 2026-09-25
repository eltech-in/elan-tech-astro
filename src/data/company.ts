/**
 * Authoritative public facts for eLan Technology.
 *
 * Keep identity, contact and timeline information here so visible pages,
 * structured data and AI-facing files do not publish conflicting versions.
 */
export const COMPANY = {
  name: 'eLan Technology',
  siteUrl: 'https://elan-tech.net',
  email: 'info@elan-tech.net',
  officePhone: {
    display: '+91 98222 31642',
    international: '+91-9822231642',
    href: 'tel:+919822231642',
  },
  whatsapp: {
    display: '+91 87888 34630',
    international: '+91-8788834630',
    href: 'https://wa.me/918788834630',
  },
  address: {
    street: 'Basement Floor, PTG IT Park, Plot No. 21, IT Park Road, Gayatri Nagar',
    locality: 'Nagpur',
    region: 'Maharashtra',
    postalCode: '440022',
    countryCode: 'IN',
    country: 'India',
  },
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00',
    closes: '19:00',
    timezone: 'Asia/Kolkata',
  },
  timeline: {
    operationsBegan: '2002',
    domainRegistered: '2004-01-11',
    officialLaunch: '2005-08-15',
  },
  positioning:
    'Accessibility-first web design, custom ecommerce, web development and digital technology company based in Nagpur, India.',
} as const;

export const COMPANY_IDS = {
  organization: `${COMPANY.siteUrl}/#organization`,
  localBusiness: `${COMPANY.siteUrl}/#localbusiness`,
  website: `${COMPANY.siteUrl}/#website`,
} as const;
