/* The envelope art ships with another couple's lettering on it.
   Blanks the two printed lines and the wax-seal monogram. */
const sharp = require('sharp');
const fs = require('fs');
const { blankRegion, blurRegion, copyRegion } = require('./lib/patch.cjs');

const REGIONS = [
  // "A Love Letter from / Clara & Elliot"
  { x0: 0.292, x1: 0.686, y0: 0.358, y1: 0.482 },
  // "Open the invitation"
  { x0: 0.336, x1: 0.628, y0: 0.618, y1: 0.688 },
];

// A second card pokes out from under the envelope's bottom edge. The shadow
// band to its left is the same structure, so it stands in cleanly.
const PEEKING_CARD = {
  from: { x0: 0.630, x1: 0.668, y0: 0.660, y1: 0.708 },
  to: { x0: 0.310, x1: 0.628, y0: 0.660 },
};

// The monogram sits on lit, curved wax — softening keeps the shading a flat
// fill would flatten.
const SEAL_MONOGRAM = { x0: 0.432, x1: 0.572, y0: 0.550, y1: 0.600 };

(async () => {
  let buf = await sharp('art/hero.png').png().toBuffer();
  for (const rect of REGIONS) buf = await blankRegion(buf, rect, 0.78, 0.14);
  buf = await blurRegion(buf, SEAL_MONOGRAM, 26, 0.3);
  buf = await copyRegion(buf, PEEKING_CARD.from, PEEKING_CARD.to, 0.1);

  await sharp(buf).resize({ width: 1200 }).webp({ quality: 78 }).toFile('public/img/hero.webp');
  console.log('hero', (fs.statSync('public/img/hero.webp').size / 1024).toFixed(0) + 'kb');
})().catch((e) => { console.error(e); process.exit(1); });
