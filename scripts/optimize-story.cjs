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

/* The lettering on the two story screens was drawn in a bottle green of its
   own, #00724A, which belongs to no part of the palette the rest of the card
   is set in. These pieces are recoloured to --c-olive on the way through, so
   the drawn type matches the live type everywhere else. The glyphs are one
   flat colour with their antialiasing carried in the alpha channel, so
   swapping the RGB and leaving the alpha alone keeps the edges clean. The
   gilt on `welcome` is a different hue and is left as drawn. */
const OLIVE = { r: 0x77, g: 0x68, b: 0x37 };
const RECOLOUR = new Set(['wedding', 'welcome', 'framed-caption']);

async function olivePng(src) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    // The drawn green, and nothing else on these sheets, is this much greener
    // than it is red or blue.
    if (data[i + 1] > data[i] + 30 && data[i + 1] > data[i + 2] + 20) {
      data[i] = OLIVE.r;
      data[i + 1] = OLIVE.g;
      data[i + 2] = OLIVE.b;
    }
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
}

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

    const input = RECOLOUR.has(name) ? await olivePng(`art/story/${file}`) : `art/story/${file}`;

    await sharp(input)
      .resize({ width: WIDTH[name] ?? 800, withoutEnlargement: true })
      .webp({ quality: 84, alphaQuality: 90 })
      .toFile(out);

    const meta = await sharp(out).metadata();
    console.log(`story-${name}`, `${meta.width}x${meta.height}`, (fs.statSync(out).size / 1024).toFixed(0) + 'kb');
  }
}

/* The couple's names are drawn as one piece, the two lines far apart on the
   frame, and the second line carries "Thu" as well. The veil screen wants one
   word per line — Trung, Thảo — each tucked behind the couple on its own.
   So each line is cut out as a band and "Thu" is cleared from the second.
   The bands keep the FULL frame width rather than being trimmed to their ink:
   laid out at `width: 100%` they then share one horizontal scale, so the two
   words are the same size by construction rather than by matching numbers. */
const NAME_LINES = {
  'name-trung': { y: [0.233, 0.42], from: 0 },
  'name-thao': { y: [0.505, 0.715], from: 0.465 },
};

async function splitNames() {
  const src = 'art/story/veil-names.png';
  const { width, height } = await sharp(src).metadata();

  for (const [name, { y, from }] of Object.entries(NAME_LINES)) {
    const top = Math.round(height * y[0]);
    const left = Math.round(width * from);

    let buf = await sharp(src)
      .extract({ left, top, width: width - left, height: Math.round(height * y[1]) - top })
      .png()
      .toBuffer();

    /* Padded back out to the frame's width, so both bands stay in the same
       coordinate system as one another. */
    if (left > 0) {
      buf = await sharp(buf)
        .extend({ left, background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer();
    }

    const out = path.join(OUT, `story-${name}.webp`);
    await sharp(buf)
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 92 })
      .toFile(out);

    const meta = await sharp(out).metadata();
    console.log(`story-${name}`, `${meta.width}x${meta.height}`, (fs.statSync(out).size / 1024).toFixed(0) + 'kb');
  }
}

run().then(splitNames).catch((e) => { console.error(e); process.exit(1); });
