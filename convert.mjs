import sharp from 'sharp';

async function run() {
  try {
    await sharp('/Users/nisheeaaru/.gemini/antigravity/brain/f5e687a1-2fe4-4f58-ab7c-c85131c286a1/ai_ab_testing_1777975865164.png').toFormat('avif').toFile('public/blog/ai_ab_testing.avif');
    console.log('1 done');
    await sharp('/Users/nisheeaaru/.gemini/antigravity/brain/f5e687a1-2fe4-4f58-ab7c-c85131c286a1/ai_timeline_1777975880433.png').toFormat('avif').toFile('public/blog/ai_timeline.avif');
    console.log('2 done');
    await sharp('/Users/nisheeaaru/.gemini/antigravity/brain/f5e687a1-2fe4-4f58-ab7c-c85131c286a1/cta_banner_1777975896796.png').toFormat('avif').toFile('public/blog/cta_banner.avif');
    console.log('3 done');
  } catch (err) {
    console.error(err);
  }
}

run();
