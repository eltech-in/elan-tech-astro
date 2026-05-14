import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const elantechAstroPath = '/Users/nisheeaaru/Sites/elantech/elantech-astro/portfolio/case-study';
const sourcePortfolioTs = '/Users/nisheeaaru/Sites/elantech/elan-tech-astro/src/data/portfolio.ts';

const existingContent = fs.readFileSync(sourcePortfolioTs, 'utf-8');

// Get all files from live site
const files = fs.readdirSync(elantechAstroPath).filter(f => f.endsWith('.html'));

const missingProjects = [];

for (const file of files) {
  const slug = file.replace('.html', '');
  
  // check if slug exists in source
  if (!existingContent.includes(`slug: '${slug}'`)) {
    const html = fs.readFileSync(path.join(elantechAstroPath, file), 'utf-8');
    const $ = cheerio.load(html);
    
    const title = $('h1').text().trim();
    
    // Find Client and Industry
    let client = '';
    let industry = '';
    
    $('dt').each((i, el) => {
      const label = $(el).text().trim().toLowerCase();
      const value = $(el).next('dd').text().trim();
      if (label === 'client') client = value;
      if (label === 'industry') industry = value;
    });
    
    // Find category
    // Look for a span that might contain category
    const categorySpan = $('span').filter((i, el) => {
        const style = $(el).attr('style') || '';
        return $(el).hasClass('border') && style.includes('border-color:');
    }).first();
    const category = categorySpan.text().trim() || 'Website Design';
    
    // Accent color
    let accent = '#6366F1';
    const styleAttr = categorySpan.attr('style') || '';
    const match = styleAttr.match(/border-color:\s*(#[0-9a-fA-F]+)/);
    if (match) {
        accent = match[1];
    }
    
    // Description
    const descP = $('h1').nextAll('p.text-lg').first();
    const description = descP.text().trim() || 
                        $('meta[name="description"]').attr('content') || '';
    
    // Technologies
    const techSpan = $('h1').nextAll('div.flex-wrap').first().find('span');
    const technologies = [];
    techSpan.each((i, el) => {
        technologies.push($(el).text().trim());
    });
    if (technologies.length === 0) technologies.push('WordPress', 'CSS3');
    
    // Challenge
    const challenge = $('#challenge-heading').next('p').text().trim() || '';
    
    // Solution
    const solution = $('#solution-heading').next('p').text().trim() || '';
    
    // Result
    // Result is inside a div after #results-heading, in a p tag next to an svg
    const result = $('#results-heading').next('div').find('p').text().trim() || '';
    
    // Image
    const image = $('img').filter((i, el) => $(el).attr('src') && $(el).attr('src').includes('/portfolio/')).attr('src') || '';
    
    // Live URL
    const liveUrlA = $('a').filter((i, el) => $(el).text().trim().toLowerCase() === 'view live site').first();
    const liveUrl = liveUrlA.attr('href') || '';
    
    missingProjects.push({
      slug,
      title,
      client,
      industry,
      category,
      technologies,
      description,
      challenge,
      solution,
      result,
      image,
      liveUrl,
      accent
    });
  }
}

// Generate TS code
let tsCode = '';
for (let i = 0; i < missingProjects.length; i++) {
  const p = missingProjects[i];
  tsCode += `  {
    id: ${100 + i},
    slug: '${p.slug}',
    title: '${p.title.replace(/'/g, "\\'")}',
    client: '${p.client.replace(/'/g, "\\'")}',
    industry: '${p.industry.replace(/'/g, "\\'")}',
    category: '${p.category.replace(/'/g, "\\'")}',
    technologies: [${p.technologies.map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ')}],
    description:
      '${p.description.replace(/'/g, "\\'")}',
    challenge:
      '${p.challenge.replace(/'/g, "\\'")}',
    solution:
      '${p.solution.replace(/'/g, "\\'")}',
    result: '${p.result.replace(/'/g, "\\'")}',
    image: '${p.image}',
${p.liveUrl ? `    liveUrl: '${p.liveUrl}',\n` : ''}    isFeatured: false,
    accent: '${p.accent}',
  },\n`;
}

console.log(tsCode);
