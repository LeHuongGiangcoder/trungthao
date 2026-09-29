/* Asset pipeline, step 1 of 2: source PNGs in art/ (3375x6000, 10-22MB) ->
   web-ready webp in public/img. Run `npm run assets` to do both steps in order;
   the cleanup scripts overwrite hero, el-5 and el-9 afterwards. */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = 'public/img';
fs.mkdirSync(OUT, { recursive: true });

const BACKDROPS = [
  ['art/hero.png', 'hero'],
  ['art/background/1.png', 'bg-damask'],
  ['art/background/2.png', 'bg-drape'],
  ['art/background/3.png', 'bg-damask-green'],
];

async function run() {
  for (const [src, name] of BACKDROPS) {
    const out = path.join(OUT, `${name}.webp`);
    await sharp(src).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 76 }).toFile(out);
    console.log(name, (fs.statSync(out).size / 1024).toFixed(0) + 'kb');
  }

  for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    const src = `art/element/${n}.png`;
    let img = sharp(src).trim({ threshold: 1 });
    const buf = await img.png().toBuffer();
    const meta = await sharp(buf).metadata();
    const out = path.join(OUT, `el-${n}.webp`);
    await sharp(buf)
      .resize({ width: Math.min(meta.width, 900), withoutEnlargement: true })
      .webp({ quality: 84, alphaQuality: 90 })
      .toFile(out);
    console.log(`el-${n}`, `${meta.width}x${meta.height}`, (fs.statSync(out).size / 1024).toFixed(0) + 'kb');
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
