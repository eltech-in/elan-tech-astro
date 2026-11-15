# Aurora dark card — 21 October 2026

Added a fourth design without replacing Classic, Studio or Midnight. Aurora uses a plum/charcoal palette, champagne/lilac/lime highlights, an oversized portrait medallion with decorative orbit details, an asymmetric desktop split and compact mobile identity composition. Social links have coloured treatments at rest. Contact controls retain full colour and the fixed mobile 2×2 arrangement.

All content, services, contact details, QR, share behaviour, canonical and schema are shared. Browser comparison confirmed exact `.profile-card` textContent equality with Classic. The new wrapper classes do not alter existing variants.

The normal card URL selects one of four designs independently per full load (approximately 25% each); repeats are possible. No storage, tracking or additional requests. The default Classic remains usable without JavaScript. Review Aurora with `#design=aurora`, reloading after a hash-only change.

Verification: production build; 176 build checks; canonical/resource and measurement/lead-delivery tests; random-selection tests updated for all four outcomes. Type check: zero errors, zero warnings, two pre-existing hints. Desktop 1280px and mobile 390px have no document overflow. Mobile name is visible at y=315; all four actions are visible between y=719 and y=823 on an 844px viewport. QR modal opens/closes.

Screenshots: `card-aurora-desktop.jpg`, `card-aurora-mobile.jpg`. Full upload ZIP includes previous approved work, `.htaccess`, `robots.txt` and matching assets. No production deployment or Git commit performed.
