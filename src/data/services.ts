export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string; // lucide icon name as string
  iconSvg: string; // inline SVG string for rendering
  accent: string; // hex color (dark-mode decorative use only)
  cssVar: string; // CSS custom property - WCAG AA on both dark & light bg
}

export const services: Service[] = [
  {
    slug: 'website-design',
    title: 'Website Design',
    shortTitle: 'Design',
    tagline: 'Clear, custom websites that help people choose you',
    description:
      'We design custom websites that look like your business, work well on every screen, and make it easy for visitors to take the next step.',
    features: [
      'Custom page design',
      'Mobile-friendly layouts',
      'Simple, clear navigation',
      'Landing pages',
      'Website redesigns',
      'Accessible design',
      'Clickable previews before development',
    ],
    icon: 'Palette',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    accent: '#EC4899',
    cssVar: '--ac-pink',
  },
  {
    slug: 'web-development',
    title: 'Web Development',
    shortTitle: 'Development',
    tagline: 'Reliable websites and business tools built for everyday use',
    description:
      'We build websites, portals, booking systems, dashboards, and online tools that are quick to use, easy to manage, and ready to grow with your business.',
    features: [
      'Business websites',
      'Customer and staff portals',
      'Booking and enquiry systems',
      'Dashboards and reports',
      'Easy content management',
      'Connections to your existing tools',
      'Speed improvements',
      'Ongoing feature development',
    ],
    icon: 'Code2',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    accent: '#6366F1',
    cssVar: '--ac-indigo',
  },
  {
    slug: 'ecommerce',
    title: 'eCommerce Development',
    shortTitle: 'eCommerce',
    tagline: 'Online stores built around your products, customers, and team',
    description:
      'We create online stores that are easy to shop and easy to run. We work with Shopify, WooCommerce, Medusa.js, Magento, BigCommerce, Wix, OpenCart, and custom platforms.',
    features: [
      'Custom online store design',
      'Shopify and WooCommerce',
      'Magento and BigCommerce',
      'Wix and OpenCart',
      'Medusa.js and custom stores',
      'Subscriptions and repeat orders',
      'Payments and shipping',
      'Store migration and support',
    ],
    icon: 'ShoppingCart',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
    accent: '#F59E0B',
    cssVar: '--ac-amber',
  },
  {
    slug: 'seo',
    title: 'Search Engine Optimization',
    shortTitle: 'SEO',
    tagline: 'Help the right customers find your business on Google',
    description:
      'We improve how your website appears in search, fix the issues holding it back, and create useful pages that bring in relevant enquiries over time.',
    features: [
      'Website search review',
      'Page and content improvements',
      'Local Google visibility',
      'Search topic planning',
      'Useful new content',
      'Trusted link building',
      'Simple monthly reports',
    ],
    icon: 'Search',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><polyline points="11 8 11 11 13 13"/></svg>`,
    accent: '#10B981',
    cssVar: '--ac-emerald',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'Marketing',
    tagline: 'Practical campaigns that bring in leads and sales',
    description:
      'We plan and manage digital campaigns around a clear business goal, whether that is more enquiries, store sales, bookings, or stronger customer relationships.',
    features: [
      'Google advertising',
      'Social media campaigns',
      'Useful content',
      'Email campaigns',
      'Lead and sales tracking',
      'Campaign improvements',
      'Online reputation support',
    ],
    icon: 'TrendingUp',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    accent: '#06B6D4',
    cssVar: '--ac-cyan',
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    tagline: 'Useful mobile apps that feel simple from the first tap',
    description:
      'We design and build mobile apps for iPhone and Android, then help with testing, launch, updates, and the systems needed behind the app.',
    features: [
      'iPhone and Android apps',
      'App design and user journeys',
      'Customer accounts and payments',
      'Notifications and updates',
      'Web-based mobile apps',
      'App Store and Play Store launch',
      'Connections to existing systems',
    ],
    icon: 'Smartphone',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    accent: '#A855F7',
    cssVar: '--ac-violet',
  },
  {
    slug: 'branding',
    title: 'Branding & Identity',
    shortTitle: 'Branding',
    tagline: 'A clear identity people recognise and remember',
    description:
      'We shape the look and feel of your business, from the logo and colours to the everyday materials your customers see.',
    features: [
      'Logo design',
      'Colours and typography',
      'Brand guidelines',
      'Rebranding',
      'Business and marketing materials',
      'Brand positioning',
      'Consistent visual style',
    ],
    icon: 'Paintbrush',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>`,
    accent: '#00E5A0',
    cssVar: '--ac-teal',
  },
  {
    slug: 'maintenance-security',
    title: 'Maintenance & Security',
    shortTitle: 'Maintenance',
    tagline: 'Keep your website healthy, secure, and up to date',
    description:
      'We look after updates, backups, security, speed, and small content changes so your team can focus on the business.',
    features: [
      'Website health checks',
      'Security and SSL',
      'Speed improvements',
      'Regular backups',
      'Monthly care plans',
      'Malware clean-up',
      'Availability monitoring',
    ],
    icon: 'Shield',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    accent: '#EF4444',
    cssVar: '--ac-red',
  },
  {
    slug: 'ada-compliant-web-design',
    title: 'ADA & WCAG Compliance',
    shortTitle: 'Accessibility',
    tagline: 'Websites that more people can use with confidence',
    description:
      'We find and fix accessibility barriers so people using keyboards, screen readers, zoom, and other assistive tools can complete the same important tasks.',
    features: [
      'Accessibility review',
      'Code and content fixes',
      'Accessible page design',
      'Keyboard and screen reader testing',
      'Clear findings and priorities',
      'Conformance documentation',
      'Ongoing monitoring',
    ],
    icon: 'Accessibility',
    iconSvg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="4" r="1"/><path d="m18 19 1-7-6 1"/><path d="m5 8 3-3 5.5 3-2.36 3.5"/><path d="M4.24 14.5a5 5 0 0 0 6.88 6"/><path d="M13.76 17.5a5 5 0 0 0-6.88-6"/></svg>`,
    accent: '#3B82F6',
    cssVar: '--ac-blue',
  },
];
