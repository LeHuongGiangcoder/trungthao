/* The lace sheet ships as two identical vertical strips side by side on one
   square canvas. Only one is needed — as a trim laid down the edge of the
   gallery's main print — so the left strip is cut out on its own. Bounds come
   from the alpha channel rather than being hardcoded, so a re-export of the
   sheet at another size still works. */
const sharp = require('sharp');
const fs = require('fs');

const SRC = 'art/trim/lace.png';
const OUT = 'public/img/lace-strip.webp';
/* The same strip turned on its side, for the top and bottom edges of a frame.
   Rotating in CSS would rotate about the centre and make the sizing of a strip
   this long and thin unmanageable, so both orientations ship as assets. */
const OUT_H = 'public/img/lace-strip-h.webp';

async function run() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;

  const col = new Array(W).fill(0);
  const row = new Array(H).fill(0);
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      if (data[(y * W + x) * 4 + 3] > 40) {
        col[x] += 1;
        row[y] += 1;
      }
    }
  }

  // Runs of occupied columns are the strips; take the first.
  const runs = [];
  let start = null;
  for (let x = 0; x < W; x += 1) {
    const on = col[x] > 0;
    if (on && start === null) start = x;
    if (!on && start !== null) {
      runs.push([start, x - 1]);
      start = null;
    }
  }
  if (start !== null) runs.push([start, W - 1]);
  if (!runs.length) throw new Error('no lace found in ' + SRC);

  const [x0, x1] = runs[0];
  const y0 = row.findIndex((v) => v > 0);
  let y1 = H - 1;
  while (y1 > 0 && row[y1] === 0) y1 -= 1;

  const crop = { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };

  await sharp(SRC)
    .extract(crop)
    .resize({ height: 1400, withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 95 })
    .toFile(OUT);

  await sharp(SRC)
    .extract(crop)
    .resize({ height: 1400, withoutEnlargement: true })
    .rotate(90)
    .webp({ quality: 88, alphaQuality: 95 })
    .toFile(OUT_H);

  for (const f of [OUT, OUT_H]) {
    const meta = await sharp(f).metadata();
    console.log(f.split('/').pop(), `${meta.width}x${meta.height}`, (fs.statSync(f).size / 1024).toFixed(0) + 'kb');
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
