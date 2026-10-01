import { Envelope } from '@/components/Envelope';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { backdrop } from '@/lib/assets';
import { couple } from '@/lib/wedding';
import styles from './Hero.module.css';

/** The invitation as an object on a table: the opened envelope and its
 *  contents, with the couple announced underneath. */
export function Hero() {
  return (
    <Section id="thiep" tone="light" backdrop={backdrop.drape} labelledBy="hero-names" className={styles.hero}>
      <div className={styles.wash} />

      <Reveal className={styles.cardWrap}>
        <Envelope />
      </Reveal>

      <Reveal className={styles.announce} delay={160}>
        <p className={styles.eyebrow}>Trân trọng kính mời</p>
        <h1 id="hero-names" className={styles.names}>
          <span>{couple.groom.name}</span>
          <span className={styles.and}>và</span>
          <span>{couple.bride.name}</span>
        </h1>
        <p className={styles.lead}>Đến dự tiệc mừng lễ thành hôn cùng gia đình chúng tôi</p>
      </Reveal>

      <p className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        Cuộn xuống
      </p>
    </Section>
  );
}
