export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'pricing' | 'process' | 'technical' | 'seo' | 'city-nagpur' | 'city-raipur';
}

export const faqs: FAQItem[] = [
  // ─── GENERAL ───────────────────────────────────────────────────────────────
  {
    question: 'What is eLan Technology and where are you based?',
    answer:
      'eLan Technology is a full-service web design and digital marketing agency founded in Nagpur, Maharashtra, India. We serve clients across India (Nagpur, Raipur, Mumbai, Pune) and internationally (USA, Canada, Australia, UAE, UK). Our team of designers, developers, and marketers has been delivering digital solutions since 2015.',
    category: 'general',
  },
  {
    question: 'How many years of experience does eLan Technology have?',
    answer:
      'eLan Technology has over 9 years of experience in web design, web development, eCommerce, and digital marketing. We have delivered 200+ projects for clients across healthcare, education, manufacturing, hospitality, NGOs, and more.',
    category: 'general',
  },
  {
    question: 'What technologies do you use to build websites?',
    answer:
      'We use modern, industry-standard technologies including React, Next.js, Node.js, MongoDB, Express (MERN stack), WordPress, WooCommerce, Shopify, and Astro. For mobile apps, we use React Native. We recommend the right technology based on your project requirements, budget, and long-term growth plans.',
    category: 'general',
  },
  {
    question: 'Do you work with international clients?',
    answer:
      'Yes, we regularly work with clients in the USA, Canada, Australia, UAE, UK, Japan, and other countries. We manage international projects remotely with clear communication via email, Zoom, and project management tools. We accept payments in USD, AUD, GBP, AED, and INR.',
    category: 'general',
  },
  {
    question: 'Can I see examples of your previous work?',
    answer:
      'Absolutely. You can browse our portfolio at elantechnology.com/portfolio to see case studies for projects including Ribolator USA, CIPL Corporate Portal, Aasthaa Hospital, D\'FYNE Magazine, and more. We are happy to share additional relevant work samples on request.',
    category: 'general',
  },

  // ─── PRICING ───────────────────────────────────────────────────────────────
  {
    question: 'How much does a website cost?',
    answer:
      'Website costs vary based on complexity, number of pages, and required features. Our Starter package begins at ₹25,000 (approx. $300 USD) for a 5-page responsive business website. Our Professional package starts at ₹60,000 for up to 15 pages with CMS and SEO. Enterprise custom projects start at ₹1,20,000. Visit our Pricing page for detailed information.',
    category: 'pricing',
  },
  {
    question: 'What is included in your website packages?',
    answer:
      'All packages include responsive design, SSL setup, contact form integration, and basic SEO. Higher tiers add CMS integration, blog functionality, advanced SEO, performance optimization, Google Analytics setup, and extended support periods. Enterprise packages include custom integrations, WCAG accessibility compliance, security hardening, and a dedicated project manager.',
    category: 'pricing',
  },
  {
    question: 'Do you offer payment in installments?',
    answer:
      'Yes. For projects above ₹30,000, we typically structure payments in milestones: 40% upfront to begin work, 40% upon design approval, and 20% upon project completion and handover. For international clients, we offer similar milestone-based payment structures via bank transfer, PayPal, or Wise.',
    category: 'pricing',
  },
  {
    question: 'Are there any ongoing monthly costs after launch?',
    answer:
      'Domain registration and hosting are not included in our one-time development fee — these are third-party costs you pay directly to providers (typically ₹3,000–₹8,000/year). We also offer optional Monthly Maintenance Plans starting at ₹3,500/month covering security updates, backups, content changes, and performance monitoring.',
    category: 'pricing',
  },
  {
    question: 'Do you offer discounts for NGOs, schools, or startups?',
    answer:
      'Yes, we offer discounted pricing for registered NGOs, educational institutions, and early-stage startups. Please mention your organization type when contacting us and we will provide a tailored quote. We believe technology should be accessible to organizations doing meaningful work.',
    category: 'pricing',
  },

  // ─── PROCESS ───────────────────────────────────────────────────────────────
  {
    question: 'How long does it take to build a website?',
    answer:
      'A standard 5-page Starter website typically takes 10–14 working days. A Professional 15-page site with CMS takes 3–4 weeks. Complex custom web applications, eCommerce stores, or ERP systems can take 6–12 weeks depending on scope. We provide a detailed project timeline in our proposal.',
    category: 'process',
  },
  {
    question: 'What information do you need from me to get started?',
    answer:
      'To kick off a project, we need: your business details and goals, your target audience, examples of websites you like (for design reference), your logo and brand assets (if available), and the content for your pages (text and images). We can also assist with content writing and photography sourcing if needed.',
    category: 'process',
  },
  {
    question: 'How does the revision process work?',
    answer:
      'After presenting the initial design, we incorporate your feedback in structured revision rounds. Starter packages include 3 revision rounds, Professional includes 10, and Enterprise includes unlimited revisions. We use a shared feedback tool so revisions are clear, documented, and efficient.',
    category: 'process',
  },
  {
    question: 'Will I be able to update my website content after launch?',
    answer:
      'Yes. All Professional and Enterprise websites are built with a user-friendly CMS (Content Management System) such as WordPress, allowing you to add pages, update text, upload images, and publish blog posts without any technical knowledge. We also provide a post-launch training session.',
    category: 'process',
  },
  {
    question: 'What happens after my website is launched?',
    answer:
      'After launch, we provide a handover session covering CMS usage, hosting management, and basic troubleshooting. All packages include a post-launch support period (30 days on Starter, 90 days on Professional, 1 year on Enterprise) for bug fixes and minor adjustments. We also offer ongoing Monthly Maintenance Plans.',
    category: 'process',
  },

  // ─── TECHNICAL ─────────────────────────────────────────────────────────────
  {
    question: 'Who hosts the website — you or us?',
    answer:
      'We recommend and help set up hosting on your preferred provider (Hostinger, SiteGround, AWS, or DigitalOcean). The hosting account is registered in your name so you always own and control your infrastructure. We configure the server, deploy the website, and hand over full credentials.',
    category: 'technical',
  },
  {
    question: 'Will my website be mobile-friendly?',
    answer:
      'Every website we build is fully responsive and tested across all major devices and screen sizes — smartphones, tablets, laptops, and desktops. We follow a mobile-first design approach and validate against Google\'s Mobile-Friendly Test before handover.',
    category: 'technical',
  },
  {
    question: 'Do you provide SSL certificates?',
    answer:
      'Yes. SSL certificate setup is included in all packages. We install a free Let\'s Encrypt SSL certificate or configure your premium SSL, ensuring your website is served over HTTPS for security and SEO benefits.',
    category: 'technical',
  },
  {
    question: 'Can you migrate my existing website to a new platform?',
    answer:
      'Yes, we handle full website migrations — including content, media, SEO settings, and redirects. We have experience migrating from legacy PHP sites, Wix, Squarespace, and Joomla to WordPress or custom frameworks. Migrations are planned carefully to avoid SEO ranking loss.',
    category: 'technical',
  },
  {
    question: 'Do you provide website maintenance after the free support period?',
    answer:
      'Yes. We offer Monthly Maintenance Plans starting at ₹3,500/month that cover WordPress/plugin updates, security monitoring, daily backups, uptime monitoring, and up to 2 hours of content changes per month. We also offer ad-hoc support at an hourly rate for clients outside a maintenance plan.',
    category: 'technical',
  },

  // ─── SEO ───────────────────────────────────────────────────────────────────
  {
    question: 'What SEO services do you offer?',
    answer:
      'We offer comprehensive SEO services including technical SEO audits, on-page optimization, keyword research, local SEO (Google Business Profile), link building, content strategy, and monthly analytics reporting. We have a dedicated digital marketing team with proven results across healthcare, education, and retail sectors.',
    category: 'seo',
  },
  {
    question: 'How long does SEO take to show results?',
    answer:
      'SEO is a long-term investment. Most clients begin seeing measurable improvements in keyword rankings and organic traffic within 3–4 months. Significant business impact — consistent lead generation from organic search — typically becomes visible at the 6–9 month mark. We provide monthly reports tracking keyword positions, traffic, and conversions.',
    category: 'seo',
  },
  {
    question: 'Do you manage Google Ads campaigns?',
    answer:
      'Yes. We manage Google Ads (Search, Display, and Shopping) campaigns for clients across India and internationally. Our PPC service includes campaign setup, ad copywriting, keyword bid management, A/B testing, conversion tracking, and monthly reporting. We are transparent with ad spend — all budgets go directly to your Google Ads account.',
    category: 'seo',
  },
  {
    question: 'Can you help with local SEO for my Nagpur or Raipur business?',
    answer:
      'Yes, local SEO is one of our core strengths. We have helped businesses in Nagpur and Raipur rank on page one for local search terms like "dentist in Nagpur" or "caterers in Raipur." Our local SEO process covers Google Business Profile optimization, local citations, geo-targeted content, and review management.',
    category: 'seo',
  },

  // ─── CITY: NAGPUR ──────────────────────────────────────────────────────────
  {
    question: 'Are you a web design company based in Nagpur?',
    answer:
      'Yes, eLan Technology is headquartered in Nagpur, Maharashtra. We have been serving Nagpur businesses since 2015 — from small local shops to large corporate organizations. Being a local agency means we understand the Nagpur market, its industries, and the digital behaviour of Central Indian audiences.',
    category: 'city-nagpur',
  },
  {
    question: 'What types of Nagpur businesses have you worked with?',
    answer:
      'We have worked with hospitals, educational institutions, law firms, architecture studios, construction companies, manufacturing businesses, NGOs, restaurants, and retail stores in Nagpur. Our local portfolio includes Aasthaa Hospital, Guru Nanak College, Trimit Architects, and Pragati Foundation, among others.',
    category: 'city-nagpur',
  },
  {
    question: 'Can I meet your team in person in Nagpur?',
    answer:
      'Yes, we welcome in-person consultations at our Nagpur office. You can also contact us to schedule a visit or we can arrange a meeting at your place of business. For clients outside Nagpur, we conduct discovery calls and project reviews over Zoom.',
    category: 'city-nagpur',
  },

  // ─── CITY: RAIPUR ──────────────────────────────────────────────────────────
  {
    question: 'Do you serve clients in Raipur, Chhattisgarh?',
    answer:
      'Yes, Raipur is one of our key markets. We have served clients in Raipur across manufacturing, agriculture, education, and hospitality sectors. We work remotely with Raipur clients and can also arrange in-person meetings for larger projects.',
    category: 'city-raipur',
  },
  {
    question: 'Which industries in Raipur have you worked with?',
    answer:
      'We have built websites and digital marketing campaigns for Raipur-based businesses in steel manufacturing, rice milling, hospitality (hotels and resorts), education, and agricultural exports. Raipur is a fast-growing business hub and we understand the competitive digital landscape for businesses there.',
    category: 'city-raipur',
  },
  {
    question: 'How can a Raipur business get started with eLan Technology?',
    answer:
      'Getting started is simple. Fill out our contact form at elantechnology.com/contact, send us an email at hello@elantechnology.com, or call us directly. We will schedule a discovery call to understand your business goals and send you a detailed proposal within 48 hours.',
    category: 'city-raipur',
  },
];
