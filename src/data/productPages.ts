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
  faqs: { question: string; answer: string }[];
}

export const productPages: Record<string, ProductPageContent> = {
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
