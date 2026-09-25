const FORM_SUBMIT_URL = 'https://formsubmit.co/ajax/info@elan-tech.net';
const BACKUP_URL = '/api/submit-lead.php';

type LeadFields = Record<string, unknown>;

function submissionId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

async function postBackup(
  id: string,
  formType: string,
  fields: LeadFields,
  notify: boolean,
): Promise<Response> {
  return fetch(BACKUP_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      submissionId: id,
      formType,
      notify,
      fields,
    }),
  });
}

type BackupResult = {
  ok?: boolean;
  stored?: boolean;
  notified?: boolean;
  notificationReliable?: boolean;
};

/**
 * Delivers a lead by email and stores an independent server-side backup.
 * A successful result means at least one channel captured the enquiry.
 */
export async function submitLead(formType: string, fields: LeadFields): Promise<void> {
  const id = submissionId();

  let backupStored = false;
  let reliableServerAlert = false;
  let backupRejected = false;

  try {
    const response = await postBackup(id, formType, fields, true);
    backupRejected = response.status === 400 || response.status === 422;
    const result = response.ok ? await response.json() as BackupResult : null;
    backupStored = Boolean(response.ok && result?.stored);
    reliableServerAlert = Boolean(response.ok && result?.notified && result?.notificationReliable);
  } catch {
    // The independent email fallback below can still capture the lead.
  }

  // Do not bypass server-side validation or privacy acknowledgement by using
  // the external delivery fallback.
  if (backupRejected) {
    throw new Error('The enquiry did not pass server validation');
  }

  let fallbackEmailDelivered = false;
  if (!reliableServerAlert) {
    try {
      const response = await fetch(FORM_SUBMIT_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
      });
      fallbackEmailDelivered = response.ok;
    } catch {
      // The private backup may still have captured the enquiry.
    }
  }

  if (!backupStored && !reliableServerAlert && !fallbackEmailDelivered) {
    throw new Error('No lead-delivery channel was available');
  }
}

export function redirectToThankYou(formType: string): void {
  try {
    sessionStorage.setItem('elan:lead-conversion-pending', JSON.stringify({
      formType,
      createdAt: Date.now(),
    }));
  } catch {
    // The redirect and page-view conversion still work when storage is blocked.
  }

  window.location.assign(`/thank-you/?form=${encodeURIComponent(formType)}`);
}
