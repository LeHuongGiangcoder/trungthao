/* Debug helper: overlay a labelled percentage grid on a region of an image. */
const sharp = require('sharp');
const [src, out, y0s, y1s] = process.argv.slice(2);
const y0 = Number(y0s ?? 0), y1 = Number(y1s ?? 1);
(async () => {
  const m0 = await sharp(src).metadata();
  const top = Math.round(m0.height * y0);
  const h = Math.round(m0.height * (y1 - y0));
  const b = await sharp(src).extract({ left: 0, top, width: m0.width, height: h }).resize({ width: 900 }).png().toBuffer();
  const m = await sharp(b).metadata();
  const L = [];
  for (let i = 1; i < 20; i++) {
    const x = (m.width * i) / 20;
    L.push(`<line x1="${x}" y1="0" x2="${x}" y2="${m.height}" stroke="red" stroke-width="1" opacity="0.6"/>`);
    L.push(`<text x="${x + 2}" y="${m.height - 4}" font-size="11" fill="red">${i * 5}</text>`);
  }
  for (let i = 1; i < 20; i++) {
    const y = (m.height * i) / 20;
    const pct = (y0 + (y1 - y0) * (i / 20)) * 100;
    L.push(`<line x1="0" y1="${y}" x2="${m.width}" y2="${y}" stroke="blue" stroke-width="1" opacity="0.6"/>`);
    L.push(`<text x="3" y="${y - 3}" font-size="11" fill="blue">${pct.toFixed(1)}</text>`);
  }
  await sharp(b)
    .composite([{ input: Buffer.from(`<svg width="${m.width}" height="${m.height}">${L.join('')}</svg>`) }])
    .png()
    .toFile(out);
})();
