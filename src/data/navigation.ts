export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
  hasMegaMenu?: boolean;
}

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasMegaMenu: true },
  { label: 'Products', href: '/products', hasMegaMenu: true },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export const serviceSubnav: NavLink[] = [
  { label: 'Website Design', href: '/services/website-design' },
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'eCommerce Development', href: '/services/ecommerce' },
  { label: 'Digital Marketing', href: '/services/digital-marketing' },
  { label: 'Mobile App Development', href: '/services/mobile-app-development' },
  { label: 'Branding & Identity', href: '/services/branding' },
  { label: 'Maintenance & Security', href: '/services/maintenance-security' },
  { label: 'API Integrations', href: '/integrations' },
];

export const footerNav = {
  services: [
    { label: 'Website Design', href: '/services/website-design' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'eCommerce Development', href: '/services/ecommerce' },
    { label: 'Digital Marketing', href: '/services/digital-marketing' },
    { label: 'Mobile App Development', href: '/services/mobile-app-development' },
    { label: 'Branding & Identity', href: '/services/branding' },
    { label: 'Maintenance & Security', href: '/services/maintenance-security' },
    { label: 'API Integrations', href: '/integrations' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
};
