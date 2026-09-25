<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>eLan Technology XML Sitemap</title>
        <style>
          :root { color-scheme: light dark; --bg:#f8fafc; --card:#fff; --text:#0f172a; --muted:#64748b; --line:#e2e8f0; --accent:#00856a; --accent-soft:#e7f8f3; }
          * { box-sizing:border-box; }
          body { margin:0; background:var(--bg); color:var(--text); font:15px/1.6 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; }
          main { width:min(1120px,calc(100% - 32px)); margin:40px auto; }
          header { margin-bottom:24px; padding:28px; border:1px solid var(--line); border-radius:20px; background:linear-gradient(135deg,var(--card),var(--accent-soft)); }
          .eyebrow { margin:0 0 6px; color:var(--accent); font-size:12px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; }
          h1 { margin:0; font-size:clamp(28px,5vw,46px); line-height:1.1; }
          header p { max-width:720px; margin:12px 0 0; color:var(--muted); }
          .count { display:inline-flex; margin-top:18px; padding:6px 11px; border-radius:9px; background:var(--accent); color:white; font-size:13px; font-weight:700; }
          .table-wrap { overflow:hidden; border:1px solid var(--line); border-radius:18px; background:var(--card); box-shadow:0 18px 50px -38px rgba(15,23,42,.5); }
          table { width:100%; border-collapse:collapse; }
          th,td { padding:14px 18px; border-bottom:1px solid var(--line); text-align:left; vertical-align:top; }
          th { background:var(--accent-soft); color:var(--accent); font-size:12px; letter-spacing:.08em; text-transform:uppercase; }
          tr:last-child td { border-bottom:0; }
          tr:hover td { background:color-mix(in srgb,var(--accent-soft) 48%,transparent); }
          a { color:var(--accent); font-weight:650; text-decoration:none; overflow-wrap:anywhere; }
          a:hover { text-decoration:underline; text-underline-offset:3px; }
          .meta { color:var(--muted); white-space:nowrap; }
          footer { margin:22px 4px; color:var(--muted); font-size:13px; }
          @media (max-width:640px) { main{margin:20px auto} header{padding:22px} th,td{padding:12px} .optional{display:none} }
          @media (prefers-color-scheme:dark) { :root{--bg:#090d17;--card:#111827;--text:#f8fafc;--muted:#94a3b8;--line:#243044;--accent:#43d7ae;--accent-soft:#102a27} }
        </style>
      </head>
      <body>
        <main>
          <header>
            <p class="eyebrow">eLan Technology</p>
            <h1>XML Sitemap</h1>
            <p>This page helps search engines discover the public pages on elan-tech.net. Visitors can also use the links below to browse the sitemap.</p>
            <xsl:choose>
              <xsl:when test="s:sitemapindex"><span class="count"><xsl:value-of select="count(s:sitemapindex/s:sitemap)" /> sitemap file</span></xsl:when>
              <xsl:otherwise><span class="count"><xsl:value-of select="count(s:urlset/s:url)" /> indexed URLs</span></xsl:otherwise>
            </xsl:choose>
          </header>

          <div class="table-wrap">
            <xsl:choose>
              <xsl:when test="s:sitemapindex">
                <table>
                  <thead><tr><th>Sitemap file</th></tr></thead>
                  <tbody>
                    <xsl:for-each select="s:sitemapindex/s:sitemap">
                      <tr><td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td></tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:when>
              <xsl:otherwise>
                <table>
                  <thead><tr><th>Page URL</th><th class="optional">Update frequency</th><th class="optional">Priority</th></tr></thead>
                  <tbody>
                    <xsl:for-each select="s:urlset/s:url">
                      <tr>
                        <td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td>
                        <td class="meta optional"><xsl:value-of select="s:changefreq" /></td>
                        <td class="meta optional"><xsl:value-of select="s:priority" /></td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </xsl:otherwise>
            </xsl:choose>
          </div>
          <footer>The XML remains fully compatible with Google Search Console and other search engines.</footer>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
