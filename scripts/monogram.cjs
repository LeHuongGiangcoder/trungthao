/* The couple's monogram. The supplied art (art/monogram.ai, PDF inside) is a
   flat brick-red mark on white, which clashes with the green-and-gilt palette,
   so it is turned back into a silhouette and re-inked in the palette's own
   deep green — the colour the couple's names are set in.

   art/monogram.png is a 1600px render of that file, made once with
   `qlmanage -t -s 1600 -o . monogram.ai` (vector, so re-render it larger if
   the mark is ever set bigger than it is now).
   Part of `npm run assets`. */
const sharp = require('sharp');
const fs = require('fs');

const SRC = 'art/monogram.png';
const OUT = 'public/img';

/* Shape green sits near 0x50, the ground is white: anything at or below the
   floor is solid ink, anything at 255 is ground, and the ramp between the two
   is the artwork's own antialiasing. */
const INK_FLOOR = 0x60;

const INKS = {
  /* --c-green-deep: the ink the names are set in. */
  'monogram-green': [0x13, 0x3c, 0x2b],
};

async function run() {
  fs.mkdirSync(OUT, { recursive: true });

  /* Alpha from the green channel, which separates the red mark from the white
     ground most cleanly. */
  const { data, info } = await sharp(SRC)
    .flatten({ background: '#ffffff' })
    .extractChannel('green')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const alpha = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) {
    const t = (255 - data[i]) / (255 - INK_FLOOR);
    alpha[i] = Math.max(0, Math.min(255, Math.round(t * 255)));
  }

  for (const [name, [r, g, b]] of Object.entries(INKS)) {
    /* Flat ink carried by that alpha. Composed here as one RGBA buffer rather
       than through joinChannel, so the resize below acts on a finished image
       and cannot fall out of step with a separate mask. */
    const rgba = Buffer.alloc(data.length * 4);
    for (let i = 0; i < data.length; i++) {
      rgba[i * 4] = r;
      rgba[i * 4 + 1] = g;
      rgba[i * 4 + 2] = b;
      rgba[i * 4 + 3] = alpha[i];
    }

    const out = `${OUT}/${name}.webp`;
    await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
      .resize({ width: 600 })
      .trim({ threshold: 1 })
      .webp({ quality: 90, alphaQuality: 100 })
      .toFile(out);

    const meta = await sharp(out).metadata();
    console.log(name, `${meta.width}x${meta.height}`, (fs.statSync(out).size / 1024).toFixed(0) + 'kb');
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
