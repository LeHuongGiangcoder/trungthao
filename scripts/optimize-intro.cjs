/* The intro's art: named transparent PNGs in art/intro -> trimmed web-ready
   webp in public/img. Same shape as optimize-piece2.cjs.
   Part of `npm run assets`. */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = 'public/img';
fs.mkdirSync(OUT, { recursive: true });

/* The envelope and the card fill most of the screen; the seal, the monogram
   and the ampersand are small marks laid on top of them. */
const WIDTH = {
  'intro-envelope-back': 1200,
  'intro-envelope-front': 1200,
  'intro-lace-card': 1200,
  'intro-oval-doily': 1000,
  'intro-save-the-date': 1100,
  'intro-wax-seal': 500,
  'intro-monogram': 500,
  'intro-ampersand': 400,
};

/* The envelope's front pocket arrives at about 65% opacity, so the card and
   the doily behind it read straight through the paper and the stack stops
   looking like an envelope at all. Its alpha is pushed back to solid where
   there is paper, keeping the feathered rim that the lower end of the ramp
   covers.
   The lace card is deliberately NOT in here. It is a full-width rectangle
   laid on the green, and at full opacity its own straight edge reads as a
   hard cream slab down both sides of the screen; left as drawn it stays a
   wash that settles into the damask. The lettering, the seal and the
   monogram are ink, and are left exactly as drawn too. */
const SOLID = new Set(['envelope-front']);
const SOLID_FROM = 150; // alpha at and above this becomes fully opaque

async function harden(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 3; i < data.length; i += info.channels) {
    const a = data[i];
    data[i] = a < 30 ? 0 : Math.min(255, Math.round((a * 255) / SOLID_FROM));
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png()
    .toBuffer();
}

async function run() {
  const names = fs
    .readdirSync('art/intro')
    .filter((f) => f.endsWith('.png'))
    .map((f) => f.replace(/\.png$/, ''))
    .sort();

  for (const name of names) {
    const out = `intro-${name}`;
    /* Trim first: these are 9:16 export frames, so each piece sits in a sea
       of transparency that would otherwise eat the resize budget. */
    let buf = await sharp(`art/intro/${name}.png`).trim({ threshold: 1 }).png().toBuffer();
    if (SOLID.has(name)) buf = await harden(buf);

    const file = path.join(OUT, `${out}.webp`);
    await sharp(buf)
      .resize({ width: WIDTH[out] ?? 900, withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 92 })
      .toFile(file);

    const meta = await sharp(file).metadata();
    console.log(out, `${meta.width}x${meta.height}`, (fs.statSync(file).size / 1024).toFixed(0) + 'kb');
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
