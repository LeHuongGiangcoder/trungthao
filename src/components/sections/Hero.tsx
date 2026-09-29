import Image from 'next/image';
import { PaperCard } from '@/components/PaperCard';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { backdrop, element } from '@/lib/assets';
import { ceremony } from '@/lib/wedding';
import styles from './Hero.module.css';

/** The invitation itself: the engraved card, with a candle and flowers laid
 *  across its corners so it reads as an object on a table. */
export function Hero() {
  return (
    <Section id="thiep" tone="light" backdrop={backdrop.drape} labelledBy="card-names" className={styles.hero}>
      <div className={styles.wash} />

      <Reveal className={styles.cardWrap}>
        <PaperCard />

        <Image
          className={`ornament ornament-front ${styles.bouquet}`}
          src={element.roseSpray}
          alt=""
          width={640}
          height={782}
        />
        <Image
          className={`ornament ornament-front ${styles.sprig}`}
          src={element.blossomStem}
          alt=""
          width={480}
          height={936}
        />
      </Reveal>

      <Reveal delay={160}>
        <a
          className={`btn btn-outline ${styles.mapLink}`}
          href={ceremony.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Xem bản đồ
        </a>
      </Reveal>

      <p className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        Cuộn xuống
      </p>
    </Section>
  );
}
