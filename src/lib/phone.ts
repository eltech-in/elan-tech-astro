// Phone / WhatsApp is required on every enquiry form (owner, 27 Nov 2026).
// The same rule runs on the server in public/api/submit-lead.php and razorpay-order.php.
export const PHONE_LABEL = 'Phone / WhatsApp';
export const PHONE_REQUIRED = 'Please enter a phone or WhatsApp number, with the country code.';
export const PHONE_INVALID = 'Please enter a valid phone or WhatsApp number.';

/** 7 to 15 digits; spaces, +, -, ( and ) allowed. */
export function phoneError(value: string): string | undefined {
  const v = value.trim();
  if (!v) return PHONE_REQUIRED;
  const digits = v.replace(/\D/g, '').length;
  if (!/^\+?[\d\s()-]{7,22}$/.test(v) || digits < 7 || digits > 15) return PHONE_INVALID;
  return undefined;
}
