import type { ImageMetadata } from 'astro';

const portfolioImages = import.meta.glob('../assets/portfolio/*', {
  eager: true,
  import: 'default',
}) as Record<string, ImageMetadata>;

const clientLogos = import.meta.glob('../assets/client-logos/*', {
  eager: true,
  import: 'default',
}) as Record<string, ImageMetadata>;

function resolveImage(
  logicalPath: string,
  publicPrefix: string,
  assetDirectory: string,
  images: Record<string, ImageMetadata>,
) {
  const filename = logicalPath.replace(publicPrefix, '');
  const image = images[`../assets/${assetDirectory}/${filename}`];

  if (!image) {
    throw new Error(`Missing image asset for ${logicalPath}`);
  }

  return image;
}

export const getPortfolioImage = (logicalPath: string) =>
  resolveImage(logicalPath, '/portfolio/', 'portfolio', portfolioImages);

export const getClientLogo = (logicalPath: string) =>
  resolveImage(logicalPath, '/elan-client-logos/', 'client-logos', clientLogos);

export const getProjectImage = (logicalPath: string) =>
  logicalPath.startsWith('/elan-client-logos/')
    ? getClientLogo(logicalPath)
    : getPortfolioImage(logicalPath);
