/* Web-ready derivatives of the source art in public/{hero,background,element}.
   Regenerate with `node scripts/optimize-assets.cjs` then `node scripts/clean-elements.cjs`. */

export const backdrop = {
  /** Wax-sealed envelope on draped silk — the closed invitation. */
  envelope: '/img/hero.webp',
  /** Draped cream silk — revealed behind the hero once the invitation opens. */
  drape: '/img/bg-drape.webp',
  /** Tonal damask weave in cream — the light interior sections. */
  damask: '/img/bg-damask.webp',
  /** The same weave in deep green — the dark interior sections. */
  damaskGreen: '/img/bg-damask-green.webp',
} as const;

/** Gilt pieces, supplied ready for the web. */
export const gilt = {
  /** The small crest that opens every section. */
  crest: '/crest.webp',
  butterfly: '/butterfly.webp',
  flower: '/flower.webp',
  /** A gloved hand holding a blank card — the dress code is set on it. */
  dressHand: '/dress-hand.png',
} as const;

export const element = {
  roseSpray: '/img/el-1.webp',
  candlestick: '/img/el-2.webp',
  ovalLabel: '/img/el-3.webp',
  hydrangea: '/img/el-4.webp',
  /** Deckled card with an engraved border; the lettering has been blanked out. */
  paperCard: '/img/el-5.webp',
  ovalFrame: '/img/el-6.webp',
  blossomStem: '/img/el-7.webp',
  gardenArch: '/img/el-8.webp',
  /** Botanical border with swallows, in green line work. */
  swallowFrame: '/img/el-9.webp',
  /** The same border with the birds removed, for framing text. */
  botanicalFrame: '/img/el-9-border.webp',
  /** Just the swallows, lifted out of that border. */
  birds: '/img/el-9-birds.webp',
  toileFlorals: '/img/el-10.webp',
} as const;

/** The envelope collage: paper, frames and florals, each trimmed to its art.
 *  Sources live in art/piece; regenerate with `node scripts/optimize-pieces.cjs`. */
export const piece = {
  /** Roses and green hydrangea — a low, wide cluster. */
  roseCluster: { src: '/img/piece-1.webp', w: 803, h: 725 },
  /** Tall white bouquet with trailing amaranthus. */
  bouquetTall: { src: '/img/piece-2.webp', w: 745, h: 1394 },
  /** Anthurium, orchids and trailing amaranthus — the spray beside the envelope. */
  spraySide: { src: '/img/piece-3.webp', w: 806, h: 1292 },
  /** Two beaded squares hanging on a thread. */
  beadFrames: { src: '/img/piece-4.webp', w: 806, h: 1479 },
  /** Scalloped plaque with a pair of swans and a blank face. */
  swanPlaque: { src: '/img/piece-5.webp', w: 982, h: 1346 },
  /** The envelope front, flap folded — the floor of the collage. */
  envelope: { src: '/img/piece-6.webp', w: 1290, h: 832 },
  /** Beaded oval frame with a blank window. */
  ovalFrame: { src: '/img/piece-7.webp', w: 1022, h: 1191 },
  /** Embossed "Save the Date" card. */
  saveTheDate: { src: '/img/piece-8.webp', w: 926, h: 871 },
  /** Small square photo frame. */
  photoFrame: { src: '/img/piece-9.webp', w: 762, h: 708 },
  /** Lace heart doily — the date is set on it. */
  heartDoily: { src: '/img/piece-10.webp', w: 828, h: 683 },
  /** Oval wax seal with a flower. */
  waxSeal: { src: '/img/piece-11.webp', w: 580, h: 741 },
  peony: { src: '/img/piece-12.webp', w: 722, h: 771 },
  /** Carved oval frame in white. */
  ovalFrameCarved: { src: '/img/piece-13.webp', w: 800, h: 953 },
  laceBow: { src: '/img/piece-14.webp', w: 831, h: 1059 },

  /* The thank-you oval and the pieces laid around it. */
  /** Carved oval frame in sage green — the thank-you plaque. */
  ovalFrameGreen: { src: '/img/piece-16.webp', w: 901, h: 1098 },
  /** The nearer of the two lilies that sit on the oval's shoulder. */
  lily: { src: '/img/piece-17.webp', w: 746, h: 784 },
  /** The second lily, set behind and to the right of it. */
  lilyBack: { src: '/img/piece-18.webp', w: 722, h: 676 },
  /** Pale green butterfly, resting on the oval's lower edge. */
  butterflyPale: { src: '/img/piece-19.webp', w: 646, h: 746 },

  /** Scalloped cream card with a strand of pearls laid across it. */
  pearlCard: { src: '/img/piece-20.webp', w: 730, h: 1034 },
  /** A loose strand of pearls, for threading between the other pieces. */
  pearls: { src: '/img/piece-21.webp', w: 722, h: 629 },

  /** One strip of the lace sheet, cut out by scripts/crop-lace.cjs. */
  laceStrip: { src: '/img/lace-strip.webp', w: 114, h: 1400 },
  /** The same strip on its side, for a frame's top and bottom edges. */
  laceStripH: { src: '/img/lace-strip-h.webp', w: 1400, h: 114 },
} as const;

/** The couple's pre-wedding photographs, all shot portrait at 1707x2560. */
export const couplePhoto = {
  /** Walking in the garden — soft, atmospheric. */
  garden: { src: '/cp1.jpg', w: 1707, h: 2560 },
  /** Studio, full length. */
  studioFull: { src: '/cp2.jpg', w: 1707, h: 2560 },
  /** Studio, closer, with the bouquet. */
  studioPair: { src: '/cp3.jpg', w: 1707, h: 2560 },
  /** The embrace, caught in motion. */
  embrace: { src: '/cp4.jpg', w: 1707, h: 2560 },
  studioVeil: { src: '/cp6.jpg', w: 1707, h: 2560 },
  /** Studio portrait that reads at small sizes — the one for the oval. */
  portrait: { src: '/cp7.jpg', w: 1707, h: 2560 },
} as const;
