#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';

const DIST = resolve(process.cwd(), 'dist');
const SITE_ORIGIN = 'https://elan-tech.net';

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function routeForHtml(path) {
  const local = relative(DIST, path).split(sep).join('/');
  if (local === 'index.html') return '/';
  if (local.endsWith('/index.html')) return `/${local.slice(0, -'index.html'.length)}`;
  return `/${local}`;
}

function generatedPathFor(pathname) {
  if (pathname === '/') return join(DIST, 'index.html');
  if (extname(pathname)) return join(DIST, pathname.slice(1));
  return join(DIST, pathname.slice(1), 'index.html');
}

function isRedirectStub(path) {
  if (!existsSync(path) || !path.endsWith('.html')) return false;
  const html = readFileSync(path, 'utf8');
  return /http-equiv=["']refresh["']/i.test(html);
}

function decodeAttribute(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&#38;', '&')
    .replaceAll('&quot;', '"');
}

const issueKeys = new Set();
const issues = [];

function report(type, url, source) {
  const key = `${type}\u0000${url}\u0000${source}`;
  if (issueKeys.has(key)) return;
  issueKeys.add(key);
  issues.push({ type, url, source });
}

const htmlFiles = walk(DIST).filter((path) => path.endsWith('.html'));

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const sourceRoute = routeForHtml(file);
  const sourceUrl = new URL(sourceRoute, SITE_ORIGIN);

  const canonicalMatches = [
    ...html.matchAll(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/gi),
  ];

  if (!isRedirectStub(file) && sourceRoute !== '/404.html') {
    if (canonicalMatches.length !== 1) {
      report('canonical-count', String(canonicalMatches.length), sourceRoute);
    } else {
      const canonical = new URL(decodeAttribute(canonicalMatches[0][1]), SITE_ORIGIN);
      if (canonical.origin !== SITE_ORIGIN) {
        report('canonical-origin', canonical.href, sourceRoute);
      }
      if (!canonical.pathname.endsWith('/') && !extname(canonical.pathname)) {
        report('canonical-trailing-slash', canonical.href, sourceRoute);
      }
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const rawHref = decodeAttribute(match[1].trim());
    if (!rawHref || rawHref.startsWith('#')) continue;
    if (/^(?:mailto:|tel:|javascript:|data:)/i.test(rawHref)) continue;

    let url;
    try {
      url = new URL(rawHref, sourceUrl);
    } catch {
      report('invalid-url', rawHref, sourceRoute);
      continue;
    }

    if (url.hostname !== 'elan-tech.net' && url.hostname !== 'www.elan-tech.net') continue;
    if (url.origin !== SITE_ORIGIN) {
      report('internal-origin', url.href, sourceRoute);
    }

    const pathname = url.pathname;
    if (!pathname.endsWith('/') && !extname(pathname)) {
      report('link-trailing-slash', `${pathname}${url.search}`, sourceRoute);
    }

    const normalizedPath = !pathname.endsWith('/') && !extname(pathname)
      ? `${pathname}/`
      : pathname;
    const generatedPath = generatedPathFor(normalizedPath);

    if (!existsSync(generatedPath)) {
      report('missing-target', normalizedPath, sourceRoute);
    } else if (isRedirectStub(generatedPath)) {
      report('redirect-target', normalizedPath, sourceRoute);
    }
  }
}

const sitemapPath = join(DIST, 'sitemap-0.xml');
if (!existsSync(sitemapPath)) {
  report('missing-sitemap', '/sitemap-0.xml', 'build');
} else {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = new URL(match[1]);
    if (url.origin !== SITE_ORIGIN) report('sitemap-origin', url.href, '/sitemap-0.xml');
    if (!url.pathname.endsWith('/') && !extname(url.pathname)) {
      report('sitemap-trailing-slash', url.href, '/sitemap-0.xml');
    }
  }
}

if (issues.length > 0) {
  console.error(`\nCanonical URL audit failed with ${issues.length} issue(s):\n`);
  for (const issue of issues) {
    console.error(`  ${issue.type.padEnd(24)} ${issue.url}  <- ${issue.source}`);
  }
  console.error('');
  process.exit(1);
}

console.log(`Canonical URL audit passed: ${htmlFiles.length} HTML files checked.`);
