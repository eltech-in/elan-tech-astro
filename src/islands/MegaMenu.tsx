import { useEffect, useRef, useState } from 'react';

const services = [
  {
    label: 'Website Design',
    slug: 'website-design',
    subpages: ['UI/UX Design', 'Custom Design', 'Responsive Design', 'Landing Pages', 'Redesign'],
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
    label: 'Digital Marketing',
    slug: 'digital-marketing',
    subpages: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Email Marketing'],
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
    features: ['Property listings', 'Agent management', 'Lead capture', 'Search filters'],
  },
  {
    title: 'Conference Portal',
    slug: 'conference-portal',
    features: ['Event registration', 'Speaker profiles', 'Schedule management', 'Attendee portal'],
  },
  {
    title: 'IMA Portal',
    slug: 'ima-portal',
    features: ['Member management', 'Event booking', 'News & updates', 'CME tracking'],
  },
  {
    title: 'Ribolator',
    slug: 'ribolator',
    features: ['Rib calculator', 'Quote generator', 'Product catalog', 'B2B ordering'],
  },
];

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<'services' | 'products' | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const serviceTrigger = document.querySelector('[data-mega="services"]') as HTMLElement | null;
    const productsTrigger = document.querySelector('[data-mega="products"]') as HTMLElement | null;

    function openMenu(which: 'services' | 'products') {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      setActiveMenu(which);
      serviceTrigger?.setAttribute('aria-expanded', which === 'services' ? 'true' : 'false');
      productsTrigger?.setAttribute('aria-expanded', which === 'products' ? 'true' : 'false');
    }

    function closeMenu() {
      hoverTimeout.current = setTimeout(() => {
        setActiveMenu(null);
        serviceTrigger?.setAttribute('aria-expanded', 'false');
        productsTrigger?.setAttribute('aria-expanded', 'false');
      }, 150);
    }

    // Desktop: hover
    serviceTrigger?.addEventListener('mouseenter', () => openMenu('services'));
    serviceTrigger?.addEventListener('mouseleave', closeMenu);
    productsTrigger?.addEventListener('mouseenter', () => openMenu('products'));
    productsTrigger?.addEventListener('mouseleave', closeMenu);

    // Click fallback (also works on mobile)
    serviceTrigger?.addEventListener('click', () =>
      setActiveMenu((prev) => (prev === 'services' ? null : 'services'))
    );
    productsTrigger?.addEventListener('click', () =>
      setActiveMenu((prev) => (prev === 'products' ? null : 'products'))
    );

    // Keyboard: Escape
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        serviceTrigger?.setAttribute('aria-expanded', 'false');
        productsTrigger?.setAttribute('aria-expanded', 'false');
      }
      // Arrow key navigation within menu
      if ((e.key === 'ArrowDown' || e.key === 'ArrowRight') && activeMenu) {
        const focusables = menuRef.current?.querySelectorAll<HTMLAnchorElement>('a');
        if (focusables && focusables.length > 0) focusables[0].focus();
      }
    }
    document.addEventListener('keydown', handleKey);

    return () => {
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
      onMouseEnter={() => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      }}
      onMouseLeave={() => setActiveMenu(null)}
      className="absolute left-0 top-full z-40 w-full bg-[var(--bg-card)] shadow-2xl border-t border-[var(--border)] py-8"
    >
      <div className="mx-auto max-w-7xl px-4">
        {activeMenu === 'services' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((svc) => (
              <div key={svc.slug}>
                <a
                  href={`/services/${svc.slug}`}
                  onClick={() => setActiveMenu(null)}
                  className="flex items-center gap-2 font-semibold text-[var(--text)] hover:text-[var(--accent)] mb-3 transition-colors text-sm"
                >
                  {svc.label}
                </a>
                <ul className="space-y-1.5">
                  {svc.subpages.map((sub) => (
                    <li key={sub}>
                      <a
                        href={`/services/${svc.slug}`}
                        onClick={() => setActiveMenu(null)}
                        className="text-xs text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                      >
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* CTA card */}
            <div className="md:col-span-1 flex flex-col justify-between rounded-xl bg-gradient-to-br from-[#00C896]/20 to-[#0057FF]/20 border border-[var(--border)] p-5">
              <div>
                <h3 className="font-bold text-[var(--text)] mb-2 text-sm">Not sure where to start?</h3>
                <p className="text-xs text-[var(--text-muted)]">
                  Our free audit covers Security, SEO &amp; ADA compliance.
                </p>
              </div>
              <a
                href="/free-website-audit"
                onClick={() => setActiveMenu(null)}
                className="mt-4 block rounded-lg bg-[var(--accent)] px-4 py-2 text-center text-sm font-semibold text-[#0A0E1A] hover:opacity-90 transition-opacity"
              >
                Get Free Audit
              </a>
            </div>
          </div>
        ) : (
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
            {/* CTA card */}
            <div className="md:col-span-1 flex flex-col justify-between rounded-xl bg-gradient-to-br from-[#FF4E50]/10 to-[#F9D423]/10 border border-[var(--border)] p-5">
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
        )}
      </div>
    </div>
  );
}
