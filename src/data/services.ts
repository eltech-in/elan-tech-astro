export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string; // lucide icon name as string
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
    accent: '#F59E0B',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'Marketing',
    tagline: 'Data-driven marketing that grows your business',
    description:
      'From SEO to paid ads to social media, our digital marketing services are designed to increase your visibility, generate qualified leads, and grow revenue.',
    features: [
      'Search Engine Optimization (SEO)',
      'Google Ads / PPC',
      'Social Media Marketing',
      'Content Marketing',
      'Email Marketing',
      'Local SEO',
      'Analytics & Reporting',
    ],
    icon: 'TrendingUp',
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
    accent: '#EF4444',
  },
];
