# Search Console indexing review — 1 October 2026

## Outcome

The supplied redirect and 404 reports describe historical crawl results. All 166 unique URLs were checked against the public live site on 1 October. None currently ended in a 404 or 403: 159 reached a working page and seven retired WordPress URLs correctly returned 410 Gone. This is not a claim that every URL is indexed or that every Googlebot location receives the same response.

Search Console's page-indexing report was last updated on 21 September. Its failed 404 validation started on 8 August and failed on 5 September. The two failed examples were `/portfolio/case-study/puritas` and `/portfolio/case-study/77mishti`. Both now redirect to the working portfolio. Google's live inspection of Puritas on 1 October explicitly returned “URL is available to Google.” The live inspection follows redirects; the old case-study URL should not become an independently indexed page.

## Actions completed in Search Console

- Restarted the failed **Not found (404)** validation. Verified “Validation Started”, dated 1 October, with 28 pending and zero failed in the new run. This is not a passed validation yet.
- Started **Blocked by robots.txt** validation. Verified “Validation Started”, dated 1 October. Current robots rules no longer block the request-demo or consultation URLs. These form pages deliberately remain noindex.
- Preserved the already-running **403** validation. Checked all six listed historical examples: each now reaches a working 200 page in one redirect.
- Verified the submitted sitemap index is already **Success**, last read 25 September, with 98 discovered pages. No duplicate sitemap was submitted and no removal request was made.
- Preserved deliberate noindex directives. All 27 examples in that report are search or quote-form URLs, including query variants. Making these indexable would create search clutter rather than solve a defect.
- Preserved deliberate redirects. URLs without a trailing slash, retired case studies and legacy aliases should redirect; their final destinations are the pages intended for indexing.

## Live sitemap audit

All 98 URLs in the current live sitemap passed these checks:

1. Final HTTP status 200.
2. Zero redirects from the sitemap URL.
3. No HTML robots noindex directive.
4. Canonical URL exactly matches the sitemap URL.

The live robots file permits ordinary public pages and declares the correct sitemap index. No broad Googlebot bypass, security reduction or production file overwrite was needed during this review.

## Why validations were failing

A redirect validation cannot be made to pass by leaving the same intended redirects in place: the old URLs remain “Page with redirect” by design. Likewise, validating removal of deliberate noindex will continue to fail while those useful noindex instructions remain. The report's overall excluded-page count is not a count of broken business pages.

The earlier 404 failure was genuine at the recorded crawl date, but the live permanent redirects now address those two examples. Seven obsolete festival/social/tag URLs have no equivalent content and correctly return 410. An additional retired `/category/social-media/` URL found in the robots report currently returns a genuine 404 and is not in the sitemap; it should not be redirected to unrelated sales content just to clear an exclusion.

## Durable maintenance rules

- Keep one canonical format: HTTPS, non-www, trailing slash for HTML pages.
- Keep sitemap entries and internal links pointed at final destinations, never retired redirects, internal search results or noindex form pages.
- Retain relevant legacy permanent redirects. Use 404/410 where no appropriate replacement exists.
- Do not repeatedly validate deliberate redirect/noindex categories. Review **All submitted pages** to focus on intended indexable content.
- Run the added read-only audit after each production deployment. The sitemap mode exits unsuccessfully if a sitemap entry redirects, lacks a matching canonical, has HTML noindex or fails to load.
- Inspect a representative changed canonical URL with Google's live test after deployment. A successful HTTP audit is not a guarantee of indexing or rankings.
- Allow Google to finish the two validations started today. The 410 URLs may remain excluded, which is correct. Any future failed example should be investigated individually rather than clearing exclusions by redirecting everything to the homepage.

## Scope and outstanding work

This turn changed Search Console validation state and added reusable local audit tooling and evidence. It did not upload the previously prepared website, analytics or content changes. The 11 crawled-but-not-indexed and three discovered-but-not-indexed URLs require separate content/indexing assessment; this technical audit does not resolve or guarantee their indexing.

The audit CSVs record the exact checked URLs and final destinations. The public Google guidance recommends permanent redirects for moved content and 404/410 for removed content without a replacement:
https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors
