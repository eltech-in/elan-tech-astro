// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import compressor from 'astro-compressor'

export default defineConfig({
  site: 'https://elan-tech.net',
  trailingSlash: 'never',
  output: 'static',

  // 'file' emits flat .html files (dist/about.html) instead of directories
  // (dist/about/index.html). Combined with `trailingSlash: 'never'`, this
  // prevents Hostinger / LiteSpeed mod_dir from auto-301-ing /about → /about/
  // (which fights our trailing-slash-strip rule and causes a redirect loop).
  build: {
    format: 'file',
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/api/') && !page.includes('/thank-you'),
      changefreq: 'weekly',
      priority: 0.7,
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