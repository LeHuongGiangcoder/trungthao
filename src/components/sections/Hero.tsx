import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { WeddingInfo } from '@/components/sections/WeddingInfo';
import { composition, type Placed } from '@/lib/composition';
import { ceremony, couple } from '@/lib/wedding';
import styles from './Hero.module.css';

const {
  heroEnvelopeBack,
  heroOvalPortrait,
  heroSaveTheDate,
  heroPolaroids,
  heroHeartDate,
  heroEnvelopeFront,
  heroBouquet,
} = composition.hero;

/** A layer of the collage, placed by the fractions measured off the designer's
 *  final composite. Order in the markup is the stacking order: nothing here
 *  sets a z-index. */
function Piece({
  art,
  alt = '',
  className,
  delay,
}: {
  art: Placed;
  alt?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <Image
      className={className ? `${styles.piece} ${className}` : styles.piece}
      src={art.src}
      alt={alt}
      width={art.w}
      height={art.h}
      sizes="(min-width: 40rem) 30rem, 100vw"
      style={{
        left: `${art.left * 100}%`,
        top: `${art.top * 100}%`,
        width: `${art.width * 100}%`,
        ...(delay ? { animationDelay: `${delay}ms` } : null),
      }}
    />
  );
}

/**
 * The letter, unpacked.
 *
 * The open envelope lies at the back; the portrait, the save-the-date, the
 * snapshot and the dated heart are stacked in it; the envelope's front pocket
 * closes over the lot, and the bouquet is laid across the corner last.
 *
 * Under it, on the same ground, is the invitation's own text — the hero and
 * the details are one page, as they are on the card.
 *
 * As the screen is scrolled to, the four contents rise out of the pocket.
 * They start pushed half a collage-height down — in `cqh`, so one distance
 * covers four layers of four different heights — and the stack is clipped at
 * the pocket's lower edge, which is what makes them read as coming out of the
 * envelope rather than sliding up the page.
 */
export function Hero() {
  return (
    <section id="thiep" data-tone="light" className={styles.hero} aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        {couple.groom.name} &amp; {couple.bride.name} — {ceremony.dateLine}
      </h1>

      {/* The collage is not the first screen, so its motion has to wait for
          the guest to scroll to it rather than run on load. `fade={false}`
          keeps the shared reveal out of the way — the pieces do their own. */}
      <Reveal className={styles.frame} fade={false}>
        <div
          className={styles.collage}
          style={
            {
              aspectRatio: composition.hero.ratio,
              /* Where the pocket's lower edge falls, as a fraction of the
                 collage — the line the rising contents are cut off at. */
              '--pocket-bottom': `${
                (1 - (heroEnvelopeFront.top + heroEnvelopeFront.height)) * 100
              }%`,
            } as React.CSSProperties
          }
        >
          <Piece art={heroEnvelopeBack} className={styles.envelopeBack} />

          <div className={styles.contents}>
            <Piece
              art={heroOvalPortrait}
              alt={`${couple.groom.name} và ${couple.bride.name}`}
              className={styles.rising}
            />
            <Piece art={heroSaveTheDate} className={styles.rising} delay={140} />
            <Piece
              art={heroPolaroids}
              alt={`${couple.groom.name} và ${couple.bride.name}`}
              className={styles.rising}
              delay={280}
            />
            <Piece art={heroHeartDate} className={styles.rising} delay={420} />
          </div>

          <Piece art={heroEnvelopeFront} className={styles.envelopeFront} />
          <Piece art={heroBouquet} className={styles.bouquet} />
        </div>
      </Reveal>

      {/* Where, when and the ask sit under the collage on the same ground:
          on the printed card they are one page, not two. */}
      <WeddingInfo />
    </section>
  );
}
