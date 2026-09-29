const sharp = require('sharp');
const { blankRegion, blurRegion, copyRegion } = require('./scripts/lib/patch.cjs');
const fs = require('fs');
const UPPER_NAMES = { x0: 0.292, x1: 0.686, y0: 0.358, y1: 0.482 };
const LOWER_PANEL = { x0: 0.318, x1: 0.632, y0: 0.608, y1: 0.678 };
const PEEKING_CARD = { x0: 0.310, x1: 0.628, y0: 0.672, y1: 0.708 };
const SEAL_MONOGRAM = { x0: 0.432, x1: 0.572, y0: 0.550, y1: 0.600 };

(async () => {
  let buf = await sharp('art/hero.png').png().toBuffer();
  buf = await blankRegion(buf, UPPER_NAMES, 0.78, 0.14);
  // Instead of copyRegion, let's just blur the LOWER_PANEL and PEEKING_CARD heavily
  buf = await blurRegion(buf, LOWER_PANEL, 20, 0.2);
  buf = await blurRegion(buf, PEEKING_CARD, 20, 0.2);
  buf = await blurRegion(buf, SEAL_MONOGRAM, 26, 0.3);
  await sharp(buf).resize({ width: 1200 }).webp({ quality: 78 }).toFile('public/img/hero-test.webp');
  console.log('done');
})();
