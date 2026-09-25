// ─── City Data for Geo-Targeted Landing Pages ──────────────────────────────
// Each city ha s full SEO, content, and schema data for its landing page.
// Cities are grouped into tiers by priority and search volume.

interface CityFAQ {
  question: string;
  answer: string;
}

interface CityPortfolioItem {
  name: string;
  category: string;
  desc: string;
  href?: string;
}

interface CityMarketNeed {
  audience: string;
  need: string;
  deliverables: string[];
  href: string;
}

// Display prices for the three pricing cards. Strings so they can carry the
// ₹ symbol, Indian digit grouping, and a trailing "+".
export interface CityPricingTiers {
  starter: string;
  professional: string;
  enterprise: string;
}

// Verified eLan price ladder (from city FAQ copy, confirmed 2026-06). Used by
// every city page that does not set its own `pricing`. Change in one place to
// reprice all cities at once.
// NOTE: Nagpur HQ Professional price is assumed equal to the ladder (₹45,000);
// confirm with the owner if HQ pricing differs.
export const DEFAULT_CITY_PRICING: CityPricingTiers = {
  starter: '₹21,000',
  professional: '₹45,000',
  enterprise: '₹1,50,000+',
};

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
  seoTitle?: string;
  seoDescription?: string;
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
  marketNeeds?: CityMarketNeed[];

  // Real package prices shown on the pricing cards. Optional - when omitted,
  // CityPricing falls back to DEFAULT_CITY_PRICING (the verified eLan ladder).
  // Override per city only when that city's published pricing differs.
  pricing?: CityPricingTiers;

  // FAQ data for FAQPage schema
  faq: CityFAQ[];

  // Portfolio highlights for this city
  portfolio: CityPortfolioItem[];
}

export const cities: CityData[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // TIER 1 - HQ + Nearest Market
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
    tagline: "Web design, ecommerce and accessibility-first development from Nagpur",
    seoTitle: 'Web Design Company in Nagpur | Custom Websites, Apps & SEO | eLan Technology',
    seoDescription: "Nagpur web design company operating since 2002. Custom websites, ecommerce, mobile apps, SEO and accessibility-first development from our local office.",
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
      'Nagpur is no longer just the "Zero Mile City" at the geographic heart of India - it is rapidly transforming into a major economic and technology hub. With the MIHAN project attracting international investment, the Nagpur IT Park housing dozens of technology firms, and Vidarbha\'s industrial corridor expanding year on year, local businesses face unprecedented digital competition.',
    whyChooseContent:
      'eLan Technology has been designing websites for Nagpur businesses since 2002. We understand the unique commercial ecosystems of areas like Sitabuldi\'s retail district, Dharampeth\'s professional services corridor, Wardha Road\'s industrial belt, and Ramdaspeth\'s growing corporate sector. Visit our office at PTG IT Park for a face-to-face consultation.',
    pricingNote:
      'Website costs depend on the agreed pages, content, design, integrations, testing and support. Published packages provide a starting point; the written proposal identifies accessibility work, hosting, third-party charges and ownership terms.',
    faq: [
      {
        question: 'Which is the best web design company in Nagpur?',
        answer:
          "eLan Technology has operated from Nagpur since 2002. Our work spans business websites, custom ecommerce, accessibility services, digital marketing and configurable software products. Accessibility is considered during design and development, while formal conformance work is scoped to the standard, testing and evidence required for each project.",
      },
      {
        question: 'How much does website development cost in Nagpur?',
        answer:
          'Published Nagpur packages currently begin at ₹21,000 for the listed starter scope. Business websites, ecommerce and custom applications are quoted after confirming pages, content, design, integrations, accessibility testing, licences, hosting and support. The written proposal identifies the final price, taxes, third-party charges, ownership terms and any post-launch support.',
      },
      {
        question: 'Does eLan Technology have an office in Nagpur?',
        answer:
          "Yes. Our headquarters is at PTG IT Park, Gayatri Nagar, Nagpur, Maharashtra. Operations began in Nagpur in 2002. Please schedule a visit or connect with us by video call.",
      },
      {
        question: 'How long does it take to build a website for a Nagpur business?',
        answer:
          'A small, well-defined business website may take several weeks, while ecommerce stores and custom portals require more time. The proposal confirms the schedule after the pages, content, integrations, approvals and access requirements are understood.',
      },
      {
        question: 'Do you provide local SEO and digital marketing services in Nagpur?',
        answer:
          'Yes. Local SEO work can include Google Business Profile guidance, technical and on-page improvements, location content and measurement. Rankings are influenced by competition, relevance, authority and the client’s wider market activity, so no particular position is guaranteed.',
      },
      {
        question: 'Can you redesign my existing Nagpur business website?',
        answer:
          'Yes. We start by auditing the existing URLs, content, analytics, search visibility and technical dependencies. The redesign plan includes a redirect map and acceptance checks; rankings and Core Web Vitals cannot be guaranteed, but changes are measured before and after launch.',
      },
      {
        question: 'Do you build WCAG 2.1 AA and ADA compliant websites in Nagpur?',
        answer:
          'Yes. eLan Technology offers accessibility-first design and development, WCAG audits, remediation and ongoing monitoring. Formal conformance and documentation are scoped to the applicable standard, tested journeys and evidence required by the client.',
      },
    ],
    portfolio: [
      {
        name: 'Aasthaa Hospital',
        category: 'Healthcare, Nagpur',
        desc: 'A healthcare website structured around departments, doctor information, patient resources and appointment enquiries.',
      },
      {
        name: 'Trimit Architects',
        category: 'Architecture & Real Estate',
        desc: 'An architecture portfolio website with structured project galleries, clear service information and enquiry routes.',
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
    tagline: 'Web design and development for Raipur businesses, delivered from Nagpur',
    seoTitle: 'Website Design & Development Company in Raipur, Chhattisgarh | eLan Technology',
    seoDescription: 'Web design and development for Raipur businesses, including corporate sites, ecommerce, SEO foundations and accessibility-first delivery from Nagpur.',
    primaryKeyword: 'web design company Raipur',
    secondaryKeywords: [
      'website design Raipur',
      'website design in Raipur',
      'best web design company Raipur',
      'website design company Raipur',
      'web designer Raipur',
      'web designer in Raipur',
      'web developer Raipur',
      'web development company Raipur',
      'website development company Raipur',
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
      "Raipur, the capital of Chhattisgarh, is witnessing a digital transformation driven by the Naya Raipur smart city initiative, a booming steel and mining sector, and an increasingly tech-savvy consumer base. Yet most local businesses still lack professional web presence - creating a massive opportunity for those who invest in quality digital infrastructure now.",
    whyChooseContent:
      'eLan Technology serves Raipur businesses remotely from our Nagpur headquarters. We begin with the audience, content and required customer journey, then document pages, integrations, ownership, testing, launch and support in the proposal.',
    pricingNote:
      'Website costs for Raipur businesses depend on the scope, content, integrations and support. Published packages provide a starting point; every proposal identifies inclusions, exclusions, third-party charges and ownership terms.',
    faq: [
      {
        question: 'Which website design company in Raipur do you recommend?',
        answer:
          'Compare agencies using live work, a written scope, mobile quality, accessibility approach, ownership terms and support. eLan Technology serves Raipur from Nagpur and states that remote delivery model clearly.',
      },
      {
        question: 'Which website development company in Raipur handles Chhattisgarh industry clients?',
        answer:
          'We can scope corporate websites, catalogues, portals and ecommerce for industrial and service businesses. Sector-specific procurement, language and compliance requirements are confirmed during discovery rather than assumed.',
      },
      {
        question: 'Can I hire an experienced web designer in Raipur for a custom project?',
        answer:
          'Yes. Raipur projects can use video discovery, shared design reviews, written approvals and project tracking. The named team, meeting schedule and any travel requirements are confirmed in the proposal.',
      },
      {
        question: 'How much does website design in Raipur cost?',
        answer:
          'Cost depends on the page and template scope, content, design depth, integrations, accessibility testing and support. The proposal identifies the agreed total, GST, payment milestones, third-party charges and recurring services.',
      },
      {
        question: 'What should I look for in a web development company in Raipur?',
        answer:
          'Review real live work, the written scope, mobile experience, accessibility approach, ownership terms and post-launch support. eLan Technology has operated since 2002 and serves Raipur remotely from Nagpur. Source-code rights and handover terms are defined in the proposal.',
      },
      {
        question: 'Do you provide local SEO and digital marketing services in Raipur?',
        answer:
          'Yes. A Raipur-focused plan can include technical SEO, location content, Google Business Profile guidance, measurement and paid-campaign support. The actual channels and geography are chosen from search demand and business goals.',
      },
      {
        question: 'Can you build an eCommerce website for my Raipur business?',
        answer:
          'Yes. Shopify, WooCommerce or a custom commerce stack can be selected after reviewing the catalogue, payments, shipping, tax, inventory and fulfilment workflow. Provider charges and custom integration work are scoped separately.',
      },
    ],
    portfolio: [
      {
        name: 'CIPL',
        category: 'Industrial project delivered from Nagpur',
        desc: 'A live industrial company website demonstrating structured products, applications and B2B enquiry pathways.',
      },
      {
        name: 'Aasthaa Hospital',
        category: 'Healthcare project delivered from Nagpur',
        desc: 'A live healthcare website demonstrating department information, doctor discovery and patient enquiry pathways.',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TIER 2 - Major Metro Cities
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
    tagline: 'Web design and development for Mumbai businesses, delivered from Nagpur',
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
      "Mumbai is one of India's most competitive digital markets. Businesses across BKC, Andheri and the wider metropolitan region need clear service positioning, reliable mobile journeys and websites that can support complex content and integrations.",
    whyChooseContent:
      'We serve Mumbai remotely from Nagpur in the same state and timezone. Proposals identify pages, integrations, testing, ownership and support so buyers can compare actual scope instead of broad percentage-saving claims.',
    pricingNote:
      'Website pricing depends on the agreed scope, content, integrations, performance targets, testing and support. We identify GST, third-party charges and recurring services in writing.',
    faq: [
      {
        question: 'Why should a Mumbai business hire a Nagpur web agency?',
        answer:
          'Compare the actual scope, team, ownership, acceptance tests and ongoing costs. We work from Nagpur in the same timezone and agree the communication process before delivery begins.',
      },
      {
        question: 'How much does a website cost compared to Mumbai agencies?',
        answer:
          'Cost depends on pages, content, integrations, testing, hosting and support. Compare itemised proposals rather than assuming equivalent quality from headline prices alone.',
      },
      {
        question: 'Can you handle the requirements of Mumbai startups?',
        answer:
          'Yes. We can scope MVPs, dashboards and web applications after confirming users, workflows, integrations, security and acceptance criteria. The technology and delivery schedule follow that discovery.',
      },
      {
        question: 'Do you visit Mumbai for client meetings?',
        answer:
          'We primarily work remotely through agreed meeting and project-review tools. In-person meetings can be arranged when useful, with travel and related costs confirmed in advance.',
      },
      {
        question: 'What Mumbai industries do you serve?',
        answer:
          'Projects can be scoped for finance, media, real estate, technology, retail and healthcare. Regulatory, security and accessibility requirements are confirmed for the actual organisation and target market.',
      },
      {
        question: 'How do you handle communication with Mumbai clients?',
        answer:
          'The project plan identifies meeting cadence, review tools, named contacts, response responsibilities and handover. We work in the same Indian timezone as Mumbai teams.',
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
    tagline: 'Web design and development for Pune businesses, delivered from Nagpur',
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
      'Pune businesses span software, manufacturing, education and growing consumer brands. Their websites may need product content, integrations, multilingual publishing, recruitment journeys or custom application workflows.',
    whyChooseContent:
      'We serve Pune remotely from Nagpur in the same state and timezone. The proposal identifies technology, scope, acceptance tests, ownership, third-party services and support.',
    pricingNote:
      'Pricing depends on the agreed pages, content, integrations, testing, hosting and support. Published packages provide a starting point and the proposal records the final scope and recurring costs.',
    faq: [
      {
        question: 'Why choose a Nagpur agency over a Pune web design company?',
        answer:
          'We serve Pune from Nagpur in the same state and timezone. Technology, scope, acceptance tests, ownership and support are selected for the project rather than justified through a broad market-saving claim.',
      },
      {
        question: 'How much does a website cost compared to Pune agencies?',
        answer:
          'Pricing varies with discovery, UX, integrations, security, testing and support. We provide an itemised proposal instead of promising a standard saving against Pune agencies.',
      },
      {
        question: 'Do you work with Pune-based startups?',
        answer:
          'Yes. We can scope MVPs, dashboards and SaaS workflows after confirming users, integrations, security and acceptance criteria. Delivery milestones are based on the agreed product scope.',
      },
      {
        question: 'What technologies do you use for Pune tech companies?',
        answer:
          'React, Next.js, Astro, Node.js, MongoDB, PostgreSQL, TypeScript, Docker, AWS - the same stack Pune IT companies use internally. We also handle WordPress, Shopify, and WooCommerce for non-tech businesses.',
      },
      {
        question: 'Can you handle Pune automotive and manufacturing clients?',
        answer:
          'Yes. B2B websites, catalogues and dealer workflows can be scoped around the actual products, audiences, integrations and access requirements.',
      },
      {
        question: 'How do you manage projects with Pune clients remotely?',
        answer:
          'The project plan confirms communication channels, meeting frequency, design reviews, code access and handover rather than assuming a fixed toolset for every client.',
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
    tagline: 'Web design and development for Hyderabad businesses, delivered from Nagpur',
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
      "Hyderabad's technology, pharma, healthcare and real-estate sectors often need dependable content, integrations, security controls and clear mobile journeys for varied audiences.",
    whyChooseContent:
      'We serve Hyderabad remotely from Nagpur. Industry, security, accessibility, ownership and support requirements are confirmed during discovery and recorded in the proposal.',
    pricingNote:
      'Pricing depends on scope, content, integrations, testing and support. Regulated and enterprise projects require separate discovery, controls and evidence.',
    faq: [
      {
        question: 'Why should a Hyderabad business choose eLan over local agencies?',
        answer:
          'We serve Hyderabad remotely from Nagpur. Technology, industry requirements, security, accessibility and delivery responsibilities are agreed during discovery and documented in the proposal.',
      },
      {
        question: 'Do you serve pharma and biotech companies in Hyderabad?',
        answer:
          'We can scope websites and portals for pharma, biotech and healthcare organisations. Applicable regulations, data roles, security controls and validation evidence must be identified with the client before implementation.',
      },
      {
        question: 'How much does a website cost compared to Hyderabad agencies?',
        answer:
          'Pricing depends on scope, integrations, content, testing and support. Regulated and enterprise projects require separate discovery and evidence rather than a generic price comparison.',
      },
      {
        question: 'Can you work with Hyderabad government projects?',
        answer:
          'Government and institutional work can include WCAG or GIGW-aligned design, testing and documentation. Procurement, hosting, security and accessibility requirements are confirmed for the specific tender or engagement.',
      },
      {
        question: 'What is the communication process for Hyderabad clients?',
        answer:
          'The project plan confirms named contacts, meeting frequency, review tools, decision responsibilities and escalation routes. We work in the same Indian timezone as Hyderabad teams.',
      },
      {
        question: 'Do you provide SEO for Hyderabad businesses?',
        answer:
          'Yes. A plan can include technical SEO, location content, Google Business Profile guidance and measurement. No particular ranking is guaranteed, and priorities follow verified search demand and business goals.',
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
    tagline: 'Web design and development for Delhi NCR businesses, delivered from Nagpur',
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
      'Delhi NCR organisations range from public institutions and education groups to retailers, media companies and startups. Their websites may require complex content, accessibility, integrations, multilingual publishing or custom workflows.',
    whyChooseContent:
      "NCR's scale creates varied requirements, from service websites to portals and commerce. We serve these projects from Nagpur with a written scope, shared reviews and agreed acceptance criteria.",
    pricingNote:
      'Pricing depends on pages, content, integrations, testing, hosting and support. The proposal identifies GST, recurring services, third-party charges and ownership terms.',
    faq: [
      {
        question: 'Why should a Delhi business hire a web agency from Nagpur?',
        answer:
          'We serve Delhi NCR remotely from Nagpur. Compare the written scope, team, integrations, acceptance tests, ownership, hosting and support rather than assuming equivalent quality from city-based pricing.',
      },
      {
        question: 'How much can Delhi businesses save with eLan?',
        answer:
          'Compare deliverables, ownership, integrations, testing, hosting and support rather than headline prices alone. We quote the requirements after discovery.',
      },
      {
        question: 'Do you serve Noida and Gurugram businesses?',
        answer:
          'Yes. Projects can be delivered remotely for organisations in Delhi, Noida, Greater Noida, Gurugram, Faridabad and Ghaziabad, with any on-site requirement agreed separately.',
      },
      {
        question: 'Can you handle government and institutional projects?',
        answer:
          'Institutional work can include WCAG or GIGW-aligned design, testing and documentation. The applicable procurement, hosting, security and accessibility requirements are confirmed for the specific engagement.',
      },
      {
        question: 'What is the turnaround time for Delhi projects?',
        answer:
          'The schedule is confirmed after pages, content, integrations, approvals, access and testing requirements are understood. The milestone and communication plan is documented before delivery.',
      },
      {
        question: 'Do you provide ongoing support for Delhi clients?',
        answer:
          'Post-launch support and maintenance are available when included in the proposal or a separate service agreement. Scope, response targets, exclusions and recurring charges are stated in writing.',
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
    tagline: 'Web design and application development for Bangalore businesses, delivered from Nagpur',
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
      'Bangalore startups and established technology teams often need product discovery, dependable integrations, measurable performance, security controls and clear technical handover.',
    whyChooseContent:
      'We serve Bangalore remotely from Nagpur. Product scope, architecture, testing, documentation, ownership, deployment and support are agreed before implementation.',
    pricingNote:
      'MVP and application pricing depends on product discovery, UX, integrations, security, testing and support. We provide an itemised proposal instead of a generic city comparison.',
    faq: [
      {
        question: 'Can a Nagpur agency match Bangalore startup speed?',
        answer:
          'A small, well-defined MVP can move quickly, but the schedule depends on users, workflows, integrations, content, approvals and testing. Milestones are confirmed after discovery.',
      },
      {
        question: 'How much cheaper are you compared to Bangalore agencies?',
        answer:
          'Startup and business-site pricing varies with product discovery, UX, integrations, testing and support. We provide an itemised proposal instead of promising a standard saving against Bangalore agencies.',
      },
      {
        question: 'Do Bangalore developers respect your code quality?',
        answer:
          'Code standards, automated tests, documentation, repository access and handover are defined for the engagement. A receiving technical team can review the agreed artefacts before acceptance.',
      },
      {
        question: 'What tech stack do you use for Bangalore startups?',
        answer:
          'React, Next.js, Astro, Node.js, MongoDB, PostgreSQL, TypeScript, Docker, AWS, Vercel - the same modern stack Bangalore startups expect. We also build mobile apps with React Native and Flutter.',
      },
      {
        question: 'How do you handle communication with Bangalore teams?',
        answer:
          'Communication, demos, repository access, deployment workflow and meeting frequency are selected with the client and recorded in the project plan.',
      },
      {
        question: 'Do you sign NDAs for Bangalore startup projects?',
        answer:
          'NDAs and white-label arrangements are available where agreed. Intellectual-property, confidentiality, source-code and handover terms are defined by the signed documents rather than assumed.',
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
    tagline: 'Web design and development for Chennai businesses, delivered from Nagpur',
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
      "Chennai's automotive, manufacturing, healthcare and technology businesses often need fast mobile experiences, clear product or service information, dependable integrations and content suitable for domestic and international audiences.",
    whyChooseContent:
      'We serve Chennai remotely from Nagpur with written scope, shared design reviews and agreed testing. Performance and accessibility targets are measured against the actual website rather than promised as universal scores.',
    pricingNote:
      'Website costs depend on content, templates, integrations, performance requirements, localisation and support. The proposal identifies the scope, GST, recurring costs and ownership terms.',
    faq: [
      {
        question: 'Can you serve Chennai automotive and manufacturing clients?',
        answer:
          'Yes. B2B websites, catalogues and dealer workflows can be scoped around products, domestic and international audiences, integrations and access requirements.',
      },
      {
        question: 'How much does a website cost compared to Chennai agencies?',
        answer:
          'Cost depends on the scope rather than the city alone. Compare pages, content, integrations, testing, ownership, hosting and support in writing before comparing totals.',
      },
      {
        question: 'Do you build websites that perform well on Lighthouse?',
        answer:
          'We set page-specific performance budgets and verify production pages with appropriate tools. Scores depend on content, third-party scripts, hosting, devices and test conditions, so a universal number is not guaranteed.',
      },
      {
        question: 'Do you support Tamil language websites?',
        answer:
          'Yes. We can build Tamil-English websites with suitable typography, language navigation and separately indexable content where bilingual search visibility is required. Translation and keyword responsibilities are agreed before work begins.',
      },
      {
        question: 'What shipping and logistics websites have you built?',
        answer:
          'Shipment, tracking and fleet workflows can be scoped after reviewing users, data sources, existing software, security and API availability.',
      },
      {
        question: 'How do you handle project delivery for Chennai?',
        answer:
          'The project plan confirms communication channels, meeting frequency, task tracking, code access, decision responsibilities and handover. We work in the same Indian timezone as Chennai teams.',
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
  // TIER 3 - Secondary Cities
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
    tagline: 'Web design and development for Bhopal businesses, delivered from Nagpur',
    seoTitle: 'Web Design & Development Company in Bhopal | eLan Technology',
    seoDescription: 'Web design and development for Bhopal businesses, with custom websites, ecommerce, SEO foundations and accessibility-first delivery from Nagpur.',
    primaryKeyword: 'web design company in Bhopal',
    secondaryKeywords: [
      'website design in Bhopal',
      'best web design company in Bhopal',
      'website designing company in Bhopal',
      'best website designing company in Bhopal',
      'website developer in Bhopal',
      'best website developer in Bhopal',
      'web designing Bhopal',
      'best website agency in Bhopal',
      'web development company in Bhopal',
      'best web development company in Bhopal',
      'best web developer company in Bhopal',
      'website development company in Bhopal',
      'best website development company in Bhopal',
      'website development in Bhopal',
      'custom website development in Bhopal',
      'application & website services in Bhopal',
      'SEO services Bhopal',
    ],
    searchVolume: 1200,
    competition: 'medium',
    keyIndustries: ['Government', 'Education', 'Tourism', 'Healthcare', 'Real Estate', 'IT'],
    businessDistricts: ['MP Nagar', 'Arera Colony', 'New Market', 'TT Nagar', 'Hoshangabad Road'],
    nearbyClients: [],
    introContent:
      "Bhopal organisations need different kinds of websites: clear service and enquiry journeys for MP Nagar businesses, dependable content management for institutions, multilingual publishing where required, and mobile-first information for healthcare, tourism and education audiences.",
    whyChooseContent:
      'eLan Technology serves Bhopal remotely from its Nagpur headquarters. Discovery, design reviews, content approvals, testing, ownership and support responsibilities are documented so distance does not create ambiguity.',
    pricingNote:
      "Website design and development costs depend on the pages, content, integrations, accessibility work and support required. We provide an itemised proposal and identify hosting, third-party charges and ownership terms before work begins.",
    pricing: { starter: '₹21,000', professional: '₹45,000', enterprise: '₹1,00,000+' },
    faq: [
      {
        question: 'Which is the best web design company in Bhopal?',
        answer:
          "When comparing web design companies serving Bhopal, review real live work, the written scope, mobile quality, accessibility approach, ownership terms and post-launch support. eLan Technology has operated since 2002 and serves Bhopal remotely from Nagpur. Source-code rights, hosting and handover terms are defined in each proposal rather than assumed.",
      },
      {
        question: 'How much does website design in Bhopal cost?',
        answer:
          'Pricing depends on pages, templates, content, integrations, testing and support. Published packages provide a starting point, while the proposal confirms GST, payment stages, exclusions, recurring costs and ownership terms.',
      },
      {
        question: 'Who is the best website developer in Bhopal for a small business?',
        answer:
          'Choose a developer who can explain the scope, editing workflow, mobile testing, search foundations, ownership and post-launch costs. A straightforward WordPress or Astro site may suit many SMEs; source-code rights and delivery dates depend on the agreed proposal and payment terms.',
      },
      {
        question: 'Do you offer custom website development in Bhopal?',
        answer:
          'Yes - custom website development in Bhopal is one of our core offerings. Beyond templated WordPress builds, we develop fully custom front-ends in React, Next.js, and Astro, with backends in Node.js, Laravel, or Django depending on the use case. Recent custom builds for Central India clients include a government institutional portal, a multi-vendor real-estate listing platform, and a healthcare appointment-booking system. Custom development starts at ₹75,000 and we provide architecture proposals before any code is written.',
      },
      {
        question: 'Do you provide application & website services in Bhopal?',
        answer:
          'Yes. Beyond websites we build mobile applications (Flutter, React Native), progressive web apps, custom internal tools, and API integrations. Our application & website services in Bhopal cover the full stack: design, development, hosting setup, third-party integrations (Razorpay, WhatsApp Business, GSTN, DigiLocker), and ongoing maintenance. If you need both a website AND an app for your Bhopal business, we deliver them as one cohesive engagement with shared branding and a single point of contact.',
      },
      {
        question: 'What makes the best web development company in Bhopal stand out from local agencies?',
        answer:
          'Look for relevant live work, a clear architecture recommendation, named acceptance tests, ownership terms and a realistic maintenance plan. No framework guarantees speed, security or longevity; those results depend on implementation, content, hosting and ongoing operation.',
      },
      {
        question: 'Can you handle web designing in Bhopal remotely from your Nagpur office?',
        answer:
          'Yes. A remote engagement can use video meetings, shared design reviews, written approvals and project tracking. Meeting frequency, response windows, project tools and any travel are agreed before work begins.',
      },
      {
        question: 'What industries do you serve in Bhopal?',
        answer:
          "The page is designed around common needs in government and institutional publishing, education, tourism, healthcare, professional services and real estate. Any sector-specific integration, compliance requirement or bilingual workflow is confirmed during discovery.",
      },
      {
        question: 'How fast can you deliver a website for a Bhopal client?',
        answer:
          'The delivery schedule depends on the page scope, content readiness, integrations, accessibility requirements and approval process. We provide a milestone calendar after these dependencies are understood and revise it when the agreed scope changes.',
      },
      {
        question: 'Do you build government and institutional websites for Bhopal organisations?',
        answer:
          'Institutional portals can be scoped with bilingual content, document publishing, notice boards and enquiry workflows. GIGW, security audit, hosting, integration and formal accessibility requirements must be identified in the tender or proposal and independently verified where required.',
      },
    ],
    portfolio: [
      {
        name: 'ISA Nagpur',
        category: 'Association website delivered from Nagpur',
        desc: 'A live professional-association website demonstrating structured information, event communication and member-focused navigation.',
      },
      {
        name: 'Aasthaa Hospital',
        category: 'Healthcare website delivered from Nagpur',
        desc: 'A live healthcare website demonstrating department information, doctor discovery and patient enquiry routes.',
      },
      {
        name: 'Samarth Realty',
        category: 'Real estate website delivered from Nagpur',
        desc: 'A live real-estate project demonstrating property presentation, location information and enquiry pathways.',
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
    tagline: 'Web design and development for Indore businesses, delivered from Nagpur',
    seoTitle: 'Web Design & Development Company in Indore',
    seoDescription:
      'Web design and development for Indore businesses, startups and manufacturers. Custom websites from ₹21,000, eCommerce and web apps. Get a free audit.',
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
      "Indore businesses range from early-stage teams around the Super Corridor to manufacturers serving customers from Pithampur. Their websites have different jobs: validate a new offer, generate qualified B2B enquiries, present a product catalogue, or support online sales. eLan Technology plans the content, design, technology and measurement around that job, with delivery managed remotely from our Nagpur headquarters.",
    whyChooseContent:
      'Indore companies can engage us for business websites, ecommerce stores and custom applications through a defined scope, named responsibilities and documented handover.',
    pricingNote:
      'Business website packages start at ₹21,000. Final pricing depends on page count, content, integrations, eCommerce features and accessibility requirements.',
    marketNeeds: [
      {
        audience: 'Startups and SaaS teams',
        need: 'Validate an offer and move from concept to a measurable first release.',
        deliverables: ['Conversion landing pages', 'MVP web applications', 'Analytics and lead tracking'],
        href: '/services/web-development/',
      },
      {
        audience: 'Pithampur manufacturers',
        need: 'Explain technical capabilities clearly and turn export or dealer interest into qualified enquiries.',
        deliverables: ['Product catalogues', 'Downloadable specifications', 'CRM-ready enquiry forms'],
        href: '/services/website-design/',
      },
      {
        audience: 'Retail and food brands',
        need: 'Sell online with a fast storefront that supports Indian payments, shipping and GST workflows.',
        deliverables: ['Shopify or WooCommerce', 'Payment and shipping setup', 'Product SEO foundations'],
        href: '/services/ecommerce/',
      },
    ],
    faq: [
      {
        question: 'Do you provide web design services in Indore?',
        answer:
          'Yes. We serve Indore businesses remotely from our Nagpur headquarters through scheduled discovery calls, shared design reviews, milestone approvals and a documented launch process.',
      },
      {
        question: 'How much does a website cost in Indore?',
        answer:
          'Business websites for Indore companies start at ₹21,000. The Professional package starts at ₹45,000; the final scope depends on content, integrations, eCommerce features and accessibility requirements.',
      },
      {
        question: 'Can you build eCommerce sites for Indore businesses?',
        answer:
          'Yes. Shopify, WooCommerce or custom commerce can be selected after reviewing the catalogue, payments, tax, shipping, inventory and fulfilment workflow. Provider charges and custom integrations are scoped separately.',
      },
      {
        question: 'Do you serve Pithampur industrial clients?',
        answer:
          'Yes. B2B company profiles, catalogues and export-facing websites can be scoped around the actual products, buyer information, regulatory content and enquiry workflow.',
      },
      {
        question: 'What startup services do you offer for Indore?',
        answer:
          'We offer MVP planning, landing pages, SaaS dashboards and brand identity work. The stack, milestones and budget are selected after confirming users, workflows and integrations.',
      },
      {
        question: 'How quickly can you deliver projects for Indore clients?',
        answer:
          'Delivery time depends on scope, content, integrations, access, approvals and testing. The proposal records milestones, dependencies and review cadence after discovery.',
      },
    ],
    portfolio: [
      {
        name: 'CIPL Corporate Portal',
        category: 'Enterprise operations',
        desc: 'A role-based internal portal supporting HR workflows, document access and more than 500 staff members.',
        href: '/portfolio/#project-archive',
      },
      {
        name: 'MSME Hub',
        category: 'Business ecosystem platform',
        desc: 'A scalable Next.js and Strapi platform built to connect and support a growing MSME ecosystem.',
        href: 'https://msmehub.co.in/',
      },
      {
        name: '77 Mishti',
        category: 'Retail and packaging',
        desc: 'A product-led digital presence designed to present a distinctive retail and packaging brand clearly.',
        href: 'https://77mishtipackaging.com/',
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
    tagline: 'Web design and development for Kolkata businesses, delivered from Nagpur',
    seoTitle: 'Web Design & Development Company in Kolkata',
    seoDescription:
      'Web design and development for Kolkata companies, exporters and institutions. Custom websites from ₹21,000, eCommerce, multilingual content and SEO.',
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
      "Kolkata organisations often need a website to serve several audiences at once: local customers, national buyers, overseas partners and Bengali-speaking users. We structure those journeys carefully, from clear service and product pages to multilingual content, enquiry workflows and search foundations. Projects are delivered remotely from our Nagpur headquarters with scheduled reviews and documented handover.",
    whyChooseContent:
      "Kolkata businesses work with eLan for clear project ownership, modern development options and experience across B2B, institutional, retail and service websites.",
    pricingNote:
      'Business website packages start at ₹21,000. Multilingual content, eCommerce, custom integrations and application features are estimated after discovery.',
    marketNeeds: [
      {
        audience: 'Exporters and B2B companies',
        need: 'Present products and credentials to buyers who need detail before making contact.',
        deliverables: ['Searchable catalogues', 'Specification downloads', 'Export enquiry journeys'],
        href: '/services/website-design/',
      },
      {
        audience: 'Education and institutions',
        need: 'Organise programmes, notices, admissions and public information so users can find answers quickly.',
        deliverables: ['Accessible information architecture', 'Admissions workflows', 'Editor-friendly CMS'],
        href: '/services/website-design/',
      },
      {
        audience: 'Retail and service brands',
        need: 'Combine strong visual presentation with local discovery and measurable enquiries or sales.',
        deliverables: ['eCommerce or lead generation', 'Bengali-ready content structure', 'Analytics and SEO setup'],
        href: '/services/ecommerce/',
      },
    ],
    faq: [
      {
        question: 'Can a Central India agency serve Kolkata businesses well?',
        answer:
          'Yes. We serve Kolkata businesses from our Nagpur headquarters using scheduled calls, shared design reviews, milestone approvals and a documented launch and handover process.',
      },
      {
        question: 'How much does a website cost compared to Kolkata agencies?',
        answer:
          'Business websites start at ₹21,000 and the Professional package starts at ₹45,000. eCommerce, multilingual content, custom integrations and application features are estimated after discovery.',
      },
      {
        question: 'What Kolkata industries do you serve?',
        answer:
          'Projects can be scoped for finance, technology, exporters, education, healthcare and retail. Sector-specific regulations, content and integrations are confirmed during discovery.',
      },
      {
        question: 'Do you build Bengali language websites?',
        answer:
          'Yes. We can structure and build Bengali-English websites with appropriate fonts, language navigation and separate indexable content where bilingual search visibility is part of the scope. Translation and keyword research responsibilities are agreed before work begins.',
      },
      {
        question: 'How do you handle project management for Kolkata clients?',
        answer:
          'We agree the communication channel and review cadence at kickoff. Projects normally include scheduled calls, shared design feedback, milestone approvals and a documented handover.',
      },
      {
        question: 'Do you provide digital marketing for Kolkata businesses?',
        answer:
          'Yes. A plan can include technical SEO, location content, paid campaigns and measurement. Channels and keywords follow verified demand and business goals; no particular ranking is guaranteed.',
      },
    ],
    portfolio: [
      {
        name: '77 Mishti',
        category: 'Retail and packaging',
        desc: 'A product-led digital presence designed to present a distinctive retail and packaging brand clearly.',
        href: 'https://77mishtipackaging.com/',
      },
      {
        name: 'Indo Advisors',
        category: 'Professional services',
        desc: 'A consulting website that organises expertise and services into a clear path for prospective clients.',
        href: 'https://www.indoadvisors.com/',
      },
      {
        name: 'MSME Hub',
        category: 'Business ecosystem platform',
        desc: 'A scalable Next.js and Strapi platform built to connect and support a growing MSME ecosystem.',
        href: 'https://msmehub.co.in/',
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
    tagline: 'Web design and development for Ahmedabad businesses, delivered from Nagpur',
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
      'Ahmedabad businesses span textiles, pharma, manufacturing, real estate and financial services. Their websites may need detailed catalogues, multilingual content, distributor enquiries, ecommerce or regulated information workflows.',
    whyChooseContent:
      'We serve Ahmedabad remotely from Nagpur with written scope, shared reviews and agreed acceptance criteria. Sector, security, accessibility and ownership requirements are confirmed during discovery.',
    pricingNote:
      'Ahmedabad businesses receive a scope-based proposal covering pages, content, integrations, testing, hosting, ownership and support.',
    faq: [
      {
        question: 'Do you serve Ahmedabad and Gujarat businesses?',
        answer:
          'Yes. We can remotely serve organisations across Ahmedabad, Surat, Vadodara and the wider Gujarat market, with any on-site requirement agreed separately.',
      },
      {
        question: 'How much does a website cost compared to Ahmedabad agencies?',
        answer:
          'Cost depends on pages, content, catalogue complexity, integrations, testing, hosting and support. Compare itemised proposals rather than assuming equivalent quality from headline prices.',
      },
      {
        question: 'Can you build B2B websites for Gujarat exporters?',
        answer:
          'Yes. Export catalogues and B2B enquiry journeys can include multilingual or multi-currency requirements where agreed, with target markets and content responsibilities confirmed first.',
      },
      {
        question: 'Do you support Gujarati language websites?',
        answer:
          'Yes. We can build Gujarati-English websites with suitable typography, language navigation and separately indexable content where bilingual search visibility is required.',
      },
      {
        question: 'Can you build fintech websites for GIFT City companies?',
        answer:
          'Fintech websites and portals require discovery covering regulation, data roles, security, accessibility and hosting. Formal conformance or audit evidence is scoped to the actual requirement.',
      },
      {
        question: 'What is the delivery timeline for Ahmedabad projects?',
        answer:
          'Delivery time depends on scope, content, integrations, access, approvals and testing. The proposal records milestones, dependencies and review cadence after discovery.',
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
    tagline: 'Web design and development for Jaipur businesses, delivered from Nagpur',
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
      'Jaipur businesses across tourism, jewellery, handicrafts, education and technology need clear mobile journeys, strong visual presentation and dependable enquiry, booking or commerce workflows.',
    whyChooseContent:
      'We serve Jaipur remotely from Nagpur. Visual direction, booking or commerce integrations, multilingual content, ownership and support are defined in the written scope.',
    pricingNote:
      'Published packages provide a starting point. Booking, ecommerce, multilingual content, third-party charges, hosting and support are estimated after discovery.',
    faq: [
      {
        question: 'Do you build tourism websites for Jaipur businesses?',
        answer:
          'Yes. Tourism websites can include booking integrations, maps, visual media and multilingual content where included in scope. Provider fees, content production and translation are identified separately.',
      },
      {
        question: 'How much does a website cost in Jaipur?',
        answer:
          'Published business-site packages begin at ₹21,000. Booking systems, ecommerce, accessibility testing and multilingual content are quoted after discovery; the proposal identifies GST and third-party charges.',
      },
      {
        question: 'Can you build eCommerce for Jaipur gems and handicrafts?',
        answer:
          'Yes. Commerce stores can be scoped for product media, payments, tax and domestic or international shipping. Photography, provider costs and custom integrations are identified separately.',
      },
      {
        question: 'Do you provide SEO for Jaipur tourism businesses?',
        answer:
          'Yes. Tourism SEO can include technical work, local content, Google Business Profile guidance and measurement. Keyword priorities follow verified demand and no particular ranking is guaranteed.',
      },
      {
        question: 'Can you build multilingual sites for international tourists?',
        answer:
          'Yes. Multilingual architecture can be included where required. Translation, localisation, keyword research, review responsibility and indexation are agreed for each language.',
      },
      {
        question: 'What is the project delivery process?',
        answer:
          'Discovery, design, development, testing and launch are arranged as documented milestones. Timing and collaboration tools depend on scope, content, integrations and client approvals.',
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
    tagline: 'Web design and development for Lucknow organisations, delivered from Nagpur',
    seoTitle: 'Web Design & Development Company in Lucknow',
    seoDescription:
      'Website design and development for Lucknow businesses and institutions. Custom sites from ₹21,000, bilingual content, web apps and accessibility.',
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
      "Lucknow businesses and institutions need websites that make detailed information easy to understand across devices and languages. That can mean a bilingual public information site, an admissions journey, a healthcare service directory, a property platform or an MVP for a new venture. We define the audience, content ownership and success measures before design begins.",
    whyChooseContent:
      "Lucknow organisations work with eLan for structured discovery, accessible interface design, bilingual-ready architecture and documented remote delivery.",
    pricingNote:
      'Business website packages start at ₹21,000. Bilingual content, portals, user accounts and third-party integrations are scoped separately.',
    marketNeeds: [
      {
        audience: 'Institutions and public organisations',
        need: 'Publish notices, services and documents in a structure that remains usable as content grows.',
        deliverables: ['Accessible templates', 'Hindi and English structure', 'Roles and publishing workflow'],
        href: '/services/ada-compliant-web-design/',
      },
      {
        audience: 'Healthcare and education',
        need: 'Help patients, students and families complete high-intent tasks without searching through clutter.',
        deliverables: ['Service or programme directories', 'Enquiry and appointment flows', 'Mobile accessibility testing'],
        href: '/services/website-design/',
      },
      {
        audience: 'Startups and property businesses',
        need: 'Launch a focused product or lead-generation platform with room to add features later.',
        deliverables: ['MVP planning', 'Search and filtering', 'Lead attribution and analytics'],
        href: '/services/web-development/',
      },
    ],
    faq: [
      {
        question: 'Do you serve Lucknow businesses?',
        answer:
          'Yes. We serve Lucknow businesses and institutions remotely from our Nagpur headquarters. Relevant healthcare, education and platform case studies are linked on this page so you can assess our experience directly.',
      },
      {
        question: 'How much does a website cost for a Lucknow business?',
        answer:
          'Business websites start at ₹21,000 and the Professional package starts at ₹45,000. Bilingual content, portals, user accounts, accessibility requirements and integrations are scoped separately.',
      },
      {
        question: 'Can you build government portals for Lucknow organisations?',
        answer:
          'Institutional and public-information websites can be scoped with accessibility-first design. Formal WCAG or government requirements, testing and evidence must be named in the engagement and independently verified where required.',
      },
      {
        question: 'Do you work with Lucknow IT startups?',
        answer:
          'Yes. We can scope MVPs, SaaS workflows and web applications after confirming users, integrations, security and acceptance criteria. The technology follows the requirement.',
      },
      {
        question: 'What is the delivery timeline for Lucknow projects?',
        answer:
          'Delivery time depends on scope, content, procurement, integrations, access, approvals and testing. Milestones and dependencies are confirmed after discovery.',
      },
      {
        question: 'Do you provide Hindi language website support?',
        answer:
          'Yes. We can build Hindi-English websites with appropriate Devanagari typography, language navigation and separate indexable content where bilingual search visibility is required. Translation and keyword research responsibilities are agreed during discovery.',
      },
    ],
    portfolio: [
      {
        name: 'MSME Hub',
        category: 'Business ecosystem platform',
        desc: 'A scalable Next.js and Strapi platform built to connect and support a growing MSME ecosystem.',
        href: 'https://msmehub.co.in/',
      },
      {
        name: 'Aastha Hospital',
        category: 'Healthcare',
        desc: 'A healthcare website that helps patients understand services, find doctors and take the next step.',
        href: 'https://www.asthahospital.in/',
      },
      {
        name: 'PropertyCab',
        category: 'Real estate platform',
        desc: 'A property discovery platform built around structured listings and practical search journeys.',
        href: 'https://propertycab.elantech.cloud/',
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
    tagline: 'Web design and development for Chandigarh Tricity, delivered from Nagpur',
    seoTitle: 'Web Design Company in Chandigarh | Websites & Landing Pages',
    seoDescription:
      'Web design for Chandigarh, Mohali and Panchkula businesses. Custom sites and landing pages from ₹21,000, plus web apps, SEO and accessibility.',
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
      "Businesses across Chandigarh, Mohali and Panchkula often compete for the same high-intent audience. A useful website must quickly establish credibility, explain the offer and make the next action obvious. We build that journey through focused landing pages, service websites, institutional platforms and custom applications, delivered remotely from our Nagpur headquarters.",
    whyChooseContent:
      "Tricity organisations work with eLan for structured planning, conversion-focused landing pages, modern development and clear ownership from discovery through handover.",
    pricingNote:
      'Business website packages start at ₹21,000. Landing pages, institutional portals, applications and integrations are priced against an agreed scope.',
    marketNeeds: [
      {
        audience: 'Professional services and B2B',
        need: 'Turn search and campaign traffic into qualified conversations with a focused message.',
        deliverables: ['Service architecture', 'Campaign landing pages', 'CRM-ready lead forms'],
        href: '/services/website-design/',
      },
      {
        audience: 'Education and training',
        need: 'Help students compare programmes, understand admissions and submit an enquiry from mobile.',
        deliverables: ['Programme templates', 'Admissions journeys', 'Accessible content management'],
        href: '/services/website-design/',
      },
      {
        audience: 'Technology and healthcare teams',
        need: 'Launch a trustworthy site or web product with performance, security and accessibility considered early.',
        deliverables: ['Product and service UX', 'Custom web applications', 'Performance and accessibility QA'],
        href: '/services/web-development/',
      },
    ],
    faq: [
      {
        question: 'Do you serve Chandigarh, Mohali, and Panchkula businesses?',
        answer:
          'Yes. We can serve Chandigarh, Mohali and Panchkula remotely from Nagpur, with communication, reviews and any on-site requirement agreed in the project plan.',
      },
      {
        question: 'How much does a website cost in Chandigarh?',
        answer:
          'Business websites start at ₹21,000 and the Professional package starts at ₹45,000. Landing pages, portals, web applications, accessibility requirements and integrations are estimated against an agreed scope.',
      },
      {
        question: 'Can you serve Chandigarh defence sector clients?',
        answer:
          'We can scope security, accessibility and content-governance requirements for organisations with sensitive procurement needs. Any formal standard, audit or hosting requirement must be identified during discovery and included in the statement of work.',
      },
      {
        question: 'Do you work with Chandigarh education institutions?',
        answer:
          'Yes. We build institutional websites and web applications for programme discovery, enquiries, admissions workflows and content publishing. The CSRI-BSB case study on this page shows relevant education and training work.',
      },
      {
        question: 'What technologies do you use?',
        answer:
          'We work with Astro, React, Next.js, Node.js, WordPress, Shopify and related platforms. The recommendation follows content, integration, security, maintenance and budget requirements.',
      },
      {
        question: 'How do you manage projects remotely?',
        answer:
          'We agree the communication channel and review cadence at kickoff. Projects normally include scheduled calls, shared design feedback, milestone approvals and a documented launch and handover.',
      },
    ],
    portfolio: [
      {
        name: 'CSRI-BSB International',
        category: 'Education and Training',
        desc: 'An international training website that presents programmes and supports a clearer discovery and enquiry journey.',
        href: 'https://www.csrtraininginstitute.com/',
      },
      {
        name: 'Aastha Hospital',
        category: 'Healthcare',
        desc: 'A healthcare website that helps patients understand services, find doctors and take the next step.',
        href: 'https://www.asthahospital.in/',
      },
      {
        name: 'MSME Hub',
        category: 'Business ecosystem platform',
        desc: 'A scalable Next.js and Strapi platform built to connect and support a growing MSME ecosystem.',
        href: 'https://msmehub.co.in/',
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
    tagline: 'Web design and development for Kochi businesses, delivered from Nagpur',
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
      'Kochi businesses across technology, tourism, shipping, healthcare and exports may need multilingual content, booking or enquiry journeys, catalogues and integrations suited to domestic and international audiences.',
    whyChooseContent:
      'We serve Kochi remotely from Nagpur with a written scope, shared reviews and agreed acceptance criteria. Content, integrations, accessibility, ownership and support are confirmed during discovery.',
    pricingNote:
      'Published packages provide a starting point. Booking systems, ecommerce, multilingual content, integrations, hosting and support are estimated after discovery.',
    faq: [
      {
        question: 'Do you serve businesses in Kochi and Kerala?',
        answer:
          'Yes. We can serve organisations across Kochi, Thiruvananthapuram and the wider Kerala market remotely, with any on-site requirement agreed separately.',
      },
      {
        question: 'Can you build tourism websites for Kerala businesses?',
        answer:
          'Yes. Tourism websites can include booking integrations, maps, visual media and multilingual content when included in scope. Provider fees, content production and translation are identified separately.',
      },
      {
        question: 'How much does a website cost for a Kochi business?',
        answer:
          'Published business-site packages begin at ₹21,000. Booking, ecommerce, accessibility testing and multilingual requirements are quoted after discovery, with GST and third-party charges identified.',
      },
      {
        question: 'Do you work with Infopark and SmartCity companies?',
        answer:
          'Yes. Corporate websites, product showcases and SaaS workflows can be scoped after confirming users, integrations, security, testing and handover requirements.',
      },
      {
        question: 'Do you support Malayalam language websites?',
        answer:
          'Yes. We can build Malayalam-English websites with suitable typography, language navigation and separately indexable content where bilingual search visibility is required.',
      },
      {
        question: 'Can you build export-ready websites for spice traders?',
        answer:
          'Yes. Export websites can include catalogues, certifications, multi-currency display, shipping integrations and enquiry workflows where included in scope. Provider and compliance responsibilities are confirmed first.',
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

/** Get a city by slug */
export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
