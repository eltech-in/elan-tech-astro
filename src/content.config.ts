// Astro 5 Content Layer configuration
// TODO: Define typed collections for blog and portfolio with Zod schemas (Step 4)
import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    author: z.string(),
    category: z.enum([
      'web-design',
      'seo',
      'ecommerce',
      'digital-marketing',
      'nagpur-business',
      'accessibility',
      'technology-trends',
    ]),
    tags: z.array(z.string()).default([]),
    readTime: z.number(),
    featuredImage: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    draft: z.boolean().default(false),
    seo: z
      .object({
        focusKeyword: z.string().optional(),
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      })
      .optional(),
  }),
})

export const collections = { blog }
