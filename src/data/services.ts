export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string; // lucide icon name as string
  iconSvg: string; // inline SVG string for rendering
  accent: string; // hex color
}

export const services: Service[] = [
  {
    slug: 'website-design',
    title: 'Website Design',
    shortTitle: 'Design',
    tagline: 'Beautiful, WCAG-compliant websites that convert',
    description:
      'We design pixel-perfect, responsive websites that are both visually stunning and fully accessible. Every design is custom — no templates, no shortcuts.',
    features: [
      'UI/UX Design',
      'Custom Design',
      'Responsive Design',
      'Landing Pages',
      'Redesign & Revamp',
      'Design Systems',
      'Wireframing & Prototyping',
    ],
    icon: 'Palette',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    accent: '#EC4899',
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    shortTitle: 'Development',
    tagline: 'Fast, scalable web applications built to last',
    description:
      'From simple business websites to complex web applications, we engineer solutions using modern stacks — React, Next.js, MERN, WordPress, and more.',
    features: [
      'React / Next.js',
      'MERN Stack',
      'WordPress',
      'Custom CMS',
      'REST & GraphQL APIs',
      'Performance Optimization',
      'Code Audits',
    ],
    icon: 'Code2',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    accent: '#6366F1',
  },
  {
    slug: 'ecommerce',
    title: 'eCommerce Development',
    shortTitle: 'eCommerce',
    tagline: 'Online stores that drive sales 24/7',
    description:
      'We build high-converting eCommerce stores on Shopify, WooCommerce, or fully custom platforms — optimized for speed, SEO, and user experience.',
    features: [
      'Shopify',
      'WooCommerce',
      'Custom eCommerce',
      'B2B Portals',
      'Payment Gateway Integration',
      'Product Catalog Management',
      'Abandoned Cart Recovery',
    ],
    icon: 'ShoppingCart',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    accent: '#F59E0B',
  },
  {
    slug: 'seo',
    title: 'Search Engine Optimization',
    shortTitle: 'SEO',
    tagline: 'Rank higher, drive organic traffic, dominate search',
    description:
      'Our SEO specialists use proven white-hat strategies to improve your search rankings, drive qualified organic traffic, and build long-term online authority. From technical SEO to local SEO for Nagpur and Raipur businesses.',
    features: [
      'Technical SEO Audits',
      'On-Page Optimization',
      'Off-Page & Link Building',
      'Local SEO (Google Business)',
      'Keyword Research & Strategy',
      'Content SEO',
      'Monthly SEO Reporting',
    ],
    icon: 'Search',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><polyline points="11 8 11 11 13 13"/></svg>`,
    accent: '#10B981',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'Marketing',
    tagline: 'Data-driven marketing that grows your business',
    description:
      'From paid ads to social media to email campaigns, our digital marketing services are designed to increase your visibility, generate qualified leads, and grow revenue.',
    features: [
      'Google Ads / PPC',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'Analytics & Reporting',
      'Conversion Rate Optimization',
      'Online Reputation Management',
    ],
    icon: 'TrendingUp',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    accent: '#00E5A0',
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    tagline: 'Native and cross-platform apps users love',
    description:
      'We build performant, beautiful mobile applications for iOS and Android using React Native and modern tooling — with full backend integration.',
    features: [
      'React Native',
      'iOS Development',
      'Android Development',
      'Progressive Web Apps (PWA)',
      'App UI/UX Design',
      'App Store Submission',
      'API Integration',
    ],
    icon: 'Smartphone',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    accent: '#06B6D4',
  },
  {
    slug: 'branding',
    title: 'Branding & Identity',
    shortTitle: 'Branding',
    tagline: 'Brand identities that stand out and endure',
    description:
      'We create comprehensive brand identities from scratch — logo design, typography, color systems, and style guides that reflect your values and resonate with your audience.',
    features: [
      'Logo Design',
      'Brand Identity',
      'Style Guide',
      'Rebranding',
      'Marketing Collateral',
      'Brand Strategy',
      'Visual Systems',
    ],
    icon: 'Paintbrush',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>`,
    accent: '#A855F7',
  },
  {
    slug: 'maintenance-security',
    title: 'Maintenance & Security',
    shortTitle: 'Maintenance',
    tagline: 'Keep your website fast, secure, and up-to-date',
    description:
      'Our ongoing maintenance plans keep your website running at peak performance — security patches, speed optimization, content updates, and 24/7 monitoring.',
    features: [
      'Security Audits',
      'SSL Setup & Renewal',
      'Speed Optimization',
      'Daily Backups',
      'Monthly Maintenance Plans',
      'Malware Removal',
      'Uptime Monitoring',
    ],
    icon: 'Shield',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    accent: '#EF4444',
  },
];
