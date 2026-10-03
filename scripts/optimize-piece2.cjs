/* Second batch of collage art: named transparent PNGs in art/piece2 ->
   trimmed web-ready webp in public/img. Same shape as optimize-pieces.cjs,
   but these sources arrived named rather than numbered.
   Part of `npm run assets`. */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = 'public/img';
fs.mkdirSync(OUT, { recursive: true });

/* The frames carry a composition and are seen large, so they are allowed more
   pixels than the florals laid beside them. */
const WIDTH = {
  'gallery-frame': 1300,
  'hero-save-the-date': 1000,
  'hero-oval-doily': 1000,
  'hero-heart-doily': 1000,
};

async function run() {
  const names = fs
    .readdirSync('art/piece2')
    .filter((f) => f.endsWith('.png'))
    .map((f) => f.replace(/\.png$/, ''))
    .sort();

  for (const name of names) {
    /* Resize before trimming, as in optimize-pieces: these renders carry a
       faint full-canvas halo that a full-size trim would keep. */
    const buf = await sharp(`art/piece2/${name}.png`)
      .resize({ width: WIDTH[name] ?? 900, withoutEnlargement: true })
      .png()
      .toBuffer();

    const out = path.join(OUT, `${name}.webp`);
    await sharp(buf).trim({ threshold: 1 }).webp({ quality: 86, alphaQuality: 92 }).toFile(out);

    const meta = await sharp(out).metadata();
    console.log(`${name}`, `${meta.width}x${meta.height}`, (fs.statSync(out).size / 1024).toFixed(0) + 'kb');
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
