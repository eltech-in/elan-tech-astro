import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    hasMegaMenu: true,
    subLinks: [
      { label: 'Website Design', href: '/services/website-design' },
      { label: 'Web Development', href: '/services/web-development' },
      { label: 'eCommerce', href: '/services/ecommerce' },
      { label: 'SEO', href: '/services/seo' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
      { label: 'Mobile App Development', href: '/services/mobile-app-development' },
      { label: 'Branding', href: '/services/branding' },
      { label: 'Maintenance & Security', href: '/services/maintenance-security' },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    hasMegaMenu: true,
    subLinks: [
      { label: 'Real Estate Portal', href: '/products/real-estate-portal' },
      { label: 'Medical Conference Portal', href: '/products/medical-conference-portal' },
      { label: 'IMA Society Portal', href: '/products/ima-society-portal' },
      { label: 'Resort Management Portal', href: '/products/resort-management-system' },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setOpenDropdown(null);
      return;
    }
    // Focus first focusable element
    const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        firstBtnRef.current?.focus();
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, [tabindex]:not([tabindex="-1"])'
          )
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    firstBtnRef.current?.focus();
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        ref={firstBtnRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Open navigation menu"
        className="lg:hidden rounded-md p-2 text-[var(--text-muted)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={close}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-full bg-[var(--bg-card)] shadow-2xl transform transition-transform duration-300 lg:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
          <span className="font-bold text-[var(--text)] text-lg">Menu</span>
          <button
            onClick={close}
            aria-label="Close navigation menu"
            className="rounded-md p-2 text-[var(--text-muted)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                {'hasMegaMenu' in link && link.hasMegaMenu ? (
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between gap-1 w-full">
                      <a
                        href={link.href}
                        onClick={close}
                        className="flex-1 rounded-lg px-3 py-2.5 font-medium text-[var(--text)] hover:text-[var(--accent)] hover:bg-white/5 transition-colors"
                      >
                        {link.label}
                      </a>
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === link.label ? null : link.label)
                        }
                        aria-expanded={openDropdown === link.label}
                        aria-label={`Toggle ${link.label} submenu`}
                        className={`p-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-transform duration-200 ${
                          openDropdown === link.label ? 'rotate-180' : ''
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openDropdown === link.label ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <ul className="pl-6 space-y-1 border-l border-[var(--border)] ml-3">
                        {link.subLinks?.map((sub) => (
                          <li key={sub.href}>
                            <a
                              href={sub.href}
                              onClick={close}
                              className="block rounded-lg px-3 py-2 text-sm text-[var(--text-dim)] hover:text-[var(--accent)] hover:bg-white/5 transition-colors"
                            >
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <a
                    href={link.href}
                    onClick={close}
                    className="block rounded-lg px-3 py-2.5 font-medium text-[var(--text)] hover:text-[var(--accent)] hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTAs */}
        <div className="border-t border-[var(--border)] px-6 py-4 flex flex-col gap-2">
          <a
            href="/free-website-audit"
            onClick={close}
            className="block rounded-lg bg-[var(--accent)] px-4 py-2.5 text-center font-semibold text-[#0A0E1A]"
          >
            Get Free Audit
          </a>
          <a
            href="/get-quote"
            onClick={close}
            className="block rounded-lg border border-[var(--border)] px-4 py-2.5 text-center font-semibold text-[var(--text)] hover:bg-white/5 transition-colors"
          >
            Get Quote
          </a>
        </div>
      </div>
    </>
  );
}
