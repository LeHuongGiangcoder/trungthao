import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { backdrop, element } from '@/lib/assets';
import { ceremony, couple, thanks } from '@/lib/wedding';
import styles from './ThankYou.module.css';

export function ThankYou() {
  return (
    <Section tone="light" backdrop={backdrop.damask} labelledBy="thanks-title">
      <Image className={`ornament ${styles.roseLeft}`} src={element.roseSpray} alt="" width={640} height={782} />
      <Image className={`ornament ${styles.roseRight}`} src={element.hydrangea} alt="" width={640} height={522} />

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
