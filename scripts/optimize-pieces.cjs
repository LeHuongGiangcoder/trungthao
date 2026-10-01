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
    /* Resize before trimming, not after. Several of these renders carry a very
       faint halo over the whole canvas; trimming at full size keeps it (it is
       inside the crop) and the downscale then amplifies it until the piece is
       a near-opaque block — piece-4 came out at alpha 176 that way. Resizing
       first lets the trim cut the halo off, which is both the correct cutout
       and the reason the outputs are a little smaller than the cap. */
    const buf = await sharp(`art/piece/${n}.png`)
      .resize({ width: WIDTH[n] ?? 900, withoutEnlargement: true })
      .png()
      .toBuffer();

    const out = path.join(OUT, `piece-${n}.webp`);
    await sharp(buf).trim({ threshold: 1 }).webp({ quality: 86, alphaQuality: 92 }).toFile(out);

    const meta = await sharp(out).metadata();
    console.log(`piece-${n}`, `${meta.width}x${meta.height}`, (fs.statSync(out).size / 1024).toFixed(0) + 'kb');
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
