# Midnight digital card — 21 October 2026

- Added a third, dark visual variant (`midnight`) to the existing canonical card URL. The shared content, contact record, Person schema, service links and handlers are unchanged.
- Navy panels, mint/blue/copper highlights, framed portrait, full-colour contact controls, dark privacy/DPDP sections and deliberately white QR background.
- The palette is local to this card variant and overrides the saved site light/dark preference without changing that preference. Classic and Studio remain unchanged.
- Random selection now gives each of Classic, Studio and Midnight approximately one-third probability per full page load. No cookies, identifiers, storage or additional network requests. Repeat outcomes are possible. No mid-visit switching.
- Force a preview with `/about/nishant-barde/#design=midnight`; reload if changing only the hash. Use the plain URL for random public distribution.
- Build and 176 checks passed. Dedicated random selector tests exercise all three outcomes, hash allowlisting and no-storage behaviour. Canonical/resource audit passed; type check has zero errors/warnings and two existing hints.
- Browser: no horizontal overflow at 390px or 1280px. All four mobile actions remain in the viewport; QR opens/closes. Actual computed palette confirmed dark even under saved light preference. Shared `.profile-card` textContent exactly matches Classic. Classic light palette confirmed unaffected.
- Preview screenshots: `card-midnight-desktop.jpg` and `card-midnight-mobile.jpg`.
- Upload ZIP includes the complete existing build plus this addition, including `.htaccess` and `robots.txt`. No production upload or Git commit performed.
