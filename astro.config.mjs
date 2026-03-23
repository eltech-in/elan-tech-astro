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

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/api/') && !page.includes('/thank-you'),
      changefreq: 'weekly',
      priority: 0.7,
    }),
    compressor({ gzip: true, brotli: true }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: { cssMinify: true },
  },

  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

  redirects: {
    '/about-elantech': '/about',
    '/services/web-design': '/services/website-design',
    '/services/seo': '/services/digital-marketing',
    '/services/social-media': '/services/digital-marketing',
    '/services/mobile-app': '/services/mobile-app-development',
  },
})