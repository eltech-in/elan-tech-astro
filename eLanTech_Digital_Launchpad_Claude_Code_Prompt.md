# eLan Technology — Digital Launchpad Plan Implementation
# Claude Code Prompt: Landing Page + Pricing Integration + Homepage Banner
# Site: elan-tech.net | Stack: Astro 5 + Tailwind CSS + Cloudflare Pages
# Offer: June 1 – August 15, 2026 | Plans: ₹18K / ₹24K / ₹32K
# May 2026

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  MASTER CONTEXT                                                  ║
# ╚══════════════════════════════════════════════════════════════════╝

You are adding a new limited-time offer to https://elan-tech.net —
an Astro 5 + Tailwind CSS site on Cloudflare Pages.

THE OFFER:
  Name: "Digital Launchpad" — 4-Year All-Inclusive Website Plan
  Three tiers:
    eLan Starter  — 5 pages         — ₹18,000 one-time
    eLan Business — 10–12 pages     — ₹24,000 one-time  (FEATURED)
    eLan Complete — 10–12 + logo    — ₹32,000 one-time
  Included in ALL tiers:
    .in or .co.in domain in client's name (4 years)
    Hosting in client's name (4 years)
    Free SSL, Google Analytics, WhatsApp button, Google Maps
    2 content updates/month for 4 years
    Delivered in 15 working days
  Offer period: June 1, 2026 – August 15, 2026 ONLY
  Payment: 100% advance only
  Slots: 40 total

BRAND (from live site):
  Background:   #0A0E1A (dark)
  Orange:       #F26722 (primary brand accent)
  Navy:         #1D3B6D / #3B6DC0
  Text:         #E2E8F0 (primary) / #94A3B8 (dim)
  Border:       rgba(255,255,255,0.07)
  Font heading: Sora (700/800 weight)
  Font body:    DM Sans (400/500)
  WhatsApp:     +918788834630
  Email:        info@elan-tech.net

WHAT TO BUILD (4 deliverables):
  1. Dedicated landing page: /pricing/digital-launchpad
  2. New section on /pricing page with 3-card panel + offer banner
  3. Promotional strip on homepage (above-fold secondary CTA)
  4. Announcement bar at very top of all pages (dismissible)

EXISTING PRICING PAGE STRUCTURE (do NOT break):
  - Starter ₹15K | Professional ₹45K | Enterprise ₹1.5L | eCommerce ₹60K
  - SEO: Essentials ₹12K | Growth ₹25K | Domination ₹50K
  - Maintenance: Basic ₹3K | Priority ₹8K | Enterprise ₹15K
  - Currency toggle (INR/USD/AUD/AED/GBP) — keep working
  - FAQs section at bottom

WCAG REQUIREMENTS (maintain on every new element):
  - All interactive elements: min 44×44px touch target
  - Countdown timer: aria-live="polite" for screen reader updates
  - Form inputs: visible labels with for/id association
  - Colour contrast: 4.5:1 minimum
  - Countdown: prefers-reduced-motion must stop animation

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 1: Offer Data File                                        ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Create the data file for the Digital Launchpad offer.
All plan data lives here — single source of truth.
Never hardcode plan data inside component files.

Create src/data/digitalLaunchpad.ts:

export const OFFER_START = new Date('2026-06-01T00:00:00+05:30')
export const OFFER_END   = new Date('2026-08-15T23:59:59+05:30')
export const TOTAL_SLOTS = 40
export const WHATSAPP_URL = 'https://wa.me/918788834630?text=Hi%20I%27m%20interested%20in%20the%20Digital%20Launchpad%20plan'

export interface LaunchpadPlan {
  id:            string
  emoji:         string
  name:          string
  tagline:       string
  price:         number
  pages:         string
  monthlyReframe: string
  featured:      boolean
  features:      string[]    // what's ADDED in this tier
  baseFeatures:  string[]    // SAME on all tiers (render once)
  whatsappText:  string      // pre-filled WhatsApp message per plan
}

export const BASE_FEATURES: string[] = [
  '.in or .co.in domain registered in your name — 4 years paid',
  'Fast, secure hosting registered in your name — 4 years paid',
  'Free SSL certificate (https://)',
  'Contact form with email notifications',
  'Floating WhatsApp chat button',
  'Google Maps location embed',
  'Google Analytics 4 setup',
  'Basic on-page SEO (meta tags, schema markup)',
  'Mobile-first responsive design',
  'Up to 2 content updates per month for 4 years',
  'Uptime monitoring + annual backup',
  'Delivered in 15 working days',
]

export const PLANS: LaunchpadPlan[] = [
  {
    id: 'starter',
    emoji: '🌱',
    name: 'eLan Starter',
    tagline: 'Freelancers, consultants, solo professionals',
    price: 18000,
    pages: '5 pages',
    monthlyReframe: '₹375/month',
    featured: false,
    features: [
      '5-page custom HTML website',
      'Home · About · Services · Contact · Gallery',
    ],
    baseFeatures: BASE_FEATURES,
    whatsappText: 'Hi%2C%20I%27m%20interested%20in%20the%20eLan%20Starter%20plan%20%28%E2%82%B918%2C000%29.%20Please%20share%20details.',
  },
  {
    id: 'business',
    emoji: '🏪',
    name: 'eLan Business',
    tagline: 'Clinics, salons, retailers, NGOs, coaching centres',
    price: 24000,
    pages: '10–12 pages',
    monthlyReframe: '₹500/month',
    featured: true,
    features: [
      '10–12 page custom UI/UX designed website',
      'Services or Products detail pages',
      'Photo gallery or portfolio section',
      'Testimonials section',
      'FAQ page',
      'Blog (static, up to 5 posts included)',
      'WCAG accessibility basics',
      'Annual website performance review call',
    ],
    baseFeatures: BASE_FEATURES,
    whatsappText: 'Hi%2C%20I%27m%20interested%20in%20the%20eLan%20Business%20plan%20%28%E2%82%B924%2C000%29.%20Please%20share%20details.',
  },
  {
    id: 'complete',
    emoji: '🎯',
    name: 'eLan Complete',
    tagline: 'Professional services, manufacturers, B2B companies',
    price: 32000,
    pages: '10–12 pages + branding',
    monthlyReframe: '₹667/month',
    featured: false,
    features: [
      'Everything in eLan Business',
      'Professional logo design (3 concepts, 2 revisions)',
      'Brand colour palette + typography guidelines',
      'Copywriting for all pages (up to 1,500 words)',
      'Social media banner set (3 platforms)',
      'Google Business Profile setup + optimisation',
      'Business email setup guidance',
      'Priority WhatsApp support response',
    ],
    baseFeatures: BASE_FEATURES,
    whatsappText: 'Hi%2C%20I%27m%20interested%20in%20the%20eLan%20Complete%20plan%20%28%E2%82%B932%2C000%29.%20Please%20share%20details.',
  },
]

export const FAQS = [
  {
    question: 'Will the domain be registered in my name?',
    answer: 'Yes. Your .in or .co.in domain is registered directly in your name with NIXI — the official .in registry in India. You are the legal owner. eLan Technology manages the DNS settings on your behalf. If you ever want to transfer to another provider after the 4 years, you can do so at no transfer charge from us.',
  },
  {
    question: 'What happens after 4 years?',
    answer: 'You have three options: renew the maintenance plan with eLan at the prevailing rate; transfer everything (domain + files) to your own hosting provider; or upgrade to a new eLan package. All your website files, content, and the domain belong to you. There is no exit lock-in.',
  },
  {
    question: 'Can I choose a .com domain instead?',
    answer: 'This plan includes .in or .co.in domains only. These are actually better for local SEO — Google gives strong preference to country-code domains for local search results. For Nagpur and central India-focused businesses, .in or .co.in ranks faster than .com. If you need a .com specifically, contact us for a custom quote.',
  },
  {
    question: 'What counts as a "content update"?',
    answer: 'Up to 2 requests per month — text changes, new photos, updated business hours, contact number change, adding or removing items from a list, etc. Requests are fulfilled within 5 business days. Adding new pages, redesigning sections, or integrating new features are quoted separately.',
  },
  {
    question: 'Why full advance payment only?',
    answer: 'On day one, we purchase your domain and 4 years of hosting — costs that are non-refundable from our suppliers. Full advance payment ensures we can deliver and maintain your site uninterrupted for the complete 4-year period without billing disputes.',
  },
  {
    question: 'Why is this offer only until August 15, 2026?',
    answer: 'We purchased a shared hosting plan with capacity for exactly 40 websites. The plan pricing is fixed for 4 years. Once all 40 slots are filled, this price point is no longer possible. The August 15 deadline ensures we can onboard and launch all client sites within the year.',
  },
  {
    question: 'Can I upgrade to a larger plan later?',
    answer: 'Yes. At any point during the 4 years, you can upgrade. The new plan cost is quoted at the prevailing rate, with a credit for the remaining months on your current plan.',
  },
  {
    question: 'Is GST included in these prices?',
    answer: 'No. Prices shown are exclusive of GST (18%). For example, eLan Business at ₹24,000 + 18% GST = ₹28,320 total. A GST invoice is provided for all Indian clients, eligible for input tax credit.',
  },
]
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 2: Reusable Components                                    ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Create 4 reusable Astro components for the Digital Launchpad offer.
All components use Tailwind utility classes matching the existing site.
Every component must pass WCAG 2.1 AA — no exceptions.

─────────────────────────────────────────────────────────────────
COMPONENT 2A: src/components/launchpad/CountdownTimer.tsx
─────────────────────────────────────────────────────────────────

React island. Client:visible. Counts down to Aug 15, 2026 23:59:59 IST.

WCAG requirements:
  - aria-label="Offer countdown timer" on the outer div
  - aria-live="polite" aria-atomic="true" on the time display
    so screen readers announce changes (politely, not interruptive)
  - prefers-reduced-motion: if reduced motion, show static
    "Offer ends August 15, 2026" text instead of ticking timer
  - Each unit (days, hours, mins, secs) has a visually hidden
    <span class="sr-only"> label for screen readers

VISUAL:
  4 units in a row: DAYS : HOURS : MINS : SECS
  Large orange numbers (font-size 2.5rem, Sora, 800 weight)
  Small muted uppercase labels below each
  Contained in a pill with orange border and subtle glow background
  Separator ":" between units, orange, slightly smaller

LOGIC:
  - Target: new Date('2026-08-15T23:59:59+05:30')
  - Update every 1000ms via setInterval
  - When expired: show "This offer has ended" in muted text
  - Pad numbers with leading zero (07, not 7)

client:visible — only hydrates when the timer enters viewport.

─────────────────────────────────────────────────────────────────
COMPONENT 2B: src/components/launchpad/PlanCard.astro
─────────────────────────────────────────────────────────────────

Props: plan (LaunchpadPlan), showAllFeatures (boolean, default false)

Renders a single plan card. The featured (eLan Business) card gets:
  - Orange border + subtle orange glow background
  - "★ MOST POPULAR" badge at top-centre
  - CTA button in solid orange (other cards get outline button)

Card structure (top to bottom):
  1. [badge if featured]
  2. Emoji (plan.emoji) — aria-hidden="true"
  3. Plan name (h3, Sora 700)
  4. Tagline (small, muted)
  5. Price — "₹{price}" in large orange Sora 800
  6. Period line — "One-time · Full advance · No renewals till 2030"
  7. Monthly reframe pill — "= {monthlyReframe} for 4 years"
     in navy-blue background, lighter text
  8. Divider line
  9. "What's included:" label (uppercase, letter-spaced, muted)
  10. Feature list — checkmark icon (green) + feature text
      If showAllFeatures=true: show plan.features + plan.baseFeatures
      If showAllFeatures=false: show plan.features only + "...and all standard inclusions →"
  11. CTA button — WhatsApp link to plan.whatsappText
      Text: "Get Started — ₹{price}"
      ♿ aria-label="Get started with {plan.name} for ₹{plan.price}"
  12. Domain note — ".in / .co.in domain only" in small muted text

WCAG:
  - Card is NOT a link — it's a content block with a link inside
  - The CTA button is the only clickable element
  - All text meets 4.5:1 contrast on dark background
  - Card does NOT have role="button" — it's role="article"

─────────────────────────────────────────────────────────────────
COMPONENT 2C: src/components/launchpad/InclusionGrid.astro
─────────────────────────────────────────────────────────────────

Renders the "Every plan includes" 8-item grid.
Static Astro component, zero JavaScript.

Items array (hardcode in component, not from data file):
  { emoji: '🌐', title: 'Professional Website',
    desc: 'Custom HTML, not a template. Loads in under 1 second.' }
  { emoji: '🔗', title: 'Domain in Your Name',
    desc: '.in or .co.in registered in your name at NIXI. You own it.' }
  { emoji: '⚡', title: 'Fast, Secure Hosting',
    desc: 'Hostinger Mumbai servers + Cloudflare CDN on every site.' }
  { emoji: '🔧', title: '4 Years Maintenance',
    desc: '2 updates/month. Security monitoring. 5-day response time.' }
  { emoji: '📍', title: 'Google Maps',
    desc: 'Your location embedded correctly for local customers.' }
  { emoji: '📊', title: 'Analytics Setup',
    desc: 'Google Analytics 4 configured from day one.' }
  { emoji: '🔒', title: 'Free SSL Certificate',
    desc: 'https:// secured. Essential for trust and Google ranking.' }
  { emoji: '📱', title: 'WhatsApp Chat Button',
    desc: 'Floating button on every page. Proven to increase enquiries.' }

Layout: 2-col on mobile, 4-col on desktop
Each card: emoji (aria-hidden) + title (h3) + desc (p)
WCAG: emoji is aria-hidden, title uses Sora 700, good contrast

─────────────────────────────────────────────────────────────────
COMPONENT 2D: src/components/launchpad/BookingForm.astro
─────────────────────────────────────────────────────────────────

A static HTML form that submits via WhatsApp (not a backend form).
On submit, it constructs a WhatsApp message from the form fields
and opens wa.me/918788834630 with the pre-filled message.

Fields (all with visible labels, for/id association):
  - Full Name * (text input, id="lp-name")
  - Business Name * (text input, id="lp-biz")
  - WhatsApp Number * (tel input, id="lp-phone")
  - Email Address * (email input, id="lp-email")
  - Plan * (select dropdown, id="lp-plan")
    Options: Starter ₹18K | Business ₹24K | Complete ₹32K
  - Preferred Domain Name (text, id="lp-domain", placeholder="yourbusiness.in")
  - City (text, id="lp-city", placeholder="Nagpur / Raipur / Mumbai...")
  - Business Type (text, id="lp-type", placeholder="Clinic / School / Retail...")

Submit button: "💬 Reserve Slot via WhatsApp" → opens WhatsApp
  aria-label="Submit your details via WhatsApp"
  Opens: wa.me/918788834630?text=[URL-encoded message with all fields]

Below submit:
  "We confirm slot availability within 4 business hours.
   Payment link sent after confirmation."

WCAG requirements on this form:
  - Every input has a <label> with matching for/id (NO placeholder-only labels)
  - Required fields marked with aria-required="true" AND visible "(required)" or *
  - Error handling: if required field empty on submit, show inline error
    with role="alert" and aria-describedby on the input
  - Submit button: min 44px height
  - Form landmark: <form role="form" aria-label="Book your Digital Launchpad slot">

JavaScript for WhatsApp submission (in <script> tag):
  document.getElementById('lp-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('lp-name').value
    const biz  = document.getElementById('lp-biz').value
    const phone = document.getElementById('lp-phone').value
    const email = document.getElementById('lp-email').value
    const plan  = document.getElementById('lp-plan').value
    const domain = document.getElementById('lp-domain').value
    const city  = document.getElementById('lp-city').value
    const type  = document.getElementById('lp-type').value

    const msg = encodeURIComponent(
      `Hi eLan Technology! I want to book a Digital Launchpad slot.\n\n` +
      `Name: ${name}\nBusiness: ${biz}\nPhone: ${phone}\nEmail: ${email}\n` +
      `Plan: ${plan}\nDomain: ${domain || 'To be decided'}\n` +
      `City: ${city}\nBusiness Type: ${type}`
    )
    window.open(`https://wa.me/918788834630?text=${msg}`, '_blank')
  })
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 3: Dedicated Landing Page /pricing/digital-launchpad      ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Create the full standalone landing page at /pricing/digital-launchpad.
This is the most important deliverable. It must be complete, persuasive,
and SEO-optimised. It uses BaseLayout.astro with the site header/footer.

File: src/pages/pricing/digital-launchpad.astro

─────────────────────────────────────────────────────────────────
SEO METADATA
─────────────────────────────────────────────────────────────────

Title:       "4-Year All-In Website Plan from ₹18,000 — eLan Technology"
Description: "Professional website + .in domain + hosting + 4 years maintenance.
              One payment. No renewals. eLan Starter ₹18K · Business ₹24K ·
              Complete ₹32K. Offer ends August 15, 2026."
Canonical:   https://elan-tech.net/pricing/digital-launchpad
H1:          "Your Business Website. 4 Years. One Payment. Zero Headaches."
noindex:     false (index this page — it has SEO value for local searches)

Schema: Service + Offer + FAQPage + BreadcrumbList

BreadcrumbList:
  Home → Pricing → Digital Launchpad

Service schema:
  name: "Digital Launchpad — 4-Year Website Plan"
  provider: eLan Technology
  areaServed: "Nagpur, Maharashtra, India"
  offers: [
    { name: "eLan Starter", price: 18000, priceCurrency: "INR" },
    { name: "eLan Business", price: 24000, priceCurrency: "INR" },
    { name: "eLan Complete", price: 32000, priceCurrency: "INR" },
  ]
  validFrom: "2026-06-01"
  validThrough: "2026-08-15"

─────────────────────────────────────────────────────────────────
PAGE SECTIONS (in order)
─────────────────────────────────────────────────────────────────

SECTION 1: OFFER BANNER (thin bar, above hero)
  Orange background (#F26722)
  "🔥 Limited Time Offer — June 1 to August 15, 2026 · 40 Slots Only"
  White text, Sora 700, letter-spacing

SECTION 2: HERO
  Eyebrow badge row: [🔥 Limited Time] [4-Year All-Inclusive] [✓ 40 Slots Only]
  H1: "Your Business Website. 4 Years. One Payment. Zero Headaches."
  Subheading (2 lines):
    "Professional website + .in domain + hosting + 4-year maintenance.
     All managed by eLan Technology. You do nothing — we do everything."
  CountdownTimer component (client:visible) ← the live countdown
  Two CTAs side by side:
    [🚀 Book My Website Slot] → href="#plans" (smooth scroll)
    [💬 WhatsApp Us] → WHATSAPP_URL from data file
  Note below CTAs: "No technical knowledge needed · Full advance payment only"

SECTION 3: REFRAME BAR (full width, between hero and plans)
  5 stats in a horizontal bar with brand gradient background:
  "₹375/month" / eLan Starter cost per month
  "₹500/month" / eLan Business cost per month
  "₹667/month" / eLan Complete cost per month
  "4 Years" / Zero renewal stress
  "40 Slots" / Total available

SECTION 4: PLANS (id="plans")
  Section label: "CHOOSE YOUR PLAN"
  H2: "Three Plans. One Promise. Zero Surprises."
  Subtext: "All plans: .in domain + hosting + maintenance for 4 years.
            Full advance only. Offer ends August 15, 2026."

  DEADLINE BAR (above cards):
    Red/orange gradient border pill:
    "⏰ Offer closes August 15, 2026"
    [Reserve My Slot →] button → smooth scroll to #booking

  PLANS GRID (3 columns on desktop, 1 column on mobile):
    <PlanCard plan={PLANS[0]} showAllFeatures={true} />
    <PlanCard plan={PLANS[1]} showAllFeatures={true} />
    <PlanCard plan={PLANS[2]} showAllFeatures={true} />

SECTION 5: WHAT'S INCLUDED
  Dark bg section (full width)
  Section label: "WHAT YOU GET"
  H2: "Every Plan Includes These 4-Year Promises"
  Subtext: "We manage it all. You focus on your business."
  <InclusionGrid /> component

SECTION 6: COMPARISON TABLE
  Section label: "WHY THIS PLAN"
  H2: "How We Compare"
  Table: eLan Business ₹24K vs Freelancer ₹18K vs DIY Wix

  Columns: Feature | eLan Business | Freelancer | DIY Wix
  Rows:
    Custom design       | ✓ Custom UI/UX    | Maybe      | ✗ Template
    Domain included     | ✓ 4yr .in         | ✗ Extra    | Year 1 only
    Hosting included    | ✓ 4 years         | ✗ Extra    | ✓ Bundled
    Maintenance incl.   | ✓ 4 years         | ✗ Extra    | ✗ DIY
    Single payment      | ✓ One payment     | ✗ Annual   | ✗ Monthly
    Who manages it      | eLan Tech (24yr)  | You        | You
    Real 4yr cost       | ₹24,000 total     | ₹30-50K+   | ₹40-60K+

  WCAG: table has <caption> "Cost and feature comparison", proper <th> with scope

SECTION 7: NOT INCLUDED (transparency section)
  H2: "What's NOT in This Plan" (important for trust)
  Simple grid of crossed-out items:
    ✗ eCommerce / payment gateway integration
    ✗ Logo design (available in eLan Complete, or ₹3,999 add-on)
    ✗ Content writing (available in eLan Complete, or ₹4,999 add-on)
    ✗ SEO campaign / Google Ads management
    ✗ .com domain (extra charges apply — contact us)
    ✗ New pages after launch (₹999 per additional page)
    ✗ Social media management
    ✗ eCommerce features (see our eCommerce packages)

SECTION 8: WHO IS THIS FOR
  H2: "Is This Plan Right for You?"
  Two columns — WHO IT'S FOR and WHO SHOULD LOOK ELSEWHERE

  WHO IT'S FOR (green ticks):
    ✓ Local Nagpur / Central India businesses
    ✓ First-time website owners (no technical knowledge needed)
    ✓ Businesses who want one payment and zero ongoing stress
    ✓ Clinics, salons, coaching centres, retailers, NGOs, consultants
    ✓ Businesses primarily targeting Indian / local customers
    ✓ Budget-conscious businesses who want agency quality

  WHO SHOULD LOOK ELSEWHERE (neutral, not negative):
    → You need an online store (see our eCommerce packages)
    → You want to target international customers (need .com — contact us)
    → You need a blog CMS to update yourself (see our Professional plan)
    → You need complex integrations (CRM, booking system, payment)

SECTION 9: BOOKING FORM (id="booking")
  H2: "Reserve Your Slot"
  Lead text: "Fill in your details. We confirm via WhatsApp within 4 hours."
  <BookingForm /> component

  Below form, show 3 trust signals:
    🔒 Secure · 100% Advance · No Hidden Charges
    ⚡ Slot confirmed within 4 business hours
    📱 We respond on WhatsApp · Office hours 10am–6pm IST Mon–Sat

SECTION 10: FAQ
  H2: "Frequently Asked Questions"
  Accessible accordion using <details>/<summary> (zero JavaScript needed)
  8 FAQ items from FAQS array in data file
  FAQPage schema rendered by SchemaMarkup component

SECTION 11: FINAL CTA STRIP (full width, orange bg)
  "Ready to get started? 40 slots. First come, first served."
  [💬 WhatsApp +91 8788834630] [🚀 Book Slot Now] buttons
  Deadline reminder: "Offer ends August 15, 2026"

─────────────────────────────────────────────────────────────────
After building, run:
  astro build
  grep "digital-launchpad" dist/sitemap-0.xml  → should appear
  grep "canonical" dist/pricing/digital-launchpad/index.html → check URL
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 4: Add to Existing /pricing Page                          ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Update the existing /pricing page (src/pages/pricing.astro) to include
a prominently featured Digital Launchpad section WITHOUT breaking any
existing pricing content, the currency toggle, or existing packages.

─────────────────────────────────────────────────────────────────
TASK 4A: Add Limited Offer Banner at TOP of pricing page content
─────────────────────────────────────────────────────────────────

INSERT this immediately below the existing pricing page H1
and ABOVE the currency toggle section:

<div role="alert" aria-label="Limited time offer">
  <!-- Orange gradient banner with offer details -->
  <div class="limited-offer-banner">
    <div class="offer-left">
      <span class="offer-fire">🔥</span>
      <div>
        <div class="offer-title">NEW — Digital Launchpad: 4-Year All-In Plan</div>
        <div class="offer-sub">
          Website + .in domain + hosting + maintenance · ₹18K / ₹24K / ₹32K
          · Valid June 1 – August 15, 2026 only · 40 slots
        </div>
      </div>
    </div>
    <a href="/pricing/digital-launchpad" class="offer-cta-btn">
      View Offer →
    </a>
  </div>
</div>

Style this banner:
  background: linear-gradient(135deg, rgba(242,103,34,0.12), rgba(29,59,109,0.15))
  border: 1px solid rgba(242,103,34,0.4)
  border-radius: 16px
  padding: 20px 24px
  display: flex, justify-content: space-between, align-items: center
  margin-bottom: 40px

─────────────────────────────────────────────────────────────────
TASK 4B: Add Digital Launchpad 3-card section to pricing page
─────────────────────────────────────────────────────────────────

INSERT this as a NEW section, BEFORE the "Website Design & Development"
heading (at the very top of the packages area):

<section aria-label="Digital Launchpad limited offer plans">
  <!-- Section label + H2 -->
  <span class="section-label">LIMITED OFFER · JUNE 1 – AUG 15, 2026</span>
  <h2>Digital Launchpad — 4-Year All-Inclusive Plans</h2>
  <p>Domain + hosting + maintenance — all included. One payment. Zero renewals.</p>

  <!-- 3 plan cards (compact version — fewer features shown) -->
  {PLANS.map(plan => (
    <PlanCard plan={plan} showAllFeatures={false} />
  ))}

  <!-- See full details link -->
  <div style="text-align:center; margin-top:24px">
    <a href="/pricing/digital-launchpad" class="btn-see-more">
      See Full Plan Details, Inclusions & FAQ →
    </a>
  </div>
</section>

<!-- Divider between launchpad section and regular packages -->
<div class="section-divider" aria-hidden="true">
  <span>— Our Standard Packages —</span>
</div>

Then continue with the existing "Website Design & Development" section.

─────────────────────────────────────────────────────────────────
TASK 4C: Add FAQ entries to existing pricing FAQ
─────────────────────────────────────────────────────────────────

The pricing page has an existing FAQ section at the bottom.
Add these 2 questions to the existing FAQ accordion:

Q: "What is the Digital Launchpad plan?"
A: "The Digital Launchpad is a limited-time all-inclusive package that bundles
    a custom website, .in or .co.in domain registration (4 years), and hosting
    (4 years) with 4 years of maintenance — all in one upfront payment of
    ₹18,000, ₹24,000, or ₹32,000 depending on the tier. The offer runs from
    June 1 to August 15, 2026, with only 40 slots available.
    See the full details at /pricing/digital-launchpad."

Q: "Does the Digital Launchpad include a .com domain?"
A: "No. The Digital Launchpad includes .in or .co.in domains only, which are
    better for local Indian SEO. If you need a .com domain, please contact us
    for a custom quote."
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 5: Homepage Promotional Strip                              ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Add a promotional strip to the homepage (src/pages/index.astro).
Insert it AFTER the stats counter section and BEFORE the services grid.
It must be tasteful — noticeable but not disruptive to the homepage flow.

─────────────────────────────────────────────────────────────────
COMPONENT: Homepage Promo Strip
─────────────────────────────────────────────────────────────────

Create src/components/launchpad/HomePromoStrip.astro:

A full-width band with:
Left side:
  🔥 badge: "LIMITED TIME OFFER — ENDS AUG 15, 2026"
  Headline: "New: 4-Year All-In Website Plan"
  Sub: "Website + .in domain + hosting + maintenance · from ₹18,000 · 40 slots only"

Right side:
  [View Plans →] button → /pricing/digital-launchpad

Visual:
  Background: linear-gradient(90deg, rgba(242,103,34,0.1), rgba(29,59,109,0.12))
  Left border: 3px solid #F26722
  Border-radius: 12px
  Padding: 20px 28px
  Full width of the container

CONDITION: Only show this strip between June 1 and August 15, 2026.
After August 15, it disappears automatically.

Use Astro server-side date check:
---
const now = new Date()
const offerStart = new Date('2026-06-01T00:00:00+05:30')
const offerEnd   = new Date('2026-08-15T23:59:59+05:30')
const showPromo  = now >= offerStart && now <= offerEnd
---
{showPromo && <HomePromoStrip />}

This means after August 15, the strip is gone on every new build
with no manual intervention needed.

WCAG:
  role="complementary" aria-label="Limited time offer announcement"
  The CTA link must have descriptive text: "View Digital Launchpad plans →"
  Not "Click here" or "Learn more"
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 6: Sitewide Announcement Bar (Dismissible)                ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Add a thin dismissible announcement bar to the very top of ALL pages
(above the existing header) between June 1 and August 15, 2026.

Create src/islands/AnnouncementBar.tsx (React island):

VISUAL: Thin bar (40px height) at the very top of every page
  Background: #F26722 (solid brand orange)
  Text: white, Sora 700, font-size 13px
  Content:
    "🔥 New: 4-Year All-In Website Plan from ₹18,000 — Offer ends Aug 15"
    [View Plans] link → /pricing/digital-launchpad (underlined, white)
    [×] dismiss button on the right

BEHAVIOR:
  - Persists in localStorage('elantech-launchpad-bar-dismissed')
  - If dismissed, bar is hidden until localStorage is cleared
  - After August 15, 2026: bar renders null (no HTML output at all)
    Check: if (new Date() > new Date('2026-08-15T23:59:59+05:30')) return null

WCAG:
  role="banner" aria-label="Limited time offer announcement"
  Dismiss button: aria-label="Dismiss announcement"
  Dismiss button: min 44×44px, white X icon
  Not aria-modal — page remains fully accessible when bar is visible
  Focus management: when dismissed, focus stays where it was

In BaseLayout.astro, add ABOVE the <Header /> component:
  <AnnouncementBar client:load />

This uses client:load because:
  - localStorage check must run on client
  - Conditional rendering based on current date
  - Must appear before user can see anything
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 7: Navigation + Sitemap Updates                           ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Update navigation and sitemap to include the new landing page.

─────────────────────────────────────────────────────────────────
TASK 7A: Add to sitemap with high priority
─────────────────────────────────────────────────────────────────

The Astro sitemap integration auto-discovers pages. Verify after build:
  grep "digital-launchpad" dist/sitemap-0.xml

If not present, the page may be in a subdirectory that needs
the sitemap filter updated. Check astro.config.mjs sitemap filter.

The page should get priority 0.85 — same as product pages.
Add this case to the sitemap serialize() function:
  if (url.includes('/pricing/digital-launchpad')) {
    item.priority = 0.9
    item.changefreq = 'weekly'
    item.lastmod = '2026-06-01'
    return item
  }

─────────────────────────────────────────────────────────────────
TASK 7B: Add "Limited Offer" submenu item under Pricing in nav
─────────────────────────────────────────────────────────────────

The existing nav has: Home | About | Services | Products | Portfolio | Blog | Pricing | Contact

Update "Pricing" in the navigation to show a dropdown or a "NEW" badge:

Option A (simpler — just a badge on the Pricing nav item):
  <a href="/pricing">
    Pricing
    <span class="nav-new-badge" aria-label="New offer available">NEW</span>
  </a>
  Style: small orange pill "NEW" next to "Pricing" text
  Hides after Aug 15 via server-side date check (same pattern as homepage strip)

Option B (dropdown under Pricing):
  Pricing
    → All Packages (/pricing)
    → 🔥 4-Year Plan — ₹18K–32K (/pricing/digital-launchpad) [NEW badge]

Go with Option A unless the nav already has dropdown support for Pricing.
It's simpler and less risk of breaking the mobile menu.

─────────────────────────────────────────────────────────────────
TASK 7C: Update footer
─────────────────────────────────────────────────────────────────

In the Footer's "Company" links section, add:
  [🔥 4-Year Website Plan](/pricing/digital-launchpad)
  (style this link in orange to make it stand out)

This appears on EVERY page — a permanent sitewide link to the offer
during its validity, and becomes a regular footer link after Aug 15
(just remove the orange styling and 🔥 emoji after the offer ends).

─────────────────────────────────────────────────────────────────
TASK 7D: Update _redirects for clean URLs
─────────────────────────────────────────────────────────────────

Add to public/_redirects:
  /launchpad       /pricing/digital-launchpad    302
  /4year           /pricing/digital-launchpad    302
  /offer           /pricing/digital-launchpad    302

These short URLs are useful for:
  - BNI Krypton pitch: "Visit elan-tech.net/launchpad"
  - WhatsApp messages: share elan-tech.net/offer
  - Social media bios: elan-tech.net/4year

302 (not 301) because the redirect is temporary (offer ends Aug 15).
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  STEP 8: Build + Verify                                         ║
# ╚══════════════════════════════════════════════════════════════════╝

## Claude Code Command:

```
Run the complete build and verify all deliverables.

─────────────────────────────────────────────────────────────────
TASK 8A: Build
─────────────────────────────────────────────────────────────────

astro build
# Must complete with zero errors

─────────────────────────────────────────────────────────────────
TASK 8B: Verification checks
─────────────────────────────────────────────────────────────────

node << 'EOF'
const fs = require('fs')

let pass = 0, fail = 0

function check(label, condition) {
  if (condition) { console.log(`  ✅ ${label}`); pass++ }
  else { console.log(`  ❌ ${label}`); fail++ }
}

const LP = fs.readFileSync('dist/pricing/digital-launchpad/index.html', 'utf8')
const PR = fs.readFileSync('dist/pricing/index.html', 'utf8')
const HM = fs.readFileSync('dist/index.html', 'utf8')
const SM = fs.readFileSync('dist/sitemap-0.xml', 'utf8')
const RD = fs.readFileSync('dist/_redirects', 'utf8')

console.log('\n=== LANDING PAGE ===')
check('Has correct H1', LP.includes('4 Years. One Payment'))
check('Has canonical', LP.includes('digital-launchpad'))
check('Has Service schema', LP.includes('"Service"'))
check('Has FAQPage schema', LP.includes('"FAQPage"'))
check('Has BreadcrumbList schema', LP.includes('"BreadcrumbList"'))
check('Has eLan Starter price', LP.includes('18,000') || LP.includes('18000'))
check('Has eLan Business price', LP.includes('24,000') || LP.includes('24000'))
check('Has eLan Complete price', LP.includes('32,000') || LP.includes('32000'))
check('Has WhatsApp link', LP.includes('wa.me/918788834630'))
check('Has countdown section', LP.includes('cd-days') || LP.includes('countdown'))
check('Has booking form', LP.includes('lp-name') || LP.includes('lp-form'))
check('Has aria-required on form fields', LP.includes('aria-required'))
check('Has form labels', LP.includes('<label'))
check('Has August 15 deadline', LP.includes('August 15'))

console.log('\n=== PRICING PAGE ===')
check('Has Digital Launchpad section', PR.includes('Digital Launchpad'))
check('Links to landing page', PR.includes('/pricing/digital-launchpad'))
check('Has offer banner', PR.includes('June 1') || PR.includes('limited'))

console.log('\n=== HOMEPAGE ===')
check('Has promo strip or launchpad mention', HM.includes('digital-launchpad') || HM.includes('Launchpad'))

console.log('\n=== SITEMAP ===')
check('Landing page in sitemap', SM.includes('digital-launchpad'))
check('No noindex on landing page', !LP.includes('noindex'))

console.log('\n=== REDIRECTS ===')
check('/launchpad shortlink exists', RD.includes('/launchpad'))
check('/offer shortlink exists', RD.includes('/offer'))

console.log(`\n═══════════════════════════`)
console.log(`${pass} passed · ${fail} failed`)
if (fail > 0) { console.log('Fix failures before deploying'); process.exit(1) }
EOF

─────────────────────────────────────────────────────────────────
TASK 8C: WCAG spot-check
─────────────────────────────────────────────────────────────────

Run axe-core on the landing page after `astro preview`:
  axe http://localhost:4321/pricing/digital-launchpad --tags wcag2a,wcag2aa,wcag21aa
  → Target: zero violations

─────────────────────────────────────────────────────────────────
TASK 8D: Deploy
─────────────────────────────────────────────────────────────────

git add -A
git commit -m "feat: Digital Launchpad 4-year plan — landing page + pricing integration"
git push origin main

After Cloudflare Pages deploys (2–5 minutes), verify live:
  curl -I https://elan-tech.net/pricing/digital-launchpad → HTTP 200
  curl -I https://elan-tech.net/launchpad → HTTP 302 to /pricing/digital-launchpad
  curl -I https://elan-tech.net/offer     → HTTP 302 to /pricing/digital-launchpad
```

---

# ╔══════════════════════════════════════════════════════════════════╗
# ║  POST-LAUNCH CHECKLIST (Manual Actions)                         ║
# ╚══════════════════════════════════════════════════════════════════╝

```
After deployment — manual actions to maximise reach:

□ GSC URL Inspection: Request indexing for /pricing/digital-launchpad
□ Set up Razorpay payment link for ₹18K, ₹24K, ₹32K (fixed amounts)
  → Add payment links as CTAs on the landing page (replace WhatsApp-only flow)
  → Payment link: Razorpay Dashboard → Payment Links → Create
□ Internal slot tracker: create Google Sheet tracking
  Client | Plan | Domain | Status | Start Date
□ Create WhatsApp Business quick reply for "Digital Launchpad enquiry"
□ Share landing page in BNI Krypton WhatsApp group
□ Add to BNI Krypton referral pitch (mention elan-tech.net/launchpad)
□ LinkedIn post with the launch announcement
□ Instagram Story with countdown visual
□ WhatsApp Status with offer card graphic
□ Post the ADA infographic + offer callout on Facebook
□ Add short URL to email signature: elan-tech.net/launchpad
```

---

# SUMMARY
# ════════════════════════════════════════════════════════════════
# STEP 1: Data file (single source of truth for all plan data)
# STEP 2: 4 reusable components (countdown, plan card, inclusions, form)
# STEP 3: Full dedicated landing page at /pricing/digital-launchpad
# STEP 4: Section + banner added to existing /pricing page
# STEP 5: Homepage promo strip (auto-hides after Aug 15)
# STEP 6: Dismissible announcement bar on all pages (auto-hides Aug 15)
# STEP 7: Nav badge, footer link, short URLs (/launchpad, /offer, /4year)
# STEP 8: Build verification + deploy
#
# BOTH offer elements (homepage strip + announcement bar) auto-disable
# after August 15, 2026 via server-side date check in Astro.
# No manual intervention needed to "turn off" the offer.
