export interface PortfolioShowcaseItem {
  title: string;
  label: string;
  description: string;
  image: string;
  liveUrl: string;
  launchUrl?: string;
  stack?: string[];
  note?: string;
  country?: string;
  countrySlug?: string;
  location?: string;
}

const beautiphiLaunch: PortfolioShowcaseItem = {
  title: 'Beautiphi Esthetic Clinics',
  label: 'Aesthetic Healthcare',
  description:
    'A welcoming clinic website that helps people explore aesthetic treatments, understand the expertise behind them and request a consultation with confidence.',
  image: '/portfolio/bec.avif',
  liveUrl: 'https://beautiphiclinic.com/',
  stack: ['Healthcare UX', 'Treatment Information', 'Consultation Enquiries'],
  note: 'Launched 25 August 2026',
};

const asbimLaunch: PortfolioShowcaseItem = {
  title: 'ASBIM Consulting',
  label: 'BIM Consulting',
  description: 'A structured service website presenting architectural, structural and MEP BIM expertise, with clear routes to explore services and make an enquiry.',
  image: '/portfolio/asbim.avif',
  liveUrl: 'https://asbimconsulting.com/',
  stack: ['B2B Website', 'Service Information', 'Enquiry Journey'],
  note: 'Recently launched',
};

export const latestLaunch: PortfolioShowcaseItem = {
  title: 'Healthy Genie',
  label: 'Medusa.js Meal Commerce',
  description: 'A launched Medusa.js meal-commerce website for Healthy Genie in Pune, bringing meal discovery, subscription plans and corporate meal enquiries into a clear customer journey.',
  image: '/elan-client-logos/healthy-genie.avif',
  liveUrl: 'https://healthygenie.in/',
  stack: ['Medusa.js', 'Meal Commerce', 'Subscription Plans'],
  note: 'Latest launch',
  location: 'Pune, India',
};

export const recentLaunches: PortfolioShowcaseItem[] = [
  asbimLaunch,
  {
    title: 'Parekh Opticals',
    label: 'Optical Retail',
    description: 'A recently launched website introducing Parekh Opticals and giving visitors a clear route to explore the business and get in touch.',
    image: '/portfolio/parekh.avif',
    liveUrl: 'https://theparekhopticals.in/',
    stack: ['Retail Website', 'Business Information', 'Enquiries'],
  },
  beautiphiLaunch,
  {
    title: 'KEN Global Designs',
    label: 'Apparel Manufacturing',
    description: 'A future-facing corporate website for an apparel innovator blending manufacturing expertise, responsible practices and modern sampling technology.',
    image: '/portfolio/ken-global.avif',
    liveUrl: 'https://kenglobal.in/',
    stack: ['Corporate Website', 'Apparel Manufacturing', 'Brand Storytelling'],
  },
  {
    title: 'ISA Nagpur',
    label: 'Healthcare Association',
    description:
      'A welcoming digital home for the Indian Society of Anaesthesiologists, Nagpur City Branch, built to make member information, programmes and public initiatives easier to find.',
    image: '/portfolio/isa-nagpur.avif',
    liveUrl: 'https://www.isanagpur.org/',
    stack: ['Custom Website', 'Responsive UX', 'Member Information'],
  },
  {
    title: 'MDFWala',
    label: 'Building Materials',
    description: 'A product-led website that helps buyers explore brands, materials and finishing services without getting lost in industry jargon.',
    image: '/portfolio/mdfwala.avif',
    liveUrl: 'https://www.mdfwala.com/',
    stack: ['Product Catalogue', 'Local Search', 'Lead Generation'],
  },
  {
    title: 'Deetyaa',
    label: 'Interior Design',
    description: 'A polished showcase for interior design work, services and ideas, with imagery taking centre stage on every screen.',
    image: '/portfolio/deetya.avif',
    liveUrl: 'https://deetyaa.com/',
    stack: ['Portfolio UX', 'Responsive Design', 'WordPress'],
  },
  {
    title: 'Ophthalmological Society Nagpur',
    label: 'Medical Association',
    description: 'A clear and dependable online presence for society updates, professional resources and member communication.',
    image: '/elan-client-logos/Opthalmological-Society-Nagpur.avif',
    liveUrl: 'https://osnnagpur.org/',
    stack: ['Association Website', 'Content Management', 'Mobile UX'],
  },
  {
    title: 'Samarth Realty',
    label: 'Real Estate',
    description: 'A confident bilingual property experience designed to communicate trust, location value and future-ready development.',
    image: '/portfolio/samarth-realty.avif',
    liveUrl: 'https://samarthrealty.co.in/',
    stack: ['Property Showcase', 'Bilingual Content', 'Lead Generation'],
  },
  {
    title: 'BrandEar',
    label: 'Digital Marketing',
    description: 'A bold agency website that turns a broad service offering into an easy path from first visit to campaign enquiry.',
    image: '/elan-client-logos/brandear.avif',
    liveUrl: 'https://brandear.in/',
    stack: ['Brand Website', 'Conversion UX', 'SEO'],
  },
];

export const ecommerceProjects: PortfolioShowcaseItem[] = [
  {
    title: 'Rangresha',
    label: 'Custom Shopify',
    description: 'A custom Shopify storefront for handcrafted products, cultural storytelling, retail shopping and corporate gifting.',
    image: '/elan-client-logos/rangresha.avif',
    liveUrl: 'https://rangresha.com/',
    stack: ['Shopify', 'Custom Theme', 'Mobile Commerce'],
  },
  {
    title: 'Puritas',
    label: 'Custom Medusa.js',
    description: 'Subscription commerce built around the brand, including Razorpay, PhonePe and custom shipping workflows.',
    image: '/elan-client-logos/Puritas.svg',
    liveUrl: 'https://puritas.in/',
    stack: ['Medusa.js', 'Subscriptions', 'Custom Payments'],
  },
  {
    title: 'Mahavir Mevawala',
    label: 'Food eCommerce',
    description: 'A warm digital storefront that brings a much-loved sweets and savouries brand to online customers.',
    image: '/portfolio/mahavir.avif',
    liveUrl: 'https://mahavirmevawala.in/',
    stack: ['WooCommerce', 'Product Catalogue', 'Online Orders'],
  },
  {
    title: 'Stems Flower Studio',
    label: 'Flower eCommerce',
    description: 'A refined New Zealand flower shop experience that keeps bouquets visual, personal and simple to order.',
    image: '/portfolio/stems-flower-studio.avif',
    liveUrl: 'https://stemsflowerstudio.co.nz/',
    stack: ['WooCommerce', 'Gift Shopping', 'Responsive UX'],
    country: 'New Zealand',
    countrySlug: 'new-zealand',
    location: 'Auckland, New Zealand',
  },
  {
    title: 'Larisha Ayurved',
    label: 'Wellness eCommerce',
    description: 'An approachable Ayurvedic wellness website combining treatments, products and helpful health information.',
    image: '/portfolio/larisha.avif',
    liveUrl: 'https://larishaayurved.com/',
    stack: ['WooCommerce', 'Wellness Content', 'Local Search'],
  },
];

export const internationalProjects: PortfolioShowcaseItem[] = [
  {
    title: 'Ribolator USA',
    label: 'USA BBQ Product Website',
    description: 'A product-led website for the Rib-O-Lator barbecue rotisserie brand, bringing product information, cooking inspiration and shopping into one experience.',
    image: '/portfolio/ribolator-usa.avif',
    liveUrl: 'https://ribolator.com/',
    stack: ['Product Website', 'Online Store', 'Brand Content'],
    country: 'United States',
    countrySlug: 'usa',
    location: 'United States',
  },
  {
    title: 'Wind-Tech Auto Glass',
    label: 'USA Client Website',
    description: 'A focused local-service website helping Seattle drivers understand auto glass services and request an estimate quickly.',
    image: '/portfolio/wind-tech.avif',
    liveUrl: 'https://wind-tech.com/',
    stack: ['WordPress', 'Local Service UX', 'Lead Generation'],
    country: 'United States',
    countrySlug: 'usa',
    location: 'Seattle, Washington',
  },
  {
    title: 'Pan Pro Windows',
    label: 'Canada Client Website',
    description: 'A service-led website for a family-run windows and doors business serving residential, commercial and industrial customers.',
    image: '/portfolio/panpro-windows.avif',
    liveUrl: 'https://panprowindows.ca/',
    stack: ['WordPress', 'Service Website', 'Local Business'],
    country: 'Canada',
    countrySlug: 'canada',
    location: 'Scarborough, Ontario',
    note: 'The live website uses regional Cloudflare protection',
  },
  {
    title: 'Rushmore Group',
    label: 'Australia Client Website',
    description: 'A professional website that makes complex business, intellectual property and option valuation services easier to understand.',
    image: '/portfolio/rushmore-group.avif',
    liveUrl: 'https://rushmoregroup.com.au/',
    stack: ['WordPress', 'Professional Services', 'Content Structure'],
    country: 'Australia',
    countrySlug: 'australia',
    location: 'Australia',
  },
  ecommerceProjects.find((project) => project.title === 'Stems Flower Studio')!,
];

export const launchingSoon: PortfolioShowcaseItem[] = [
  {
    title: 'Jog Hospitality',
    label: 'Hospitality · In development',
    description: 'A new hospitality website in development. Explore the working preview; content and functionality may change before launch.',
    image: '',
    liveUrl: 'https://jog-hospitality.netlify.app/',
    note: 'Development preview - not the final production website',
  },
  {
    title: 'PropertyCab',
    label: 'Real Estate Platform',
    description: 'A modern property discovery platform for verified residential, commercial and agricultural listings.',
    image: '/portfolio/propertycab.avif',
    // propertycab.in is not resolving yet. The elantech.cloud demo is the working
    // site, so no separate production destination is published until it is live.
    liveUrl: 'https://propertycab.elantech.cloud/',
    stack: ['Property Search', 'Custom Development', 'Responsive UX'],
  },
  {
    title: 'Chandak Instruments Pvt. Ltd.',
    label: 'Corporate Website · In development',
    description: 'A new company website in development for Chandak Instruments Pvt. Ltd. The preview is a work in progress, not the final production release.',
    image: '/elan-client-logos/Chandak-Instruments.avif',
    liveUrl: 'https://starlit-semolina-bd9639.netlify.app/',
    note: 'Client logo shown · Development preview',
  },
  {
    title: 'MMSintered',
    label: 'Business Website · In development',
    description: 'A new website for MMSintered, currently in development. The working preview may change as content and design are reviewed.',
    image: '',
    liveUrl: 'https://mmsintered.netlify.app/',
    note: 'Development preview - not the final production website',
  },
  {
    title: 'AviForge',
    label: 'Business Website · In development',
    description: 'A new AviForge website in development, with a working preview available for an early look at the project.',
    image: '',
    liveUrl: 'https://aviforge.netlify.app/',
    note: 'Development preview - not the final production website',
  },
  {
    title: 'AnyCore BPO',
    label: 'BPO Website · In development',
    description: 'A new website for AnyCore BPO, currently in development. Preview content and functionality remain subject to review and testing.',
    image: '',
    liveUrl: 'https://wandering-frost-5791.elantech-pms.workers.dev/',
    note: 'Development preview - not the final production website',
  },
  {
    title: 'MASS Architects',
    label: 'Architecture · In development',
    description: 'A new website project for MASS Architects. A public preview link will be added when available.',
    image: '',
    liveUrl: '',
    note: 'In development · Preview not yet available',
  },
  {
    title: 'New Edge Ventures',
    label: 'Business Website · In development',
    description: 'A new website project for New Edge Ventures. A public preview link will be added when available.',
    image: '',
    liveUrl: '',
    note: 'In development · Preview not yet available',
  },
  {
    title: 'CITL',
    label: 'Corporate Website',
    description: 'A modern business website focused on simple navigation, confident presentation and clear enquiry paths.',
    image: '/portfolio/citl.avif',
    liveUrl: 'https://citl.elantech.in/',
    stack: ['Corporate Design', 'Responsive UX', 'Content Management'],
  },
];

export const selectedProjects: PortfolioShowcaseItem[] = [
  {
    title: 'Ekalavya',
    label: 'Legal Education Initiative',
    description: 'A knowledge platform supporting young lawyers, aspiring judges, judicial officers and litigation managers through free learning resources and practical guidance.',
    image: '/portfolio/ekalavya-main.avif',
    liveUrl: 'https://ekalavya.co.in/',
    stack: ['Content Platform', 'Legal Education', 'Responsive Website'],
  },
  {
    title: 'Ekalavya JUD Portal',
    label: 'Mentorship and Learning Portal',
    description: 'A secure companion portal created for registered users to access Ekalavya mentorship, internship and just-in-time learning experiences.',
    image: '/portfolio/ekalavya-jud-portal.avif',
    liveUrl: 'https://jud.ekalavya.co.in/',
    stack: ['User Portal', 'Mentorship', 'Authenticated Access'],
  },
  {
    title: 'Yashoda Maternity',
    label: 'Healthcare',
    description: 'Patient-friendly information and care journeys for a specialist maternity hospital.',
    image: '/portfolio/yashoda.avif',
    liveUrl: 'https://yashodamaternity.com/',
  },
  {
    title: 'Merraki Expert',
    label: 'Consulting',
    description: 'A professional website that builds confidence and turns expertise into enquiries.',
    image: '/portfolio/merraki-expert.avif',
    liveUrl: 'https://merrakiexpert.in/',
  },
  {
    title: 'Abhirama International',
    label: 'International Business',
    description: 'A cohesive presence for a business working across real estate and global trade.',
    image: '/portfolio/abhirama.avif',
    liveUrl: 'https://abhiramainternational.com/',
  },
  {
    title: 'Aarch Meraki',
    label: 'Architecture',
    description: 'An image-led portfolio designed to let architecture and interior work speak first.',
    image: '/portfolio/aarchmeraki.avif',
    liveUrl: 'https://aarchmeraki.com/',
  },
  {
    title: 'MSME Hub',
    label: 'Business Platform',
    description: 'A scalable information and resource platform created for India’s MSME community.',
    image: '/elan-client-logos/msmehub.svg',
    liveUrl: 'https://msmehub.co.in/',
    note: 'Preview: msmehub.elantech.cloud',
  },
];

export const legacyProject: PortfolioShowcaseItem = {
  title: 'Airborne Powerline Inspections',
  label: 'Long-running WordPress Website',
  description:
    'One of our oldest WordPress projects still serving an international specialist inspection business. It is a reminder that thoughtful website work should remain useful long after launch day.',
  image: '/portfolio/nei.avif',
  liveUrl: 'https://www.airborne-powerline-inspections.com/',
  stack: ['WordPress', 'International B2B', 'Built for Longevity'],
  note: 'A long-standing eLan Technology build',
};
