export interface Project {
  id: number;
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: string;
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
      'We engineered a custom MERN stack application with a dynamic product configurator, multi-step quote request system, and an admin dashboard for real-time lead management.',
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
      "CIPL's workforce of over 500 employees relied on fragmented communication channels and manual HR processes. The company needed a centralized portal with role-based access control and real-time announcements.",
    solution:
      'We built a Next.js-powered enterprise portal with JWT authentication, role-based dashboards, an integrated document library, HR self-service tools, and a company-wide announcement board.',
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
      'CSRI-BSB required a reliable technology partner to manage their growing digital infrastructure — from custom data collection tools to member portals and secure document repositories.',
    solution:
      "eLan Technology became CSRI-BSB's dedicated development partner, systematically rebuilding their digital ecosystem on a custom MERN stack with phased releases.",
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
      'Their previous website was outdated, not mobile-friendly, and failed to communicate their design philosophy or generate client inquiries.',
    solution:
      'We designed a full-screen, image-forward WordPress website with a custom Elementor theme, parallax scrolling effects, a filterable project gallery, and an integrated inquiry form.',
    result: 'Award-winning portfolio showcase; 3× increase in client inquiry submissions within 60 days.',
    image: '/portfolio/trimitarch.avif',
    isFeatured: true,
    accent: '#EC4899',
  },
  {
    id: 5,
    slug: 'aastha-hospital',
    title: 'Aastha Hospital',
    client: 'Aastha Health',
    industry: 'Healthcare',
    category: 'Website Design',
    technologies: ['WordPress', 'WooCommerce'],
    description:
      'A patient-centric hospital website for Aastha Hospital, providing online appointment booking, doctor profiles, department information, and health resources for patients across the region.',
    challenge:
      'The hospital was losing potential patients to competitors with better online presence. Their old website had no online appointment system and poor mobile experience.',
    solution:
      'We redesigned the hospital website with a clean, trust-building layout, integrated online appointment booking, dedicated pages for each department, and optimized it for local SEO.',
    result: 'Patient inquiry form submissions increased 200%; Google ranking improved to page 1 for key local searches.',
    image: '/portfolio/aastha.avif',
    isFeatured: true,
    accent: '#06B6D4',
  },
  {
    id: 6,
    slug: 'aarch-meraki',
    title: 'Aarch Meraki',
    client: 'Aarch Meraki Studio',
    industry: 'Architecture & Interior Design',
    category: 'Website Design',
    technologies: ['WordPress', 'Elementor', 'CSS3'],
    description:
      'A sophisticated portfolio and branding website for Aarch Meraki, an architecture and interior design studio, showcasing residential, commercial, and hospitality projects with an emphasis on visual storytelling.',
    challenge:
      'Aarch Meraki needed a website that matched the premium quality of their design work and converted visitors into consultation requests.',
    solution:
      'We created a visually rich WordPress portfolio site with full-screen imagery, project case studies, a services overview, and a streamlined consultation booking form.',
    result: 'Strong digital presence established; consistent flow of qualified consultation inquiries from website.',
    image: '/portfolio/aarchmeraki.avif',
    isFeatured: false,
    accent: '#A855F7',
  },
  {
    id: 7,
    slug: 'abc-wiindo',
    title: 'ABC Wiindo',
    client: 'ABC Wiindo',
    industry: 'Manufacturing',
    category: 'Website Design',
    technologies: ['WordPress', 'PHP', 'CSS3'],
    description:
      'A product-focused business website for ABC Wiindo, a manufacturer of premium windows and doors, showcasing their product range, customization options, and enabling customer inquiries.',
    challenge:
      'The company lacked a digital presence to showcase their full product catalog and capture leads from architects, builders, and homeowners searching online.',
    solution:
      'We developed a clean, product-forward WordPress website with a categorized product gallery, specification sheets, and an integrated inquiry form with product selection.',
    result: 'Significant increase in online product inquiries; website now the primary lead generation channel.',
    image: '/portfolio/abcwiindo.avif',
    isFeatured: false,
    accent: '#00E5A0',
  },
  {
    id: 8,
    slug: 'abhirama-real-estate',
    title: 'Abhirama Real Estate',
    client: 'Abhirama Group',
    industry: 'Real Estate',
    category: 'Website Design',
    technologies: ['WordPress', 'Elementor', 'CSS3'],
    description:
      'A property showcase and lead generation website for Abhirama Real Estate, featuring project listings, floor plans, virtual tour integration, and a site visit booking system.',
    challenge:
      'Abhirama needed a digital platform to showcase their residential projects, provide detailed project information, and capture pre-launch registrations from potential buyers.',
    solution:
      'We built a visually engaging WordPress site with project-specific landing pages, image galleries, floor plan downloads, amenity highlights, and a lead capture form with CRM integration.',
    result: 'Successful online launches for multiple projects with strong pre-registration numbers.',
    image: '/portfolio/abhirama-realestae.avif',
    isFeatured: false,
    accent: '#F59E0B',
  },
  {
    id: 9,
    slug: 'resort-management-system',
    title: 'Resort Management Portal',
    client: 'Hospitality Client',
    industry: 'Hospitality',
    category: 'Web Development',
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    description:
      'A full-stack resort management and online booking portal featuring real-time room availability, online payments, housekeeping management, and a guest CRM dashboard.',
    challenge:
      'The resort was managing bookings through phone calls and spreadsheets, resulting in double-bookings, revenue leakage, and poor guest experience.',
    solution:
      'We developed a custom Next.js booking engine with real-time availability calendar, payment integration, automated confirmation emails, a guest-facing portal, and an operations dashboard.',
    result: 'Online bookings account for 65% of total revenue within 4 months; zero double-booking incidents.',
    image: '/portfolio/resort-management.png',
    isFeatured: true,
    accent: '#06B6D4',
  },
  {
    id: 10,
    slug: 'anirwan',
    title: 'Anirwan',
    client: 'Anirwan',
    industry: 'Business Services',
    category: 'Website Design',
    technologies: ['WordPress', 'CSS3'],
    description:
      'A professional business website for Anirwan, designed to establish a strong digital presence and drive customer engagement through clear service communication and easy contact options.',
    challenge:
      'The client needed a modern, professional website to showcase their services and stand out from competitors in their market.',
    solution:
      'We delivered a clean, conversion-focused WordPress website with a clear service hierarchy, strong call-to-actions, and a mobile-first responsive design.',
    result: 'Established professional digital presence with improved customer reach and inquiry generation.',
    image: '/portfolio/anirwan.avif',
    isFeatured: false,
    accent: '#6366F1',
  },
  {
    id: 11,
    slug: 'caba',
    title: 'CABA',
    client: 'CABA',
    industry: 'Business',
    category: 'Website Design',
    technologies: ['WordPress', 'Elementor'],
    description:
      'A clean and modern business website for CABA, built to communicate brand values, showcase services, and generate qualified business inquiries through an optimized user experience.',
    challenge:
      'CABA needed a website that clearly communicated their offering to potential clients and created a professional first impression online.',
    solution:
      'We designed and developed a visually polished WordPress website with a structured service presentation, team section, and integrated contact system.',
    result: 'Professional online presence established with consistent inbound inquiry generation.',
    image: '/portfolio/caba.avif',
    isFeatured: false,
    accent: '#EC4899',
  },
  {
    id: 12,
    slug: 'deetya',
    title: 'Deetya',
    client: 'Deetya',
    industry: 'Lifestyle & Fashion',
    category: 'eCommerce',
    technologies: ['WordPress', 'WooCommerce', 'CSS3'],
    description:
      'A stylish eCommerce and brand website for Deetya, a lifestyle brand, featuring product showcases, online purchasing, and a curated brand storytelling experience.',
    challenge:
      'Deetya wanted to transition from offline-only sales to a digital-first model with a strong brand identity and seamless online shopping experience.',
    solution:
      'We built a visually rich WooCommerce store with custom product pages, lookbook gallery, brand storytelling sections, and a frictionless checkout experience.',
    result: 'Successful digital launch with strong initial online sales traction.',
    image: '/portfolio/deetya.avif',
    isFeatured: false,
    accent: '#EC4899',
  },
  {
    id: 13,
    slug: 'harmony',
    title: 'Harmony',
    client: 'Harmony',
    industry: 'Wellness & Lifestyle',
    category: 'Website Design',
    technologies: ['WordPress', 'Elementor', 'CSS3'],
    description:
      'A serene and elegant website for Harmony, a wellness and lifestyle brand, designed to communicate calm, trust, and quality to their target audience.',
    challenge:
      'The client needed a website that reflected the essence of their brand — balance, wellness, and premium quality — while driving bookings and inquiries.',
    solution:
      'We designed a clean, nature-inspired WordPress website with soft typography, compelling imagery, service pages, and an integrated booking/inquiry system.',
    result: 'Strong brand presence with excellent user engagement and consistent inquiry conversions.',
    image: '/portfolio/harmony.avif',
    isFeatured: false,
    accent: '#00E5A0',
  },
  {
    id: 14,
    slug: 'kmp',
    title: 'KMP',
    client: 'KMP',
    industry: 'Manufacturing & Engineering',
    category: 'Website Design',
    technologies: ['WordPress', 'PHP', 'CSS3'],
    description:
      'A professional corporate website for KMP, showcasing their manufacturing capabilities, product range, quality certifications, and enabling B2B client inquiries.',
    challenge:
      'KMP needed a credible digital presence to attract B2B buyers, showcase their product catalog, and communicate their manufacturing standards and certifications.',
    solution:
      'We developed a structured corporate website with product categorization, quality assurance section, company profile, and a B2B inquiry form with product specification downloads.',
    result: 'Established credible B2B digital presence with increased online inquiry volume from qualified buyers.',
    image: '/portfolio/kmp.avif',
    isFeatured: false,
    accent: '#F59E0B',
  },
  {
    id: 15,
    slug: 'larisha',
    title: 'Larisha',
    client: 'Larisha',
    industry: 'Fashion & Retail',
    category: 'eCommerce',
    technologies: ['WordPress', 'WooCommerce'],
    description:
      'A chic online retail platform for Larisha, combining beautiful brand presentation with a fully functional eCommerce store for clothing and accessories.',
    challenge:
      'Larisha wanted an online store that matched their premium brand aesthetic while providing a seamless shopping experience to their customers.',
    solution:
      'We built a custom-designed WooCommerce store with curated collection pages, lookbook integration, size guides, and a smooth checkout flow.',
    result: 'Successfully launched online retail channel generating consistent monthly revenue.',
    image: '/portfolio/larisha.avif',
    isFeatured: false,
    accent: '#EC4899',
  },
  {
    id: 16,
    slug: 'mahavir',
    title: 'Mahavir',
    client: 'Mahavir',
    industry: 'Healthcare',
    category: 'Website Design',
    technologies: ['WordPress', 'PHP', 'CSS3'],
    description:
      'A comprehensive informational and appointment booking website for Mahavir, providing patients with department information, doctor profiles, health tips, and easy appointment access.',
    challenge:
      'The client needed a trustworthy, patient-friendly online presence that simplified finding information and booking appointments online.',
    solution:
      'We created a structured healthcare website with department directories, doctor profiles, appointment booking integration, health blog, and emergency contact prominently featured.',
    result: 'Significant increase in online appointment bookings and patient inquiries.',
    image: '/portfolio/mahavir.avif',
    isFeatured: false,
    accent: '#06B6D4',
  },
  {
    id: 17,
    slug: 'manomay-home',
    title: 'Manomay Home',
    client: 'Manomay Home',
    industry: 'Home Decor & Interiors',
    category: 'Website Design',
    technologies: ['WordPress', 'Elementor', 'CSS3'],
    description:
      'An elegant showcase website for Manomay Home, an interior décor brand, featuring curated product collections, project portfolio, and design consultation booking.',
    challenge:
      'Manomay Home needed to translate their premium physical showroom experience into an equally impressive digital presence that attracted high-value clients.',
    solution:
      'We designed a luxury-feel WordPress website with large imagery, product collection pages, portfolio of completed spaces, and a seamless consultation request form.',
    result: 'Strong digital brand presence; consistent flow of premium interior design consultation requests.',
    image: '/portfolio/manomay-home.avif',
    isFeatured: false,
    accent: '#A855F7',
  },
  {
    id: 18,
    slug: 'meme-hub',
    title: 'Meme Hub',
    client: 'Meme Hub',
    industry: 'Entertainment & Media',
    category: 'Web Development',
    technologies: ['React', 'Node.js', 'MongoDB'],
    description:
      'A dynamic entertainment and social media platform built for Meme Hub, enabling users to browse, share, and interact with viral content through a fast, engaging interface.',
    challenge:
      'Meme Hub needed a high-performance platform that could handle large media assets, real-time interactions, and high concurrent user traffic without performance degradation.',
    solution:
      'We built a React-powered platform with a Node.js backend, optimized media delivery, infinite scroll feeds, social sharing features, and a content moderation dashboard.',
    result: 'High-engagement platform with thousands of active daily users and strong social sharing metrics.',
    image: '/portfolio/meme-hub.avif',
    isFeatured: false,
    accent: '#EF4444',
  },
  {
    id: 19,
    slug: 'merraki-expert',
    title: 'Merraki Expert',
    client: 'Merraki Expert',
    industry: 'Consulting & Professional Services',
    category: 'Website Design',
    technologies: ['WordPress', 'Elementor', 'CSS3'],
    description:
      'A professional consulting and expertise platform for Merraki Expert, showcasing their advisory services, team credentials, and client success stories to attract high-value business clients.',
    challenge:
      'Merraki Expert needed a website that positioned them as trusted thought leaders, clearly articulated their methodology, and converted visitors into discovery call bookings.',
    solution:
      'We designed an authority-building WordPress website with service deep-dives, team profiles, case study sections, and a prominent consultation booking system.',
    result: 'Positioned as market leaders; strong inbound consultation bookings through website.',
    image: '/portfolio/merraki-expert.avif',
    isFeatured: false,
    accent: '#00E5A0',
  },
  {
    id: 20,
    slug: 'nei',
    title: 'NEI',
    client: 'NEI',
    industry: 'Education & Training',
    category: 'Website Design',
    technologies: ['WordPress', 'PHP', 'CSS3'],
    description:
      'A structured educational institution website for NEI, providing information on courses, faculty, admissions, and enabling student inquiries and application submissions.',
    challenge:
      'NEI needed a clear, accessible website to serve prospective students, current enrollees, and parents with all the information they required in one place.',
    solution:
      'We built a well-organized WordPress site with a comprehensive course catalog, faculty directory, admissions guide, notice board, and online inquiry system.',
    result: 'Improved information accessibility; consistent stream of qualified admission inquiries.',
    image: '/portfolio/nei.avif',
    isFeatured: false,
    accent: '#6366F1',
  },
  {
    id: 21,
    slug: 'patel-rcm',
    title: 'Patel RCM',
    client: 'Patel RCM',
    industry: 'Healthcare — Medical Billing',
    category: 'Website Design',
    technologies: ['WordPress', 'PHP', 'CSS3'],
    description:
      'A professional service website for Patel RCM, a medical revenue cycle management firm, establishing credibility and generating B2B leads from healthcare providers across the USA.',
    challenge:
      'Patel RCM needed a credible digital presence that communicated their expertise in HIPAA-compliant medical billing and resonated with US-based healthcare providers.',
    solution:
      'We designed a trust-forward WordPress website with service breakdowns, compliance badges, process explainer, client testimonials, and a consultation request form targeting US healthcare decision-makers.',
    result: 'Strong B2B lead generation for US healthcare clients; improved credibility and market positioning.',
    image: '/portfolio/patelrcm.avif',
    isFeatured: false,
    accent: '#06B6D4',
  },
  {
    id: 22,
    slug: 'rudra',
    title: 'Rudra',
    client: 'Rudra',
    industry: 'Business Services',
    category: 'Website Design',
    technologies: ['WordPress', 'CSS3'],
    description:
      'A bold and professional corporate website for Rudra, designed to establish their authority in the market and drive qualified business inquiries through compelling service communication.',
    challenge:
      'Rudra needed a modern website that reflected their brand strength and made it easy for potential clients to understand their offering and make contact.',
    solution:
      'We created a dynamic WordPress website with a strong visual identity, clear service sections, company story, and an intuitive contact and inquiry flow.',
    result: 'Established authoritative digital presence with measurable improvement in inbound inquiries.',
    image: '/portfolio/rudra.avif',
    isFeatured: false,
    accent: '#EF4444',
  },
  {
    id: 23,
    slug: 'sheabm',
    title: 'Sheabm',
    client: 'Sheabm',
    industry: 'Business & Services',
    category: 'Website Design',
    technologies: ['WordPress', 'Elementor', 'CSS3'],
    description:
      'A modern and conversion-focused business website for Sheabm, showcasing their services, portfolio, and values to attract quality clients and partnerships.',
    challenge:
      'The client required a professional web presence that could differentiate them in a competitive market and provide a seamless user experience.',
    solution:
      'We delivered a polished WordPress website with service presentation, work samples, team profiles, and integrated contact forms optimized for lead capture.',
    result: 'Strong digital presence with consistent lead generation from website.',
    image: '/portfolio/sheabm.avif',
    isFeatured: false,
    accent: '#A855F7',
  },
  {
    id: 24,
    slug: 'stda',
    title: 'STDA',
    client: 'STDA',
    industry: 'Government & Development',
    category: 'Website Design',
    technologies: ['WordPress', 'PHP', 'CSS3'],
    description:
      'An institutional website for STDA, built to communicate their programs, initiatives, and enable stakeholder engagement through a clear, accessible digital platform.',
    challenge:
      'STDA needed a credible, information-rich website that served multiple stakeholder groups including beneficiaries, partners, and the general public.',
    solution:
      'We developed a structured, accessible WordPress website with program listings, news & updates, document downloads, and a contact system for stakeholder outreach.',
    result: 'Credible digital presence serving multiple stakeholder groups with positive reception.',
    image: '/portfolio/stda.avif',
    isFeatured: false,
    accent: '#00E5A0',
  },
  {
    id: 25,
    slug: 'stems',
    title: 'STEMS',
    client: 'STEMS',
    industry: 'Education',
    category: 'Website Design',
    technologies: ['WordPress', 'PHP', 'CSS3'],
    description:
      'A vibrant educational platform for STEMS, designed to inspire young learners and parents with program information, learning outcomes, and easy enrollment options.',
    challenge:
      'STEMS needed an engaging, child-friendly yet professionally credible website to attract parents and communicate the quality of their STEM education programs.',
    solution:
      'We built a colorful, energetic WordPress website with program overviews, age-group categorization, learning outcomes, gallery, and parent inquiry forms.',
    result: 'Strong enrollment inquiry generation; parent engagement significantly improved through website.',
    image: '/portfolio/stems.avif',
    isFeatured: false,
    accent: '#6366F1',
  },
  {
    id: 26,
    slug: 'the-core',
    title: 'The Core',
    client: 'The Core',
    industry: 'Fitness & Wellness',
    category: 'Website Design',
    technologies: ['WordPress', 'Elementor', 'CSS3'],
    description:
      'A high-energy fitness and wellness website for The Core, featuring membership plans, class schedules, trainer profiles, and a trial session booking system.',
    challenge:
      'The Core needed an online presence that matched their brand energy, showcased their facilities, and drove trial class sign-ups from local fitness seekers.',
    solution:
      'We designed a powerful, motivational WordPress website with class timetables, trainer profiles, facility gallery, membership plan comparison, and an online trial booking form.',
    result: 'Substantial increase in trial booking requests; improved local search visibility for fitness searches.',
    image: '/portfolio/thecore.avif',
    isFeatured: false,
    accent: '#EF4444',
  },
  {
    id: 27,
    slug: 'yashoda',
    title: 'Yashoda',
    client: 'Yashoda',
    industry: 'Healthcare',
    category: 'Website Design',
    technologies: ['WordPress', 'PHP', 'CSS3'],
    description:
      'A comprehensive healthcare website for Yashoda, providing patients with specialist information, department listings, appointment booking, and health education resources.',
    challenge:
      'Yashoda needed a trustworthy, information-rich healthcare website to serve patient needs online and improve appointment booking rates.',
    solution:
      'We built a patient-first WordPress website with specialist profiles, department pages, appointment booking integration, health tips blog, and emergency information prominently placed.',
    result: 'Improved patient digital experience; significant increase in online appointment bookings.',
    image: '/portfolio/yashoda.avif',
    isFeatured: false,
    accent: '#06B6D4',
  },
  {
    id: 28,
    slug: 'zest',
    title: 'Zest',
    client: 'Zest',
    industry: 'Food & Beverage',
    category: 'Website Design',
    technologies: ['WordPress', 'Elementor', 'CSS3'],
    description:
      'A vibrant and appetizing website for Zest, a food and beverage brand, showcasing their menu, brand story, location, and enabling table reservations and online orders.',
    challenge:
      'Zest needed a website that made their food look irresistible, communicated their brand personality, and made it easy for customers to find, book, and order.',
    solution:
      'We designed an appetizing WordPress website with mouthwatering food photography, menu listings, reservation system, location map, and online ordering integration.',
    result: 'Increased reservations and online orders; strong local digital presence in the F&B space.',
    image: '/portfolio/zest.avif',
    isFeatured: false,
    accent: '#F59E0B',
  },
];

export const filterCategories = [
  'All',
  'Website Design',
  'Web Development',
  'eCommerce',
  'Healthcare',
  'International',
] as const;

export type FilterCategory = (typeof filterCategories)[number];
