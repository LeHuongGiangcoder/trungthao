/* The loose decorative pieces: the pearl flower and marble cherub that head
   the sections, and the silk sash that closes the dress code.
   art/ornament/*.png -> trimmed web-ready webp in public/img/v2.

   They arrive as square exports with the object floating in transparency, so
   the trim is what makes each one sit on a baseline rather than in a box of
   its own padding.
   Part of `npm run assets`. */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'art/ornament';
const OUT = 'public/img/v2';

/* The two section marks are set at roughly 2.75rem tall against a 480px
   stage, so a little over 600px covers a 3x screen with room to spare. The
   silk is a different animal: it runs the full width of the stage and past
   both edges, so it is given the budget of a full-bleed piece. */
const WIDTH = { flower: 640, cherub: 640, silk: 1400 };
const DEFAULT_WIDTH = 640;

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
      .resize({ width: WIDTH[name] ?? DEFAULT_WIDTH, withoutEnlargement: true })
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
