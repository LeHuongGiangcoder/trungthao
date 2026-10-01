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
  dressHand: '/dress-hand.webp',
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
  roseCluster: { src: '/img/piece-1.webp', w: 3011, h: 2718 },
  /** Tall white bouquet with trailing amaranthus. */
  bouquetTall: { src: '/img/piece-2.webp', w: 2794, h: 5228 },
  /** Anthurium, orchids and trailing amaranthus — the spray beside the envelope. */
  spraySide: { src: '/img/piece-3.webp', w: 3022, h: 4838 },
  /** Two beaded squares hanging on a thread. */
  beadFrames: { src: '/img/piece-4.webp', w: 3013, h: 5541 },
  /** Scalloped plaque with a pair of swans and a blank face. */
  swanPlaque: { src: '/img/piece-5.webp', w: 3014, h: 4133 },
  /** The envelope front, flap folded — the floor of the collage. */
  envelope: { src: '/img/piece-6.webp', w: 3107, h: 2005 },
  /** Beaded oval frame with a blank window. */
  ovalFrame: { src: '/img/piece-7.webp', w: 3131, h: 3654 },
  /** Embossed "Save the Date" card. */
  saveTheDate: { src: '/img/piece-8.webp', w: 3124, h: 2938 },
  /** Small square photo frame. */
  photoFrame: { src: '/img/piece-9.webp', w: 2856, h: 2652 },
  /** Lace heart doily — the date is set on it. */
  heartDoily: { src: '/img/piece-10.webp', w: 3104, h: 2560 },
  /** Oval wax seal with a flower. */
  waxSeal: { src: '/img/piece-11.webp', w: 2172, h: 2776 },
  peony: { src: '/img/piece-12.webp', w: 2699, h: 2888 },
  /** Carved oval frame in white. */
  ovalFrameCarved: { src: '/img/piece-13.webp', w: 2700, h: 3215 },
  laceBow: { src: '/img/piece-14.webp', w: 3117, h: 3971 },

  /* The thank-you oval and the pieces laid around it. */
  /** Carved oval frame in sage green — the thank-you plaque. */
  ovalFrameGreen: { src: '/img/piece-16.webp', w: 2765, h: 3369 },
  /** The nearer of the two lilies that sit on the oval's shoulder. */
  lily: { src: '/img/piece-17.webp', w: 2788, h: 2933 },
  /** The second lily, set behind and to the right of it. */
  lilyBack: { src: '/img/piece-18.webp', w: 2701, h: 2526 },
  /** Pale green butterfly, resting on the oval's lower edge. */
  butterflyPale: { src: '/img/piece-19.webp', w: 2413, h: 2790 },
} as const;
