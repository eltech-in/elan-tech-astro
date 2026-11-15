# New card portrait — 21 October 2026

Used the user-supplied 500×500 `public/images/nishant-pp01.avif` unmodified in Studio, Midnight and Aurora. Classic and the existing social-preview graphic retain the original image. Shared contact details, service content and randomisation are unchanged.

Both portrait placements use native picture sources, enabled by a synchronous adjacent inline script for the three newer variants. Without JavaScript, the existing Classic fallback and original image remain usable. No additional visitor storage or tracking is introduced.

Browser confirmed loaded `currentSrc` for all four variants: Studio/Midnight/Aurora use `nishant-pp01.avif`, Classic uses `nishant-barde.avif`. Aurora desktop crop inspected; all variants at 390px have no horizontal overflow. Build and verification checks passed.

Full ZIP contains the new photo and matching built HTML/assets, plus hidden `.htaccess` and `robots.txt`. No upload or Git commit performed.
