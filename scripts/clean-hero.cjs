/* The envelope art ships with another couple's lettering on it. This lifts the
   lettering off without flattening the paper: the envelope stock carries a fine
   emboss, and a flat fill reads as a pasted rectangle against it, so anywhere
   clean textured stock exists at the same height it is copied across instead. */
const sharp = require('sharp');
const fs = require('fs');
const { blankRegion, blurRegion, copyRegion } = require('./lib/patch.cjs');

// "A Love Letter from / Clara & Elliot", on the panel above the lace. The panel
// is bounded by the lace on both sides, so there is no clean stock to copy at
// this height — a toned fill is the only option, and our own names cover it.
const UPPER_NAMES = { x0: 0.292, x1: 0.686, y0: 0.358, y1: 0.482 };

const LOWER_PANEL_RECT = { x0: 0.318, x1: 0.632, y0: 0.608, y1: 0.678 };

// A second card pokes out from under the envelope's bottom edge. By copying
// a clean band of silk from directly below it, we cover it without stretching,
// which avoids creating a blurry rectangular patch.
const PEEKING_CARD = {
  from: { x0: 0.310, x1: 0.628, y0: 0.740, y1: 0.776 },
  to: { x0: 0.310, x1: 0.628, y0: 0.672 },
};

// The monogram sits on lit, curved wax — softening keeps the shading a flat
// fill would flatten.
const SEAL_MONOGRAM = { x0: 0.432, x1: 0.572, y0: 0.550, y1: 0.600 };

(async () => {
  let buf = await sharp('art/hero.png').png().toBuffer();

  buf = await blankRegion(buf, UPPER_NAMES, 0.78, 0.14);
  buf = await blankRegion(buf, LOWER_PANEL_RECT, 0.8, 0.25);
  buf = await copyRegion(buf, PEEKING_CARD.from, PEEKING_CARD.to, 0.1);
  buf = await blurRegion(buf, SEAL_MONOGRAM, 26, 0.3);

  await sharp(buf).resize({ width: 1200 }).webp({ quality: 78 }).toFile('public/img/hero.webp');
  console.log('hero', (fs.statSync('public/img/hero.webp').size / 1024).toFixed(0) + 'kb');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
