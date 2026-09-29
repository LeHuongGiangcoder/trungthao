import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop, element } from '@/lib/assets';
import { dresscode } from '@/lib/wedding';
import styles from './Dresscode.module.css';

export function Dresscode() {
  return (
    <Section id="dresscode" tone="dark" backdrop={backdrop.damaskGreen} labelledBy="dresscode-title">
      <Image className={`ornament ${styles.hydrangea}`} src={element.hydrangea} alt="" width={640} height={522} />
      <Image className={`ornament ${styles.blossom}`} src={element.blossomStem} alt="" width={480} height={936} />

      <SectionHead eyebrow="Trang phục" title="Dress Code" titleId="dresscode-title">
        <p className={styles.headline}>{dresscode.headline}</p>
      </SectionHead>

      <Reveal delay={100}>
        <p className={styles.note}>{dresscode.note}</p>
      </Reveal>

      <Reveal as="ul" className={styles.swatches} delay={160}>
        {dresscode.swatches.map((swatch) => (
          <li key={swatch.hex} className={styles.swatch}>
            <span className={styles.chip} style={{ '--chip': swatch.hex } as CSSProperties} aria-hidden="true" />
            <span className={styles.chipName}>{swatch.name}</span>
          </li>
        ))}
      </Reveal>

      <Reveal delay={220}>
        <p className={styles.avoid}>{dresscode.avoid}</p>
      </Reveal>
    </Section>
  );
}
