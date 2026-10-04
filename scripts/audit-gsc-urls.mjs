import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

// Read-only live audit of public URLs supplied in Search Console exports.
const run = promisify(execFile);
const sitemapMode = process.argv.includes('--sitemap');
const inputs = process.argv.slice(2).filter(arg => arg !== '--sitemap');
if (!inputs.length) throw new Error('Pass one or more GSC Table.csv files.');
const urls = [...new Set(inputs.flatMap(file => {
  const content = readFileSync(file, 'utf8');
  return sitemapMode ? [...content.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
    : content.split(/\r?\n/).slice(1).map(line => line.split(',')[0])
      .filter(url => url.startsWith('https://elan-tech.net/'));
}))];
const results = [];
let next = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (next < urls.length) {
    const url = urls[next++];
    try {
      const { stdout } = await run('/usr/bin/curl', ['-sS', '-L', '--max-time', '25', '--max-redirs', '8',
        ...(sitemapMode ? [] : ['-o', '/dev/null']), '-w', '\nELAN_AUDIT\t%{http_code}\t%{num_redirects}\t%{url_effective}', url],
        { maxBuffer: 4 * 1024 * 1024 });
      const [body, metadata] = stdout.split('\nELAN_AUDIT\t');
      const [status, hops, destination] = metadata.trim().split('\t');
      let error;
      if (sitemapMode) {
        const issues = [];
        if (status !== '200' || hops !== '0') issues.push('Sitemap URL must return 200 without redirect');
        if (/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(body)) issues.push('Sitemap URL has noindex');
        const canonical = [...body.matchAll(/<link\b[^>]+>/gi)].find(match => /rel=["']canonical["']/i.test(match[0]))?.[0]
          .match(/href=["']([^"']+)["']/i)?.[1];
        if (canonical !== url) issues.push(`Canonical mismatch: ${canonical ?? 'missing'}`);
        if (issues.length) error = issues.join('; ');
      }
      results.push({ url, status, hops, destination, error });
    } catch (error) { results.push({ url, status: 'ERROR', hops: '', destination: '', error: error.message }); }
  }
}));
results.sort((a, b) => a.url.localeCompare(b.url));
mkdirSync('reports', { recursive: true });
const quote = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
const output = sitemapMode ? 'reports/GSC-live-sitemap-audit-2026-10-01.csv' : 'reports/GSC-live-URL-audit-2026-10-01.csv';
writeFileSync(output, 'URL,Final status,Redirect hops,Final URL,Error\n' + results.map(row =>
  [row.url, row.status, row.hops, row.destination, row.error].map(quote).join(',')).join('\n') + '\n');
console.log(JSON.stringify({ output, checked: results.length, counts: results.reduce((counts, row) => {
  counts[row.status] = (counts[row.status] ?? 0) + 1; return counts;
}, {}), attention: results.filter(row => row.status !== '200' || row.error) }, null, 2));
if (sitemapMode && results.some(row => row.error || row.status !== '200')) process.exitCode = 1;
