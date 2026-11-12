// The Dubai visit. One place for the dates, so the banner, the trip page and
// the build checks cannot disagree. After the visit, delete TripBanner from
// BaseLayout; the /dubai/ page can stay for people who kept the QR code.
export const dubaiTrip = {
  city: 'Dubai',
  /** Shown to visitors. */
  dateLabel: '6–12 December 2026',
  /** Last moment of the visit, in UAE time. The banner hides itself after this. */
  endsAt: '2026-12-12T23:59:59+04:00',
  pageUrl: '/dubai/',
  whatsappUrl: 'https://wa.me/918788834630?text=' + encodeURIComponent('Hi eLan Technology, I would like to meet during your Dubai visit (6–12 December 2026).'),
};
