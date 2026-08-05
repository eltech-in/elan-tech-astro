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
    // Optional; falls back to publishDate when omitted. Update this whenever
    // the post body is materially revised - answer engines (ChatGPT, Gemini,
    // Perplexity) weigh freshness heavily when picking citations.
    updatedDate: z.coerce.date().optional(),
    author: z.string(),
    category: z.enum([
      'web-design',
      'seo',
      'ecommerce',
      'digital-marketing',
      'nagpur-business',
      'accessibility',
      'technology-trends',
      'company-news',
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
    // Optional: emit HowTo JSON-LD on this post.
    // Use ONLY for procedural / step-by-step posts (checklists, remediation
    // guides, "how to" tutorials). Answer engines and Google rich results
    // both prefer this format for procedural intent.
    howTo: z
      .object({
        name: z.string(),
        description: z.string(),
        // ISO 8601 duration, e.g. 'PT8H' for 8 hours, 'PT30M' for 30 minutes
        totalTime: z.string().optional(),
        steps: z.array(
          z.object({
            name: z.string(),
            text: z.string(),
            url: z.string().optional(), // anchor like '#step-1' or absolute URL
          })
        ),
      })
      .optional(),
    // Optional: emit FAQPage JSON-LD on this post. Use for posts whose intent
    // overlaps with conversational/People-Also-Ask queries (e.g. checklists,
    // explainers). Each entry's answer may include inline HTML.
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
})

export const collections = { blog }
