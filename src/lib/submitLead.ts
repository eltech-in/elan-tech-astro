/**
 * Cloudflare Turnstile site key (public; safe in the code). Empty = Turnstile off.
 * Turning it on needs both halves:
 *   1. this site key, from Cloudflare dashboard → Turnstile → Add widget (hostname elan-tech.net);
 *   2. the secret key, only on the server in elan-tech-private/turnstile-config.php
 *      (see deployment/turnstile-config.example.php). Never put the secret key here.
 */
export const TURNSTILE_SITE_KEY = '0x4AAAAAAGOVIIpasQ5O6BiM';

const LEAD_URL = '/api/submit-lead.php';
const TOKEN_URL = '/api/form-token.php';
const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type LeadFields = Record<string, unknown>;

function submissionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Signed, time-stamped token from our server (spam protection). */
async function fetchFormToken(): Promise<string> {
  try {
    const response = await fetch(TOKEN_URL, { signal: AbortSignal.timeout(10000), headers: { Accept: 'application/json' }, cache: 'no-store' });
    const result = response.ok ? await response.json() as { token?: string } : null;
    return typeof result?.token === 'string' ? result.token : '';
  } catch {
    return '';
  }
}

// The server refuses a token used within 3 seconds of issue or after 6 hours, so the token is
// fetched as soon as a form loads and renewed if the page has been open for hours.
const TOKEN_MIN_MS = 3200;
const TOKEN_MAX_MS = 5 * 3600 * 1000;
let pendingToken: { at: number; token: Promise<string> } | null = null;

function requestToken() {
  pendingToken = { at: Date.now(), token: fetchFormToken() };
  return pendingToken;
}
if (typeof window !== 'undefined') requestToken();

async function formToken(): Promise<string> {
  let current = pendingToken;
  if (!current || Date.now() - current.at > TOKEN_MAX_MS) current = requestToken();
  const token = await current.token;
  if (!token) {
    pendingToken = null;
    return '';
  }
  const wait = TOKEN_MIN_MS - (Date.now() - current.at);
  if (wait > 0 && typeof window !== 'undefined') await new Promise((resolve) => setTimeout(resolve, wait));
  pendingToken = null; // One token per submission.
  return token;
}

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};

/**
 * Cloudflare Turnstile, only when a site key is set. Loads on submit (not on page view) and shows a
 * challenge only if Cloudflare needs one.
 */
async function turnstileToken(): Promise<string> {
  if (!TURNSTILE_SITE_KEY || typeof document === 'undefined') return '';
  const w = window as unknown as { turnstile?: TurnstileApi };
  if (!w.turnstile) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Turnstile unavailable'));
      document.head.appendChild(script);
    });
  }
  const api = w.turnstile;
  if (!api) return '';
  const box = document.createElement('div');
  box.setAttribute('role', 'region');
  box.setAttribute('aria-label', 'Security check');
  box.style.cssText = 'position:fixed;left:50%;bottom:6rem;transform:translateX(-50%);z-index:2147483000;';
  document.body.appendChild(box);
  try {
    return await new Promise<string>((resolve, reject) => {
      const id = api.render(box, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: 'interaction-only',
        callback: (token: string) => { resolve(token); setTimeout(() => api.remove(id), 0); },
        'error-callback': () => reject(new Error('Security check failed')),
        'timeout-callback': () => reject(new Error('Security check timed out')),
      });
    });
  } finally {
    setTimeout(() => box.remove(), 0);
  }
}

type LeadResult = {
  ok?: boolean;
  stored?: boolean;
};

/**
 * Sends a lead to our server, which stores it privately and sends the alert (Brevo, then Gmail).
 * There is no third-party fallback: every enquiry passes the server's validation and spam checks.
 */
export async function submitLead(formType: string, fields: LeadFields): Promise<void> {
  const [token, challenge] = await Promise.all([formToken(), turnstileToken().catch(() => '')]);

  let response: Response;
  try {
    response = await fetch(LEAD_URL, {
      signal: AbortSignal.timeout(20000),
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        submissionId: submissionId(),
        formType,
        notify: true,
        formToken: token,
        turnstileToken: challenge,
        fields,
      }),
    });
  } catch {
    throw new Error('No lead-delivery channel was available');
  }

  if (!response.ok) {
    throw new Error('The enquiry did not pass server validation');
  }
  const result = await response.json().catch(() => null) as LeadResult | null;
  if (!result?.ok || !result.stored) {
    throw new Error('The enquiry was not stored');
  }
}

export function redirectToThankYou(formType: string): void {
  try {
    sessionStorage.setItem('elan:lead-conversion-pending', JSON.stringify({
      formType,
      createdAt: Date.now(),
    }));
  } catch {
    // Still show confirmation, but do not count an unverified thank-you visit.
  }

  // Keep explicit QA sessions in GA4's developer filter after navigation.
  // Without this, the thank-you page loses debug_mode and counts a test lead
  // as ordinary traffic even when the developer exclusion is active.
  const debug = new URLSearchParams(window.location.search).get('analytics_debug') === '1';
  window.location.assign(`/thank-you/?form=${encodeURIComponent(formType)}${debug ? '&analytics_debug=1' : ''}`);
}
