/* The story screens' art: art/story -> web-ready webp in public/img.
   Part of `npm run assets`.

   Unlike the other batches these are NOT trimmed. Every piece is drawn on the
   same 3375x6000 frame with its placement already in it, so keeping the whole
   canvas lets the screens stack their layers at `inset: 0` and inherit the
   designer's composition rather than re-deriving it in CSS. The one exception
   is the oval portrait, which is a loose photograph. */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = 'public/img';
fs.mkdirSync(OUT, { recursive: true });

/* Photographs carry detail and are seen full-bleed; flat lettering and line
   art stay smaller, since they are mostly transparent ground. */
const WIDTH = {
  'oval-photo': 1100,
  'veil': 1100,
  'veil-cutout': 1100,
  'polaroids': 1100,
  'framed': 1100,
  'closing-photo': 1100,
  'oval-card': 1000,
  'info-damask': 1000,
  'stone': 900,
};

async function run() {
  const names = fs
    .readdirSync('art/story')
    .filter((f) => /\.(png|jpg)$/.test(f))
    .sort();

  for (const file of names) {
    const name = file.replace(/\.(png|jpg)$/, '');
    const out = path.join(OUT, `story-${name}.webp`);

    await sharp(`art/story/${file}`)
      .resize({ width: WIDTH[name] ?? 800, withoutEnlargement: true })
      .webp({ quality: 84, alphaQuality: 90 })
      .toFile(out);

    const meta = await sharp(out).metadata();
    console.log(`story-${name}`, `${meta.width}x${meta.height}`, (fs.statSync(out).size / 1024).toFixed(0) + 'kb');
  }
}

/* The couple's names are drawn as one piece, the two lines far apart on the
   frame. The veil screen has to tuck each one behind the couple separately, so
   they are cut apart here — at the clear row between them — and trimmed to
   their own ink. */
const NAME_LINES = {
  'name-trung': [0.17, 0.46],
  'name-thao': [0.46, 0.78],
};

async function splitNames() {
  const src = 'art/story/veil-names.png';
  const { width, height } = await sharp(src).metadata();

  for (const [name, [y0, y1]] of Object.entries(NAME_LINES)) {
    const top = Math.round(height * y0);
    const out = path.join(OUT, `story-${name}.webp`);

    /* Two passes: sharp will not trim and extract in one pipeline. */
    const cut = await sharp(src)
      .extract({ left: 0, top, width, height: Math.round(height * y1) - top })
      .png()
      .toBuffer();

    await sharp(cut)
      /* A higher threshold than the other batches use: these strokes are
         drawn with a soft halo that a threshold of 1 counts as ink, leaving
         the piece padded and impossible to place by its own box. */
      .trim({ threshold: 14 })
      .resize({ width: 700, withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 92 })
      .toFile(out);

    const meta = await sharp(out).metadata();
    console.log(`story-${name}`, `${meta.width}x${meta.height}`, (fs.statSync(out).size / 1024).toFixed(0) + 'kb');
  }
}

run().then(splitNames).catch((e) => { console.error(e); process.exit(1); });
