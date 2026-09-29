/* Removes baked-in sample text from two source elements so they can carry real copy.
   el-5: deckled paper card -> blank the lettering, keep the ornate frame.
   el-9: botanical frame     -> erase the stock watermark. */
const sharp = require('sharp');
const fs = require('fs');

const TEXT_5 = { x0: 0.170, x1: 0.848, y0: 0.178, y1: 0.902 };
const MARK_9 = { x0: 0.340, x1: 0.640, y0: 0.790, y1: 0.868 };

async function blankPaper() {
  const src = sharp('art/element/5.png').trim({ threshold: 1 });
  const base = await src.png().toBuffer();
  const { width: W, height: H } = await sharp(base).metadata();

  const rx = Math.round(W * TEXT_5.x0), rw = Math.round(W * (TEXT_5.x1 - TEXT_5.x0));
  const ry = Math.round(H * TEXT_5.y0), rh = Math.round(H * (TEXT_5.y1 - TEXT_5.y0));

  // Sample the paper tone from the lettered area itself: type is darker than the
  // stock, so a high percentile of each channel lands on clean paper.
  const { data: sample } = await sharp(base)
    .extract({ left: rx, top: ry, width: rw, height: rh })
    .resize(64, 64, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const paper = [0, 1, 2].map((c) => {
    const vals = [];
    for (let i = c; i < sample.length; i += 3) vals.push(sample[i]);
    vals.sort((a, b) => a - b);
    return vals[Math.floor(vals.length * 0.72)];
  });

  const strip = await sharp({
    create: { width: rw, height: rh, channels: 3, background: { r: paper[0], g: paper[1], b: paper[2] } },
  }).png().toBuffer();

  // Feathered mask so the patch melts into the surrounding paper.
  const feather = Math.round(Math.min(rw, rh) * 0.06);
  const mask = await sharp({ create: { width: rw, height: rh, channels: 3, background: '#000' } })
    .composite([{
      input: await sharp({
        create: { width: rw - feather * 2, height: rh - feather * 2, channels: 3, background: '#fff' },
      }).png().toBuffer(),
      left: feather,
      top: feather,
    }])
    .blur(feather / 2)
    .toColourspace('b-w')
    .raw()
    .toBuffer();

  const patch = await sharp(strip).joinChannel(mask, { raw: { width: rw, height: rh, channels: 1 } }).png().toBuffer();

  // sharp resizes before it composites, so the patch is applied in its own pass.
  const patched = await sharp(base).composite([{ input: patch, left: rx, top: ry }]).png().toBuffer();

  await sharp(patched)
    .resize({ width: Math.min(W, 900) })
    .webp({ quality: 88, alphaQuality: 95 })
    .toFile('public/img/el-5.webp');
  console.log('el-5', (fs.statSync('public/img/el-5.webp').size / 1024).toFixed(0) + 'kb');
}

async function unmarkFrame() {
  const base = await sharp('art/element/9.png').trim({ threshold: 1 }).png().toBuffer();
  const { width: W, height: H } = await sharp(base).metadata();
  const rx = Math.round(W * MARK_9.x0), rw = Math.round(W * (MARK_9.x1 - MARK_9.x0));
  const ry = Math.round(H * MARK_9.y0), rh = Math.round(H * (MARK_9.y1 - MARK_9.y0));
  // Background is already transparent here, so zeroing alpha in the rect is enough.
  const { data } = await sharp(base).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let y = ry; y < ry + rh; y++) {
    for (let x = rx; x < rx + rw; x++) data[(y * W + x) * 4 + 3] = 0;
  }

  await sharp(data, { raw: { width: W, height: H, channels: 4 } })
    .resize({ width: Math.min(W, 900) })
    .webp({ quality: 86, alphaQuality: 92 })
    .toFile('public/img/el-9.webp');
  console.log('el-9', (fs.statSync('public/img/el-9.webp').size / 1024).toFixed(0) + 'kb');
}

Promise.all([blankPaper(), unmarkFrame()]).catch((e) => { console.error(e); process.exit(1); });
