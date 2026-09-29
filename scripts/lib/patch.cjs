const sharp = require('sharp');

/**
 * Paints a rectangle of an image out with its own surrounding tone, feathered
 * at the edges. Used to lift stock lettering off paper art without disturbing
 * the ornament around it.
 *
 * @param {Buffer} base   PNG buffer to patch.
 * @param {{x0:number,x1:number,y0:number,y1:number}} rect  Fractions of width/height.
 * @param {number} [percentile]  Which luminance percentile counts as "clean"
 *   surface. Lettering is darker than paper, so a high value lands on paper.
 * @param {number} [featherRatio]  Edge softness, as a fraction of the rect's
 *   short side. Keep it low for thin strips or the soft edge swallows the fill.
 * @returns {Promise<Buffer>} PNG buffer.
 */
async function blankRegion(base, rect, percentile = 0.72, featherRatio = 0.28) {
  const { width: W, height: H } = await sharp(base).metadata();

  const rx = Math.round(W * rect.x0);
  const rw = Math.round(W * (rect.x1 - rect.x0));
  const ry = Math.round(H * rect.y0);
  const rh = Math.round(H * (rect.y1 - rect.y0));

  const { data: sample } = await sharp(base)
    .extract({ left: rx, top: ry, width: rw, height: rh })
    .resize(64, 64, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const tone = [0, 1, 2].map((c) => {
    const vals = [];
    for (let i = c; i < sample.length; i += 3) vals.push(sample[i]);
    vals.sort((a, b) => a - b);
    return vals[Math.floor(vals.length * percentile)];
  });

  const fill = await sharp({
    create: { width: rw, height: rh, channels: 3, background: { r: tone[0], g: tone[1], b: tone[2] } },
  })
    .png()
    .toBuffer();

  const feather = Math.max(2, Math.round(Math.min(rw, rh) * featherRatio));
  const mask = await sharp({ create: { width: rw, height: rh, channels: 3, background: '#000' } })
    .composite([
      {
        input: await sharp({
          create: { width: rw - feather * 2, height: rh - feather * 2, channels: 3, background: '#fff' },
        })
          .png()
          .toBuffer(),
        left: feather,
        top: feather,
      },
    ])
    .blur(feather / 2)
    .toColourspace('b-w')
    .raw()
    .toBuffer();

  const patch = await sharp(fill)
    .joinChannel(mask, { raw: { width: rw, height: rh, channels: 1 } })
    .png()
    .toBuffer();

  // sharp resizes before it composites, so patching always gets its own pass.
  return sharp(base).composite([{ input: patch, left: rx, top: ry }]).png().toBuffer();
}

/**
 * Softens a rectangle in place, feathered at the edges. Unlike blankRegion this
 * keeps the underlying shading, so it suits lettering that sits on a curved or
 * lit surface (a wax seal) where a flat fill would read as a patch.
 *
 * @param {Buffer} base  PNG buffer to patch.
 * @param {{x0:number,x1:number,y0:number,y1:number}} rect  Fractions of width/height.
 * @param {number} [sigma]  Blur radius, in source pixels.
 * @param {number} [featherRatio]  Edge softness, as a fraction of the short side.
 * @returns {Promise<Buffer>} PNG buffer.
 */
async function blurRegion(base, rect, sigma = 18, featherRatio = 0.22) {
  const { width: W, height: H } = await sharp(base).metadata();

  const rx = Math.round(W * rect.x0);
  const rw = Math.round(W * (rect.x1 - rect.x0));
  const ry = Math.round(H * rect.y0);
  const rh = Math.round(H * (rect.y1 - rect.y0));

  const softened = await sharp(base)
    .extract({ left: rx, top: ry, width: rw, height: rh })
    .blur(sigma)
    .removeAlpha()
    .png()
    .toBuffer();

  const feather = Math.max(2, Math.round(Math.min(rw, rh) * featherRatio));
  const mask = await sharp({ create: { width: rw, height: rh, channels: 3, background: '#000' } })
    .composite([
      {
        input: await sharp({
          create: { width: rw - feather * 2, height: rh - feather * 2, channels: 3, background: '#fff' },
        })
          .png()
          .toBuffer(),
        left: feather,
        top: feather,
      },
    ])
    .blur(feather / 2)
    .toColourspace('b-w')
    .raw()
    .toBuffer();

  const patch = await sharp(softened)
    .joinChannel(mask, { raw: { width: rw, height: rh, channels: 1 } })
    .png()
    .toBuffer();

  return sharp(base).composite([{ input: patch, left: rx, top: ry }]).png().toBuffer();
}

/**
 * Stamps one region of an image over another of the same size, feathered at the
 * edges. Useful when a clean neighbouring area can stand in for something that
 * has to go — a copy keeps the real texture that a flat fill would lose.
 *
 * @param {Buffer} base  PNG buffer to patch.
 * @param {{x0:number,x1:number,y0:number,y1:number}} from  Source, as fractions.
 * @param {{x0:number,y0:number,x1?:number}} to  Destination, as fractions. Give
 *   `x1` to stretch the slice to that width — a narrow clean column stretched
 *   across beats a wide copy when the source has features you don't want.
 * @param {number} [featherRatio]  Edge softness, as a fraction of the short side.
 * @returns {Promise<Buffer>} PNG buffer.
 */
async function copyRegion(base, from, to, featherRatio = 0.12) {
  const { width: W, height: H } = await sharp(base).metadata();

  const sx = Math.round(W * from.x0);
  const sy = Math.round(H * from.y0);
  const rw = Math.round(W * (from.x1 - from.x0));
  const rh = Math.round(H * (from.y1 - from.y0));
  const dx = Math.round(W * to.x0);
  const dy = Math.round(H * to.y0);

  const dw = to.x1 === undefined ? rw : Math.round(W * (to.x1 - to.x0));

  const slice = await sharp(base)
    .extract({ left: sx, top: sy, width: rw, height: rh })
    .resize({ width: dw, height: rh, fit: 'fill' })
    .removeAlpha()
    .png()
    .toBuffer();

  const feather = Math.max(2, Math.round(Math.min(dw, rh) * featherRatio));
  const mask = await sharp({ create: { width: dw, height: rh, channels: 3, background: '#000' } })
    .composite([
      {
        input: await sharp({
          create: { width: dw - feather * 2, height: rh - feather * 2, channels: 3, background: '#fff' },
        })
          .png()
          .toBuffer(),
        left: feather,
        top: feather,
      },
    ])
    .blur(feather / 2)
    .toColourspace('b-w')
    .raw()
    .toBuffer();

  const patch = await sharp(slice)
    .joinChannel(mask, { raw: { width: dw, height: rh, channels: 1 } })
    .png()
    .toBuffer();

  return sharp(base).composite([{ input: patch, left: dx, top: dy }]).png().toBuffer();
}

module.exports = { blankRegion, blurRegion, copyRegion };
