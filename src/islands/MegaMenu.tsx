import { useRef, useState } from 'react';

// SVG icon map for each service - inline for zero-dependency approach
const serviceIcons: Record<string, string> = {
  'website-design': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  'web-development': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  'ecommerce': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
  'seo': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><polyline points="11 8 11 11 13 13"/></svg>`,
  'digital-marketing': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  'mobile-app-development': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  'branding': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>`,
  'maintenance-security': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  'custom-crm-erp-solutions': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9M12 13v2"/></svg>`,
  'dpdp-compliance-implementation': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
  'headless-cms-development': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>`,
};

// Service accent colors
const serviceAccents: Record<string, string> = {
  'website-design':        '#6366F1',
  'web-development':       '#00E5A0',
  'ecommerce':             '#F59E0B',
  'seo':                   '#EC4899',
  'digital-marketing':     '#06B6D4',
  'mobile-app-development':'#A855F7',
  'branding':              '#EF4444',
  'maintenance-security':  '#64748B',
  'custom-crm-erp-solutions':'#7C3AED',
  'dpdp-compliance-implementation':'#047857',
  'headless-cms-development':'#0E7490',
};

type SubPage = string | { label: string; href: string };

const services: { label: string; slug: string; subpages: SubPage[] }[] = [
  {
    label: 'Website Design',
    slug: 'website-design',
    subpages: [
      'UI/UX Design',
      'Custom Design',
      'Responsive Design',
      'Landing Pages',
    ],
  },
  {
    label: 'Web Development',
    slug: 'web-development',
    subpages: ['React/Next.js', 'MERN Stack', 'WordPress', 'Custom CMS', 'APIs'],
  },
  {
    label: 'eCommerce',
    slug: 'ecommerce',
    subpages: [
      { label: 'Custom Shopify Development', href: '/services/ecommerce/shopify-development/' },
      { label: 'Medusa.js Development', href: '/services/ecommerce/medusa-js-development/' },
      'Headless Commerce',
      'Subscriptions',
      'Payment & Shipping Modules',
    ],
  },
  {
    label: 'SEO',
    slug: 'seo',
    subpages: ['Technical SEO', 'On-Page SEO', 'Local SEO', 'Link Building', 'Content SEO'],
  },
  {
    label: 'Digital Marketing',
    slug: 'digital-marketing',
    subpages: ['Google Ads / PPC', 'Social Media', 'Content Marketing', 'Email Marketing', 'Analytics'],
  },
  {
    label: 'Mobile App Development',
    slug: 'mobile-app-development',
    subpages: ['React Native', 'iOS', 'Android', 'PWA', 'App UI/UX'],
  },
  {
    label: 'Branding',
    slug: 'branding',
    subpages: ['Logo Design', 'Brand Identity', 'Style Guide', 'Rebranding', 'Marketing Collateral'],
  },
  {
    label: 'Maintenance & Security',
    slug: 'maintenance-security',
    subpages: ['Security Audits', 'SSL Setup', 'Speed Optimization', 'Backups', 'Monthly Plans'],
  },
  {
    label: 'Custom CRM & ERP',
    slug: 'custom-crm-erp-solutions',
    subpages: ['Custom CRM', 'Custom ERP', 'ERPNext Customisation', 'Migration & Integrations'],
  },
  {
    label: 'DPDP Implementation',
    slug: 'dpdp-compliance-implementation',
    subpages: ['Data Mapping', 'Consent UI', 'GA4 & GTM Controls', 'Retention Workflows'],
  },
  {
    label: 'Headless CMS',
    slug: 'headless-cms-development',
    subpages: [
      { label: 'Payload CMS & Directus', href: '/services/payload-directus-development/' },
      'Content Architecture',
      'Editorial Workflows',
      'Content Migration',
    ],
  },
];

const products = [
  {
    title: 'Real Estate Portal',
    slug: 'real-estate-portal',
    features: ['Property listings', 'Agent dashboards', 'Lead capture & CRM', 'Map integration'],
  },
  {
    title: 'Medical Conference Portal',
    slug: 'medical-conference-portal',
    features: ['Event registration', 'Abstract submission', 'Speaker management', 'Certificate generation'],
  },
  {
    title: 'IMA Society Portal',
    slug: 'ima-society-portal',
    features: ['Member management', 'Election module', 'Job portal', 'CPD tracking'],
  },
  {
    title: 'Resort Management Portal',
    slug: 'resort-management-system',
    features: ['Online room booking', 'Housekeeping mgmt', 'Dining POS', 'Guest CRM'],
  },
];

interface MegaMenuProps {
  currentPath: string;
}

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Contact', href: '/contact/' },
];

export default function MegaMenu({ currentPath }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<'services' | 'products' | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesTrigger = useRef<HTMLButtonElement>(null);
  const productsTrigger = useRef<HTMLButtonElement>(null);

  const clearScheduledClose = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const closeImmediately = () => {
    clearScheduledClose();
    setActiveMenu(null);
  };

  const closeMenu = () => {
    clearScheduledClose();
    hoverTimeout.current = setTimeout(() => setActiveMenu(null), 250);
  };

  const openMenu = (which: 'services' | 'products') => {
    clearScheduledClose();
    setActiveMenu(which);
  };

  const toggleMenu = (which: 'services' | 'products') => {
    clearScheduledClose();
    setActiveMenu((current) => current === which ? null : which);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && activeMenu) {
      const trigger = activeMenu === 'services' ? servicesTrigger.current : productsTrigger.current;
      closeImmediately();
      trigger?.focus();
      return;
    }

    if (!activeMenu || !['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) return;
    const focusables = menuRef.current?.querySelectorAll<HTMLAnchorElement>('a');
    if (!focusables?.length) return;
    event.preventDefault();
    const links = Array.from(focusables);
    const currentIndex = links.indexOf(document.activeElement as HTMLAnchorElement);
    const movingForward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
    const nextIndex = movingForward
      ? (currentIndex < 0 ? 0 : (currentIndex + 1) % links.length)
      : (currentIndex <= 0 ? links.length - 1 : currentIndex - 1);
    links[nextIndex].focus();
  };

  const linkClass = (href: string) => [
    'relative flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150',
    currentPath === href || (href !== '/' && currentPath.startsWith(href))
      ? 'text-[var(--accent)]'
      : 'text-[var(--text-dim)] hover:text-[var(--text)]',
  ].join(' ');

  return (
    <div className="contents" onKeyDown={handleKeyDown}>
      <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
        {primaryLinks.slice(0, 2).map((link) => (
          <a key={link.href} href={link.href} className={linkClass(link.href)}>{link.label}</a>
        ))}
        <div
          onMouseEnter={() => openMenu('services')}
          onMouseLeave={closeMenu}
          className="flex items-center"
        >
          <a href="/services/" className={`${linkClass('/services/')} pr-1.5`}>
            Services
          </a>
          <button
            ref={servicesTrigger}
            type="button"
            aria-haspopup="true"
            aria-expanded={activeMenu === 'services'}
            aria-controls="desktop-mega-menu"
            aria-label="Show services menu"
            onClick={() => toggleMenu('services')}
            className="flex min-h-9 min-w-8 items-center justify-center rounded-md text-[var(--text-dim)] transition-colors hover:bg-[var(--bg)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            <svg className={`transition-transform duration-200 ${activeMenu === 'services' ? 'rotate-180' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>
        <div
          onMouseEnter={() => openMenu('products')}
          onMouseLeave={closeMenu}
          className="flex items-center"
        >
          <a href="/products/" className={`${linkClass('/products/')} pr-1.5`}>
            Products
          </a>
          <button
            ref={productsTrigger}
            type="button"
            aria-haspopup="true"
            aria-expanded={activeMenu === 'products'}
            aria-controls="desktop-mega-menu"
            aria-label="Show products menu"
            onClick={() => toggleMenu('products')}
            className="flex min-h-9 min-w-8 items-center justify-center rounded-md text-[var(--text-dim)] transition-colors hover:bg-[var(--bg)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            <svg className={`transition-transform duration-200 ${activeMenu === 'products' ? 'rotate-180' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>
        {primaryLinks.slice(2).map((link) => (
          <a key={link.href} href={link.href} className={linkClass(link.href)}>
            {link.label}
          </a>
        ))}
      </nav>

      {activeMenu && (
    <div
      id="desktop-mega-menu"
      ref={menuRef}
      role="region"
      aria-label={`${activeMenu} mega menu`}
      onMouseEnter={clearScheduledClose}
      onMouseLeave={closeMenu}
      className="absolute left-0 right-0 top-full z-40 mt-2 w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl shadow-black/20"
    >
      {/* Invisible hover bridge - covers the gap between island and dropdown */}
      <div className="absolute left-0 -top-3 w-full h-3 bg-transparent" />

      {activeMenu === 'services' ? (
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
            {services.map((svc) => {
              const accent = serviceAccents[svc.slug] || 'var(--accent)';
              return (
                <div key={svc.slug} className="group/col">
                  <a
                    href={`/services/${svc.slug}/`}
                    onClick={closeImmediately}
                    className="flex items-center gap-2.5 mb-3 group"
                  >
                    {/* Icon */}
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-md flex-shrink-0 transition-colors"
                      style={{ backgroundColor: `${accent}18`, color: accent }}
                      dangerouslySetInnerHTML={{ __html: serviceIcons[svc.slug] || '' }}
                    />
                    <span
                      className="font-semibold text-sm text-[var(--text)] group-hover:text-[var(--accent)] transition-colors"
                    >
                      {svc.label}
                    </span>
                  </a>
                  <ul className="space-y-1.5 pl-9">
                    {svc.subpages.map((sub) => {
                      const subLabel = typeof sub === 'string' ? sub : sub.label;
                      const subHref = typeof sub === 'string' ? `/services/${svc.slug}/` : sub.href;
                      return (
                        <li key={subLabel}>
                          <a
                            href={subHref}
                            onClick={closeImmediately}
                            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors leading-snug block py-0.5"
                          >
                            {subLabel}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border)] flex justify-between items-center">
            <a
              href="/services/ada-compliant-web-design/"
              onClick={closeImmediately}
              className="text-xs font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              ADA & WCAG Compliance
            </a>
            <a
              href="/services/"
              onClick={closeImmediately}
              className="text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              View all services →
            </a>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {products.map((prod) => (
              <div key={prod.slug}>
                <a
                  href={`/products/${prod.slug}/`}
                  onClick={closeImmediately}
                  className="flex items-center gap-2 font-semibold text-[var(--text)] hover:text-[var(--accent)] mb-3 transition-colors text-sm"
                >
                  {prod.title}
                </a>
                <ul className="space-y-2">
                  {prod.features.map((feature) => (
                    <li key={feature}>
                      <a
                        href={`/products/${prod.slug}/`}
                        onClick={closeImmediately}
                        className="text-xs text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                      >
                        {feature}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* Products CTA */}
            <div className="flex flex-col justify-between rounded-xl bg-gradient-to-br from-[var(--accent)]/10 to-[#6366F1]/10 border border-[var(--border)] p-5">
              <div>
                <h3 className="font-bold text-[var(--text)] mb-2 text-sm">Find the right product.</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Choose a configurable platform and discuss how it should fit your organisation.
                </p>
              </div>
              <a
                href="/get-quote/"
                onClick={closeImmediately}
                className="mt-4 block rounded-lg bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-bold text-[var(--bg)] hover:opacity-90 transition-opacity"
              >
                Discuss a Product
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border)]">
            <a
              href="/products/"
              onClick={closeImmediately}
              className="text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              View all products →
            </a>
          </div>
        </div>
      )}
    </div>
      )}
    </div>
  );
}
