export interface Project {
  id: number;
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: string; // matches PortfolioFilter categories
  technologies: string[];
  description: string;
  challenge: string;
  solution: string;
  result: string;
  image: string; // path in /public/portfolio/
  liveUrl?: string;
  isFeatured: boolean;
  accent: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'ribolator-usa',
    title: 'Ribolator USA',
    client: 'Bob (USA)',
    industry: 'International',
    category: 'Web Development',
    technologies: ['Custom MERN', 'React', 'Node.js'],
    description:
      'A full-featured B2B lead generation platform for Ribolator USA, enabling international distributors to connect, request quotes, and manage product inquiries seamlessly.',
    challenge:
      'The client needed a robust international-facing platform that could handle multi-currency pricing, multi-language content requests, and a complex product catalog for industrial equipment distributors across North America.',
    solution:
      'We engineered a custom MERN stack application with a dynamic product configurator, multi-step quote request system, and an admin dashboard for real-time lead management. SEO-optimized landing pages were built for each product category.',
    result: 'International B2B lead generation platform driving qualified inquiries from 12+ countries.',
    image: '/portfolio/ribolator.png',
    liveUrl: 'https://ribolatorusa.com',
    isFeatured: true,
    accent: '#00E5A0',
  },
  {
    id: 2,
    slug: 'cipl-corporate-portal',
    title: 'CIPL Corporate Portal',
    client: 'Director Rohit',
    industry: 'Corporate',
    category: 'Web Development',
    technologies: ['React', 'Next.js', 'Node.js'],
    description:
      'An enterprise-grade internal web portal for a large Indian corporation, streamlining HR workflows, announcements, document management, and interdepartmental communication for 500+ staff members.',
    challenge:
      'CIPL\'s workforce of over 500 employees relied on fragmented communication channels and manual HR processes. The company needed a centralized portal that could handle role-based access control, secure document sharing, and real-time announcements.',
    solution:
      'We built a Next.js-powered enterprise portal with JWT authentication, role-based dashboards, an integrated document library, HR self-service tools, and a company-wide announcement board. The system was deployed on a secure private server with automated backups.',
    result: 'Enterprise web portal serving 500+ staff, reducing HR query resolution time by 60%.',
    image: '/portfolio/cipl.avif',
    isFeatured: true,
    accent: '#6366F1',
  },
  {
    id: 3,
    slug: 'csri-bsb',
    title: 'CSRI-BSB International',
    client: 'Wayne',
    industry: 'International',
    category: 'Web Development',
    technologies: ['Custom MERN', 'MongoDB', 'Express'],
    description:
      'A long-term technology partnership spanning 5+ years with CSRI-BSB, delivering custom web solutions, API integrations, and ongoing platform evolution for an international research and consulting organization.',
    challenge:
      'CSRI-BSB required a reliable technology partner to manage their growing digital infrastructure — from custom data collection tools and reporting dashboards to member portals and secure document repositories. Their existing system was fragmented and difficult to scale.',
    solution:
      'eLan Technology became CSRI-BSB\'s dedicated development partner, systematically rebuilding their digital ecosystem on a custom MERN stack. We delivered phased releases — starting with a member portal, then a reporting dashboard, and finally a fully integrated research data management system.',
    result: '5+ year technology partnership; 3 major platform releases delivered on time and on budget.',
    image: '/portfolio/csri.avif',
    isFeatured: true,
    accent: '#F59E0B',
  },
  {
    id: 4,
    slug: 'trimit-architects',
    title: 'Trimit Architects',
    client: 'Trimit Studio',
    industry: 'Architecture',
    category: 'Website Design',
    technologies: ['WordPress', 'CSS3', 'Elementor'],
    description:
      'A visually immersive portfolio website for a boutique architecture studio, showcasing their residential and commercial projects through high-resolution galleries and project case studies.',
    challenge:
      'Trimit Studio needed a website that would reflect the precision and artistry of their architectural work. Their previous website was outdated, not mobile-friendly, and failed to communicate their design philosophy or generate client inquiries.',
    solution:
      'We designed a full-screen, image-forward WordPress website with a custom Elementor theme, parallax scrolling effects, a filterable project gallery, and an integrated inquiry form. The site was optimized for Core Web Vitals with lazy loading and compressed assets.',
    result: 'Award-winning portfolio showcase; 3x increase in client inquiry form submissions within 60 days.',
    image: '/portfolio/trimitarch.avif',
    isFeatured: false,
    accent: '#EC4899',
  },
  {
    id: 5,
    slug: 'aasthaa-hospital',
    title: 'Aasthaa Hospital',
    client: 'Aasthaa Health',
    industry: 'Healthcare',
    category: 'Website Design',
    technologies: ['WordPress', 'WooCommerce'],
    description:
      'A patient-centric hospital website for Aasthaa Hospital, providing online appointment booking, doctor profiles, department information, and health resources for patients across the region.',
    challenge:
      'Aasthaa Hospital was losing potential patients to competitors with better online presence. Their old website had no online appointment system, poor mobile experience, and no clear calls-to-action for emergency or general inquiry.',
    solution:
      'We redesigned the hospital website with a clean, trust-building layout, integrated an online appointment booking form, created dedicated pages for each department and specialist doctor, and added a health tips blog. The site was built for accessibility (WCAG AA) and optimized for local SEO.',
    result: 'Patient inquiry form submissions increased 200%; Google ranking improved to page 1 for key local searches.',
    image: '/portfolio/aasthaa.avif',
    isFeatured: true,
    accent: '#06B6D4',
  },
  {
    id: 6,
    slug: 'dfyne-magazine',
    title: "D'FYNE Magazine",
    client: "D'FYNE Media",
    industry: 'Media',
    category: 'eCommerce',
    technologies: ['WordPress', 'WooCommerce', 'Subscriptions'],
    description:
      "A digital magazine and subscription eCommerce platform for D'FYNE Magazine, combining editorial content publishing with a WooCommerce-powered subscription and single-issue purchase system.",
    challenge:
      "D'FYNE Media needed to transition their print magazine to a digital-first model with a subscription paywall, digital issue downloads, and a seamless checkout experience for readers across Canada and internationally.",
    solution:
      'We built a hybrid content and eCommerce WordPress site using WooCommerce Subscriptions and WooCommerce PDF Products. The editorial team uses a custom backend workflow for issue uploads. The frontend features a beautiful magazine-style layout with a frictionless subscription checkout.',
    result: 'Digital magazine and subscription platform launched successfully; 1,200+ active digital subscribers in first 6 months.',
    image: '/portfolio/dfyne.avif',
    isFeatured: false,
    accent: '#EF4444',
  },
  {
    id: 7,
    slug: 'guru-nanak-college',
    title: 'Guru Nanak College',
    client: 'GNC Nagpur',
    industry: 'Education',
    category: 'Website Design',
    technologies: ['WordPress', 'PHP'],
    description:
      'A comprehensive institutional website for Guru Nanak College, Nagpur, serving as the primary information hub for students, parents, faculty, and prospective applicants.',
    challenge:
      'The college\'s existing website was outdated, slow, and difficult to navigate. Prospective students struggled to find admission information, course details, and contact forms. The admin team had no easy way to update notices or events.',
    solution:
      'We rebuilt the college website on WordPress with a custom PHP theme optimized for performance. Key features include a self-service content management system for notices and events, a structured course catalog, faculty directory, an online inquiry form, and a dedicated admissions section with downloadable forms.',
    result: 'Student and parent information hub serving 5,000+ visitors per month; admission inquiry submissions tripled.',
    image: '/portfolio/gnc.avif',
    isFeatured: false,
    accent: '#00E5A0',
  },
  {
    id: 8,
    slug: 'geospatial-studio',
    title: 'Geospatial Studio',
    client: 'GeoStudio',
    industry: 'Technology',
    category: 'Web Development',
    technologies: ['React', 'Next.js', 'Leaflet.js'],
    description:
      'An interactive mapping and spatial data portal built for GeoStudio, enabling clients to visualize, filter, and export geospatial datasets through a powerful browser-based interface.',
    challenge:
      'GeoStudio needed a web platform to showcase their geospatial data products and allow clients to interactively explore map layers, filter datasets by region, and request custom data exports — replacing their manual email-based workflow.',
    solution:
      'We built a Next.js application with Leaflet.js integration for interactive mapping, custom React components for layer controls and filters, a JWT-secured client portal for dataset downloads, and a responsive design that works across devices including field tablets.',
    result: 'Mapping and spatial data portal reduced manual client onboarding by 75%; platform handles 500+ concurrent map sessions.',
    image: '/portfolio/geostudio.avif',
    isFeatured: false,
    accent: '#EF4444',
  },
  {
    id: 9,
    slug: 'resort-management',
    title: 'Serenity Resort & Spa',
    client: 'Serenity Hospitality Group',
    industry: 'Hospitality',
    category: 'Web Development',
    technologies: ['React', 'Next.js', 'Stripe', 'PostgreSQL'],
    description:
      'A full-stack resort management and online booking platform for a luxury resort in central India, featuring real-time room availability, online payments, and guest management.',
    challenge:
      'The resort was managing bookings through phone calls and manual spreadsheets, resulting in double-bookings, revenue leakage, and poor guest experience. They needed an end-to-end digital booking system integrated with their internal operations.',
    solution:
      'We developed a custom Next.js booking engine with real-time availability calendar, Stripe payment integration, automated booking confirmation emails, a guest-facing portal, and an operations dashboard for the resort team. The system handles seasonal pricing and promotional codes.',
    result: 'Online bookings account for 65% of total revenue within 4 months of launch; zero double-booking incidents.',
    image: '/portfolio/resort-management.png',
    isFeatured: false,
    accent: '#06B6D4',
  },
  {
    id: 10,
    slug: 'hotel-booking-portal',
    title: 'StayEasy Hotel Chain',
    client: 'StayEasy Hotels Pvt. Ltd.',
    industry: 'Hospitality',
    category: 'eCommerce',
    technologies: ['WordPress', 'WooCommerce', 'HotelDruid API'],
    description:
      'A multi-property hotel booking portal for a mid-scale hotel chain with 6 properties across Vidarbha, enabling centralized online reservations, loyalty program integration, and property showcasing.',
    challenge:
      'StayEasy Hotels had 6 separate, inconsistent websites for their properties with no central booking system. Guests had difficulty comparing properties or booking in advance, and the marketing team had no unified brand presence.',
    solution:
      'We created a unified multi-property booking portal on WordPress, integrating WooCommerce for reservation payments and a HotelDruid API connection for real-time availability. Each property has a dedicated sub-section, and the loyalty program is integrated into the checkout flow.',
    result: 'Unified brand presence across 6 properties; direct bookings increased 40% reducing dependency on OTA commissions.',
    image: '/portfolio/hotel.avif',
    isFeatured: false,
    accent: '#F59E0B',
  },
  {
    id: 11,
    slug: 'aarna-wedding',
    title: 'Aarna Wedding Studio',
    client: 'Aarna Events & Photography',
    industry: 'Events & Photography',
    category: 'Website Design',
    technologies: ['WordPress', 'Elementor', 'CSS3'],
    description:
      'An elegant, visually rich portfolio and inquiry website for a premium wedding photography and event management studio based in Nagpur, targeting high-value clients planning destination weddings.',
    challenge:
      'Aarna Wedding Studio relied entirely on word-of-mouth and Instagram for leads. They needed a professional web presence that conveyed the premium quality of their work, showcased their portfolio compellingly, and drove qualified inquiry form submissions.',
    solution:
      'We designed a full-screen cinematic website with a curated gallery, video reel integration, detailed service packages, testimonials, and a multi-step inquiry form. The site is optimized for local wedding-related search terms and includes Schema markup for events photography businesses.',
    result: 'Organic web inquiries increased from zero to 25+ per month within 90 days of launch.',
    image: '/portfolio/aarna.avif',
    isFeatured: true,
    accent: '#EC4899',
  },
  {
    id: 12,
    slug: 'school-management-erp',
    title: 'BrightMinds School ERP',
    client: 'BrightMinds International School',
    industry: 'Education',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    description:
      'A comprehensive School ERP (Enterprise Resource Planning) system for a growing private school, covering student management, fee collection, attendance tracking, timetable management, and parent communication.',
    challenge:
      'BrightMinds School was operating with paper-based records, manual fee receipts, and no digital communication channel between teachers and parents. With 800+ students, this was creating significant administrative burden and parent dissatisfaction.',
    solution:
      'We built a full-stack MERN School ERP with separate portals for administrators, teachers, students, and parents. Features include automated fee reminders via email/SMS, a digital gradebook, attendance tracking with daily parent notifications, and a timetable builder for the admin team.',
    result: 'Administrative workload reduced by 70%; fee collection default rate dropped from 18% to 4% with automated reminders.',
    image: '/portfolio/school-erp.avif',
    isFeatured: false,
    accent: '#6366F1',
  },
  {
    id: 13,
    slug: 'ngo-foundation',
    title: 'Pragati Foundation',
    client: 'Pragati Social Foundation',
    industry: 'NGO / Non-Profit',
    category: 'Website Design',
    technologies: ['WordPress', 'Razorpay', 'PHP'],
    description:
      'A cause-driven fundraising and awareness website for Pragati Foundation, a Nagpur-based NGO working in rural education and women\'s empowerment, featuring online donation collection and project impact reporting.',
    challenge:
      'Pragati Foundation had no website, and their fundraising relied entirely on personal outreach. They needed a credible digital presence to attract corporate CSR donors and individual supporters, with a transparent impact reporting section.',
    solution:
      'We designed and developed a warm, story-first WordPress website with integrated Razorpay donations (one-time and recurring), a project gallery showing field impact, donor testimonials, annual report downloads, and a volunteer registration form. The site is fully mobile-optimized and HTTPS-secured.',
    result: 'Online donations raised ₹8.5 lakh in the first year; 3 corporate CSR partnerships established through web inquiries.',
    image: '/portfolio/ngo.avif',
    isFeatured: false,
    accent: '#A855F7',
  },
];

export const filterCategories = [
  'All',
  'Website Design',
  'Web Development',
  'eCommerce',
  'Mobile Apps',
  'Branding',
] as const;

export type FilterCategory = (typeof filterCategories)[number];
