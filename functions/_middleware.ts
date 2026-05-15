// Cloudflare Pages Function — returns HTTP 410 Gone for WordPress ghost URLs.
//
// Why 410 (not 404 / 301):
//   - 410 = "permanently removed". Google de-indexes 410s noticeably faster
//     than 404s, and unlike a 301 to /gone it carries no link equity that
//     could keep the dead URL alive.
//   - _redirects cannot emit 410 on Cloudflare Pages (301/302/307/308 only),
//     and the Astro static build can't generate per-route status codes —
//     so a Pages Function is the only correct option.
//
// Scope is limited by public/_routes.json so this function runs ONLY for the
// listed ghost paths. Every other request is served as a pure static file.

const GHOST_PATTERNS: RegExp[] = [
  /^\/tag(\/|$)/,                  // WP tag archives
  /^\/category(\/|$)/,             // WP category archives (NOT /blog/category/)
  /^\/author(\/|$)/,               // WP author pages
  /^\/page\/\d+\/?$/,              // WP pagination /page/2/
  /^\/feed\/?$/,                   // WP global RSS
  /^\/comments\/feed\/?$/,         // WP comments RSS
  /^\/trackback(\/|$)/,            // WP trackbacks
  /^\/wp-admin(\/|$)/,
  /^\/wp-login\.php$/,
  /^\/wp-content(\/|$)/,
  /^\/wp-includes(\/|$)/,
  /^\/wp-json(\/|$)/,
  /^\/xmlrpc\.php$/,
];

const GONE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex, nofollow">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>410 Gone — eLan Technology</title>
<style>
  body{font-family:system-ui,sans-serif;max-width:42rem;margin:6rem auto;padding:0 1.25rem;color:#1f2937;line-height:1.6}
  h1{font-size:2rem;margin-bottom:.5rem}
  a{color:#0ea5e9}
</style>
</head>
<body>
<h1>410 — This page is gone</h1>
<p>This URL was part of an older site and has been permanently removed.</p>
<p><a href="/">Visit the eLan Technology home page →</a></p>
</body>
</html>`;

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  if (GHOST_PATTERNS.some((re) => re.test(pathname))) {
    return new Response(GONE_HTML, {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  return context.next();
};
