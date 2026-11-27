// Single source for "which technologies do we build with, and what proves it".
//
// Rule: a technology is listed only when a published project or a product
// build uses it. Proof is derived from the existing data files, so removing a
// project from the portfolio removes it here too. Work delivered under NDA is
// never listed, because it cannot be named.

import { projects } from './portfolio';
import { products } from './products';
import {
  ecommerceProjects,
  internationalProjects,
  latestLaunch,
  legacyProject,
  recentLaunches,
  selectedProjects,
} from './portfolioShowcase';

export type TechGroup = 'Frontend' | 'Commerce' | 'Backend' | 'Database' | 'CMS' | 'Payments' | 'Delivery and integrations';

export interface Technology {
  name: string;
  group: TechGroup;
  /** One factual line on what we use it for. */
  summary: string;
  /** Other spellings used in the data files. */
  aliases?: string[];
  /** Related service page, when one exists. */
  serviceUrl?: string;
  serviceLabel?: string;
}

export const techGroups: TechGroup[] = ['Frontend', 'Commerce', 'Backend', 'Database', 'CMS', 'Payments', 'Delivery and integrations'];

export const technologies: Technology[] = [
  { name: 'Next.js', group: 'Frontend', summary: 'React framework for server-rendered portals, platforms and marketing sites.', serviceUrl: '/services/web-development/', serviceLabel: 'Web development' },
  { name: 'React', group: 'Frontend', summary: 'Component library behind our portals, dashboards and product front ends.', serviceUrl: '/services/web-development/', serviceLabel: 'Web development' },
  { name: 'Astro', group: 'Frontend', summary: 'Static-first framework for fast, content-led business websites.', serviceUrl: '/blog/technology-trends/what-is-astro-7-business-guide/', serviceLabel: 'What is Astro 7?' },
  { name: 'Vite', group: 'Frontend', summary: 'Build tool used for our React single-page applications.' },
  { name: 'Radix UI', group: 'Frontend', summary: 'Accessible interface primitives for menus, dialogs and form controls.' },
  { name: 'Tailwind CSS', group: 'Frontend', summary: 'Utility-first styling used across our product interfaces.' },
  { name: 'TypeScript', group: 'Frontend', summary: 'Typed JavaScript used in our product front ends and back ends.' },
  { name: 'Medusa.js', group: 'Commerce', summary: 'Open-source commerce engine for stores that need custom modules and ownership.', serviceUrl: '/services/ecommerce/medusa-js-development/', serviceLabel: 'Medusa.js development' },
  { name: 'Shopify', group: 'Commerce', summary: 'Hosted commerce platform with custom themes and storefront design.', serviceUrl: '/services/ecommerce/#shopify', serviceLabel: 'Shopify development' },
  { name: 'WooCommerce', group: 'Commerce', summary: 'Commerce on WordPress for catalogues, online orders and content-led stores.', serviceUrl: '/services/ecommerce/', serviceLabel: 'Ecommerce development' },
  { name: 'Node.js', group: 'Backend', summary: 'Server runtime for product APIs and business logic.', serviceUrl: '/services/web-development/', serviceLabel: 'Web development' },
  { name: 'Express', group: 'Backend', summary: 'Node.js framework used for product REST APIs.' },
  { name: 'NestJS', group: 'Backend', summary: 'Structured Node.js framework for larger back ends with many modules.' },
  { name: 'PHP', group: 'Backend', summary: 'Server language behind our WordPress and custom PHP builds.' },
  { name: 'MongoDB', group: 'Database', summary: 'Document database behind several of our product builds.' },
  { name: 'PostgreSQL', group: 'Database', summary: 'Relational database behind eLan Central CMS.' },
  { name: 'MySQL', group: 'Database', summary: 'Relational database for products with structured records and reporting.' },
  { name: 'Payload CMS', group: 'CMS', summary: 'Open-source headless CMS that we customise as eLan Central CMS for Astro websites.', serviceUrl: '/services/payload-directus-development/', serviceLabel: 'Payload CMS development' },
  { name: 'WordPress', group: 'CMS', summary: 'Content management for business, service and association websites.', aliases: ['WordPress (Headless CMS)'], serviceUrl: '/services/web-development/', serviceLabel: 'Web development' },
  { name: 'Elementor', group: 'CMS', summary: 'Page builder for WordPress sites that clients edit themselves.' },
  { name: 'Strapi', group: 'CMS', summary: 'Headless CMS that feeds content to a separate front end.', serviceUrl: '/services/headless-cms-development/', serviceLabel: 'Headless CMS development' },
  { name: 'Razorpay', group: 'Payments', summary: 'Indian payment gateway integrated into product checkout and registration flows.' },
  { name: 'PhonePe', group: 'Payments', summary: 'UPI-led payment gateway integrated alongside Razorpay.' },
  { name: 'Cloudflare', group: 'Delivery and integrations', summary: 'Edge delivery and protection in front of our product deployments.' },
  { name: 'Google Maps', group: 'Delivery and integrations', summary: 'Maps and location display inside product interfaces.', aliases: ['Google Maps API'] },
  { name: 'AWS S3', group: 'Delivery and integrations', summary: 'File and media storage for product uploads.' },
  { name: 'NodeMailer', group: 'Delivery and integrations', summary: 'Transactional email sent from product back ends.' },
  { name: 'REST APIs', group: 'Delivery and integrations', summary: 'API layer between front ends, back ends and third-party systems.', aliases: ['REST API'], serviceUrl: '/services/integrations/', serviceLabel: 'Integrations' },
];

const canonicalByLabel = new Map<string, string>();
for (const tech of technologies) {
  canonicalByLabel.set(tech.name.toLowerCase(), tech.name);
  for (const alias of tech.aliases ?? []) canonicalByLabel.set(alias.toLowerCase(), tech.name);
}

/**
 * Keeps only real technology names from a free-form tag list, in canonical
 * spelling. Tags such as "Custom UI" or "SEO" describe the work, not the
 * stack, and are dropped.
 */
export function projectTech(tags: string[] = []): string[] {
  const found: string[] = [];
  for (const tag of tags) {
    const name = canonicalByLabel.get(tag.trim().toLowerCase());
    if (name && !found.includes(name)) found.push(name);
  }
  return found;
}

/**
 * Projects whose recorded stack could not be confirmed against the live site
 * on 2026-11-12: the site now runs something else, or shows no trace of the
 * recorded framework. They stay in the portfolio, but are not used as proof of
 * a technology until `technologies` in portfolio.ts is confirmed or corrected.
 *   ar-photo-studio  recorded Astro; live site shows no Astro build output
 *   elitefx          recorded Next.js; live site is a Vite single-page app
 *   msmehub          recorded Next.js + Strapi; live site runs WordPress
 *   csri-bsb         recorded MERN; live site runs WordPress
 */
export const stackUnconfirmed = new Set(['ar-photo-studio', 'elitefx', 'msmehub', 'csri-bsb']);

/** Real technologies for a portfolio project, or none while its stack is unconfirmed. */
export const confirmedTech = (project: { slug: string; technologies: string[] }): string[] =>
  stackUnconfirmed.has(project.slug) ? [] : projectTech(project.technologies);

export interface TechProof {
  title: string;
  url: string;
  external: boolean;
  kind: 'Project' | 'Product';
}

const proofKey = (title: string, url?: string) => {
  if (url && /^https?:\/\//.test(url)) {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      /* fall through to the title */
    }
  }
  return title.trim().toLowerCase();
};

function buildProof(): Map<string, TechProof[]> {
  const proof = new Map<string, TechProof[]>(technologies.map((tech) => [tech.name, []]));
  const seen = new Map<string, Set<string>>(technologies.map((tech) => [tech.name, new Set<string>()]));

  const add = (techName: string, item: TechProof, key: string) => {
    const keys = seen.get(techName);
    if (!keys || keys.has(key)) return;
    keys.add(key);
    proof.get(techName)?.push(item);
  };

  // Products first, then the curated showcase, then the wider archive.
  for (const product of products) {
    for (const group of product.stack ?? []) {
      for (const name of projectTech(group.items)) {
        add(name, { title: product.title, url: `/products/${product.slug}/`, external: false, kind: 'Product' }, `product:${product.slug}`);
      }
    }
  }

  const showcase = [latestLaunch, ...ecommerceProjects, ...recentLaunches, ...internationalProjects, ...selectedProjects, legacyProject];
  for (const item of showcase) {
    for (const name of projectTech(item.stack)) {
      add(name, { title: item.title, url: item.liveUrl, external: true, kind: 'Project' }, proofKey(item.title, item.liveUrl));
    }
  }

  for (const project of projects) {
    for (const name of confirmedTech(project)) {
      add(
        name,
        {
          title: project.title,
          url: project.liveUrl ?? '/portfolio/#project-archive',
          external: Boolean(project.liveUrl),
          kind: 'Project',
        },
        proofKey(project.title, project.liveUrl),
      );
    }
  }

  return proof;
}

const proofByTech = buildProof();

export const proofFor = (techName: string): TechProof[] => proofByTech.get(techName) ?? [];

/** Technologies that have at least one published project or product behind them. */
export const provenTechnologies = technologies.filter((tech) => proofFor(tech.name).length > 0);
