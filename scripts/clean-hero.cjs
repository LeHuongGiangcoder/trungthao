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

// "Open the invitation", on the lower flap. A toned fill leaves a smooth
// rectangle against the stock's emboss — that patch is the single most visible
// thing on the whole image — so clean textured flap is copied across instead.
// It stops at y 0.671, just above the envelope's bottom edge.
const LOWER_PANEL = {
  from: { x0: 0.600, x1: 0.872, y0: 0.608, y1: 0.671 },
  to: { x0: 0.318, x1: 0.632, y0: 0.608 },
};

// NOTHING is painted below the envelope's bottom edge. The original photograph
// is uniform there — measured across the full width, 188-205 of 255 with no
// step. Every "peeking card" reported so far has been a patch put there by this
// script: a slab of silk lifted up over the contact shadow reads as a pale card
// sticking out, which is the very thing it was meant to remove.

// The monogram sits on lit, curved wax — softening keeps the shading a flat
// fill would flatten.
const SEAL_MONOGRAM = { x0: 0.432, x1: 0.572, y0: 0.550, y1: 0.600 };

(async () => {
  let buf = await sharp('art/hero.png').png().toBuffer();

  buf = await blankRegion(buf, UPPER_NAMES, 0.78, 0.14);
  buf = await copyRegion(buf, LOWER_PANEL.from, LOWER_PANEL.to, 0.08);
  buf = await blurRegion(buf, SEAL_MONOGRAM, 26, 0.3);

  await sharp(buf).resize({ width: 1200 }).webp({ quality: 78 }).toFile('public/img/hero.webp');
  console.log('hero', (fs.statSync('public/img/hero.webp').size / 1024).toFixed(0) + 'kb');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
