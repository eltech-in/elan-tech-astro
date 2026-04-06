# eLan Technology — Geo-Targeted City & International Landing Pages
# Claude Code Implementation Prompt for Astro 5 + Tailwind CSS
# 25 Location Pages: 16 Indian Cities + 9 International Markets
# WCAG 2.1 AA Compliant | LocalBusiness Schema | FAQPage Schema
# April 2026

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  MASTER CONTEXT                                                  ║
# ╚══════════════════════════════════════════════════════════════════╝

You are building geo-targeted local SEO landing pages for elan-tech.net
which is now an Astro 5 + Tailwind CSS website. Currently ZERO city
or international landing pages exist. The homepage says "Best Web Design
Company in Nagpur" but has no dedicated local pages.

These pages are the #1 SEO priority. Competitors rank on page 1 because
they HAVE city-specific pages. eLan does not. Each page must:

1. Be 1800-2500 words of UNIQUE content (NOT copy-pasted between cities)
2. Mention the target city name 15-20 times naturally
3. Have LocalBusiness schema (Indian cities) or Service schema (international)
4. Have FAQPage schema with 6-8 city-specific questions
5. Have BreadcrumbList schema
6. Be WCAG 2.1 AA compliant
7. Have self-referencing canonical URL
8. Target "[service] + [city]" keywords in title, H1, meta description
9. Include city-specific testimonials, portfolio, industries, pricing
10. Link to: all 7 service pages, /portfolio, /pricing, /free-website-audit

COMPANY DATA:
- eLan Technology | elan-tech.net | Est. 2002 | Nagpur, Maharashtra
- Phone: +91 8788834630 | Email: info@elan-tech.net
- 500+ clients | 1200+ projects | 25+ countries | 30+ team members
- Services: Web Design, Web Dev, eCommerce, Digital Marketing, Mobile Apps, Branding, Maintenance
- Products: Real Estate Portal, Medical Conference Portal, IMA Society Portal, Resort Management
- USP: WCAG 2.1 AA + ADA compliant (no competitor offers this)
- Tech: React, Next.js, Astro, Node.js, MongoDB, WordPress, Shopify

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 1: Create the Astro City Page Layout + Data Structure      ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Create the reusable CityLayout.astro and all supporting data structures
for generating city landing pages.

### 1A: src/data/cities.ts

Export an array of ALL 16 Indian cities with this structure:

interface CityData {
  name: string           // "Nagpur"
  slug: string           // "nagpur"
  state: string          // "Maharashtra"
  isHQ: boolean          // true only for Nagpur
  tagline: string        // City-specific tagline
  geo: { lat: number, lng: number }
  population: string     // "2.9 million"
  knownFor: string       // "Orange City, MIDC industrial hub"
  keyIndustries: string[] // ["Healthcare", "Education", "Manufacturing", ...]
  businessDistricts: string[]  // ["Sitabuldi", "Dharampeth", "MIDC Hingna", ...]
  nearbyClients: string[]      // Names of eLan clients from/near this city
  distanceFromNagpur: string   // "HQ" or "300 km" or "1,100 km"
  timezone: string             // "IST (UTC+5:30)"
  searchVolume: number         // Approximate monthly searches for "[city] web design"
  competition: 'low' | 'medium' | 'high'
  primaryKeyword: string       // "web design company Nagpur"
  secondaryKeywords: string[]  // ["website design Nagpur", "best web designer Nagpur", ...]
  faq: { question: string, answer: string }[]  // 6-8 city-specific FAQs
  introContent: string         // 2-3 sentence city-specific intro (UNIQUE per city)
  whyChooseContent: string     // Why businesses in THIS city should choose eLan
  pricingNote: string          // City-specific pricing context
}

Here is the data for ALL 16 cities:

TIER 1:
{
  name: "Nagpur", slug: "nagpur", state: "Maharashtra", isHQ: true,
  tagline: "Nagpur's Most Experienced Web Design Agency — Since 2002",
  geo: { lat: 21.1458, lng: 79.0882 },
  population: "2.9 million", knownFor: "Orange City, MIDC industrial hub, geographical centre of India",
  keyIndustries: ["Healthcare", "Education", "Manufacturing", "Real Estate", "Retail", "Agriculture", "Legal & Professional Services", "Events & Weddings"],
  businessDistricts: ["Sitabuldi", "Dharampeth", "Sadar", "Civil Lines", "MIDC Hingna", "MIDC Butibori", "Wardha Road", "Manish Nagar"],
  nearbyClients: ["Aasthaa Hospital", "Guru Nanak College", "Nagpur Events", "Sharp Control Systems", "Vindhyagiri Farm", "Psychiatric Society Nagpur", "Trimit Architects"],
  distanceFromNagpur: "HQ",
  searchVolume: 1300, competition: "high",
  primaryKeyword: "web design company Nagpur",
  secondaryKeywords: ["website design Nagpur", "best web design company Nagpur", "website development Nagpur", "web developer Nagpur", "website cost Nagpur", "SEO company Nagpur", "digital marketing company Nagpur"],
  faq: [
    { question: "How much does a website cost in Nagpur?", answer: "Website costs in Nagpur range from ₹15,000 for a basic 5-page site to ₹1,50,000+ for enterprise solutions. At eLan Technology, our Professional package starts at ₹45,000 and includes custom design, SEO setup, and WCAG accessibility compliance. Visit our pricing page for detailed packages." },
    { question: "Which is the best web design company in Nagpur?", answer: "eLan Technology is Nagpur's most experienced web design company, operating since 2002. With 500+ clients across 25+ countries, 1200+ projects delivered, and proprietary products like our Real Estate Portal and Medical Conference Portal, we offer a depth of experience no other Nagpur agency can match." },
    { question: "Does eLan Technology have an office in Nagpur?", answer: "Yes, our headquarters is in Nagpur, Maharashtra. We've been based here since our founding in 2002. You can visit our office for in-person consultations, or we're happy to connect via video call." },
    { question: "Do you build WCAG and ADA compliant websites in Nagpur?", answer: "Yes — eLan Technology is the only web design company in Nagpur that offers WCAG 2.1 AA and ADA compliance as standard on every project. This is critical for businesses serving international clients, especially in the USA." },
    { question: "How long does it take to build a website in Nagpur?", answer: "A standard business website takes 3-6 weeks. eCommerce stores take 6-10 weeks. Complex web applications may take 3-6 months. Timelines depend on scope, content readiness, and feedback speed." },
    { question: "Do you provide SEO services in Nagpur?", answer: "Yes, we offer comprehensive SEO services including local SEO, national SEO, Google Ads management, and social media marketing. Our SEO packages start at ₹12,000/month. We've helped 200+ businesses rank on page 1 of Google." },
    { question: "Can you redesign my existing website?", answer: "Absolutely. Website redesign is one of our most popular services. We migrate your existing content to a modern, fast, mobile-first design while preserving your SEO rankings and improving accessibility." },
    { question: "What technologies do you use for web development?", answer: "We work with React, Next.js, Astro, Node.js, MongoDB, WordPress, Shopify, WooCommerce, Flutter, and more. We recommend the best technology stack based on your specific project requirements and budget." }
  ]
},

{
  name: "Raipur", slug: "raipur", state: "Chhattisgarh", isHQ: false,
  tagline: "Raipur's Trusted Web Design Partner — Powered by Nagpur's Best Agency",
  geo: { lat: 21.2514, lng: 81.6296 },
  population: "1.2 million", knownFor: "Steel capital, Naya Raipur smart city, industrial hub",
  keyIndustries: ["Steel & Mining", "Power & Energy", "Government", "Education", "Healthcare", "Construction", "Retail"],
  businessDistricts: ["Pandri", "Telibandha", "Shankar Nagar", "Fafadih", "Naya Raipur"],
  nearbyClients: [],  // Note: add any Chhattisgarh clients here
  distanceFromNagpur: "285 km (5 hours drive)",
  searchVolume: 800, competition: "medium",
  primaryKeyword: "web design company Raipur",
  secondaryKeywords: ["website design Raipur", "best web design company Raipur", "web developer Raipur", "digital marketing Raipur", "SEO company Raipur"],
  faq: [
    { question: "Is there a good web design company in Raipur?", answer: "eLan Technology serves Raipur businesses from our Nagpur headquarters, just 285 km away. With 24+ years of experience and 500+ clients across 25 countries, we bring a level of expertise that exceeds what most local Raipur agencies can offer — at competitive pricing." },
    { question: "How much does a website cost in Raipur?", answer: "Website costs for Raipur businesses start at ₹15,000 for basic sites and go up to ₹1,50,000+ for custom applications. Our pricing is transparent and competitive — often 30-40% less than equivalent quality from metro city agencies." },
    { question: "Do you offer in-person meetings for Raipur clients?", answer: "Yes. While our office is in Nagpur (285 km from Raipur), we conduct regular video consultations and can arrange in-person meetings for larger projects. Many of our clients work with us entirely remotely via Slack, Zoom, and project management tools." },
    { question: "Can you build a website for my Raipur business?", answer: "Absolutely. We serve businesses across Raipur and Chhattisgarh including the steel, mining, education, healthcare, and government sectors. Our remote collaboration process is seamless — the same quality and communication as working with a local agency." },
    { question: "Do you provide digital marketing services in Raipur?", answer: "Yes, we offer complete digital marketing services for Raipur businesses including local SEO, Google Ads, social media marketing, and content marketing. We understand the Chhattisgarh market and can help your business reach local customers effectively." },
    { question: "What industries do you serve in Raipur?", answer: "We serve businesses across Raipur's key industries including steel and mining, power and energy, government contractors, educational institutions, healthcare providers, construction companies, and retail businesses." }
  ]
},

TIER 2 (provide similar detail for each — I'll give the key differentiators):

{
  name: "Mumbai", slug: "mumbai", state: "Maharashtra",
  tagline: "Mumbai-Quality Websites at Nagpur Prices",
  knownFor: "Financial capital, Bollywood, startup ecosystem",
  keyIndustries: ["Finance & Banking", "Media & Entertainment", "Real Estate", "IT & Startups", "Fashion & Retail", "Healthcare"],
  businessDistricts: ["Andheri", "BKC", "Lower Parel", "Navi Mumbai", "Powai", "Goregaon"],
  distanceFromNagpur: "860 km",
  searchVolume: 5000, competition: "high",
  whyChooseContent: "Mumbai agencies charge ₹2-5 lakh for what we deliver at ₹45,000-1,50,000. Same technologies, same standards, same communication tools — at 60-70% less cost. We're in the same state, the same timezone, and just a short flight away."
},

{
  name: "Pune", slug: "pune", state: "Maharashtra",
  tagline: "Pune's Affordable Alternative to Overpriced IT Agencies",
  knownFor: "IT hub, educational centre, automotive industry",
  keyIndustries: ["IT & Software", "Automotive", "Education", "Manufacturing", "Startups", "Defence"],
  businessDistricts: ["Hinjewadi IT Park", "Kharadi", "Magarpatta", "Koregaon Park", "Shivaji Nagar"],
  distanceFromNagpur: "690 km",
  searchVolume: 3500, competition: "high",
  whyChooseContent: "Pune's IT corridor is filled with expensive agencies. eLan Technology offers the same expertise — React, Next.js, MERN stack — at a fraction of the cost. Many Pune startups choose us for cost-effective development without compromising quality."
},

{
  name: "Hyderabad", slug: "hyderabad", state: "Telangana",
  tagline: "Hyderabad Businesses Deserve World-Class Web Design",
  knownFor: "HITEC City, pharma hub, pearl city",
  keyIndustries: ["IT & Software", "Pharma & Biotech", "Real Estate", "Education", "Healthcare", "Government"],
  businessDistricts: ["HITEC City", "Gachibowli", "Madhapur", "Banjara Hills", "Jubilee Hills"],
  distanceFromNagpur: "570 km",
  searchVolume: 4000, competition: "high"
},

{
  name: "Delhi", slug: "delhi", state: "Delhi NCR",
  tagline: "Delhi NCR's Cost-Effective Web Design Alternative",
  knownFor: "National capital, political centre, diverse economy",
  keyIndustries: ["Government", "Media", "Real Estate", "Retail", "Education", "Tourism", "Startups"],
  businessDistricts: ["Connaught Place", "Nehru Place", "Noida", "Gurugram", "Cyber City"],
  distanceFromNagpur: "1,100 km",
  searchVolume: 6000, competition: "very high"
},

{
  name: "Bangalore", slug: "bangalore", state: "Karnataka",
  tagline: "Silicon Valley Alternatives Shouldn't Cost Silicon Valley Prices",
  knownFor: "India's Silicon Valley, startup capital",
  keyIndustries: ["IT & Software", "Startups", "Biotech", "Aerospace", "Education"],
  businessDistricts: ["Koramangala", "Whitefield", "Electronic City", "Indiranagar", "MG Road"],
  distanceFromNagpur: "1,050 km",
  searchVolume: 5500, competition: "very high"
},

{
  name: "Chennai", slug: "chennai", state: "Tamil Nadu",
  tagline: "Chennai's Partner for High-Performance Web Solutions",
  knownFor: "Auto hub, IT corridor, cultural capital of South India",
  keyIndustries: ["Automotive", "IT & BPO", "Manufacturing", "Healthcare", "Education", "Shipping"],
  businessDistricts: ["OMR (IT Corridor)", "Guindy", "T. Nagar", "Anna Nagar", "Adyar"],
  distanceFromNagpur: "1,150 km",
  searchVolume: 3000, competition: "high"
},

TIER 3 (8 cities — provide essential data):

Bhopal (MP) — state capital, government, education, tourism. 350 km from Nagpur.
Indore (MP) — commercial capital of MP, IT growth, startups. 560 km.
Kolkata (WB) — cultural capital, finance, jute, IT. 1,100 km.
Ahmedabad (GJ) — textile capital, pharma, chemical. 1,000 km.
Jaipur (RJ) — Pink City, tourism, gems, IT growth. 1,050 km.
Lucknow (UP) — state capital, IT city, government. 950 km.
Chandigarh (PB/HR) — planned city, IT, education. 1,250 km.
Kochi (KL) — IT hub of Kerala, tourism, spices, shipping. 1,500 km.

### 1B: src/data/countries.ts

Export array of 9 international markets:

interface CountryData {
  name: string           // "United States"
  slug: string           // "usa"
  flag: string           // "🇺🇸"
  currency: string       // "USD"
  currencySymbol: string // "$"
  timezone: string       // "EST/PST"
  timezoneOverlap: string // "3-4 hours morning overlap"
  language: string       // "English"
  primaryKeyword: string // "outsource web design India USA"
  accessibilityLaw: string // "ADA Title III"
  keyIndustries: string[]
  costComparison: { localCost: string, eLanCost: string, savings: string }
  faq: { question: string, answer: string }[]
}

Countries: USA, Canada, Australia, New Zealand, UAE/Dubai, Saudi Arabia, Ghana, Japan, Brazil

### 1C: src/layouts/CityLayout.astro

Extends BaseLayout. Receives CityData as prop.
Structure:
- BaseLayout with city-specific SEO metadata
- Breadcrumb: Home > Web Design Company > {City Name}
- Hero section with city-specific H1 and tagline
- <slot /> for page-specific content
- Bottom CTA section (standard triple CTA)
- "Also Serving" section linking to other city pages
- LocalBusiness + FAQPage + BreadcrumbList schema injected

### 1D: src/layouts/InternationalLayout.astro

Similar to CityLayout but for international pages.
Differences: currency display, timezone overlap chart, cost comparison table,
hreflang tags, Service schema instead of LocalBusiness.
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 2: Create Reusable City Page Sections                     ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Create reusable Astro components used across all city pages.
Each component receives CityData and renders city-specific content.
ALL components must be WCAG 2.1 AA compliant.

### 2A: src/components/city/CityHero.astro
Props: CityData
Renders:
- Badge: "SERVING {CITY} BUSINESSES" or "HEADQUARTERED IN {CITY}" (if isHQ)
- H1: "Best Web Design Company in {City}"
- Subheading: {city.tagline}
- Trust line: "{distance from Nagpur} · 24+ years · 500+ clients"
  For HQ: "Nagpur headquarters · 24+ years · 500+ clients"
- CTAs: "Get Free Audit" | "View {City} Projects"
♿ H1 is the only H1 on the page

### 2B: src/components/city/CityWhyChoose.astro
Props: CityData
Renders:
- H2: "Why {City} Businesses Choose eLan Technology"
- 4-6 reason cards with icons:
  For HQ (Nagpur): "Visit our office", "24 years local presence", "Meet the team in person"
  For remote cities: "Same quality as local agencies", "{distance} from our Nagpur HQ",
    "Seamless remote collaboration via Slack, Zoom & Jira"
  For metros: "60-70% cost savings vs {City} agencies", "Same tech, same standards"
- Each card: icon (Lucide SVG, aria-hidden), heading, description
♿ Cards are in a list structure with role="list"

### 2C: src/components/city/CityServices.astro
Props: CityData
Renders:
- H2: "Web Design & Development Services in {City}"
- Grid of all 7 services with brief descriptions mentioning {City}
- Each card links to the service hub page (/services/website-design, etc.)
- Below grid: "Available in {City}: Website Design · Web Development · eCommerce · SEO · Mobile Apps · Branding · Maintenance"
♿ Every service card is a link with descriptive text (not "Learn more")

### 2D: src/components/city/CityPortfolio.astro
Props: CityData (uses nearbyClients field)
Renders:
- H2: "Our Work in {City}" (if nearbyClients exist)
  OR "Projects Delivered for Clients Near {City}" (if no exact city clients)
- 4-6 project cards filtered to clients from/near this city
- Each card: screenshot, project name, industry tag, one-line result
- "View Full Portfolio →" link
♿ Images have descriptive alt text

### 2E: src/components/city/CityPricing.astro
Props: CityData
Renders:
- H2: "Website Design Cost in {City}"
- 3 pricing cards (Starter ₹15K, Professional ₹45K, Enterprise ₹1.5L+)
- City-specific pricing context (e.g., for Mumbai: "60-70% less than Mumbai agencies")
- "View All Packages →" link to /pricing
♿ Pricing in accessible table or card format

### 2F: src/components/city/CityTestimonials.astro
Props: CityData
Renders:
- H2: "What {City} Clients Say" (if city-specific testimonials)
  OR "Trusted by Businesses Across India" (generic)
- 2-3 testimonial cards with name, role, company, quote
- Review schema markup for each testimonial
♿ Quotes use <blockquote> with cite attribute

### 2G: src/components/city/CityFAQ.astro
Props: CityData (uses faq field)
Renders:
- H2: "Frequently Asked Questions — Web Design in {City}"
- Accessible accordion using HTML <details>/<summary> (zero JS)
- Each FAQ item: <details><summary>{question}</summary><p>{answer}</p></details>
- FAQPage JSON-LD schema
♿ <details>/<summary> is natively keyboard accessible
♿ No JavaScript required for accordion functionality

### 2H: src/components/city/CityContact.astro
Props: CityData
Renders:
- H2: "Get in Touch — {City}"
- For HQ (Nagpur): full address, embedded Google Map, phone, email, WhatsApp
- For remote cities: "We serve {City} businesses remotely with seamless
  communication via Slack, Zoom, and project management tools."
  Phone, email, WhatsApp, "Schedule a Video Call" button
♿ Phone link: href="tel:+918788834630" with correct aria-label
♿ Map has title attribute for screen readers

### 2I: src/components/city/CityAlsoServing.astro
Props: current city slug, list of all cities
Renders:
- H2: "Also Serving Businesses In"
- Grid of city pills/links EXCLUDING the current city
- Groups: "Maharashtra: Mumbai · Pune" | "Central India: Raipur · Bhopal · Indore" etc.
♿ Navigation landmark with aria-label="Other locations we serve"

### 2J: src/components/city/CitySchema.astro
Props: CityData
Renders three <script type="application/ld+json"> blocks:
1. LocalBusiness schema with city-specific address, geo, areaServed
2. FAQPage schema from city.faq data
3. BreadcrumbList: Home > Web Design Company > {City}
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 3: Build ALL 16 Indian City Pages                         ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Build all 16 Indian city landing pages. Each page uses CityLayout + the
reusable components from Step 2. CRITICAL: each page MUST have unique
introductory content — the whyChooseContent, introContent, and body
paragraphs must be DIFFERENT for every city. Google penalises duplicate
location pages.

### Page file pattern (repeat for all 16):

src/pages/web-design-company-nagpur.astro
src/pages/web-design-company-raipur.astro
src/pages/web-design-company-mumbai.astro
src/pages/web-design-company-pune.astro
src/pages/web-design-company-hyderabad.astro
src/pages/web-design-company-delhi.astro
src/pages/web-design-company-bangalore.astro
src/pages/web-design-company-chennai.astro
src/pages/web-design-company-bhopal.astro
src/pages/web-design-company-indore.astro
src/pages/web-design-company-kolkata.astro
src/pages/web-design-company-ahmedabad.astro
src/pages/web-design-company-jaipur.astro
src/pages/web-design-company-lucknow.astro
src/pages/web-design-company-chandigarh.astro
src/pages/web-design-company-kochi.astro

### Each page structure:

---
import CityLayout from '../layouts/CityLayout.astro'
import CityHero from '../components/city/CityHero.astro'
import CityWhyChoose from '../components/city/CityWhyChoose.astro'
import CityServices from '../components/city/CityServices.astro'
import CityPortfolio from '../components/city/CityPortfolio.astro'
import CityPricing from '../components/city/CityPricing.astro'
import CityTestimonials from '../components/city/CityTestimonials.astro'
import CityFAQ from '../components/city/CityFAQ.astro'
import CityContact from '../components/city/CityContact.astro'
import CityAlsoServing from '../components/city/CityAlsoServing.astro'
import CTABanner from '../components/CTABanner.astro'
import TripleCTA from '../components/TripleCTA.astro'
import { cities } from '../data/cities'

const city = cities.find(c => c.slug === 'nagpur')!  // Change per page
---

<CityLayout city={city}>
  <CityHero city={city} />

  <!-- ★ UNIQUE CONTENT BLOCK — 300-500 words, DIFFERENT for every city -->
  <section aria-label="About web design in {city.name}">
    <h2>Web Design in {city.name} — What Businesses Need to Know</h2>
    <p>[Unique paragraph about the city's business landscape, digital
    adoption trends, and why having a professional website matters
    specifically for businesses in THIS city. Reference local economy,
    growth trends, notable business areas, and competitive landscape.]</p>
    <p>[Second paragraph about how eLan Technology uniquely serves
    this city — proximity, local market understanding, relevant case
    studies, technology advantage over local competitors.]</p>
  </section>

  <CityWhyChoose city={city} />
  <CityServices city={city} />
  <CTABanner />
  <CityPortfolio city={city} />
  <CityPricing city={city} />
  <CityTestimonials city={city} />
  <CityFAQ city={city} />
  <CityContact city={city} />
  <CityAlsoServing currentSlug={city.slug} />
  <TripleCTA />
</CityLayout>

### UNIQUE CONTENT ANGLES PER CITY (do NOT repeat these across pages):

NAGPUR: "Nagpur's oldest web design agency. Walk into our office.
         MIDC businesses trust us. Orange City's digital backbone since 2002."

RAIPUR: "Chhattisgarh's industrial boom needs digital infrastructure.
         Steel city meets digital city. Naya Raipur smart city alignment."

MUMBAI: "Same quality as Andheri agencies at 60% less cost.
         Financial capital deserves fast, secure, compliant websites."

PUNE: "Pune's IT corridor already knows React and Node.js.
       We speak your tech language — at half the cost of Hinjewadi agencies."

HYDERABAD: "HITEC City sets the standard. We match it from Nagpur.
            Pharma compliance websites. Government portal experience."

DELHI: "NCR's business scale demands enterprise-grade web solutions.
        From Connaught Place boardrooms to Noida startups."

BANGALORE: "India's startup capital needs startup-speed delivery.
            MVP in 3 weeks. Production-ready in 6. At Nagpur prices."

CHENNAI: "OMR's IT corridor understands performance.
          Lighthouse 95+ scores. Core Web Vitals optimised. ADA compliant."

BHOPAL: "Central India's capital city deserves Central India's best agency.
          Government, education, and tourism websites."

INDORE: "MP's commercial capital is going digital.
          From Vijay Nagar startups to Pithampur industrialists."

KOLKATA: "East meets excellence. Heritage city. Modern websites.
          Finance, jute, IT — we serve all of Kolkata's industries."

AHMEDABAD: "Gujarat's entrepreneurial spirit needs a digital partner.
             Textile, pharma, GIFT City fintech websites."

JAIPUR: "Pink City. Vibrant businesses. Stunning websites.
          Tourism, gems, handicrafts — showcase your Jaipur brand online."

LUCKNOW: "UP's IT city is growing fast.
          Government portals, education websites, startup MVPs."

CHANDIGARH: "India's first planned city deserves planned digital strategy.
              IT, education, and defence sector expertise."

KOCHI: "Kerala's IT hub meets Nagpur's web design expertise.
         Tourism, spice trade, Infopark businesses — we build for all."

### SEO METADATA PER PAGE:

Title pattern: "Best Web Design Company in {City} — eLan Technology"
Description pattern: "Looking for a web design company in {City}?
  eLan Technology offers custom website design, SEO & digital marketing.
  24+ years, 500+ clients. Free website audit."
H1 pattern: "Best Web Design Company in {City}"
Canonical: https://elan-tech.net/web-design-company-{slug}
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 4: Build 9 International Landing Pages                    ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Build 9 international market landing pages. These target businesses
looking to outsource web development to India. Different structure
from Indian city pages — focus on cost savings, timezone, communication,
NDA/IP protection, and accessibility compliance.

### Page files:
src/pages/outsource-web-design-usa.astro
src/pages/web-design-services-canada.astro
src/pages/web-design-company-australia.astro
src/pages/web-development-new-zealand.astro
src/pages/web-design-company-dubai-uae.astro
src/pages/web-design-services-saudi-arabia.astro
src/pages/web-design-company-ghana.astro
src/pages/web-design-services-japan.astro
src/pages/web-design-services-brazil.astro

### Each international page structure (2000+ words, UNIQUE):

SECTION 1: Hero
  H1: "Outsource Web Design to India — {Country} Businesses Save 60-70%"
  (or: "Web Design Company for {Country} — eLan Technology India")

SECTION 2: Cost Comparison Table
  | Service | {Country} Agency | eLan Technology | Savings |
  Show real pricing in LOCAL CURRENCY (USD, AUD, AED, etc.)

SECTION 3: Why Outsource to eLan from {Country}
  - Cost advantage (60-70% savings)
  - Timezone overlap: "IST overlaps with {timezone} by {X} hours"
  - Communication: "We use Slack, Zoom, Jira — same tools as your local team"
  - NDA & IP protection: "We sign NDAs proactively. Your IP is legally protected."
  - WCAG/ADA compliance: critical for USA page — "ADA lawsuits increasing 300% yearly"

SECTION 4: Services Available for {Country} Clients
  All 7 services with international positioning

SECTION 5: Industries We Serve in {Country}
  Country-specific industries (e.g., USA: SaaS, Healthcare, Real Estate, eCommerce)

SECTION 6: Our Process for {Country} Clients
  Timezone-aware workflow, milestone delivery, video calls

SECTION 7: International Testimonials
  Feature testimonials from clients in/near this country

SECTION 8: FAQ (6-8 country-specific questions)
  "Is it safe to outsource web design to India?"
  "How do you handle timezone differences with {Country}?"
  "What about NDA and intellectual property protection?"
  "How much does a website cost when outsourcing to India?"
  "Do you accept {Currency} payments?"

SECTION 9: Contact
  Phone, WhatsApp, email
  "Schedule a call in your timezone" — Calendly link
  Virtual phone number for that country (if available)

SCHEMA: Service + FAQPage + BreadcrumbList
  (NOT LocalBusiness — use Service with areaServed = {Country})

### USA PAGE — SPECIAL EMPHASIS:
The USA page must prominently feature ADA compliance as a service.
USA is the only country with active ADA lawsuits against websites.
Add a section: "ADA-Compliant Web Design for USA Businesses"
Link to: /ada-compliant-web-design (if page exists) or /free-website-audit
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 5: Internal Linking + Navigation Integration               ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Integrate all city and international pages into the site's navigation
and internal linking structure.

### 5A: Add "Locations" to the header mega-menu or navigation
Option: Add a "Locations" dropdown in the header:
  India: Nagpur · Raipur · Mumbai · Pune · Hyderabad · Delhi · Bangalore · Chennai · All Cities
  International: USA · UAE · Australia · Canada · All Countries

### 5B: Add "Where We Serve" section to homepage
Below the services grid or above the CTA banner, add:
  H2: "Serving Businesses Locally & Globally"
  Two rows:
  Row 1 — India: [Nagpur] [Raipur] [Mumbai] [Pune] [Hyderabad] [Delhi] [Bangalore] [Chennai]
  Row 2 — International: [🇺🇸 USA] [🇦🇪 UAE] [🇦🇺 Australia] [🇨🇦 Canada] [🇸🇦 Saudi] [🇳🇿 NZ] [🇬🇭 Ghana] [🇯🇵 Japan] [🇧🇷 Brazil]
  Each links to the corresponding landing page.

### 5C: Add "Available in:" to every service page footer
At the bottom of each of the 7 service hub pages, add:
  "Available in: Nagpur · Raipur · Mumbai · Pune · Hyderabad · Delhi · Bangalore · Chennai & more"
  Each city name links to the city landing page.
  This creates 7 × 16 = 112 internal links across service → city pages.

### 5D: Add city links to blog posts
In the sidebar or bottom of relevant blog posts, add:
  "Related: Web design services in [Nagpur] | [Raipur] | [Mumbai]"
  Especially for posts targeting local keywords.

### 5E: Add city links to footer
In the footer, add a "Locations" section:
  India: Nagpur · Raipur · Mumbai · Pune · Hyderabad · Delhi + "All Locations"
  International: USA · UAE · Australia + "All Countries"

### 5F: Cross-link between city pages
Each city page's "Also Serving" section links to ALL other city pages.
This creates a dense mesh of internal links between location pages.

### 5G: Update sitemap
Verify that astro build generates all 25 new pages in the sitemap.
Run: astro build && grep "web-design-company" dist/sitemap-*.xml
Should show all 16 Indian city URLs.
Run: grep "outsource\|web-design-services\|web-design-company-dubai\|web-design-company-australia\|web-design-company-ghana\|web-development-new-zealand" dist/sitemap-*.xml
Should show all 9 international URLs.
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 6: Phase 2 — Combined Service+City Pages (Future)         ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command (execute AFTER Tier 1 + 2 city pages are ranking):

```
Once the primary city pages are indexed and starting to rank (typically
30-60 days), build combined service+city pages for Nagpur and Raipur.
These target long-tail keywords like "SEO services Nagpur" which have
lower competition and high conversion intent.

### Nagpur combined pages:
src/pages/seo-services-nagpur.astro          — "SEO Services in Nagpur" (800/mo)
src/pages/digital-marketing-nagpur.astro     — "Digital Marketing in Nagpur" (1100/mo)
src/pages/ecommerce-website-nagpur.astro     — "eCommerce Website Nagpur" (300/mo)
src/pages/mobile-app-development-nagpur.astro — "Mobile App Development Nagpur" (400/mo)
src/pages/wordpress-development-nagpur.astro  — "WordPress Developer Nagpur" (200/mo)

### Raipur combined pages:
src/pages/seo-services-raipur.astro
src/pages/digital-marketing-raipur.astro
src/pages/ecommerce-website-raipur.astro

Each combined page:
- 800-1200 words (shorter than primary city pages)
- H1: "{Service} in {City}"
- Links to BOTH the city hub page AND the service hub page
- Unique content about this specific service in this specific city
- FAQPage schema with 4-5 service+city specific questions
- BreadcrumbList: Home > {Service} > {City}
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  VERIFICATION CHECKLIST                                          ║
# ╚══════════════════════════════════════════════════════════════════╝

```
Run after all pages are built:

BUILD:
□ astro build completes with zero errors
□ All 25 city/country pages exist in dist/
□ All pages appear in sitemap

SEO (per page):
□ Unique <title> with city/country keyword (50-60 chars)
□ Unique <meta name="description"> (150-160 chars)
□ Self-referencing <link rel="canonical">
□ H1 contains city/country name
□ City/country mentioned 15-20 times naturally
□ 1800-2500 words of content (view source, count)
□ LocalBusiness schema validates (Rich Results Test)
□ FAQPage schema validates
□ BreadcrumbList schema validates
□ Internal links to 7+ other pages
□ No duplicate content between any two city pages

WCAG 2.1 AA (per page):
□ <html lang="en">
□ Skip link is first focusable element
□ Single H1, logical heading hierarchy
□ All images have alt text
□ All links have descriptive text (no "click here")
□ Colour contrast 4.5:1 minimum
□ All interactive elements 44×44px minimum
□ Keyboard navigable (Tab, Enter, Escape)
□ FAQ accordion works with keyboard (details/summary)
□ prefers-reduced-motion respected
□ Phone link has correct tel: href (+918788834630)
□ axe-core: zero violations

CONTENT UNIQUENESS:
□ Nagpur and Raipur intros are completely different
□ Mumbai and Pune have different angles (cost vs tech)
□ No two cities share the same body paragraphs
□ Each city references its own industries and business districts
□ FAQ answers mention the specific city name (not generic)
```

---

# TOTAL PAGES: 25 (16 Indian + 9 International)
# PLUS FUTURE: 8 Combined Service+City Pages
# EXPECTED TIMELINE: 1 week for Tier 1+2, 1 more week for Tier 3+4
# EXPECTED RANKING: Page 1 for "web design [city]" within 60-90 days for low-competition cities

---

*Build Tier 1 (Nagpur + Raipur) FIRST — these are the highest priority.*
*Then Tier 2 (6 metros) within the same week.*
*Tier 3 (8 regional cities) and Tier 4 (9 international) can follow in week 2.*
*Phase 2 combined pages (Step 6) should wait 30-60 days until primary pages index.*
