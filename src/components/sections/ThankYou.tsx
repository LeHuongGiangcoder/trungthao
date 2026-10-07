import { Layer, Screen } from '@/components/Screen';
import { story } from '@/lib/assets';
import { ceremony, couple, thanks } from '@/lib/wedding';
import styles from './ThankYou.module.css';

/** The thanks, set in the clear middle of a drawn blossom border. */
export function ThankYou() {
  return (
    <Screen
      tone="light"
      ground={story.thanksFlorals}
      tall
      labelledBy="thanks-title"
      className={styles.thanks}
    >
      <div className={styles.lines}>
        <h2 id="thanks-title" className="sr-only">
          Lời cảm ơn
        </h2>
        {thanks.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className={styles.sign}>{thanks.sign}</p>
        <p className={styles.date}>{ceremony.dateLine}</p>
      </div>
    </Screen>
  );
}

/** The last screen: the two of them, signed. */
export function Closing() {
  return (
    <Screen
      tone="dark"
      ground={story.closingPhoto}
      groundAlt={`${couple.groom.name} và ${couple.bride.name}`}
      labelledBy="closing-title"
      className={styles.closing}
    >
      <Layer art={story.closingNames} className={styles.closingNames} />

      <p className={styles.closingDate}>{ceremony.dateLine.replaceAll(' . ', '.')}</p>

      <h2 id="closing-title" className="sr-only">
        {couple.groom.name} and {couple.bride.name}
      </h2>
    </Screen>
  );
}
