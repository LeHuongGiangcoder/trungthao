/* Asset pipeline for the envelope collage: source PNGs in art/piece
   (3375x6000, 3-15MB, transparent) -> trimmed web-ready webp in public/img.
   Part of `npm run assets`. */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = 'public/img';
fs.mkdirSync(OUT, { recursive: true });

/* The envelope, the frames and the thank-you oval carry their compositions, so
   they are allowed more pixels than the florals laid around them. */
const WIDTH = { 5: 1100, 6: 1400, 7: 1100, 8: 1000, 13: 1000, 16: 1100 };

async function run() {
  /* Every numbered source in art/piece, so dropping a new one in and re-running
     is all it takes. */
  const nums = fs
    .readdirSync('art/piece')
    .map((f) => Number(f.replace(/\.png$/, '')))
    .filter((n) => Number.isInteger(n))
    .sort((a, b) => a - b);

  for (const n of nums) {
    const buf = await sharp(`art/piece/${n}.png`).trim({ threshold: 1 }).png().toBuffer();
    const meta = await sharp(buf).metadata();
    const out = path.join(OUT, `piece-${n}.webp`);
    await sharp(buf)
      .resize({ width: Math.min(meta.width, WIDTH[n] ?? 900), withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 92 })
      .toFile(out);
    console.log(`piece-${n}`, `${meta.width}x${meta.height}`, (fs.statSync(out).size / 1024).toFixed(0) + 'kb');
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
