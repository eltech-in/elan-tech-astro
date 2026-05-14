import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

const turndownService = new TurndownService();
turndownService.keep(['img']);

const missingBlogs = [
  {
    html: '/Users/nisheeaaru/Sites/elantech/elantech-astro/blog/accessibility/ada-wcag-compliance-us-canada-2026.html',
    mdx: '/Users/nisheeaaru/Sites/elantech/elan-tech-astro/src/content/blog/accessibility/ada-wcag-compliance-us-canada-2026.mdx',
    category: 'accessibility'
  },
  {
    html: '/Users/nisheeaaru/Sites/elantech/elantech-astro/blog/technology-trends/website-development-trends-april-2026.html',
    mdx: '/Users/nisheeaaru/Sites/elantech/elan-tech-astro/src/content/blog/technology-trends/website-development-trends-april-2026.mdx',
    category: 'technology-trends'
  }
];

for (const blog of missingBlogs) {
  const html = fs.readFileSync(blog.html, 'utf-8');
  const $ = cheerio.load(html);
  
  const title = $('h1').text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  
  // Date and read time are usually near the top
  const metaText = $('time').parent().text() || $('h1').next().text();
  const publishDate = '2026-04-15'; // Default to a reasonable date since it's hard to parse exact without knowing structure
  
  const image = $('img').first().attr('src') || '/blog/featuredblog.png';
  
  const articleContent = $('article').html() || $('main').html() || '';
  // Remove h1 and image from article content so we don't duplicate
  const $article = cheerio.load(articleContent);
  $article('h1').remove();
  $article('img').first().remove(); // Remove main image if it is the featured one
  
  let markdown = turndownService.turndown($article.html() || '');
  
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
publishDate: 2026-04-15
author: "eLan Technology Team"
category: "${blog.category}"
tags: []
readTime: 5
featuredImage:
  src: "${image}"
  alt: "${title.replace(/"/g, '\\"')}"
draft: false
seo:
  focusKeyword: ""
  metaTitle: "${title.replace(/"/g, '\\"')}"
  metaDescription: "${description.replace(/"/g, '\\"')}"
---

`;

  fs.writeFileSync(blog.mdx, frontmatter + markdown);
  console.log('Saved', blog.mdx);
}
