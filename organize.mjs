import fs from 'fs';
import path from 'path';

const blogDir = './src/content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
  const match = content.match(/^category:\s*['"]([^'"]+)['"]/m);
  if (match) {
    const category = match[1];
    const catDir = path.join(blogDir, category);
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
    }
    fs.renameSync(path.join(blogDir, file), path.join(catDir, file));
    console.log(`Moved ${file} to ${category}/`);
  }
}
