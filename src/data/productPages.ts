// Page content for products rendered by src/pages/products/[slug].astro.
// The four original products keep their own hand-built pages; a product
// listed here gets the shared template instead.
//
// Rule: describe only what the product does today. Planned work goes in
// `roadmap` and is labelled as planned on the page.

export interface ProductPageContent {
  /** <title> and meta description. */
  metaTitle: string;
  metaDescription: string;
  /** Small label above the H1. */
  eyebrow: string;
  featuresHeading: string;
  featuresIntro: string;
  features: { title: string; desc: string }[];
  audienceHeading: string;
  audience: { title: string; desc: string }[];
  /** "How it is supplied" summary block. */
  summary: { title: string; intro: string; items: { question: string; answer: string }[] };
  /** Data-handling panel. */
  privacy: { title: string; intro: string; subject: string; items: { title: string; text: string }[]; note: string };
  /** Planned modules that do not exist yet. */
  roadmap?: string[];
  /** Optional step-by-step diagram, e.g. how publishing works. */
  flow?: { eyebrow: string; title: string; steps: { title: string; text: string }[]; note: string };
  faqs: { question: string; answer: string }[];
}

export const productPages: Record<string, ProductPageContent> = {
  'elan-central-cms': {
    metaTitle: 'eLan Central CMS: Payload CMS for Astro Websites | eLan Technology',
    metaDescription:
      'eLan Central CMS is our customised Payload CMS for Astro websites. Edit pages, posts, media and SEO in one dashboard, then publish fast static pages to your own hosting.',
    eyebrow: 'Content Platform for Astro Websites',
    featuresHeading: 'Edit in one place. Publish fast, static pages.',
    featuresIntro: 'eLan Central CMS is Payload CMS, customised by us. It manages the content of the Astro websites we build.',
    features: [
      { title: 'One dashboard, many websites', desc: 'Each website has its own space inside one CMS. Our team can move between sites; a client editor sees only their own.' },
      { title: 'Pages built from blocks', desc: 'Pages are assembled from a shared block library: hero, rich text, services grid, feature list, gallery, testimonials, FAQ, stats, call to action, contact, logo strip, and map or embed.' },
      { title: 'Blog and news', desc: 'Posts with categories, authors and SEO fields, for websites that publish articles.' },
      { title: 'Site settings', desc: 'Logo, contact details, social links, header and footer menus, default SEO and analytics IDs, managed for each website.' },
      { title: 'SEO fields built in', desc: 'Title, meta description, canonical URL, Open Graph and structured data come from CMS fields. The sitemap and robots file are generated when the site is built.' },
      { title: 'Media with required alt text', desc: 'Images and files are managed in the CMS, and alt text is required, which supports accessibility from the first upload.' },
      { title: 'Redirects', desc: 'Old-to-new URL redirects are managed in the CMS and written into the website when it is built.' },
      { title: 'Enquiries by website', desc: 'Form submissions can be stored against the website they came from.' },
      { title: 'Optional content types', desc: 'Products, doctors, projects, team members, testimonials and FAQs are switched on only for the websites that need them.' },
    ],
    flow: {
      eyebrow: 'How publishing works',
      title: 'The editor’s journey: from edit to live',
      steps: [
        { title: 'Edit', text: 'An editor updates pages, posts or images in their own website’s space, using the shared blocks and required SEO fields.' },
        { title: 'Review', text: 'The change is checked before it goes out, by the editor or a colleague. A sign-off step for a reviewer role can be configured where a team needs one.' },
        { title: 'Publish', text: 'One click on Publish starts a rebuild of that one website.' },
        { title: 'Build', text: 'Astro builds the website as static files, using only that website’s content.' },
        { title: 'Go live', text: 'The files are uploaded to the website’s own hosting.' },
      ],
      note: 'Visitors only ever load static pages from the website’s own hosting. If the CMS is offline, live websites keep working; only editing pauses.',
    },
    audienceHeading: 'Built for teams that want to edit their own website',
    audience: [
      { title: 'Businesses editing their own site', desc: 'Update pages, posts and images without asking a developer for each change.' },
      { title: 'Organisations with several sites', desc: 'Manage more than one website from the same dashboard.' },
      { title: 'Teams on ordinary hosting', desc: 'The website is static files, so it runs on standard shared hosting. No Node.js is needed on the website’s server.' },
      { title: 'Sites moving off WordPress', desc: 'We plan content migrations so that existing URLs are kept.' },
    ],
    summary: {
      title: 'How eLan Central CMS is supplied',
      intro: 'It comes with the Astro websites we build. Each website gets its own space, editors and settings.',
      items: [
        { question: 'Is it something I install?', answer: 'No. It is the content system behind websites we build with Astro. We host and maintain the CMS; your website is hosted where you choose.' },
        { question: 'What if we need strict data isolation?', answer: 'A website with a heavily bespoke content model or strict isolation needs can run on its own separate instance of the same system.' },
        { question: 'How fast do changes go live?', answer: 'Publishing rebuilds only your website. Changes are usually live within a few minutes.' },
        { question: 'Is this the same as your Headless CMS Development service?', answer: 'No. Central CMS is a ready starting point: our customised Payload CMS that comes with the Astro websites we build. Headless CMS Development is a custom engagement, where we design the content model, platform and front end around your own architecture.' },
      ],
    },
    privacy: {
      title: 'Control editor access, content and enquiry data',
      intro: 'A shared content platform holds several organisations’ content behind one login page, so access is limited by role and by website.',
      subject: 'eLan Central CMS privacy enquiry',
      items: [
        { title: 'Editor accounts', text: 'Each editor should sign in with their own account. Client editors are limited to their own website; creating or removing a website is restricted to eLan administrators.' },
        { title: 'Enquiry records', text: 'Where form submissions are stored in the CMS, decide who may view and export them and how long they are kept.' },
        { title: 'Media and documents', text: 'Upload only files that are meant to be public. The website publishes what the CMS holds.' },
        { title: 'Connected services', text: 'Analytics IDs, email and other integrations are enabled only when scoped, with their providers and data fields documented.' },
      ],
      note: 'The platform supports agreed access and publishing workflows. It does not by itself guarantee privacy or accessibility compliance; each organisation remains responsible for the content it publishes.',
    },
    faqs: [
      { question: 'How is eLan Central CMS different from headless CMS development?', answer: 'Central CMS is a product: our customised Payload CMS for the Astro websites we build, with a shared block library, per-website spaces and hosting of the CMS by us. Headless CMS development is a custom service for organisations that need their own content model, platform choice (Payload CMS or Directus) and architecture.' },
      { question: 'What is eLan Central CMS?', answer: 'It is the content system behind the Astro websites we build. Editors update pages, posts, media and settings in one dashboard and publish. The website is then rebuilt as static files and uploaded to its own hosting.' },
      { question: 'Is it built on Payload CMS?', answer: 'Yes. It is Payload CMS, which is open source, customised by us with a shared block library, per-website spaces and editor roles. The database is PostgreSQL.' },
      { question: 'Does my live website depend on the CMS being online?', answer: 'No. Visitors load static pages from your website’s own hosting. If the CMS is offline, the live website keeps working and only editing pauses.' },
      { question: 'Can we edit our own website?', answer: 'Yes. Your editors get accounts limited to your website. They can update pages, posts, media and settings, then publish.' },
      { question: 'What hosting does the website need?', answer: 'Any hosting that can serve static files, including standard shared hosting. No Node.js is needed on the website’s server.' },
      { question: 'Can you move our existing WordPress content?', answer: 'Yes, as a scoped migration. We map your existing content to the CMS and plan the move so that existing URLs are kept.' },
      { question: 'Can I see it?', answer: 'Yes, on request. We walk you through the editor with sample content.' },
      { question: 'How much does it cost?', answer: 'It is quoted as part of the website project. The written proposal states what is included and any recurring charges.' },
    ],
  },

  'project-management-system': {
    metaTitle: 'Project Management System for Agencies and Service Teams | eLan Technology',
    metaDescription:
      'A configurable project management system for agencies and service businesses: clients, projects, tasks, team schedule, billing, enquiries, domain renewals and reminders in one workspace.',
    eyebrow: 'Project Management Software',
    featuresHeading: 'One workspace for delivery, billing and follow-up',
    featuresIntro: 'The modules below are in the system we use every day for our own client work.',
    features: [
      { title: 'Portfolio dashboard', desc: 'Active projects, new enquiries, expiring domains, reminders and outstanding payments on one screen.' },
      { title: 'Clients and projects', desc: 'Client records and project codes, with a status tracker across every active engagement.' },
      { title: 'Tasks and schedule', desc: 'A task list and a schedule view of the work ahead.' },
      { title: 'Team management', desc: 'Team members with role-based access, including an administrator role.' },
      { title: 'Billing and outstanding payments', desc: 'Billing records with pending and overdue amounts brought to the dashboard.' },
      { title: 'Enquiries', desc: 'New and active enquiries tracked alongside current projects.' },
      { title: 'Domain renewals', desc: 'Domains due to expire in the coming weeks are listed before they lapse.' },
      { title: 'Reminders and messages', desc: 'Reminders that need action, upcoming reminders and a messages area.' },
      { title: 'Search', desc: 'One search across projects, clients and project codes.' },
    ],
    flow: {
      eyebrow: 'How work moves through it',
      title: 'From enquiry to project, billing and renewal',
      steps: [
        { title: 'Enquiry', text: 'A new enquiry is recorded against a client, with its source and status.' },
        { title: 'Project', text: 'A won enquiry becomes a project with a code, tasks, schedule and the team assigned.' },
        { title: 'Billing', text: 'Bills are raised against the project, and pending and overdue payments are tracked.' },
        { title: 'Renewal reminder', text: 'Domain and service renewals are tracked, with reminders before they fall due.' },
      ],
      note: 'Fields, roles, reports and reminders are configured for each agency during setup. The walkthrough uses sample data, never a client’s live records.',
    },
    audienceHeading: 'Built for teams that deliver client work',
    audience: [
      { title: 'Digital agencies', desc: 'Web, design and marketing teams running many client projects at once.' },
      { title: 'IT service companies', desc: 'Teams that manage delivery, renewals and billing for the same clients.' },
      { title: 'Consultancies', desc: 'Firms that need client records, tasks and follow-ups in one place.' },
      { title: 'Project teams', desc: 'In-house teams that want one view of projects, people and payments.' },
    ],
    summary: {
      title: 'How the Project Management System is supplied',
      intro: 'The system is in daily use and is configured around each client’s projects, team roles, billing and reminder workflows.',
      items: [
        { question: 'Is every deployment identical?', answer: 'No. Modules, roles, fields, branding and reports follow the approved requirements.' },
        { question: 'Can it run on our server?', answer: 'Deployment and hosting are agreed for each implementation and documented before work starts.' },
        { question: 'What affects delivery?', answer: 'The modules you need, data migration, integrations, custom reports and review time determine the schedule.' },
      ],
    },
    privacy: {
      title: 'Control client, project, billing and team information',
      intro: 'A project workspace holds client contacts, commercial terms, payment status and staff activity. Access and retention should be designed around the roles in your team.',
      subject: 'Project Management System privacy enquiry',
      items: [
        { title: 'Client and contact records', text: 'Store the contact and project details needed to deliver the work. Decide who may view, export or delete them.' },
        { title: 'Billing and payment status', text: 'Billing records and outstanding amounts should be visible only to the roles that need them.' },
        { title: 'Team accounts and roles', text: 'Each person should sign in with their own account. Roles, access removal and activity records follow your organisation’s responsibilities.' },
        { title: 'Notifications and connected services', text: 'Email, messaging and other integrations are enabled only when scoped, with their providers and data fields documented.' },
      ],
      note: 'The system supports agreed access and record-keeping workflows. It does not by itself guarantee privacy or contractual compliance; the organisation using it remains responsible for its own obligations.',
    },
    faqs: [
      { question: 'What is the Project Management System?', answer: 'It is a configurable workspace for teams that deliver client work. It brings clients, projects, tasks, team schedule, billing, enquiries, domain renewals and reminders together.' },
      { question: 'Do you use it yourselves?', answer: 'Yes. We run our own client engagements on it, so the workflows come from daily use.' },
      { question: 'Does it track domain renewals and payments?', answer: 'Yes. The dashboard lists domains due to expire and shows pending and overdue payments, so both can be followed up in time.' },
      { question: 'Can team members have different access?', answer: 'Yes. Access is role-based, with an administrator role. The roles and what each one can see are agreed during setup.' },
      { question: 'Can I see a demo?', answer: 'Yes, on request. Our own workspace holds client records, so we walk you through the system with sample data.' },
      { question: 'How much does it cost?', answer: 'It is quoted after we understand the modules, number of users, deployment and support you need. The figure is confirmed in a written proposal.' },
    ],
  },

  'insurance-agency-management-portal': {
    metaTitle: 'Insurance Agency Management Software: Policies, Renewals, Commissions | eLan Technology',
    metaDescription:
      'A configurable management portal for insurance agencies: LIC, health, motor and general insurance, RD and FD, renewals, quotations, commissions, sub-agents, CRM and customer family records.',
    eyebrow: 'Insurance Agency Software',
    featuresHeading: 'Policies, customers and commissions in one system',
    featuresIntro: 'The portal covers the policy types and money flows an insurance agency handles every day.',
    features: [
      { title: 'LIC management', desc: 'Records for LIC policies and the customers who hold them.' },
      { title: 'Health insurance management', desc: 'Health policies managed alongside the agency’s other business.' },
      { title: 'Motor and vehicle insurance', desc: 'Motor policies managed by customer and vehicle.' },
      { title: 'General insurance management', desc: 'Other general insurance policies in the same system.' },
      { title: 'RD management', desc: 'Recurring deposit records for the agency’s customers.' },
      { title: 'FD management', desc: 'Fixed deposit records for the agency’s customers.' },
      { title: 'Renewals', desc: 'Upcoming renewals tracked across policy types so follow-ups are not missed.' },
      { title: 'Quotation management', desc: 'Quotations prepared and tracked for customers.' },
      { title: 'Commission management', desc: 'Commissions recorded for the agency’s business.' },
      { title: 'Sub-agent management', desc: 'Sub-agents managed within the agency’s system.' },
      { title: 'CRM', desc: 'Customer records and follow-ups in one place.' },
      { title: 'Customer family management', desc: 'Family members grouped under a customer, so a household’s policies are seen together.' },
    ],
    flow: {
      eyebrow: 'How an agency uses it',
      title: 'Policies, renewals, commissions and sub-agents',
      steps: [
        { title: 'Policy', text: 'LIC, health, motor and general policies are recorded against the customer and their family members.' },
        { title: 'Renewal', text: 'Upcoming renewals are tracked, and quotations are prepared for the customer.' },
        { title: 'Commission', text: 'Commission is recorded per policy and per agent, using the agency’s rules.' },
        { title: 'Sub-agent records', text: 'Sub-agents have their own records, so the agency can see each one’s policies and commission.' },
      ],
      note: 'Policy types, fields, commission rules and roles are configurable for each agency. The walkthrough uses sample data and shows these workflows; the demo system itself needs a login, so we show it to you rather than sending you to a sign-in screen.',
    },
    audienceHeading: 'Built for insurance agencies and their networks',
    audience: [
      { title: 'Insurance agencies', desc: 'Agencies handling several policy types for the same customers.' },
      { title: 'Agents and advisors', desc: 'Individual agents who need renewals, quotations and customer records together.' },
      { title: 'Sub-agent networks', desc: 'Agencies that work through sub-agents and track their commissions.' },
      { title: 'Financial product distributors', desc: 'Businesses that manage deposits as well as insurance policies.' },
    ],
    summary: {
      title: 'How the Insurance Agency Management Portal is supplied',
      intro: 'The portal is configured around the agency’s policy types, commission rules, sub-agent structure and renewal process.',
      items: [
        { question: 'Is every deployment identical?', answer: 'No. Policy types, fields, commission rules, roles, branding and reports follow the approved requirements.' },
        { question: 'Can it run on our server?', answer: 'Deployment and hosting are agreed for each implementation and documented before work starts.' },
        { question: 'What affects delivery?', answer: 'The modules you need, data migration from existing records, integrations, custom reports and review time determine the schedule.' },
      ],
    },
    privacy: {
      title: 'Control policyholder, health, financial and family information',
      intro: 'An insurance agency holds personal, health and financial details for customers and their families. Access, retention and exports should be designed around the roles in the agency.',
      subject: 'Insurance Agency Management Portal privacy enquiry',
      items: [
        { title: 'Customer and family records', text: 'Collect the details needed to serve the policy. Family members’ information should be visible only to staff who need it.' },
        { title: 'Health and financial details', text: 'Health declarations, policy values and deposit records are sensitive. Restrict access and decide how long each record is kept.' },
        { title: 'Agents and sub-agents', text: 'Each agent and sub-agent should sign in with their own account and see only the customers and commissions that belong to them.' },
        { title: 'Notifications and connected services', text: 'SMS, email, payment and insurer integrations are enabled only when scoped, with their providers and data fields documented.' },
      ],
      note: 'The portal supports agreed record-keeping and access workflows. It does not by itself guarantee insurance-regulatory, tax or privacy compliance; the agency should take professional advice on its own obligations.',
    },
    roadmap: ['Stock management'],
    faqs: [
      { question: 'What is the Insurance Agency Management Portal?', answer: 'It is a configurable management system for insurance agencies. It covers LIC, health, motor and general insurance, recurring and fixed deposits, renewals, quotations, commissions, sub-agents, CRM and customer family records.' },
      { question: 'Which policy types does it manage?', answer: 'LIC, health, motor and vehicle, and general insurance. It also manages recurring deposits (RD) and fixed deposits (FD).' },
      { question: 'Does it handle commissions and sub-agents?', answer: 'Yes. It includes commission management and sub-agent management. Commission rules are configured to the agency’s arrangements.' },
      { question: 'Can I see a whole family’s policies together?', answer: 'Yes. Customer family management groups family members under a customer, so a household’s policies can be viewed together.' },
      { question: 'Does it include stock management?', answer: 'Not yet. Stock management is planned and is not part of the current system.' },
      { question: 'What is it built with?', answer: 'The front end is built with Next.js, the back end with NestJS, and the database is MySQL.' },
      { question: 'Can I see a demo?', answer: 'Yes, on request. We walk you through the portal with sample data and your own workflow in mind.' },
      { question: 'How much does it cost?', answer: 'It is quoted after we understand the modules, number of users, deployment and support you need. The figure is confirmed in a written proposal.' },
    ],
  },
};
