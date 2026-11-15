/**
 * Razorpay Payment Button IDs (pl_...). Create them in the Razorpay Dashboard → Payment Buttons.
 *
 * Website audit: paid in full before any request is accepted (decision of 16 November 2026).
 * Each button must collect: name, email, phone, website URL (required) and concerns (optional),
 * so the paid booking itself is the audit request. While an ID is empty, the audit page offers
 * no online request at all, only a WhatsApp link to ask for a payment link.
 */
export const RAZORPAY_BUTTONS = {
  /** Website audit, full fee: INR ₹999 and USD $19 (see src/data/auditPricing.ts). */
  websiteAudit: { INR: '', USD: '' },
  /** Full one-domain accessibility audit package: ₹9,999 and $99. */
  accessibilityAudit: { INR: 'pl_Sqm5fZAebJ6xx7', USD: 'pl_FdcrA4b2oE0mIl' },
} as const;

export const websiteAuditCheckoutReady = Boolean(RAZORPAY_BUTTONS.websiteAudit.INR && RAZORPAY_BUTTONS.websiteAudit.USD);
