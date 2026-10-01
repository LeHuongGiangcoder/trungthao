import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop, piece } from '@/lib/assets';
import { ceremony } from '@/lib/wedding';
import styles from './WeddingInfo.module.css';

/** When and where, both engraved on the swan plaque — one card rather than
 *  two objects competing for the screen. */
export function WeddingInfo() {
  return (
    <Section
      id="thoi-gian"
      tone="light"
      backdrop={backdrop.damask}
      labelledBy="info-title"
      className={styles.info}
    >
      <Image
        className={`ornament ${styles.bouquet}`}
        src={piece.bouquetTall.src}
        alt=""
        width={piece.bouquetTall.w}
        height={piece.bouquetTall.h}
      />
      <Image
        className={`ornament ${styles.roses}`}
        src={piece.roseCluster.src}
        alt=""
        width={piece.roseCluster.w}
        height={piece.roseCluster.h}
      />

      <SectionHead eyebrow="Thời gian & Địa điểm" title="Ngày Cưới" titleId="info-title" />

      <Reveal className={styles.plaque}>
        <Image
          className={styles.plaqueArt}
          src={piece.swanPlaque.src}
          alt=""
          width={piece.swanPlaque.w}
          height={piece.swanPlaque.h}
          sizes="(min-width: 40rem) 29rem, 96vw"
        />

        <div className={styles.plaqueFace}>
          <p className={styles.weekday}>{ceremony.weekday}</p>
          <p className={styles.date}>{ceremony.dateLine}</p>
          <p className={styles.time}>{ceremony.time}</p>
          <p className={styles.lunar}>{ceremony.lunar}</p>

          <span className={styles.rule} />

          <p className={styles.hall}>{ceremony.hall}</p>
          <p className={styles.venue}>{ceremony.venue}</p>
          <p className={styles.address}>{ceremony.address}</p>
        </div>
      </Reveal>

      <Reveal delay={200}>
        <a
          className={`btn btn-outline ${styles.mapLink}`}
          href={ceremony.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Xem bản đồ
        </a>
      </Reveal>
    </Section>
  );
}
