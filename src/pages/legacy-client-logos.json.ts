// Old client-logo URLs (src/data/legacy-assets.json) and the current address of each original.
// Reading each image's `src` makes Astro emit the untouched original (since Astro 7.4 it only
// emits resized versions of images that are never referenced directly), and
// scripts/restore-legacy-assets.mjs turns this list into 301 redirects in dist/.htaccess.
import type { APIRoute } from 'astro';
import inventory from '../data/legacy-assets.json';

const logos = import.meta.glob<{ default: ImageMetadata }>('../assets/client-logos/*.avif', { eager: true });

export const GET: APIRoute = () => {
  const map: Record<string, string> = {};
  for (const [legacyPath, sourceName] of Object.entries(inventory as Record<string, string>)) {
    const image = logos[`../assets/client-logos/${sourceName}`];
    if (!image) throw new Error(`Missing client logo for ${legacyPath}`);
    map[legacyPath] = image.default.src;
  }
  return new Response(JSON.stringify(map, null, 2), { headers: { 'Content-Type': 'application/json' } });
};
