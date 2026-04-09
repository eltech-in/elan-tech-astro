import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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
      { label: 'ADA & WCAG Compliance', href: '/ada-compliant-web-design' },
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
  const [mounted, setMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setOpenDropdown(null);
      return;
    }
    // Focus first focusable element in drawer
    setTimeout(() => {
      const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }, 50);

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
    // Hide sticky contact bar when mobile menu is open
    const stickyBar = document.getElementById('sticky-contact-bar');
    if (stickyBar) stickyBar.style.display = 'none';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      if (stickyBar) stickyBar.style.display = '';
    };
  }, [isOpen]);

  function close() {
    setIsOpen(false);
    firstBtnRef.current?.focus();
  }

  // Portal content: backdrop + drawer rendered on document.body
  // This escapes the header's backdrop-filter which breaks position:fixed on children
  const portalContent = mounted
    ? createPortal(
        <>
          {/* Backdrop */}
          {isOpen && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9998,
                backgroundColor: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
              aria-hidden="true"
              onClick={close}
            />
          )}

          {/* Drawer */}
          <div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal={isOpen}
            aria-label="Navigation menu"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              width: '320px',
              maxWidth: '85vw',
              backgroundColor: 'var(--bg-card)',
              boxShadow: isOpen ? '0 25px 50px -12px rgba(0,0,0,0.25)' : 'none',
              transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 300ms ease',
              pointerEvents: isOpen ? 'auto' : 'none',
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border)',
                padding: '16px 24px',
              }}
            >
              <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '18px' }}>Menu</span>
              <button
                onClick={close}
                aria-label="Close navigation menu"
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  color: 'var(--text-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav
              aria-label="Mobile navigation"
              style={{ overflowY: 'auto', padding: '16px 24px', minHeight: 0 }}
            >
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {navLinks.map((link) => (
                  <li key={link.href} style={{ marginBottom: '4px' }}>
                    {'hasMegaMenu' in link && link.hasMegaMenu ? (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <a
                            href={link.href}
                            onClick={close}
                            style={{
                              flex: 1,
                              padding: '10px 12px',
                              borderRadius: '8px',
                              fontWeight: 500,
                              color: 'var(--text)',
                              textDecoration: 'none',
                              display: 'block',
                            }}
                          >
                            {link.label}
                          </a>
                          <button
                            onClick={() =>
                              setOpenDropdown(openDropdown === link.label ? null : link.label)
                            }
                            aria-expanded={openDropdown === link.label}
                            aria-label={`Toggle ${link.label} submenu`}
                            style={{
                              padding: '8px',
                              color: 'var(--text-muted)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              transform: openDropdown === link.label ? 'rotate(180deg)' : 'none',
                              transition: 'transform 200ms',
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </button>
                        </div>
                        {openDropdown === link.label && (
                          <ul
                            style={{
                              listStyle: 'none',
                              margin: '4px 0 0 12px',
                              padding: '0 0 0 16px',
                              borderLeft: '1px solid var(--border)',
                            }}
                          >
                            {link.subLinks?.map((sub) => (
                              <li key={sub.href}>
                                <a
                                  href={sub.href}
                                  onClick={close}
                                  style={{
                                    display: 'block',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    color: 'var(--text-dim)',
                                    textDecoration: 'none',
                                  }}
                                >
                                  {sub.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        onClick={close}
                        style={{
                          display: 'block',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          fontWeight: 500,
                          color: 'var(--text)',
                          textDecoration: 'none',
                        }}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTAs */}
            <div
              style={{
                borderTop: '1px solid var(--border)',
                padding: '16px 24px',
                paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <a
                href="/free-website-audit"
                onClick={close}
                style={{
                  display: 'block',
                  borderRadius: '8px',
                  backgroundColor: 'var(--accent)',
                  padding: '10px 16px',
                  textAlign: 'center',
                  fontWeight: 600,
                  color: '#0A0E1A',
                  textDecoration: 'none',
                }}
              >
                Get Free Audit
              </a>
              <a
                href="/get-quote"
                onClick={close}
                style={{
                  display: 'block',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  padding: '10px 16px',
                  textAlign: 'center',
                  fontWeight: 600,
                  color: 'var(--text)',
                  textDecoration: 'none',
                }}
              >
                Get Quote
              </a>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <>
      {/* Hamburger button — stays in header */}
      <button
        ref={firstBtnRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Open navigation menu"
        className="lg:hidden rounded-md p-2 text-[var(--text-muted)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Portal: backdrop + drawer rendered on document.body to escape header's backdrop-filter */}
      {portalContent}
    </>
  );
}
