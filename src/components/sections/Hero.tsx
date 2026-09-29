import Image from 'next/image';
import { Countdown } from '@/components/Countdown';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { backdrop, element } from '@/lib/assets';
import { ceremony, couple } from '@/lib/wedding';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <Section tone="light" backdrop={backdrop.drape} labelledBy="hero-names">
      <div className={styles.wash} />

      <Image className={`ornament ${styles.arch}`} src={element.gardenArch} alt="" width={720} height={424} />
      <Image className={`ornament ${styles.stemLeft}`} src={element.blossomStem} alt="" width={480} height={936} />
      <Image className={`ornament ${styles.stemRight}`} src={element.roseSpray} alt="" width={640} height={782} />

      <Reveal className={styles.inner}>
        <p className={styles.eyebrow}>Trân trọng kính mời</p>

        <h2 id="hero-names" className={styles.names}>
          <span>{couple.groom.name}</span>
          <span className={styles.conjunction}>và</span>
          <span>{couple.bride.name}</span>
        </h2>

        <div className={styles.meta}>
          <p className={styles.weekday}>{ceremony.weekday}</p>
          <p className={styles.date}>{ceremony.dateLine}</p>
          <p className={styles.venue}>{ceremony.venue}</p>
        </div>

        <Countdown
          target={ceremony.isoDate}
          className={styles.countdown}
          unitClassName={styles.unit}
          valueClassName={styles.unitValue}
          labelClassName={styles.unitLabel}
        />
      </Reveal>

      <p className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        Cuộn xuống
      </p>
    </Section>
  );
}
