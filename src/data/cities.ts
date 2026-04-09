// ─── City Data for Geo-Targeted Landing Pages ──────────────────────────────
// Each city ha s full SEO, content, and schema data for its landing page.
// Cities are grouped into tiers by priority and search volume.

export interface CityFAQ {
  question: string;
  answer: string;
}

export interface CityPortfolioItem {
  name: string;
  category: string;
  desc: string;
}

export interface CityData {
  // Core identity
  name: string;
  slug: string;
  state: string;
  isHQ: boolean;
  tier: 1 | 2 | 3;
  hasLandingPage: boolean;
  isFeatured: boolean;

  // Geo & demographics
  geo: { lat: number; lng: number };
  population: string;
  knownFor: string;
  distanceFromNagpur: string;

  // SEO
  tagline: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchVolume: number;
  competition: 'low' | 'medium' | 'high' | 'very high';

  // City-specific content
  keyIndustries: string[];
  businessDistricts: string[];
  nearbyClients: string[];
  introContent: string;
  whyChooseContent: string;
  pricingNote: string;

  // FAQ data for FAQPage schema
  faq: CityFAQ[];

  // Portfolio highlights for this city
  portfolio: CityPortfolioItem[];
}

// Re-export the simple City interface for backward compatibility
export type City = CityData;

export const cities: CityData[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // TIER 1 — HQ + Nearest Market
  // ═══════════════════════════════════════════════════════════════════════════
  {
    name: 'Nagpur',
    slug: 'nagpur',
    state: 'Maharashtra',
    isHQ: true,
    tier: 1,
    hasLandingPage: true,
    isFeatured: true,
    geo: { lat: 21.1458, lng: 79.0882 },
    population: '2.9 million',
    knownFor: 'Orange City, MIDC industrial hub, geographical centre of India',
    distanceFromNagpur: 'HQ',
    tagline: "Nagpur's Most Experienced Web Design Agency — Since 2002",
    primaryKeyword: 'web design company Nagpur',
    secondaryKeywords: [
      'website design Nagpur',
      'best web design company Nagpur',
      'website development Nagpur',
      'web developer Nagpur',
      'website cost Nagpur',
      'SEO company Nagpur',
      'digital marketing company Nagpur',
    ],
    searchVolume: 1300,
    competition: 'high',
    keyIndustries: [
      'Healthcare',
      'Education',
      'Manufacturing',
      'Real Estate',
      'Retail',
      'Agriculture',
      'Legal & Professional Services',
      'Events & Weddings',
    ],
    businessDistricts: [
      'Sitabuldi',
      'Dharampeth',
      'Sadar',
      'Civil Lines',
      'MIDC Hingna',
      'MIDC Butibori',
      'Wardha Road',
      'Manish Nagar',
    ],
    nearbyClients: [
      'Aasthaa Hospital',
      'Guru Nanak College',
      'Nagpur Events',
      'Sharp Control Systems',
      'Vindhyagiri Farm',
      'Psychiatric Society Nagpur',
      'Trimit Architects',
    ],
    introContent:
      'Nagpur is no longer just the "Zero Mile City" at the geographic heart of India — it is rapidly transforming into a major economic and technology hub. With the MIHAN project attracting international investment, the Nagpur IT Park housing dozens of technology firms, and Vidarbha\'s industrial corridor expanding year on year, local businesses face unprecedented digital competition.',
    whyChooseContent:
      'eLan Technology has been designing websites for Nagpur businesses since 2002. We understand the unique commercial ecosystems of areas like Sitabuldi\'s retail district, Dharampeth\'s professional services corridor, Wardha Road\'s industrial belt, and Ramdaspeth\'s growing corporate sector. Visit our office at PTG IT Park for a face-to-face consultation.',
    pricingNote:
      'Website costs in Nagpur range from ₹15,000 for a basic 5-page site to ₹1,50,000+ for enterprise solutions. Our Professional package starts at ₹4x,xxx and includes custom design, SEO setup, and WCAG accessibility compliance.',
    faq: [
      {
        question: 'How much does a website cost in Nagpur?',
        answer:
          'Website costs in Nagpur range from ₹15,000 for a basic business website to ₹2,00,000+ for custom web applications. A standard business website with 5–10 pages typically costs ₹25,000–₹60,000. eCommerce websites start from ₹40,000. We offer flexible packages tailored to Nagpur businesses of all sizes.',
      },
      {
        question: 'Which is the best web design company in Nagpur?',
        answer:
          "eLan Technology is Nagpur's most experienced web design company, operating since 2002. With 500+ clients across 25+ countries, 1500+ projects delivered, and proprietary products like our Real Estate Portal and Medical Conference Portal, we offer a depth of experience no other Nagpur agency can match.",
      },
      {
        question: 'Does eLan Technology have an office in Nagpur?',
        answer:
          "Yes, our headquarters is in Nagpur, Maharashtra at PTG IT Park, Gayatri Nagar. We've been based here since our founding in 2002. You can visit our office for in-person consultations, or we're happy to connect via video call.",
      },
      {
        question: 'Do you build WCAG and ADA compliant websites in Nagpur?',
        answer:
          'Yes — eLan Technology is the only web design company in Nagpur that offers WCAG 2.1 AA and ADA compliance as standard on most project. This is critical for businesses serving international clients, especially in the USA.',
      },
      {
        question: 'How long does it take to build a website in Nagpur?',
        answer:
          'A standard business website takes 2-6 weeks. eCommerce stores take 3-10 weeks. Complex web applications may take 3-6 months. Timelines depend on scope, content readiness, and feedback speed.',
      },
      {
        question: 'Do you provide SEO services in Nagpur?',
        answer:
          "Yes, we offer comprehensive SEO services including local SEO, national SEO, Google Ads management, and social media marketing. Our SEO packages start at ₹12,000/month. We've helped 200+ businesses rank on page 1 of Google.",
      },
      {
        question: 'Can you redesign my existing website?',
        answer:
          'Absolutely. Website redesign is one of our most popular services. We migrate your existing content to a modern, fast, mobile-first design while preserving your SEO rankings and improving accessibility.',
      },
      {
        question: 'What technologies do you use for web development?',
        answer:
          'We work with React, Next.js, Astro, Node.js, MongoDB, WordPress, Shopify, WooCommerce, Flutter, and more. We recommend the best technology stack based on your specific project requirements and budget.',
      },
    ],
    portfolio: [
      {
        name: 'Aasthaa Hospital',
        category: 'Healthcare, Nagpur',
        desc: 'A WCAG 2.1 AA compliant hospital website with online appointment booking, doctor profiles, and patient information portal. Achieved 3x increase in online appointments within 3 months.',
      },
      {
        name: 'Trimit Architects',
        category: 'Architecture & Real Estate',
        desc: 'A portfolio website with project galleries, 3D visualisation integrations, and a lead generation system. Ranked on page 1 for "architects in Nagpur" within 60 days.',
      },
      {
        name: 'CIPL',
        category: 'Industrial / Manufacturing',
        desc: 'A B2B company profile and product catalogue website for an industrial client. Built with export market targeting, multi-language support, and inquiry management system.',
      },
    ],
  },

  {
    name: 'Raipur',
    slug: 'raipur',
    state: 'Chhattisgarh',
    isHQ: false,
    tier: 1,
    hasLandingPage: true,
    isFeatured: true,
    geo: { lat: 21.2514, lng: 81.6296 },
    population: '1.2 million',
    knownFor: 'Steel capital, Naya Raipur smart city, industrial hub',
    distanceFromNagpur: '285 km (5 hours drive)',
    tagline: "Raipur's Trusted Web Design Partner — Powered by Nagpur's Best Agency",
    primaryKeyword: 'web design company Raipur',
    secondaryKeywords: [
      'website design Raipur',
      'best web design company Raipur',
      'web developer Raipur',
      'digital marketing Raipur',
      'SEO company Raipur',
    ],
    searchVolume: 800,
    competition: 'medium',
    keyIndustries: [
      'Steel & Mining',
      'Power & Energy',
      'Government',
      'Education',
      'Healthcare',
      'Construction',
      'Retail',
    ],
    businessDistricts: ['Pandri', 'Telibandha', 'Shankar Nagar', 'Fafadih', 'Naya Raipur'],
    nearbyClients: [],
    introContent:
      "Raipur, the capital of Chhattisgarh, is witnessing a digital transformation driven by the Naya Raipur smart city initiative, a booming steel and mining sector, and an increasingly tech-savvy consumer base. Yet most local businesses still lack professional web presence — creating a massive opportunity for those who invest in quality digital infrastructure now.",
    whyChooseContent:
      "eLan Technology serves Raipur businesses from our Nagpur headquarters, just 285 km away. With 24+ years of experience and 500+ clients across 25 countries, we bring a level of expertise that exceeds what most local Raipur agencies can offer — at competitive pricing. We understand Chhattisgarh's industrial landscape and government sector requirements.",
    pricingNote:
      'Website costs for Raipur businesses start at ₹15,000 for basic sites and go up to ₹1,50,000+ for custom applications. Our pricing is transparent and competitive — often 30-40% less than equivalent quality from metro city agencies.',
    faq: [
      {
        question: 'Is there a good web design company serving Raipur?',
        answer:
          'eLan Technology serves Raipur businesses from our Nagpur headquarters, just 285 km away. With 24+ years of experience and 500+ clients across 5+ countries, we bring a level of expertise that exceeds what most local Raipur agencies can offer — at competitive pricing.',
      },
      {
        question: 'How much does a website cost in Raipur?',
        answer:
          "Website costs for Raipur businesses start at ₹15,000 for basic sites and go up to ₹1,50,000+ for custom applications. Our pricing is transparent and competitive — often 30-40% less than equivalent quality from metro city agencies.",
      },
      {
        question: 'Do you offer in-person meetings for Raipur clients?',
        answer:
          'While our office is in Nagpur (285 km from Raipur), we conduct regular video consultations and can arrange in-person meetings for larger projects. Many of our clients work with us entirely remotely via Slack, Zoom, and project management tools.',
      },
      {
        question: 'Can you build a website for my Raipur business?',
        answer:
          "Absolutely. We serve businesses across Raipur and Chhattisgarh including the steel, mining, education, healthcare, and government sectors. Our remote collaboration process is seamless — the same quality and communication as working with a local agency.",
      },
      {
        question: 'Do you provide digital marketing services in Raipur?',
        answer:
          'Yes, we offer complete digital marketing services for Raipur businesses including local SEO, Google Ads, social media marketing, and content marketing. We understand the Chhattisgarh market and can help your business reach local customers effectively.',
      },
      {
        question: 'What industries do you serve in Raipur?',
        answer:
          "We serve businesses across Raipur's key industries including steel and mining, power and energy, government contractors, educational institutions, healthcare providers, construction companies, and retail businesses.",
      },
    ],
    portfolio: [
      {
        name: 'Chhattisgarh Industrial Client',
        category: 'Manufacturing',
        desc: 'B2B industrial website with product catalogue, inquiry management, and GST-compliant invoicing system.',
      },
      {
        name: 'Raipur Healthcare Provider',
        category: 'Healthcare',
        desc: 'Patient-centric hospital website with appointment booking, doctor profiles, and health information portal.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TIER 2 — Major Metro Cities
  // ═══════════════════════════════════════════════════════════════════════════
  {
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    isHQ: false,
    tier: 2,
    hasLandingPage: true,
    isFeatured: true,
    geo: { lat: 19.076, lng: 72.8777 },
    population: '20.7 million',
    knownFor: 'Financial capital, Bollywood, startup ecosystem',
    distanceFromNagpur: '860 km',
    tagline: 'Mumbai-Quality Websites at Nagpur Prices',
    primaryKeyword: 'web design company Mumbai',
    secondaryKeywords: [
      'website design Mumbai',
      'best web design company Mumbai',
      'affordable web development Mumbai',
      'SEO services Mumbai',
      'ecommerce website Mumbai',
    ],
    searchVolume: 5000,
    competition: 'high',
    keyIndustries: [
      'Finance & Banking',
      'Media & Entertainment',
      'Real Estate',
      'IT & Startups',
      'Fashion & Retail',
      'Healthcare',
    ],
    businessDistricts: ['Andheri', 'BKC', 'Lower Parel', 'Navi Mumbai', 'Powai', 'Goregaon'],
    nearbyClients: [],
    introContent:
      "Mumbai is India's financial capital and one of the most competitive digital markets in the country. From Andheri's bustling agency corridor to BKC's corporate towers, businesses here demand world-class websites — but pay premium prices for them. eLan Technology offers Mumbai businesses the same quality at 60-70% less cost.",
    whyChooseContent:
      "Mumbai agencies charge ₹2-5 lakh for what we deliver at ₹45,000-₹1,50,000. Same technologies (React, Next.js, MERN stack), same standards, same communication tools — at 60-70% less cost. We're in the same state, the same timezone, and just a short flight away.",
    pricingNote:
      'Mumbai web agencies typically charge ₹2-5 lakh for a standard business website. We deliver the same quality at ₹45,000-₹1,50,000 — saving you 60-70% without compromising on design, performance, or accessibility.',
    faq: [
      {
        question: 'Why should a Mumbai business hire a Nagpur web agency?',
        answer:
          "Mumbai agencies charge premium rates driven by high operating costs. eLan Technology delivers the same quality — React, Next.js, MERN stack, WCAG compliance — at 60-70% less cost. We're in Maharashtra, same timezone, and work with Mumbai clients via Slack, Zoom, and Jira with the same responsiveness as a Bandra-based agency.",
      },
      {
        question: 'How much does a website cost compared to Mumbai agencies?',
        answer:
          'A standard business website from a Mumbai agency costs ₹2-5 lakh. We deliver equivalent quality at ₹45,000-₹1,50,000. For eCommerce, Mumbai agencies charge ₹5-15 lakh — our equivalent starts at ₹80,000. Same technologies, same standards, dramatically lower cost.',
      },
      {
        question: 'Can you handle the requirements of Mumbai startups?',
        answer:
          "Absolutely. We've built MVPs, SaaS dashboards, and scalable web applications for startups across India. We understand lean delivery, rapid iteration, and investor-ready design. Our React/Next.js expertise matches anything coming out of Powai or Andheri.",
      },
      {
        question: 'Do you visit Mumbai for client meetings?',
        answer:
          'We primarily work remotely via Slack, Zoom, and project management tools — which most Mumbai businesses prefer anyway. For larger enterprise projects, we can arrange in-person meetings. Nagpur to Mumbai is a 1.5-hour flight.',
      },
      {
        question: 'What Mumbai industries do you serve?',
        answer:
          "We serve Mumbai's key sectors: finance and banking, media and entertainment, real estate, startups and SaaS, fashion retail, and healthcare. Our WCAG/ADA compliance expertise is especially valuable for Mumbai businesses serving international clients.",
      },
      {
        question: 'How do you handle communication with Mumbai clients?',
        answer:
          'We use the same tools every Mumbai agency uses: Slack for daily communication, Zoom for meetings, Jira/Trello for project management, and Figma for design collaboration. Same timezone, no lag, no barriers.',
      },
    ],
    portfolio: [
      {
        name: 'Financial Services Client',
        category: 'Finance, Mumbai',
        desc: 'Secure, compliant fintech website with KYC integration and investor portal. Built to meet RBI digital lending guidelines.',
      },
      {
        name: 'Mumbai Real Estate Developer',
        category: 'Real Estate',
        desc: 'Property showcase website with virtual tours, floor plans, and lead capture system generating 200+ qualified leads monthly.',
      },
    ],
  },

  {
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    isHQ: false,
    tier: 2,
    hasLandingPage: true,
    isFeatured: true,
    geo: { lat: 18.5204, lng: 73.8567 },
    population: '7.4 million',
    knownFor: 'IT hub, educational centre, automotive industry',
    distanceFromNagpur: '690 km',
    tagline: "Pune's Affordable Alternative to Overpriced IT Agencies",
    primaryKeyword: 'web design company Pune',
    secondaryKeywords: [
      'website design Pune',
      'best web design company Pune',
      'web developer Pune',
      'affordable web development Pune',
      'SEO company Pune',
    ],
    searchVolume: 3500,
    competition: 'high',
    keyIndustries: [
      'IT & Software',
      'Automotive',
      'Education',
      'Manufacturing',
      'Startups',
      'Defence',
    ],
    businessDistricts: [
      'Hinjewadi IT Park',
      'Kharadi',
      'Magarpatta',
      'Koregaon Park',
      'Shivaji Nagar',
    ],
    nearbyClients: [],
    introContent:
      "Pune's IT corridor is filled with expensive agencies — but not all businesses need to pay Hinjewadi prices. eLan Technology offers Pune businesses the same React, Next.js, and MERN stack expertise at a fraction of the cost. We speak your tech language, we understand your startup culture, and we deliver at Nagpur efficiency.",
    whyChooseContent:
      "Pune's IT corridor already knows React and Node.js. We speak your tech language — at half the cost of Hinjewadi agencies. Many Pune startups and SMEs choose us for cost-effective development without compromising quality. Same Maharashtra, same timezone, dramatically better value.",
    pricingNote:
      'Pune IT agencies charge ₹1.5-4 lakh for standard websites. We deliver equivalent quality at ₹45,000-₹1,50,000 — letting Pune startups and SMEs invest saved budget into growth and marketing.',
    faq: [
      {
        question: 'Why choose a Nagpur agency over a Pune web design company?',
        answer:
          "Pune's IT corridor drives up agency prices. eLan Technology offers the same technical expertise — React, Next.js, MERN, WordPress — at 40-60% less cost. We're in the same state, same timezone, and most Pune businesses work remotely with their vendors anyway.",
      },
      {
        question: 'How much does a website cost compared to Pune agencies?',
        answer:
          'A standard Pune agency charges ₹1.5-4 lakh. We deliver equivalent quality at ₹45,000-₹1,50,000. For startups building MVPs, this cost difference can mean extending your runway by months.',
      },
      {
        question: 'Do you work with Pune-based startups?',
        answer:
          'Yes. We understand lean methodology, rapid prototyping, and investor-ready design. We\'ve built MVPs, dashboards, and SaaS platforms. Our development speed matches Hinjewadi output — at Nagpur pricing.',
      },
      {
        question: 'What technologies do you use for Pune tech companies?',
        answer:
          'React, Next.js, Astro, Node.js, MongoDB, PostgreSQL, TypeScript, Docker, AWS — the same stack Pune IT companies use internally. We also handle WordPress, Shopify, and WooCommerce for non-tech businesses.',
      },
      {
        question: 'Can you handle Pune automotive and manufacturing clients?',
        answer:
          "Absolutely. We've built B2B websites, product catalogues, and dealer portals for manufacturing clients. We understand Pune's automotive ecosystem and can create digital solutions that serve both B2B and B2C audiences.",
      },
      {
        question: 'How do you manage projects with Pune clients remotely?',
        answer:
          'Slack for daily communication, Zoom for weekly calls, Jira/Trello for task management, Figma for design reviews, GitHub for code. Same tools, same process as any Pune agency — just better value.',
      },
    ],
    portfolio: [
      {
        name: 'Pune EdTech Startup',
        category: 'Education Technology',
        desc: 'LMS platform with video hosting, quiz engine, and certificate generation. Serving 5,000+ students across Maharashtra.',
      },
      {
        name: 'Automotive Parts Dealer',
        category: 'Automotive, Pune',
        desc: 'B2B catalogue website with dealer portal, inquiry management, and parts specification search for 500+ SKUs.',
      },
    ],
  },

  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    isHQ: false,
    tier: 2,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 17.385, lng: 78.4867 },
    population: '10.5 million',
    knownFor: 'HITEC City, pharma hub, pearl city',
    distanceFromNagpur: '570 km',
    tagline: 'Hyderabad Businesses Deserve World-Class Web Design',
    primaryKeyword: 'web design company Hyderabad',
    secondaryKeywords: [
      'website design Hyderabad',
      'best web design company Hyderabad',
      'web developer Hyderabad',
      'SEO services Hyderabad',
      'ecommerce development Hyderabad',
    ],
    searchVolume: 4000,
    competition: 'high',
    keyIndustries: [
      'IT & Software',
      'Pharma & Biotech',
      'Real Estate',
      'Education',
      'Healthcare',
      'Government',
    ],
    businessDistricts: ['HITEC City', 'Gachibowli', 'Madhapur', 'Banjara Hills', 'Jubilee Hills'],
    nearbyClients: [],
    introContent:
      "Hyderabad's HITEC City sets a high bar for technology — and so should your website. As Telangana's capital races ahead with pharma, IT, and real estate booms, businesses need digital presence that matches their ambition. eLan Technology delivers HITEC City-quality web solutions from our Nagpur base at significantly lower cost.",
    whyChooseContent:
      "HITEC City sets the standard — we match it from Nagpur. Whether you need pharma compliance websites, government portal experience, or a startup MVP for Gachibowli's tech corridor, we deliver enterprise-grade quality at Central India prices.",
    pricingNote:
      'Hyderabad IT agencies charge ₹2-5 lakh for standard websites. We deliver equivalent quality at ₹45,000-₹1,50,000 — the same React/Next.js expertise without HITEC City overhead.',
    faq: [
      {
        question: 'Why should a Hyderabad business choose eLan over local agencies?',
        answer:
          "Hyderabad's HITEC City agencies charge premium rates. eLan delivers the same technologies — React, Next.js, Node.js — at 50-60% less cost. We understand pharma compliance, government portal requirements, and startup speed. 570 km away, same quality, better value.",
      },
      {
        question: 'Do you serve pharma and biotech companies in Hyderabad?',
        answer:
          "Yes. We build compliance-aware websites for pharma companies, biotech startups, and healthcare providers in Hyderabad. This includes HIPAA-aware designs, product catalogues with regulatory information, and clinical trial portals.",
      },
      {
        question: 'How much does a website cost compared to Hyderabad agencies?',
        answer:
          'Hyderabad agencies typically charge ₹2-5 lakh. We deliver the same quality at ₹45,000-₹1,50,000. For pharma and enterprise projects, savings can be ₹3-5 lakh per project.',
      },
      {
        question: 'Can you work with Hyderabad government projects?',
        answer:
          "We have experience building government and semi-government portals. Our websites meet accessibility standards (WCAG 2.1 AA) which are increasingly required for government digital assets. We understand Telangana's e-governance requirements.",
      },
      {
        question: 'What is the communication process for Hyderabad clients?',
        answer:
          'Slack, Zoom, Jira — same tools used by HITEC City companies. We provide dedicated project managers, weekly progress calls, and real-time design review via Figma. No timezone difference, no communication barriers.',
      },
      {
        question: 'Do you provide SEO for Hyderabad businesses?',
        answer:
          'Yes. We offer local SEO targeting Hyderabad and Telangana keywords, Google My Business optimisation, and content marketing. We understand the Hyderabad market and can help you rank for city-specific search terms.',
      },
    ],
    portfolio: [
      {
        name: 'Pharma Research Portal',
        category: 'Pharma, Hyderabad',
        desc: 'Compliance-aware research portal with clinical data management, document library, and investigator dashboard.',
      },
      {
        name: 'Hyderabad Real Estate Group',
        category: 'Real Estate',
        desc: 'Property listing platform with 3D virtual tours, floor plan viewer, and integrated CRM for lead management.',
      },
    ],
  },

  {
    name: 'Delhi',
    slug: 'delhi',
    state: 'Delhi NCR',
    isHQ: false,
    tier: 2,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 28.7041, lng: 77.1025 },
    population: '32 million',
    knownFor: 'National capital, political centre, diverse economy',
    distanceFromNagpur: '1,100 km',
    tagline: "Delhi NCR's Cost-Effective Web Design Alternative",
    primaryKeyword: 'web design company Delhi',
    secondaryKeywords: [
      'website design Delhi NCR',
      'best web design company Delhi',
      'web developer Delhi',
      'affordable web development Delhi',
      'SEO company Delhi NCR',
    ],
    searchVolume: 6000,
    competition: 'very high',
    keyIndustries: [
      'Government',
      'Media',
      'Real Estate',
      'Retail',
      'Education',
      'Tourism',
      'Startups',
    ],
    businessDistricts: [
      'Connaught Place',
      'Nehru Place',
      'Noida',
      'Gurugram',
      'Cyber City',
    ],
    nearbyClients: [],
    introContent:
      "Delhi NCR is India's most competitive digital market — and its most expensive. From Connaught Place boardrooms to Noida's tech parks and Gurugram's corporate towers, businesses here need enterprise-grade web solutions. But they don't need to pay Delhi prices to get them.",
    whyChooseContent:
      "NCR's business scale demands enterprise-grade web solutions. eLan Technology delivers the same quality as South Delhi and Gurugram agencies at 60-70% lower cost. From government portals to startup MVPs, we match NCR output without NCR overhead.",
    pricingNote:
      'Delhi NCR agencies charge ₹3-8 lakh for standard business websites. We deliver the same at ₹45,000-₹1,50,000 — the biggest cost advantage of any market we serve.',
    faq: [
      {
        question: 'Why should a Delhi business hire a web agency from Nagpur?',
        answer:
          'Delhi NCR has the highest web agency rates in India — ₹3-8 lakh for standard websites. eLan delivers equivalent quality at ₹45,000-₹1,50,000 using the same technologies (React, Next.js, WordPress). Remote collaboration tools eliminate distance entirely.',
      },
      {
        question: 'How much can Delhi businesses save with eLan?',
        answer:
          'Delhi businesses typically save 60-70% compared to local NCR agencies. A website that costs ₹5 lakh from a Gurugram agency costs ₹1.5-2 lakh from us. Same tech stack, same quality, dramatically better value.',
      },
      {
        question: 'Do you serve Noida and Gurugram businesses?',
        answer:
          'Yes. We serve businesses across the entire Delhi NCR region including Delhi, Noida, Greater Noida, Gurugram, Faridabad, and Ghaziabad. Our remote-first approach means location within NCR makes no difference.',
      },
      {
        question: 'Can you handle government and institutional projects?',
        answer:
          'Yes. We have experience with government portals, educational institution websites, and institutional projects. Our WCAG 2.1 AA compliance meets government accessibility requirements.',
      },
      {
        question: 'What is the turnaround time for Delhi projects?',
        answer:
          'Same as local NCR agencies: 4-8 weeks for standard websites, 8-16 weeks for complex applications. We work in your timezone with daily Slack updates and weekly Zoom calls.',
      },
      {
        question: 'Do you provide ongoing support for Delhi clients?',
        answer:
          'Yes. All projects include post-launch support. We also offer maintenance plans starting at ₹3,999/month covering security updates, content changes, performance monitoring, and priority support.',
      },
    ],
    portfolio: [
      {
        name: 'NCR Media House',
        category: 'Media & Publishing',
        desc: 'High-performance news portal with real-time content management, ad integration, and 50,000+ daily visitors.',
      },
      {
        name: 'Delhi Education Group',
        category: 'Education',
        desc: 'Multi-campus educational institution website with admission portal, LMS integration, and parent communication system.',
      },
    ],
  },

  {
    name: 'Bangalore',
    slug: 'bangalore',
    state: 'Karnataka',
    isHQ: false,
    tier: 2,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 12.9716, lng: 77.5946 },
    population: '13.2 million',
    knownFor: "India's Silicon Valley, startup capital",
    distanceFromNagpur: '1,050 km',
    tagline: "Silicon Valley Alternatives Shouldn't Cost Silicon Valley Prices",
    primaryKeyword: 'web design company Bangalore',
    secondaryKeywords: [
      'website design Bangalore',
      'best web design company Bangalore',
      'web developer Bangalore',
      'affordable web development Bangalore',
      'startup web agency Bangalore',
    ],
    searchVolume: 5500,
    competition: 'very high',
    keyIndustries: ['IT & Software', 'Startups', 'Biotech', 'Aerospace', 'Education'],
    businessDistricts: [
      'Koramangala',
      'Whitefield',
      'Electronic City',
      'Indiranagar',
      'MG Road',
    ],
    nearbyClients: [],
    introContent:
      "India's startup capital needs startup-speed delivery. Bangalore businesses understand technology — they know what React, Next.js, and microservices mean. What they also know is that Koramangala agencies charge a premium for the postcode. eLan Technology delivers MVP in 3 weeks, production-ready in 6 — at Nagpur prices.",
    whyChooseContent:
      "Bangalore's startup capital needs startup-speed delivery. MVP in 3 weeks. Production-ready in 6. At Nagpur prices. We match Koramangala quality without the Koramangala overhead. Your developers will respect our code — clean, tested, documented.",
    pricingNote:
      'Bangalore agencies charge ₹3-8 lakh for startup MVPs. We deliver equivalent quality at ₹1-2.5 lakh — potentially saving Bangalore startups 3-6 months of runway.',
    faq: [
      {
        question: 'Can a Nagpur agency match Bangalore startup speed?',
        answer:
          'Absolutely. We deliver MVPs in 3 weeks, production-ready applications in 6-8 weeks. Same React/Next.js/Node.js stack used by Koramangala agencies. We understand lean methodology and rapid iteration.',
      },
      {
        question: 'How much cheaper are you compared to Bangalore agencies?',
        answer:
          'Bangalore agencies charge ₹3-8 lakh for startup MVPs and ₹2-5 lakh for standard websites. We deliver equivalent quality at 50-70% less. For funded startups, this means extending runway by months.',
      },
      {
        question: 'Do Bangalore developers respect your code quality?',
        answer:
          'Yes — our code is clean, tested, and well-documented. We use TypeScript, write unit tests, follow Git best practices, and maintain comprehensive documentation. Your Bangalore tech team can seamlessly take over or extend our work.',
      },
      {
        question: 'What tech stack do you use for Bangalore startups?',
        answer:
          'React, Next.js, Astro, Node.js, MongoDB, PostgreSQL, TypeScript, Docker, AWS, Vercel — the same modern stack Bangalore startups expect. We also build mobile apps with React Native and Flutter.',
      },
      {
        question: 'How do you handle communication with Bangalore teams?',
        answer:
          'Slack, Zoom, Jira, GitHub, Figma — same tools every Bangalore startup uses. Daily standups, weekly demos, CI/CD pipelines. No friction, no timezone issues.',
      },
      {
        question: 'Do you sign NDAs for Bangalore startup projects?',
        answer:
          'Yes, we proactively sign NDAs for all client projects. Your intellectual property is legally protected. We can also work under white-label arrangements if needed.',
      },
    ],
    portfolio: [
      {
        name: 'SaaS Dashboard Platform',
        category: 'Startup, Bangalore',
        desc: 'Full-stack SaaS application with multi-tenant architecture, real-time analytics dashboard, and subscription billing.',
      },
      {
        name: 'Biotech Research Portal',
        category: 'Biotech',
        desc: 'Research collaboration platform with data visualisation, document sharing, and compliance-aware access controls.',
      },
    ],
  },

  {
    name: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu',
    isHQ: false,
    tier: 2,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 13.0827, lng: 80.2707 },
    population: '11.5 million',
    knownFor: 'Auto hub, IT corridor, cultural capital of South India',
    distanceFromNagpur: '1,150 km',
    tagline: "Chennai's Partner for High-Performance Web Solutions",
    primaryKeyword: 'web design company Chennai',
    secondaryKeywords: [
      'website design Chennai',
      'best web design company Chennai',
      'web developer Chennai',
      'ecommerce website Chennai',
      'SEO services Chennai',
    ],
    searchVolume: 3000,
    competition: 'high',
    keyIndustries: [
      'Automotive',
      'IT & BPO',
      'Manufacturing',
      'Healthcare',
      'Education',
      'Shipping',
    ],
    businessDistricts: ['OMR (IT Corridor)', 'Guindy', 'T. Nagar', 'Anna Nagar', 'Adyar'],
    nearbyClients: [],
    introContent:
      "Chennai's Old Mahabalipuram Road (OMR) IT corridor understands performance — and so do we. Lighthouse scores of 95+, Core Web Vitals optimised, ADA compliant. For Chennai's automotive, manufacturing, and IT sectors, we deliver websites built for speed, security, and global reach.",
    whyChooseContent:
      "OMR's IT corridor understands performance. Lighthouse 95+ scores. Core Web Vitals optimised. ADA compliant. We match Chennai's IT standards while offering Central India pricing — a combination local OMR agencies simply can't match.",
    pricingNote:
      'Chennai agencies charge ₹1.5-4 lakh for standard websites. We deliver equivalent quality at ₹45,000-₹1,50,000. For automotive and manufacturing B2B sites, savings can exceed ₹2 lakh per project.',
    faq: [
      {
        question: 'Can you serve Chennai automotive and manufacturing clients?',
        answer:
          "Yes. We've built B2B websites, product catalogues, dealer portals, and export-ready corporate sites. We understand Chennai's automotive ecosystem — from Ambattur to Sriperumbudur — and deliver websites that serve both domestic and international audiences.",
      },
      {
        question: 'How much does a website cost compared to Chennai agencies?',
        answer:
          'Chennai OMR agencies charge ₹1.5-4 lakh for standard websites. We deliver equivalent quality at ₹45,000-₹1,50,000 — same React/Next.js stack, same performance standards, 40-60% less cost.',
      },
      {
        question: 'Do you build websites that perform well on Lighthouse?',
        answer:
          'Yes. We target Lighthouse scores of 95+ across Performance, Accessibility, Best Practices, and SEO. Our Astro and Next.js builds consistently achieve these benchmarks. Chennai IT teams can verify our scores independently.',
      },
      {
        question: 'Do you support Tamil language websites?',
        answer:
          'Yes, we build multilingual websites including Tamil. Our Unicode-optimised typography ensures Tamil script renders beautifully across devices. We also handle bilingual SEO for English and Tamil search queries.',
      },
      {
        question: 'What shipping and logistics websites have you built?',
        answer:
          "We've built logistics dashboards, shipment tracking portals, and fleet management interfaces. For Chennai's port and shipping industry, we can create digital solutions that integrate with existing logistics software.",
      },
      {
        question: 'How do you handle project delivery for Chennai?',
        answer:
          'Same process as local Chennai agencies: Slack for communication, Zoom for meetings, Jira for task tracking, GitHub for code delivery. No timezone difference, dedicated project manager, weekly progress reports.',
      },
    ],
    portfolio: [
      {
        name: 'Automotive Parts Exporter',
        category: 'Automotive, Chennai',
        desc: 'Export-ready B2B catalogue with multi-currency pricing, inquiry management, and integration with shipping logistics.',
      },
      {
        name: 'Chennai IT Services Firm',
        category: 'IT Services',
        desc: 'Corporate website with service showcase, case studies, and career portal handling 100+ applications monthly.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TIER 3 — Secondary Cities
  // ═══════════════════════════════════════════════════════════════════════════
  {
    name: 'Bhopal',
    slug: 'bhopal',
    state: 'Madhya Pradesh',
    isHQ: false,
    tier: 3,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 23.2599, lng: 77.4126 },
    population: '2.4 million',
    knownFor: 'City of Lakes, state capital, education & government hub',
    distanceFromNagpur: '350 km',
    tagline: "Central India's Capital City Deserves Central India's Best Agency",
    primaryKeyword: 'web design company Bhopal',
    secondaryKeywords: [
      'website design Bhopal',
      'best web design company Bhopal',
      'web developer Bhopal',
      'SEO services Bhopal',
    ],
    searchVolume: 600,
    competition: 'medium',
    keyIndustries: ['Government', 'Education', 'Tourism', 'Healthcare', 'Real Estate', 'IT'],
    businessDistricts: ['MP Nagar', 'Arera Colony', 'New Market', 'TT Nagar', 'Hoshangabad Road'],
    nearbyClients: [],
    introContent:
      "Bhopal, Madhya Pradesh's capital, is a city of lakes and growing digital ambition. As the seat of state government, a major education hub, and an emerging IT destination, Bhopal businesses are increasingly recognising the need for professional web presence. Yet the local web design market remains limited in both quality and technological capability.",
    whyChooseContent:
      "Central India's capital city deserves Central India's best agency. Just 350 km from our Nagpur headquarters, we serve Bhopal's government institutions, educational organisations, and tourism businesses with the same quality we deliver to clients in 25+ countries.",
    pricingNote:
      'Bhopal web design costs are among the most affordable in India — our packages start at ₹25,000 and deliver enterprise-grade quality that local Bhopal agencies simply cannot match.',
    faq: [
      {
        question: 'Do you serve businesses in Bhopal?',
        answer:
          "Yes. Bhopal is just 350 km from our Nagpur headquarters. We serve Bhopal businesses remotely with seamless collaboration via Slack, Zoom, and project management tools. For larger projects, we arrange in-person meetings.",
      },
      {
        question: 'How much does a website cost for a Bhopal business?',
        answer:
          'Website costs for Bhopal businesses start at ₹15,000 for basic sites. Our Professional package at ₹45,000 includes custom design, SEO, and WCAG compliance — quality that exceeds what local Bhopal agencies typically offer.',
      },
      {
        question: 'Can you build government websites for Bhopal organisations?',
        answer:
          'Yes. Our websites meet WCAG 2.1 AA accessibility standards required for government digital assets. We have experience building institutional portals, public information websites, and citizen-facing applications.',
      },
      {
        question: 'Do you provide tourism website design for Bhopal?',
        answer:
          "Yes. Bhopal's Lake City tourism potential is enormous. We build visually rich tourism websites with booking integrations, multilingual content, and Google Maps integration to showcase Bhopal's attractions.",
      },
      {
        question: 'What industries do you serve in Bhopal?',
        answer:
          "We serve Bhopal's key sectors: government and PSUs, educational institutions, tourism operators, healthcare providers, real estate developers, and the emerging IT sector around STPI Bhopal.",
      },
      {
        question: 'How fast can you deliver a website for a Bhopal client?',
        answer:
          'Standard business websites take 4-6 weeks. Government and institutional projects may take 6-12 weeks depending on approval processes. We provide clear timelines and milestone-based delivery.',
      },
    ],
    portfolio: [
      {
        name: 'MP Government Institution',
        category: 'Government, Bhopal',
        desc: 'Accessible, bilingual institutional website with document management, public notice board, and citizen inquiry system.',
      },
    ],
  },

  {
    name: 'Indore',
    slug: 'indore',
    state: 'Madhya Pradesh',
    isHQ: false,
    tier: 3,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 22.7196, lng: 75.8577 },
    population: '3.4 million',
    knownFor: "MP's commercial capital, cleanest city, startup growth",
    distanceFromNagpur: '560 km',
    tagline: "MP's Commercial Capital is Going Digital — Are You?",
    primaryKeyword: 'web design company Indore',
    secondaryKeywords: [
      'website design Indore',
      'best web design company Indore',
      'web developer Indore',
      'ecommerce website Indore',
    ],
    searchVolume: 700,
    competition: 'medium',
    keyIndustries: [
      'IT & Startups',
      'Manufacturing',
      'Textiles',
      'Pharma',
      'Education',
      'Food Processing',
    ],
    businessDistricts: ['Vijay Nagar', 'Palasia', 'AB Road', 'Pithampur Industrial Area', 'Super Corridor'],
    nearbyClients: [],
    introContent:
      "Indore, India's cleanest city and Madhya Pradesh's commercial capital, is experiencing a startup boom. From Vijay Nagar's growing tech scene to Pithampur's industrial powerhouses, Indore businesses are going digital faster than ever. The city's Super Corridor IT hub is attracting tech talent and investment — but quality web agencies remain scarce.",
    whyChooseContent:
      "MP's commercial capital is going digital — from Vijay Nagar startups to Pithampur industrialists. eLan Technology bridges the gap between Indore's ambition and available local digital talent, delivering metro-quality websites at Central India pricing.",
    pricingNote:
      'Indore businesses get exceptional value with our pricing. Starting at ₹25,000 for business websites, we deliver quality that typically costs 2-3x more from Pune or Mumbai agencies.',
    faq: [
      {
        question: 'Do you provide web design services in Indore?',
        answer:
          "Yes. Indore is 560 km from our Nagpur headquarters. We serve Indore businesses remotely with the same tools and processes we use for clients in 25+ countries. For Indore's growing startup ecosystem, we offer rapid MVP development at competitive pricing.",
      },
      {
        question: 'How much does a website cost in Indore?',
        answer:
          'Business websites for Indore companies start at ₹15,000. Our Professional package at ₹45,000 delivers custom design, SEO setup, and WCAG compliance — quality that matches any metro city agency.',
      },
      {
        question: 'Can you build eCommerce sites for Indore businesses?',
        answer:
          "Absolutely. We build WooCommerce, Shopify, and custom eCommerce platforms for Indore's textile, food processing, and retail businesses. Features include Indian payment gateways, shipping API integration, and GST-compliant invoicing.",
      },
      {
        question: 'Do you serve Pithampur industrial clients?',
        answer:
          "Yes. We build B2B company profiles, product catalogues, and export-ready websites for Pithampur's manufacturing and pharmaceutical companies. Our experience with industrial B2B marketing helps your website generate quality leads.",
      },
      {
        question: 'What startup services do you offer for Indore?',
        answer:
          "We offer MVP development, landing page design, SaaS dashboard development, and brand identity design. Indore's Super Corridor startups benefit from our modern tech stack (React, Next.js, Node.js) at prices that extend their runway.",
      },
      {
        question: 'How quickly can you deliver projects for Indore clients?',
        answer:
          'Standard websites: 4-6 weeks. MVPs and landing pages: 2-3 weeks. eCommerce stores: 6-10 weeks. We provide milestone-based delivery with weekly progress updates.',
      },
    ],
    portfolio: [
      {
        name: 'Indore Textile Exporter',
        category: 'Textiles, Indore',
        desc: 'B2B export catalogue with multi-currency pricing, sample request system, and international shipping integration.',
      },
    ],
  },

  {
    name: 'Kolkata',
    slug: 'kolkata',
    state: 'West Bengal',
    isHQ: false,
    tier: 3,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 22.5726, lng: 88.3639 },
    population: '15 million',
    knownFor: 'Cultural capital, finance, jute industry, IT growth',
    distanceFromNagpur: '1,100 km',
    tagline: 'East Meets Excellence — Modern Websites for Kolkata Businesses',
    primaryKeyword: 'web design company Kolkata',
    secondaryKeywords: [
      'website design Kolkata',
      'best web design company Kolkata',
      'web developer Kolkata',
      'SEO services Kolkata',
    ],
    searchVolume: 3000,
    competition: 'high',
    keyIndustries: ['Finance & Banking', 'IT & BPO', 'Jute & Tea', 'Education', 'Healthcare', 'Retail'],
    businessDistricts: ['Salt Lake Sector V', 'Park Street', 'New Town', 'Rajarhat', 'Howrah'],
    nearbyClients: [],
    introContent:
      "Kolkata — India's cultural capital — is also Eastern India's largest commercial hub. From Salt Lake's IT corridor to Park Street's business district, Kolkata businesses need modern digital presence that reflects the city's unique blend of heritage and innovation. Yet quality web agencies remain concentrated in South and West India.",
    whyChooseContent:
      "East meets excellence. Heritage city, modern websites. From finance and jute to IT and education — we serve all of Kolkata's industries with the same quality we deliver to clients across 25+ countries.",
    pricingNote:
      'Kolkata agencies charge ₹1-3 lakh for standard websites. We deliver equivalent quality at ₹45,000-₹1,50,000 — significant savings for East India businesses.',
    faq: [
      {
        question: 'Can a Central India agency serve Kolkata businesses well?',
        answer:
          "Absolutely. Distance is irrelevant in modern web development. We work via Slack, Zoom, and Jira — the same tools Kolkata's Salt Lake IT companies use. Our 500+ clients across 25 countries prove that remote collaboration works seamlessly.",
      },
      {
        question: 'How much does a website cost compared to Kolkata agencies?',
        answer:
          'Kolkata agencies charge ₹1-3 lakh for standard websites. We deliver equivalent quality at ₹45,000-₹1,50,000. For eCommerce and custom applications, savings are even greater.',
      },
      {
        question: 'What Kolkata industries do you serve?',
        answer:
          "We serve Kolkata's key sectors: finance and banking, IT and BPO, jute and tea exporters, educational institutions, healthcare providers, and retail businesses. Our B2B expertise is particularly relevant for Kolkata's export industries.",
      },
      {
        question: 'Do you build Bengali language websites?',
        answer:
          'Yes. We build multilingual websites including Bengali. Our Unicode-optimised typography ensures Bengali script renders beautifully, and we handle bilingual SEO for English and Bengali search queries.',
      },
      {
        question: 'How do you handle project management for Kolkata clients?',
        answer:
          'Same as local agencies: dedicated project manager, weekly Zoom calls, daily Slack updates, Jira/Trello for task tracking. We share designs on Figma for real-time review and use GitHub for code delivery.',
      },
      {
        question: 'Do you provide digital marketing for Kolkata businesses?',
        answer:
          'Yes. We offer local SEO, Google Ads, social media marketing, and content strategy for Kolkata businesses. We target Kolkata-specific keywords and understand the West Bengal market.',
      },
    ],
    portfolio: [
      {
        name: 'Kolkata Finance Portal',
        category: 'Finance, Kolkata',
        desc: 'Secure financial services website with investor dashboard, compliance documentation, and lead management system.',
      },
    ],
  },

  {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat',
    isHQ: false,
    tier: 3,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 23.0225, lng: 72.5714 },
    population: '8.6 million',
    knownFor: "Gujarat's entrepreneurial spirit, textile capital, pharma, GIFT City",
    distanceFromNagpur: '1,000 km',
    tagline: "Gujarat's Entrepreneurial Spirit Needs a Digital Partner to Match",
    primaryKeyword: 'web design company Ahmedabad',
    secondaryKeywords: [
      'website design Ahmedabad',
      'best web design company Ahmedabad',
      'web developer Ahmedabad',
      'ecommerce website Ahmedabad',
    ],
    searchVolume: 2500,
    competition: 'high',
    keyIndustries: [
      'Textiles',
      'Pharma & Chemical',
      'Real Estate',
      'Fintech (GIFT City)',
      'Diamond & Gems',
      'FMCG',
    ],
    businessDistricts: ['SG Highway', 'Ashram Road', 'CG Road', 'Prahlad Nagar', 'GIFT City'],
    nearbyClients: [],
    introContent:
      "Ahmedabad — Gujarat's commercial powerhouse — runs on entrepreneurial energy. From the textile mills of Naroda to the fintech towers of GIFT City, Ahmedabad businesses think big and move fast. They need web partners who can match that pace and ambition, without the Mumbai or Bangalore price tag.",
    whyChooseContent:
      "Gujarat's entrepreneurial spirit needs a digital partner. Textile, pharma, GIFT City fintech — we serve Ahmedabad's diverse industries with enterprise-grade web solutions at Central India prices. Think of it as Gujarati value meets global quality.",
    pricingNote:
      'Ahmedabad businesses benefit from our competitive pricing starting at ₹25,000. We deliver the same quality as SG Highway agencies at 40-50% less cost.',
    faq: [
      {
        question: 'Do you serve Ahmedabad and Gujarat businesses?',
        answer:
          "Yes. We serve businesses across Ahmedabad, Surat, Vadodara, and the broader Gujarat market. Our expertise in B2B websites, eCommerce, and export-ready digital platforms is particularly relevant for Gujarat's entrepreneurial economy.",
      },
      {
        question: 'How much does a website cost compared to Ahmedabad agencies?',
        answer:
          'Ahmedabad agencies charge ₹1-3 lakh for standard websites. We deliver equivalent quality at ₹45,000-₹1,50,000. For eCommerce and textile catalogue sites, savings are substantial.',
      },
      {
        question: 'Can you build B2B websites for Gujarat exporters?',
        answer:
          "Absolutely. We've built export catalogues, B2B inquiry systems, and international-facing websites for manufacturers and exporters. Multi-currency, multi-language, and SEO for international markets.",
      },
      {
        question: 'Do you support Gujarati language websites?',
        answer:
          'Yes. We build multilingual websites including Gujarati. Our Unicode-optimised typography and bilingual SEO ensure your website connects with local and NRI Gujarati audiences.',
      },
      {
        question: 'Can you build fintech websites for GIFT City companies?',
        answer:
          'Yes. We build compliance-aware fintech websites with secure architectures, investor dashboards, and regulatory documentation portals. Our WCAG compliance ensures accessibility for international stakeholders.',
      },
      {
        question: 'What is the delivery timeline for Ahmedabad projects?',
        answer:
          'Standard business websites: 4-6 weeks. eCommerce stores: 6-10 weeks. Custom web applications: 8-16 weeks. We provide milestone-based delivery with regular progress updates via Zoom and Slack.',
      },
    ],
    portfolio: [
      {
        name: 'Gujarat Textile Exporter',
        category: 'Textiles, Ahmedabad',
        desc: 'Multi-language B2B catalogue with international shipping integration, sample ordering, and buyer inquiry management.',
      },
    ],
  },

  {
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    isHQ: false,
    tier: 3,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 26.9124, lng: 75.7873 },
    population: '4.1 million',
    knownFor: 'Pink City, tourism, gems & jewellery, handicrafts',
    distanceFromNagpur: '1,050 km',
    tagline: 'Pink City. Vibrant Businesses. Stunning Websites.',
    primaryKeyword: 'web design company Jaipur',
    secondaryKeywords: [
      'website design Jaipur',
      'best web design company Jaipur',
      'web developer Jaipur',
      'tourism website Jaipur',
    ],
    searchVolume: 2000,
    competition: 'medium',
    keyIndustries: [
      'Tourism & Hospitality',
      'Gems & Jewellery',
      'Handicrafts & Textiles',
      'Real Estate',
      'IT & BPO',
      'Education',
    ],
    businessDistricts: ['Malviya Nagar', 'C-Scheme', 'Vaishali Nagar', 'Sitapura IT Park', 'MI Road'],
    nearbyClients: [],
    introContent:
      "Jaipur — the Pink City — is Rajasthan's economic engine. Tourism, gems, handicrafts, and a growing IT sector drive the economy. But many Jaipur businesses still lack digital presence that matches their real-world excellence. A stunning haveli hotel with an outdated website is leaving money on the table.",
    whyChooseContent:
      "Pink City. Vibrant businesses. Stunning websites. Tourism, gems, handicrafts — we showcase your Jaipur brand online with the same visual richness that makes the city famous. Our tourism website expertise is especially relevant for Rajasthan's hospitality sector.",
    pricingNote:
      'Jaipur businesses get excellent value — our packages start at ₹25,000 for business websites and ₹40,000 for tourism and eCommerce sites with booking integrations.',
    faq: [
      {
        question: 'Do you build tourism websites for Jaipur businesses?',
        answer:
          "Yes. We specialise in visually rich tourism websites with booking integrations, virtual tours, multilingual content (English, Hindi, and other languages for international tourists), and Google Maps integration. Perfect for Jaipur's hotels, tour operators, and heritage properties.",
      },
      {
        question: 'How much does a website cost in Jaipur?',
        answer:
          'Business websites start at ₹15,000. Tourism and hospitality websites with booking systems start at ₹40,000. eCommerce for gems and handicrafts starts at ₹50,000. All include responsive design, SEO, and WCAG compliance.',
      },
      {
        question: 'Can you build eCommerce for Jaipur gems and handicrafts?',
        answer:
          "Absolutely. We build beautiful eCommerce stores for gems, jewellery, and handicraft businesses with high-resolution product photography showcases, secure payment gateways, and international shipping integration — essential for Jaipur's export-oriented craft economy.",
      },
      {
        question: 'Do you provide SEO for Jaipur tourism businesses?',
        answer:
          'Yes. We offer tourism-specific SEO targeting keywords like "Jaipur hotels", "Rajasthan tour packages", and location-specific terms. Our local SEO expertise helps Jaipur businesses rank in Google Maps and local search results.',
      },
      {
        question: 'Can you build multilingual sites for international tourists?',
        answer:
          "Yes. We build multilingual websites in English, Hindi, French, German, Spanish, and more — crucial for Jaipur's international tourism market. Each language version is SEO-optimised for that market.",
      },
      {
        question: 'What is the project delivery process?',
        answer:
          'Discovery call → wireframes → design mockups → development → testing → launch. Standard timeline: 4-8 weeks. We use Zoom, Slack, and Figma for seamless remote collaboration with Jaipur clients.',
      },
    ],
    portfolio: [
      {
        name: 'Jaipur Heritage Hotel',
        category: 'Tourism, Jaipur',
        desc: 'Visually stunning hotel website with direct booking engine, virtual room tours, and multilingual content for international guests.',
      },
    ],
  },

  {
    name: 'Lucknow',
    slug: 'lucknow',
    state: 'Uttar Pradesh',
    isHQ: false,
    tier: 3,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 26.8467, lng: 80.9462 },
    population: '3.7 million',
    knownFor: "UP's IT city, state capital, government hub",
    distanceFromNagpur: '950 km',
    tagline: "UP's IT City is Growing Fast — Your Website Should Too",
    primaryKeyword: 'web design company Lucknow',
    secondaryKeywords: [
      'website design Lucknow',
      'best web design company Lucknow',
      'web developer Lucknow',
      'SEO services Lucknow',
    ],
    searchVolume: 1500,
    competition: 'medium',
    keyIndustries: ['Government', 'IT & Software', 'Education', 'Healthcare', 'Real Estate', 'FMCG'],
    businessDistricts: ['Gomti Nagar', 'Hazratganj', 'Aliganj', 'Indira Nagar', 'IT City Lucknow'],
    nearbyClients: [],
    introContent:
      "Lucknow, Uttar Pradesh's capital and India's fastest-growing IT city, is undergoing a digital revolution. The Lucknow IT City project, government digitisation initiatives, and a booming startup ecosystem are creating unprecedented demand for quality web development — demand that outstrips the local talent supply.",
    whyChooseContent:
      "UP's IT city is growing fast. Government portals, education websites, startup MVPs — we serve Lucknow's key sectors with 24+ years of experience and enterprise-grade quality at Central India pricing.",
    pricingNote:
      'Lucknow businesses benefit from our competitive Central India pricing. Professional websites starting at ₹25,000 — significantly more affordable than hiring from Delhi NCR.',
    faq: [
      {
        question: 'Do you serve Lucknow businesses?',
        answer:
          "Yes. We serve businesses across Lucknow and UP remotely via Slack, Zoom, and project management tools. Our experience with government portals and educational websites is particularly relevant for Lucknow's key sectors.",
      },
      {
        question: 'How much does a website cost for a Lucknow business?',
        answer:
          'Business websites start at ₹15,000. Our Professional package at ₹45,000 includes custom design, SEO, and WCAG compliance — quality comparable to Delhi NCR agencies at 60% less cost.',
      },
      {
        question: 'Can you build government portals for Lucknow organisations?',
        answer:
          'Yes. We build WCAG 2.1 AA compliant government websites that meet accessibility requirements. Our experience includes institutional portals, public information websites, and citizen-facing applications.',
      },
      {
        question: 'Do you work with Lucknow IT startups?',
        answer:
          "Yes. We offer rapid MVP development, SaaS platform building, and modern web application development for Lucknow's growing startup ecosystem. React, Next.js, Node.js — the full modern stack.",
      },
      {
        question: 'What is the delivery timeline for Lucknow projects?',
        answer:
          'Standard websites: 4-6 weeks. Government projects: 6-12 weeks (accounting for approval processes). Startup MVPs: 2-4 weeks. We provide clear milestone-based timelines.',
      },
      {
        question: 'Do you provide Hindi language website support?',
        answer:
          'Yes. We build bilingual Hindi-English websites with optimised Devanagari typography and bilingual SEO — essential for Lucknow businesses serving both local and national audiences.',
      },
    ],
    portfolio: [
      {
        name: 'UP Government Portal',
        category: 'Government, Lucknow',
        desc: 'Accessible bilingual institutional portal with document management, citizen services, and real-time notice board.',
      },
    ],
  },

  {
    name: 'Chandigarh',
    slug: 'chandigarh',
    state: 'Punjab / Haryana',
    isHQ: false,
    tier: 3,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 30.7333, lng: 76.7794 },
    population: '1.2 million',
    knownFor: "India's first planned city, IT hub, education centre",
    distanceFromNagpur: '1,250 km',
    tagline: "India's First Planned City Deserves a Planned Digital Strategy",
    primaryKeyword: 'web design company Chandigarh',
    secondaryKeywords: [
      'website design Chandigarh',
      'best web design company Chandigarh',
      'web developer Chandigarh',
      'SEO services Chandigarh',
    ],
    searchVolume: 1200,
    competition: 'medium',
    keyIndustries: ['IT & Software', 'Education', 'Defence', 'Real Estate', 'Healthcare', 'Tourism'],
    businessDistricts: ['IT Park', 'Sector 17', 'Sector 34', 'Sector 43', 'Mohali IT Hub'],
    nearbyClients: [],
    introContent:
      "Chandigarh — India's first planned city — represents order, design, and forward thinking. The Chandigarh-Mohali IT corridor is growing rapidly, and businesses here expect the same level of planning and precision in their digital presence. eLan Technology brings 24 years of structured, quality-first web development to Chandigarh's discerning business community.",
    whyChooseContent:
      "India's first planned city deserves a planned digital strategy. IT, education, and defence sector expertise — we serve Chandigarh's key industries with enterprise-grade web solutions at Central India pricing.",
    pricingNote:
      'Chandigarh businesses pay less than Delhi NCR rates. Our Professional package at ₹45,000 delivers quality that matches Mohali IT Park agencies at significantly lower cost.',
    faq: [
      {
        question: 'Do you serve Chandigarh, Mohali, and Panchkula businesses?',
        answer:
          'Yes. We serve the entire Chandigarh tricity area including Chandigarh, Mohali, and Panchkula. Our remote collaboration process is seamless for businesses in the IT Park, Sector 17, and the broader tricity region.',
      },
      {
        question: 'How much does a website cost in Chandigarh?',
        answer:
          'Business websites start at ₹15,000. Our Professional package at ₹45,000 includes custom design, SEO, and WCAG compliance — less than half the cost of comparable Delhi NCR agencies.',
      },
      {
        question: 'Can you serve Chandigarh defence sector clients?',
        answer:
          'Yes. We build secure, compliant websites for defence-related organisations. Our WCAG accessibility compliance and security-first development approach meet the stringent requirements of defence sector digital assets.',
      },
      {
        question: 'Do you work with Chandigarh education institutions?',
        answer:
          "Yes. We build admission portals, LMS platforms, and institutional websites for Chandigarh's numerous universities and colleges. Our experience with PU-affiliated institutions and professional colleges is extensive.",
      },
      {
        question: 'What technologies do you use?',
        answer:
          'React, Next.js, Astro, Node.js, MongoDB, WordPress, Shopify — the full modern stack. We recommend the best technology based on your specific requirements and budget.',
      },
      {
        question: 'How do you manage projects remotely?',
        answer:
          'Slack for daily communication, Zoom for weekly calls, Jira for task tracking, Figma for design reviews, GitHub for code delivery. Same tools used by Mohali IT Park companies.',
      },
    ],
    portfolio: [
      {
        name: 'Chandigarh Education Portal',
        category: 'Education, Chandigarh',
        desc: 'Multi-campus institutional website with online admissions, faculty directory, and integrated learning management system.',
      },
    ],
  },

  {
    name: 'Kochi',
    slug: 'kochi',
    state: 'Kerala',
    isHQ: false,
    tier: 3,
    hasLandingPage: true,
    isFeatured: false,
    geo: { lat: 9.9312, lng: 76.2673 },
    population: '2.1 million',
    knownFor: "Kerala's IT hub, tourism, spices, shipping",
    distanceFromNagpur: '1,500 km',
    tagline: "Kerala's IT Hub Meets Nagpur's Web Design Expertise",
    primaryKeyword: 'web design company Kochi',
    secondaryKeywords: [
      'website design Kochi',
      'best web design company Kochi',
      'web developer Kochi',
      'tourism website Kerala',
    ],
    searchVolume: 1000,
    competition: 'medium',
    keyIndustries: [
      'IT & Infopark',
      'Tourism & Hospitality',
      'Spices & Export',
      'Shipping & Logistics',
      'Healthcare',
      'Education',
    ],
    businessDistricts: ['Infopark', 'Kakkanad', 'MG Road', 'Marine Drive', 'SmartCity Kochi'],
    nearbyClients: [],
    introContent:
      "Kochi — Kerala's IT hub and India's spice trading capital — blends tradition with technology. From Infopark's IT corridor to Fort Kochi's heritage tourism district, businesses here need websites that reflect both innovation and cultural richness. eLan Technology brings 24 years of web expertise to Kerala's most dynamic city.",
    whyChooseContent:
      "Kerala's IT hub meets Nagpur's web design expertise. Tourism, spice trade, Infopark businesses — we build websites that serve Kochi's unique mix of traditional and modern industries with enterprise-grade quality at Central India pricing.",
    pricingNote:
      'Kochi businesses benefit from our Central India pricing — ₹45,000 for professional websites that match Infopark agency quality. Tourism websites with booking systems start at ₹50,000.',
    faq: [
      {
        question: 'Do you serve businesses in Kochi and Kerala?',
        answer:
          "Yes. We serve businesses across Kochi, Thiruvananthapuram, and the broader Kerala market. Our experience with tourism websites and IT company portfolios is particularly relevant for Kerala's key industries.",
      },
      {
        question: 'Can you build tourism websites for Kerala businesses?',
        answer:
          "Absolutely. Kerala's tourism industry deserves stunning websites. We build visually rich tourism sites with booking engines, virtual tours, multilingual content, and Google Maps integration — showcasing Kerala's backwaters, heritage, and wellness tourism.",
      },
      {
        question: 'How much does a website cost for a Kochi business?',
        answer:
          'Business websites start at ₹15,000. Tourism websites with booking systems start at ₹50,000. eCommerce for spice and export businesses starts at ₹40,000. All include responsive design, SEO, and WCAG compliance.',
      },
      {
        question: 'Do you work with Infopark and SmartCity companies?',
        answer:
          "Yes. We build corporate websites, SaaS platforms, and product showcases for IT companies. Our React, Next.js, and Node.js expertise matches Infopark standards. We understand the needs of Kochi's tech ecosystem.",
      },
      {
        question: 'Do you support Malayalam language websites?',
        answer:
          'Yes. We build multilingual websites including Malayalam. Our Unicode-optimised typography ensures Malayalam script renders beautifully, and we handle bilingual SEO for English and Malayalam search queries.',
      },
      {
        question: 'Can you build export-ready websites for spice traders?',
        answer:
          "Yes. We build B2B export websites for Kerala's spice industry with multi-currency pricing, international shipping integration, product catalogues with quality certifications, and inquiry management systems.",
      },
    ],
    portfolio: [
      {
        name: 'Kerala Tourism Property',
        category: 'Tourism, Kochi',
        desc: 'Immersive tourism website with direct booking engine, virtual backwater tours, and multilingual content for international visitors.',
      },
    ],
  },
];

// ─── Helper Exports ─────────────────────────────────────────────────────────

/** All cities with landing pages */
export const citiesWithPages = cities.filter((c) => c.hasLandingPage);

/** Featured cities for homepage/footer display */
export const featuredCities = cities.filter((c) => c.isFeatured);

/** Cities grouped by tier */
export const tier1Cities = cities.filter((c) => c.tier === 1);
export const tier2Cities = cities.filter((c) => c.tier === 2);
export const tier3Cities = cities.filter((c) => c.tier === 3);

/** Get a city by slug */
export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
