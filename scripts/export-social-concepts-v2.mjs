import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve('public/social-campaigns/2026-services/concepts-v2');
const width = 1080;
const height = 1350;

const files = (await fs.readdir(sourceDir))
  .filter((file) => file.endsWith('.png'))
  .sort();

for (const file of files) {
  const input = path.join(sourceDir, file);
  const output = path.join(sourceDir, file.replace(/\.png$/, '-1080x1350.jpg'));

  const background = await sharp(input)
    .resize(width, height, { fit: 'cover' })
    .blur(28)
    .modulate({ brightness: 1.03, saturation: 0.82 })
    .toBuffer();

  const foreground = await sharp(input)
    .resize(width, height, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp(background)
    .composite([{ input: foreground, gravity: 'center' }])
    .jpeg({ quality: 91, chromaSubsampling: '4:4:4' })
    .toFile(output);

  console.log(path.relative(process.cwd(), output));
}
