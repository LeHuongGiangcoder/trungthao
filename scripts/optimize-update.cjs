/* The second-pass art: the envelope screen and the hero collage, supplied as
   thirteen full-canvas exports in public/update. Every layer is drawn on the
   same 4269x2400 frame with its position already in it, so the only honest
   way to place them is to measure where the ink actually falls.

   This trims each layer to its own ink, writes it to public/img/v2, and emits
   src/lib/composition.ts with each piece's box expressed as a percentage of
   the composition it belongs to. Nothing is positioned by eye.
   Part of `npm run assets`. */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'art/update';
const OUT = 'public/img/v2';

/* name -> source file. The numbering is the designer's export order; these
   names are what the components read. */
const LAYERS = {
  /* The envelope screen. */
  envGround: 'Invitation.png', // draped table under columns — the full ground
  envSealed: 'Invitation (2).png', // the closed envelope, lace along the flap
  envWax: 'Invitation (3).png', // the T&T wax seal
  envLetterhead: 'Invitation (4).png', // "A Love Letter from Thao & Trung"

  /* The hero collage, back to front. */
  heroEnvelopeBack: 'Invitation (6).png',
  heroOvalPortrait: 'Invitation (8).png',
  heroSaveTheDate: 'Invitation (9).png',
  heroPolaroids: 'Invitation (10).png',
  heroHeartDate: 'Invitation (11).png',
  heroEnvelopeFront: 'Invitation (7).png',
  heroBouquet: 'Invitation (12).png',

  /* The reply card's mark. */
  monogramOval: 'Invitation (13).png',
};

/* Which layers make up each composition, back to front, and the box they are
   placed in. The ground is deliberately not a member: it is laid behind the
   whole screen rather than inside the composition.

   `frame` overrides the union of the members' boxes. The hero needs one: the
   designer's final composite (art/update/new/Main Page.png) is not simply
   these thirteen exports stacked where they were drawn. Its collage occupies
   x 510..4057, y 377..4545 of a 4269-wide page, and fitting the envelope's
   front pocket and the bouquet against it — both of which are unoccluded, so
   both match cleanly — puts the whole group at 1.8x the export, anchored at
   (1287.3, 166.8). That is the frame below, in export coordinates.

   `nudge` is for the one piece the designer then moved. In the exports the
   bouquet sits over the middle of the envelope; in the final composite it is
   in the right-hand corner, 568px right and 176px down. */
const COMPOSITIONS = {
  envelope: { members: ['envSealed', 'envWax', 'envLetterhead'] },
  hero: {
    frame: { left: 1287.3, top: 166.8, width: 1971.1, height: 2316.1 },
    nudge: { heroBouquet: { x: 568, y: 176 } },
    members: [
      'heroEnvelopeBack',
      'heroOvalPortrait',
      'heroSaveTheDate',
      'heroPolaroids',
      'heroHeartDate',
      'heroEnvelopeFront',
      'heroBouquet',
    ],
  },
};

/** A member's box after whatever move the final composite gave it. */
function placedBox(comp, name, boxes) {
  const box = boxes[name];
  const nudge = comp.nudge?.[name];
  return nudge ? { ...box, left: box.left + nudge.x, top: box.top + nudge.y } : box;
}

/** The box a composition's members are placed in. */
function frameOf(comp, boxes) {
  if (comp.frame) return comp.frame;
  const b = comp.members.map((n) => placedBox(comp, n, boxes));
  const left = Math.min(...b.map((x) => x.left));
  const top = Math.min(...b.map((x) => x.top));
  return {
    left,
    top,
    width: Math.max(...b.map((x) => x.left + x.width)) - left,
    height: Math.max(...b.map((x) => x.top + x.height)) - top,
  };
}

/* Rendered width budget, in device pixels, for a layer that spans its whole
   composition. The stage is 480 CSS px, so this covers a 2.5x screen with
   room to spare. Every other layer is scaled from the same ruler, so one
   composition's pieces all share a resolution. */
const COMP_WIDTH = 1200;
const GROUND_WIDTH = 1600;

/* The monogram is drawn in the olive the rest of the type is set in, which
   disappears on the closing screen's darkened photograph. A second copy is
   re-inked cream — only the colour changes, so the line work and its
   antialiasing come through unaltered. */
const CREAM = [237, 224, 205];
const ALPHA_FLOOR = 12; // below this a pixel is nothing but a soft edge

/** The tightest box that holds every pixel of this layer's ink. */
async function inkBox(file) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let left = width;
  let top = height;
  let right = -1;
  let bottom = -1;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * channels + 3] <= ALPHA_FLOOR) continue;
      if (x < left) left = x;
      if (x > right) right = x;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
    }
  }

  if (right < 0) throw new Error(`${file} is entirely transparent`);
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

const round = (n) => Math.round(n * 1e4) / 1e4;

async function run() {
  fs.mkdirSync(OUT, { recursive: true });

  /* Measure first: the crop widths depend on how big each composition turns
     out to be, which is only known once every member has been measured. */
  const boxes = {};
  for (const [name, file] of Object.entries(LAYERS)) {
    boxes[name] = await inkBox(path.join(SRC, file));
  }

  /* Each layer's share of the widest composition it belongs to. The ground
     belongs to none and gets its own budget. */
  const scaleOf = {};
  for (const comp of Object.values(COMPOSITIONS)) {
    const { width } = frameOf(comp, boxes);
    for (const name of comp.members) scaleOf[name] = COMP_WIDTH / width;
  }

  const emitted = {};
  for (const [name, file] of Object.entries(LAYERS)) {
    const box = boxes[name];
    const target =
      name === 'envGround'
        ? GROUND_WIDTH
        : Math.round(box.width * (scaleOf[name] ?? COMP_WIDTH / box.width));

    const out = path.join(OUT, `${name}.webp`);
    await sharp(path.join(SRC, file))
      .extract({ left: box.left, top: box.top, width: box.width, height: box.height })
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 92 })
      .toFile(out);

    const meta = await sharp(out).metadata();
    emitted[name] = { src: `/img/v2/${name}.webp`, w: meta.width, h: meta.height };
    console.log(
      name.padEnd(20),
      `${meta.width}x${meta.height}`,
      (fs.statSync(out).size / 1024).toFixed(0) + 'kb',
    );
  }

  /* The geometry module. Boxes are percentages of their composition, so a
     component only has to give the composition an aspect ratio and let every
     layer fall where the art puts it. */
  const blocks = [];
  for (const [name_, comp] of Object.entries(COMPOSITIONS)) {
    const { left, top, width, height } = frameOf(comp, boxes);

    const placed = comp.members
      .map((name) => {
        const b = placedBox(comp, name, boxes);
        const art = emitted[name];
        return (
          `    ${name}: { src: '${art.src}', w: ${art.w}, h: ${art.h}, ` +
          `left: ${round((b.left - left) / width)}, top: ${round((b.top - top) / height)}, ` +
          `width: ${round(b.width / width)}, height: ${round(b.height / height)} },`
        );
      })
      .join('\n');

    blocks.push(
      `  ${name_}: {\n` +
        `    /** The composition's own proportions, measured from the art. */\n` +
        `    ratio: ${round(width / height)},\n` +
        placed +
        `\n  },`,
    );
  }

  /* The cream monogram, for the dark ground. */
  {
    const box = boxes.monogramOval;
    const { data, info } = await sharp(path.join(SRC, LAYERS.monogramOval))
      .extract({ left: box.left, top: box.top, width: box.width, height: box.height })
      .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < data.length; i += info.channels) {
      data[i] = CREAM[0];
      data[i + 1] = CREAM[1];
      data[i + 2] = CREAM[2];
    }
    const out = path.join(OUT, 'monogramOvalLight.webp');
    await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
      .resize({ width: emitted.monogramOval.w, withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 92 })
      .toFile(out);
    const meta = await sharp(out).metadata();
    emitted.monogramOvalLight = { src: '/img/v2/monogramOvalLight.webp', w: meta.width, h: meta.height };
    console.log('monogramOvalLight'.padEnd(20), `${meta.width}x${meta.height}`,
      (fs.statSync(out).size / 1024).toFixed(0) + 'kb');
  }

  const ground = emitted.envGround;
  const monogram = emitted.monogramOval;
  const header = `/* GENERATED by scripts/optimize-update.cjs — do not edit by hand.
   Every box is a fraction of its composition, measured from where the ink
   actually falls in the designer's 4269x2400 exports. */

export type Placed = {
  src: string;
  w: number;
  h: number;
  /** Fractions of the composition box: 0 is its left/top edge, 1 the far one. */
  left: number;
  top: number;
  width: number;
  height: number;
};

/** Pieces that are laid on a screen rather than inside a composition. */
export const loose = {
  envGround: { src: '${ground.src}', w: ${ground.w}, h: ${ground.h} },
  monogramOval: { src: '${monogram.src}', w: ${monogram.w}, h: ${monogram.h} },
  /** The same mark re-inked cream, for the closing screen's dark ground. */
  monogramOvalLight: { src: '${emitted.monogramOvalLight.src}', w: ${emitted.monogramOvalLight.w}, h: ${emitted.monogramOvalLight.h} },
} as const;

export const composition = {
`;

  fs.writeFileSync('src/lib/composition.ts', header + blocks.join('\n') + '\n} as const;\n');
  console.log('\nsrc/lib/composition.ts written');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
