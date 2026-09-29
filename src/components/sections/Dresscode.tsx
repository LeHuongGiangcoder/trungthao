import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop, element, gilt } from '@/lib/assets';
import { dresscode } from '@/lib/wedding';
import styles from './Dresscode.module.css';

export function Dresscode() {
  return (
    <Section
      id="dresscode"
      tone="light"
      backdrop={backdrop.damask}
      labelledBy="dresscode-title"
      className={styles.dresscode}
    >
      <Image className={`ornament ${styles.hydrangea}`} src={element.hydrangea} alt="" width={640} height={522} />

      <SectionHead eyebrow="Trang phục" title="Dress Code" titleId="dresscode-title" />

      <Reveal className={styles.hand} delay={100}>
        <Image className={styles.handArt} src={gilt.dressHand} alt="" width={900} height={1557} />

        <div className={styles.onCard}>
          <p className={styles.headline}>{dresscode.headline}</p>
          <p className={styles.note}>{dresscode.note}</p>

          <ul className={styles.swatches}>
            {dresscode.swatches.map((swatch) => (
              <li key={swatch.hex} className={styles.swatch}>
                <span className={styles.chip} style={{ '--chip': swatch.hex } as CSSProperties} aria-hidden="true" />
                <span className={styles.chipName}>{swatch.name}</span>
              </li>
            ))}
          </ul>

          <p className={styles.avoid}>{dresscode.avoid}</p>
        </div>

        <Image
          className={`ornament ornament-front ${styles.butterfly}`}
          src={gilt.butterfly}
          alt=""
          width={640}
          height={466}
        />
      </Reveal>
    </Section>
  );
}
