/* The two marks that head the sections: a pearl flower and a marble cherub.
   art/ornament/*.png -> trimmed web-ready webp in public/img/v2.

   They arrive as square exports with the object floating in transparency, so
   the trim is what makes them sit on a text baseline rather than in a box of
   their own padding.
   Part of `npm run assets`. */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'art/ornament';
const OUT = 'public/img/v2';

/* Both are set at roughly 2.75rem tall against a 480px stage, so a little
   over 600px covers a 3x screen with room to spare. */
const WIDTH = 640;

async function run() {
  fs.mkdirSync(OUT, { recursive: true });

  const names = fs
    .readdirSync(SRC)
    .filter((f) => f.endsWith('.png'))
    .map((f) => f.replace(/\.png$/, ''))
    .sort();

  for (const name of names) {
    const out = path.join(OUT, `ornament-${name}.webp`);

    await sharp(path.join(SRC, `${name}.png`))
      .trim({ threshold: 1 })
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: 88, alphaQuality: 94 })
      .toFile(out);

    const meta = await sharp(out).metadata();
    console.log(
      `ornament-${name}`.padEnd(20),
      `${meta.width}x${meta.height}`,
      (fs.statSync(out).size / 1024).toFixed(0) + 'kb',
    );
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
