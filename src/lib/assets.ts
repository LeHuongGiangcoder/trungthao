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
