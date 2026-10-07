import Image from 'next/image';
import { Layer, Screen } from '@/components/Screen';
import { story } from '@/lib/assets';
import { couple } from '@/lib/wedding';
import styles from './Story.module.css';

/** The welcome plate: the couple's portrait set into the card's embossed
 *  oval, with the greeting above it and "Wedding" below. */
export function Welcome() {
  return (
    <Screen id="gallery" tone="light" labelledBy="welcome-title" className={styles.welcome}>
      <Layer art={story.ovalCard} preload />

      {/* The moulding has no window cut in it, so the photograph is laid on
          the card and clipped to the opening the moulding draws. It is placed
          in percentages of the sheet, which is the frame the moulding itself
          was drawn on. */}
      <div className={styles.oval}>
        <Image
          src={story.ovalPhoto.src}
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

/**
 * The couple under the veil, their names written across it.
 *
 * The names go between the photograph and a cut-out of the couple taken from
 * it, so the writing runs behind them and in front of the ground — the depth
 * the flat art cannot give on its own.
 */
export function Veil() {
  return (
    <Screen tone="light" labelledBy="veil-title" className={styles.veil}>
      <Layer art={story.veil} alt={`${couple.groom.name} và ${couple.bride.name}`} />
      <Layer art={story.veilNames} className={styles.veilNames} />
      <Layer art={story.veilCutout} />

      <h2 id="veil-title" className="sr-only">
        {couple.groom.name} &amp; {couple.bride.name}
      </h2>
    </Screen>
  );
}

/** Two snapshots laid on stone, under a line of script. */
export function TwoSouls() {
  return (
    <Screen tone="light" ground={story.stone} labelledBy="two-souls-title" className={styles.twoSouls}>
      {/* The snapshots are drawn high enough on the frame to run over the
          script, so they are nudged down and the line is lifted clear and
          laid on top of them. */}
      <Layer art={story.polaroids} className={styles.polaroids} alt={`${couple.groom.name} và ${couple.bride.name}`} />
      <Layer art={story.twoSouls} className={styles.twoSoulsLine} />

      <h2 id="two-souls-title" className="sr-only">
        Two souls, one promise
      </h2>
    </Screen>
  );
}

/** The framed portrait, signed underneath. */
export function Portrait() {
  return (
    <Screen tone="light" labelledBy="portrait-title" className={styles.portrait}>
      <Layer art={story.framed} alt={`${couple.groom.name} và ${couple.bride.name}`} />
      <Layer art={story.framedCaption} className={styles.caption} />

      <h2 id="portrait-title" className="sr-only">
        {couple.groom.name} &amp; {couple.bride.name}
      </h2>
    </Screen>
  );
}
