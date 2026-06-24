// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import compressor from 'astro-compressor'

export default defineConfig({
  site: 'https://elan-tech.net',
  // Apache mod_dir (DirectorySlash on) 301-redirects /foo → /foo/ for Astro's
  // directory-format build. trailingSlash: 'always' keeps canonical tags and
  // sitemap URLs in sync with the server's canonical form.
  trailingSlash: 'always',
  output: 'static',

  build: {
    format: 'directory',
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => {
        // Exclude noindex / conversion pages from sitemap
        const excluded = [
          '/api/',
          '/thank-you',
          '/get-quote',
          '/schedule-consultation',
          '/request-demo',
          '/search',
        ]
        return !excluded.some((path) => page.includes(path))
      },
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        // Strip trailing slash for pattern matching; the emitted item.url
        // retains it (trailingSlash: 'always' is the canonical form).
        const url = item.url.replace(/\/$/, '')

        // Homepage — highest priority
        if (url === 'https://elan-tech.net' || item.url === 'https://elan-tech.net/') {
          item.priority = 1.0
          item.changefreq = 'daily'
          return item
        }

        // Services hub + core indexed service pages
        if (
          url.endsWith('/services') ||
          url.endsWith('/services/website-design') ||
          url.endsWith('/services/mobile-app-development') ||
          url.endsWith('/services/ada-compliant-web-design')
        ) {
          item.priority = 0.95
          item.changefreq = 'weekly'
          return item
        }

        // All other service subpages
        if (url.includes('/services/')) {
          item.priority = 0.9
          item.changefreq = 'weekly'
          return item
        }

        // City + country landing pages
        if (url.includes('/web-design-company-')) {
          item.priority = 0.9
          item.changefreq = 'monthly'
          return item
        }

        // Product pages
        if (url.endsWith('/products') || url.includes('/products/')) {
          item.priority = 0.85
          item.changefreq = 'monthly'
          return item
        }

        // Blog posts: /blog/<category>/<slug>
        if (url.match(/\/blog\/[a-z-]+\/[a-z0-9-]+$/)) {
          item.priority = 0.8
          item.changefreq = 'monthly'
          return item
        }

        // Blog index + category pages
        if (url.endsWith('/blog') || url.includes('/blog/category/')) {
          item.priority = 0.7
          item.changefreq = 'weekly'
          return item
        }

        // Portfolio index + case studies
        if (url.endsWith('/portfolio')) {
          item.priority = 0.75
          item.changefreq = 'weekly'
          return item
        }
        if (url.includes('/portfolio/case-study/')) {
          item.priority = 0.7
          item.changefreq = 'monthly'
          return item
        }

        // Digital Launchpad landing page — campaign priority
        if (url.endsWith('/pricing/digital-launchpad')) {
          item.priority = 0.9
          item.changefreq = 'weekly'
          return item
        }

        // High-value utility pages
        if (url.endsWith('/pricing') || url.endsWith('/faq')) {
          item.priority = 0.7
          item.changefreq = 'monthly'
          return item
        }

        // About, contact, careers, audit, testimonials
        if (
          url.endsWith('/about') ||
          url.endsWith('/contact') ||
          url.endsWith('/careers') ||
          url.endsWith('/free-website-audit') ||
          url.endsWith('/testimonials')
        ) {
          item.priority = 0.8
          item.changefreq = 'monthly'
          return item
        }

        // Legal pages
        const legalPaths = [
          '/privacy-policy',
          '/cookie-policy',
          '/terms-conditions',
          '/disclaimer',
          '/cancellation-refund-policy',
          '/nda-confidentiality-policy',
          '/accessibility-statement',
        ]
        if (legalPaths.some((p) => url.endsWith(p))) {
          item.priority = 0.3
          item.changefreq = 'yearly'
          return item
        }

        item.priority = 0.5
        item.changefreq = 'monthly'
        return item
      },
    }),
    // Pre-compress static assets (JS/CSS/SVG/XML/JSON) but NOT HTML.
    // Hostinger's LiteSpeed mishandles serving .html.br/.html.gz files —
    // it ships the compressed bytes without setting Content-Encoding,
    // which the browser then renders as raw garbage. LiteSpeed compresses
    // HTML on-the-fly anyway, so dropping pre-compressed HTML loses nothing.
    compressor({
      gzip: true,
      brotli: true,
      fileExtensions: ['.css', '.js', '.mjs', '.svg', '.xml', '.json'],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: { 
      cssMinify: true,
      inlineStylesheets: 'always'
    },

    // Fix: Vite 7 EnvironmentPluginContainer.transform doesn't null-check
    // the handler returned by getHookHandler(). Pre-bundling React packages
    // bypasses the plugin transform chain for these modules in dev mode,
    // preventing "Cannot read properties of undefined (reading 'call')".
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        'nanostores',
        '@nanostores/react',
        'react-hook-form',
        'zod',
      ],
    },
  },

  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

  redirects: {
    '/about-elantech': '/about/',
    '/services/web-design': '/services/website-design/',
    '/services/social-media': '/services/digital-marketing/',
    '/services/mobile-app': '/services/mobile-app-development/',
    '/integrations': '/services/integrations/',

    // ── Reclaim equity from indexed URLs now 404ing (GSC 404 report, Jun 2026) ──
    // Old flat blog URLs → current /blog/<category>/<slug>/ structure
    '/blog/website-development-trends-april-2026': '/blog/technology-trends/website-development-trends-april-2026/',
    '/blog/ai-web-development-2026': '/blog/technology-trends/ai-web-development-2026/',
    '/blog/wcag-explained-business-owners': '/blog/accessibility/wcag-explained-business-owners/',
    // Renamed / removed case-study slugs
    '/portfolio/case-study/abhirama': '/portfolio/case-study/abhirama-international/',
    '/portfolio/case-study/stems': '/portfolio/case-study/stems-flower-studio/',
    '/portfolio/case-study/sheabm': '/portfolio/',
    '/portfolio/case-study/zest': '/portfolio/',
    '/portfolio/case-study/anirwan': '/portfolio/',
    // Old service / audit URLs
    '/wcag-accessibility-audit': '/services/ada-compliant-web-design/',
    '/website-audit': '/free-website-audit/',
    '/appointments': '/schedule-consultation/',
    // No India national page yet — send to flagship Nagpur HQ page
    '/web-design-company-india': '/web-design-company-nagpur/',
  },
})