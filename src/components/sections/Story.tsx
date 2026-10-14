import Image from 'next/image';
import { Layer, Screen } from '@/components/Screen';
import { finalPhoto, story } from '@/lib/assets';
import { couple } from '@/lib/wedding';
import styles from './Story.module.css';

/** The welcome plate: the couple's portrait set into the card's embossed
 *  oval, with the greeting above it and "Wedding" below. */
export function Welcome() {
  return (
    <Screen id="gallery" tone="shell" labelledBy="welcome-title" className={styles.welcome}>
      <Layer art={story.ovalCard} preload />

      {/* The moulding has no window cut in it, so the photograph is laid on
          the card and clipped to the opening the moulding draws. It is placed
          in percentages of the sheet, which is the frame the moulding itself
          was drawn on. */}
      <div className={styles.oval}>
        <Image
          src={finalPhoto.welcome.src}
          alt={`${couple.groom.name} và ${couple.bride.name}`}
          fill
          sizes="(min-width: 40rem) 19rem, 62vw"
          preload
        />
      </div>

      <Layer art={story.welcome} />
      <Layer art={story.wedding} />

      <h2 id="welcome-title" className="sr-only">
        Welcome to our wedding
      </h2>
    </Screen>
  );
}

/** The framed portrait, signed underneath.
 *
 *  The ruled frame and the print it holds are one piece of art, so the
 *  replacement photograph is laid over the print it supersedes, inset to the
 *  opening the rule draws — measured off `story.framed` itself, in fractions
 *  of the 9:16 sheet every layer shares. */
export function Portrait() {
  return (
    <Screen tone="shell" labelledBy="portrait-title" className={styles.portrait}>
      <Layer art={story.framed} />

      <div className={styles.framedPhoto}>
        <Image
          src={finalPhoto.portrait.src}
          alt={`${couple.groom.name} và ${couple.bride.name}`}
          fill
          sizes="(min-width: 40rem) 22rem, 72vw"
        />
      </div>

      <Layer art={story.framedCaption} className={styles.caption} />

      <h2 id="portrait-title" className="sr-only">
        {couple.groom.name} &amp; {couple.bride.name}
      </h2>
    </Screen>
  );
}
