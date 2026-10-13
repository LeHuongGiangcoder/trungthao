/* The invitation screen's lace mat: art/invite/doily.png -> web-ready webp.

   It replaces the oval the "Trân trọng kính mời" lines used to sit on, which
   was a cool grey-white drawn for the deep green ground. This one is warm
   cream and belongs on the beige.
   Part of `npm run assets`. */
const sharp = require('sharp');
const fs = require('fs');

const SRC = 'art/invite/doily.png';
const OUT = 'public/img/v2/invite-doily.webp';

/* It is the widest single piece on the screen, so it gets a full-bleed
   budget: 1100px covers the 480px stage on a 2x screen with room over. */
const WIDTH = 1100;

async function run() {
  await sharp(SRC)
    .trim({ threshold: 1 })
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 94 })
    .toFile(OUT);

  const meta = await sharp(OUT).metadata();
  console.log(
    'invite-doily'.padEnd(20),
    `${meta.width}x${meta.height}`,
    (fs.statSync(OUT).size / 1024).toFixed(0) + 'kb',
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
