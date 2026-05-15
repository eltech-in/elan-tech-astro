// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import compressor from 'astro-compressor'

export default defineConfig({
  site: 'https://elan-tech.net',
  trailingSlash: 'ignore',
  output: 'static',

  // 'directory' emits dist/about/index.html (folder per page). Combined with
  // `trailingSlash: 'ignore'`, Astro accepts both /about and /about/ as valid
  // canonical URLs, which lets Hostinger / LiteSpeed serve nested routes
  // (e.g. /services/website-design) cleanly without 404s.
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
        const url = item.url

        // Homepage — highest priority
        if (url === 'https://elan-tech.net/' || url === 'https://elan-tech.net') {
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
    '/about-elantech': '/about',
    '/services/web-design': '/services/website-design',
    '/services/social-media': '/services/digital-marketing',
    '/services/mobile-app': '/services/mobile-app-development',
    '/integrations': '/services/integrations',
  },
})