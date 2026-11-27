// Blog category names and card colours, shared by the blog index, category pages and cards.
export const blogCategoryLabels: Record<string, string> = {
  'web-design': 'Web Design',
  seo: 'SEO',
  ecommerce: 'eCommerce',
  'digital-marketing': 'Digital Marketing',
  'nagpur-business': 'Nagpur Business',
  accessibility: 'Accessibility',
  'technology-trends': 'Technology',
  'company-news': 'Company News',
};

export const blogCategoryColors: Record<string, string> = {
  'web-design': '--ac-pink',
  seo: '--ac-amber',
  ecommerce: '--ac-cyan',
  'digital-marketing': '--ac-blue',
  'nagpur-business': '--ac-emerald',
  accessibility: '--ac-indigo',
  'technology-trends': '--ac-violet',
  'company-news': '--ac-teal',
};

export const blogCategoryLabel = (cat: string) => blogCategoryLabels[cat] ?? cat;
export const blogCategoryColor = (cat: string) => `var(${blogCategoryColors[cat] ?? '--accent'})`;
