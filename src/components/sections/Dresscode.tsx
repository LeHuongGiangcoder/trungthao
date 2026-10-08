import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { backdrop, gilt } from '@/lib/assets';
import { dresscode } from '@/lib/wedding';
import styles from './Dresscode.module.css';

/** The palette, engraved on the card the gloved hand holds up. The hand is the
 *  last thing in the section, so its cuff lands on the bottom padding line. */
export function Dresscode() {
  return (
    <Section
      id="dresscode"
      tone="light"
      backdrop={backdrop.damask}
      labelledBy="dresscode-title"
      className={styles.dresscode}
    >


      {/* The gilt butterfly opens this section the way the crest opens the
          others, so every section is headed by the same gold mark. */}
      <Reveal className={styles.head}>
        <Image className="section-icon" src={gilt.butterfly} alt="" width={640} height={466} />
        <p className="eyebrow">Trang phục</p>
        <h2 id="dresscode-title" className="section-title">
          Dress Code
        </h2>
        <span className="rule-diamond" aria-hidden="true">
          <span />
        </span>
        <p className={styles.headline}>{dresscode.headline}</p>
        <p className={styles.note}>{dresscode.avoid}</p>
      </Reveal>

      <Reveal className={styles.hand} delay={100}>
        <Image className={styles.handArt} src={gilt.dressHand} alt="" width={900} height={1557} />

        <div className={styles.onCard}>
          <p className={styles.paletteTitle}>{dresscode.paletteTitle}</p>

          {/* Equal columns keep the names apart; the chips are drawn wider
              than their column so they overlap each other. */}
          <ul className={styles.palette}>
            {dresscode.swatches.map((swatch) => (
              <li key={swatch.hex} className={styles.swatch}>
                <span className={styles.chip} style={{ '--chip': swatch.hex } as CSSProperties} aria-hidden="true" />
                <span className={styles.chipName}>{swatch.name}</span>
              </li>
            ))}
          </ul>
        </div>

      </Reveal>
    </Section>
  );
}
