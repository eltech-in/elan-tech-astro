/** Campaign URLs are for external distribution, never internal navigation or schema. */
export function campaignUrl(url: string, source: string, medium: string, campaign: string, content?: string): string {
  const target = new URL(url);
  for (const [key, value] of Object.entries({ utm_source: source, utm_medium: medium, utm_campaign: campaign, utm_content: content })) {
    if (value) target.searchParams.set(key, value);
  }
  return target.href;
}
