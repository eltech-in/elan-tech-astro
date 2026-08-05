import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve('public/social-campaigns/2026-services');
const outputRoot = path.join(root, 'platform-ready');

const campaigns = [
  'custom-ecommerce',
  'accessibility',
  'all-services',
];

const formats = [
  { platform: 'instagram', name: 'landscape-1080x566', width: 1080, height: 566, source: 'horizontal', mode: 'cover' },
  { platform: 'instagram', name: 'feed-1080x1440', width: 1080, height: 1440, source: 'vertical', mode: 'contain' },
  { platform: 'instagram', name: 'story-1080x1920', width: 1080, height: 1920, source: 'story', mode: 'story' },
  { platform: 'facebook', name: 'feed-1200x630', width: 1200, height: 630, source: 'horizontal', mode: 'cover' },
  { platform: 'facebook', name: 'portrait-1080x1350', width: 1080, height: 1350, source: 'vertical', mode: 'contain' },
  { platform: 'facebook', name: 'story-1080x1920', width: 1080, height: 1920, source: 'story', mode: 'story' },
  { platform: 'linkedin', name: 'landscape-1200x627', width: 1200, height: 627, source: 'horizontal', mode: 'cover' },
  { platform: 'linkedin', name: 'portrait-1080x1350', width: 1080, height: 1350, source: 'vertical', mode: 'contain' },
  { platform: 'pinterest', name: 'pin-1000x1500', width: 1000, height: 1500, source: 'vertical', mode: 'contain' },
  { platform: 'whatsapp', name: 'status-1080x1920', width: 1080, height: 1920, source: 'story', mode: 'story' },
];

async function createBlurredBackground(input, width, height) {
  return sharp(input)
    .resize(width, height, { fit: 'cover' })
    .blur(22)
    .modulate({ brightness: 1.08, saturation: 0.82 })
    .toBuffer();
}

async function exportCover(input, output, width, height) {
  await sharp(input)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(output);
}

async function exportContained(input, output, width, height, storySafe = false) {
  const background = await createBlurredBackground(input, width, height);
  const horizontalInset = storySafe ? 54 : 28;
  const verticalInset = storySafe ? 200 : 28;
  const foreground = await sharp(input)
    .resize(width - horizontalInset * 2, height - verticalInset * 2, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      withoutEnlargement: false,
    })
    .png()
    .toBuffer();
  const metadata = await sharp(foreground).metadata();

  await sharp(background)
    .composite([{
      input: foreground,
      left: Math.round((width - metadata.width) / 2),
      top: Math.round((height - metadata.height) / 2),
    }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(output);
}

for (const format of formats) {
  await mkdir(path.join(outputRoot, format.platform), { recursive: true });
}

for (const campaign of campaigns) {
  for (const format of formats) {
    const sourceSuffix = format.source === 'story'
      ? 'story-master'
      : format.source;
    const input = path.join(root, `${campaign}-${sourceSuffix}.png`);
    const output = path.join(
      outputRoot,
      format.platform,
      `${campaign}-${format.name}.jpg`,
    );

    if (format.mode === 'cover') {
      await exportCover(input, output, format.width, format.height);
    } else {
      await exportContained(
        input,
        output,
        format.width,
        format.height,
        format.mode === 'story',
      );
    }
  }
}

console.log(`Exported ${campaigns.length * formats.length} platform-ready campaign images to ${outputRoot}`);
