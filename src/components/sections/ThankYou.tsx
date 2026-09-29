import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { backdrop, element, gilt } from '@/lib/assets';
import { ceremony, couple, thanks } from '@/lib/wedding';
import styles from './ThankYou.module.css';

export function ThankYou() {
  return (
    <Section tone="light" backdrop={backdrop.damask} labelledBy="thanks-title" className={styles.thanks}>
      <Image className={`ornament ${styles.birds}`} src={element.birds} alt="" width={700} height={560} />

      {/* The names sit inside the oval; everything else reads below it. */}
      <Reveal className={styles.plaque}>
        <Image className={styles.oval} src={element.ovalFrame} alt="" width={900} height={1235} />

        <div className={styles.plaqueInner}>
          <Image className="section-icon" src={gilt.crest} alt="" width={560} height={635} />
          <p className={styles.eyebrow}>Thank you</p>
          <h2 id="thanks-title" className={styles.names}>
            <span>Trung</span>
            <span className={styles.and}>&</span>
            <span>Thảo</span>
          </h2>
        </div>
      </Reveal>

      <Reveal className={styles.closing} delay={140}>
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
