import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const distDirectory = join(process.cwd(), 'dist');
const sitemapFiles = ['sitemap-index.xml', 'sitemap-0.xml'];
const stylesheetInstruction = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';

for (const filename of sitemapFiles) {
  const filepath = join(distDirectory, filename);
  const xml = await readFile(filepath, 'utf8');

  if (xml.includes('<?xml-stylesheet')) continue;

  const declarationEnd = xml.indexOf('?>');
  if (declarationEnd === -1) {
    throw new Error(`${filename} does not contain an XML declaration`);
  }

  const styledXml = `${xml.slice(0, declarationEnd + 2)}${stylesheetInstruction}${xml.slice(declarationEnd + 2)}`;
  await writeFile(filepath, styledXml, 'utf8');
}

console.log('Human-readable sitemap styling attached.');
