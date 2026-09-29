import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { backdrop, element } from '@/lib/assets';
import { ceremony, couple, thanks } from '@/lib/wedding';
import styles from './ThankYou.module.css';

export function ThankYou() {
  return (
    <Section tone="light" backdrop={backdrop.damask} labelledBy="thanks-title">
      <Image className={`ornament ${styles.oval}`} src={element.ovalFrame} alt="" width={900} height={1235} />
      <Image className={`ornament ${styles.bridge}`} src={element.gardenArch} alt="" width={900} height={530} />
      <Image className={`ornament ${styles.birds}`} src={element.birds} alt="" width={700} height={560} />

      <Reveal className={styles.inner}>
        <p className={styles.eyebrow}>Thank you</p>
        <h2 id="thanks-title" className={styles.names}>
          <span>{couple.groom.name}</span>
          <span className={styles.and}>và</span>
          <span>{couple.bride.name}</span>
        </h2>
        <span className={styles.rule} />
        <div className={styles.lines}>
          {thanks.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className={styles.sign}>{thanks.sign}</p>
        <p className={styles.date}>{ceremony.dateLine}</p>
      </Reveal>
    </Section>
  );
}
