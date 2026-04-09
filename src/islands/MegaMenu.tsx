import { useEffect, useRef, useState } from 'react';

// SVG icon map for each service — inline for zero-dependency approach
const serviceIcons: Record<string, string> = {
  'website-design': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  'web-development': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  'ecommerce': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`,
  'seo': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><polyline points="11 8 11 11 13 13"/></svg>`,
  'digital-marketing': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  'mobile-app-development': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  'branding': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>`,
  'maintenance-security': `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
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
      { label: 'ADA & WCAG Compliance', href: '/ada-compliant-web-design' },
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
    subpages: ['Shopify', 'WooCommerce', 'Custom eCommerce', 'B2B Portals', 'Payment Integration'],
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

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<'services' | 'products' | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = () => {
    hoverTimeout.current = setTimeout(() => {
      setActiveMenu(null);
      const serviceTrigger = document.querySelector('[data-mega="services"]');
      const productsTrigger = document.querySelector('[data-mega="products"]');
      serviceTrigger?.setAttribute('aria-expanded', 'false');
      productsTrigger?.setAttribute('aria-expanded', 'false');
    }, 250);
  };

  const openMenu = (which: 'services' | 'products') => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveMenu(which);
    const serviceTrigger = document.querySelector('[data-mega="services"]');
    const productsTrigger = document.querySelector('[data-mega="products"]');
    serviceTrigger?.setAttribute('aria-expanded', which === 'services' ? 'true' : 'false');
    productsTrigger?.setAttribute('aria-expanded', which === 'products' ? 'true' : 'false');
  };

  useEffect(() => {
    const serviceTrigger = document.querySelector('[data-mega="services"]') as HTMLElement | null;
    const productsTrigger = document.querySelector('[data-mega="products"]') as HTMLElement | null;

    const handleServiceEnter = () => openMenu('services');
    const handleProductsEnter = () => openMenu('products');

    serviceTrigger?.addEventListener('mouseenter', handleServiceEnter);
    serviceTrigger?.addEventListener('mouseleave', closeMenu);
    productsTrigger?.addEventListener('mouseenter', handleProductsEnter);
    productsTrigger?.addEventListener('mouseleave', closeMenu);

    const handleServiceClick = () => setActiveMenu((prev) => (prev === 'services' ? null : 'services'));
    const handleProductsClick = () => setActiveMenu((prev) => (prev === 'products' ? null : 'products'));

    serviceTrigger?.addEventListener('click', handleServiceClick);
    productsTrigger?.addEventListener('click', handleProductsClick);

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        serviceTrigger?.setAttribute('aria-expanded', 'false');
        productsTrigger?.setAttribute('aria-expanded', 'false');
        // Restore focus to the trigger that opened the menu
        if (activeMenu === 'services') serviceTrigger?.focus();
        else if (activeMenu === 'products') productsTrigger?.focus();
      }
      if (activeMenu) {
        const focusables = menuRef.current?.querySelectorAll<HTMLAnchorElement>('a');
        if (!focusables || focusables.length === 0) return;
        const currentIndex = Array.from(focusables).indexOf(document.activeElement as HTMLAnchorElement);

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % focusables.length;
          focusables[nextIndex].focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevIndex = currentIndex <= 0 ? focusables.length - 1 : currentIndex - 1;
          focusables[prevIndex].focus();
        }
      }
    }
    document.addEventListener('keydown', handleKey);

    return () => {
      serviceTrigger?.removeEventListener('mouseenter', handleServiceEnter);
      serviceTrigger?.removeEventListener('mouseleave', closeMenu);
      productsTrigger?.removeEventListener('mouseenter', handleProductsEnter);
      productsTrigger?.removeEventListener('mouseleave', closeMenu);
      serviceTrigger?.removeEventListener('click', handleServiceClick);
      productsTrigger?.removeEventListener('click', handleProductsClick);
      document.removeEventListener('keydown', handleKey);
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, [activeMenu]);

  if (!activeMenu) return null;

  return (
    <div
      ref={menuRef}
      role="region"
      aria-label={`${activeMenu} mega menu`}
      onMouseEnter={() => { if (hoverTimeout.current) clearTimeout(hoverTimeout.current); }}
      onMouseLeave={closeMenu}
      className="absolute left-0 top-full z-40 w-full bg-[var(--bg-card)] shadow-2xl border-t border-[var(--border)]"
    >
      {/* Invisible hover bridge */}
      <div className="absolute left-0 -top-6 w-full h-6 bg-transparent" />

      {activeMenu === 'services' ? (
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
            {services.map((svc) => {
              const accent = serviceAccents[svc.slug] || 'var(--accent)';
              return (
                <div key={svc.slug} className="group/col">
                  <a
                    href={`/services/${svc.slug}`}
                    onClick={() => setActiveMenu(null)}
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
                      const subHref = typeof sub === 'string' ? `/services/${svc.slug}` : sub.href;
                      return (
                        <li key={subLabel}>
                          <a
                            href={subHref}
                            onClick={() => setActiveMenu(null)}
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

          <div className="mt-6 pt-4 border-t border-[var(--border)] flex justify-end">
            <a
              href="/services"
              onClick={() => setActiveMenu(null)}
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
                  href={`/products/${prod.slug}`}
                  onClick={() => setActiveMenu(null)}
                  className="flex items-center gap-2 font-semibold text-[var(--text)] hover:text-[var(--accent)] mb-3 transition-colors text-sm"
                >
                  {prod.title}
                </a>
                <ul className="space-y-2">
                  {prod.features.map((feature) => (
                    <li key={feature}>
                      <a
                        href={`/products/${prod.slug}`}
                        onClick={() => setActiveMenu(null)}
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
                <h3 className="font-bold text-[var(--text)] mb-2 text-sm">Own your platform.</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Stop paying modular subscriptions. Build &amp; scale your own business assets.
                </p>
              </div>
              <a
                href="/get-quote"
                onClick={() => setActiveMenu(null)}
                className="mt-4 block rounded-lg bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-bold text-[#0A0E1A] hover:opacity-90 transition-opacity"
              >
                Discuss a Product
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border)]">
            <a
              href="/products"
              onClick={() => setActiveMenu(null)}
              className="text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              View all products →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
