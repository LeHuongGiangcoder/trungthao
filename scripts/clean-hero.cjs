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

// "Open the invitation", on the lower flap. A toned fill or a blur both leave a
// smooth rectangle against the stock's emboss, which is the one thing that
// shows, so clean textured flap is copied across instead. Every same-height
// region has a diagonal seam sweeping through it, so the copy carries a faint
// second fold — far less visible than a flat patch, and plausible on paper.
const LOWER_PANEL = {
  from: { x0: 0.600, x1: 0.872, y0: 0.608, y1: 0.678 },
  to: { x0: 0.318, x1: 0.632, y0: 0.608 },
};

// A second card pokes out from under the envelope's bottom edge. The shadow
// band beside it is the same structure, so it stands in cleanly.
const PEEKING_CARD = {
  from: { x0: 0.630, x1: 0.668, y0: 0.672, y1: 0.708 },
  to: { x0: 0.310, x1: 0.628, y0: 0.672 },
};

// The monogram sits on lit, curved wax — softening keeps the shading a flat
// fill would flatten.
const SEAL_MONOGRAM = { x0: 0.432, x1: 0.572, y0: 0.550, y1: 0.600 };

(async () => {
  let buf = await sharp('art/hero.png').png().toBuffer();

  buf = await blankRegion(buf, UPPER_NAMES, 0.78, 0.14);
  buf = await copyRegion(buf, LOWER_PANEL.from, LOWER_PANEL.to, 0.08);
  buf = await copyRegion(buf, PEEKING_CARD.from, PEEKING_CARD.to, 0.1);
  buf = await blurRegion(buf, SEAL_MONOGRAM, 26, 0.3);

  await sharp(buf).resize({ width: 1200 }).webp({ quality: 78 }).toFile('public/img/hero.webp');
  console.log('hero', (fs.statSync('public/img/hero.webp').size / 1024).toFixed(0) + 'kb');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
