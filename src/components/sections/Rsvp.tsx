import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop, piece } from '@/lib/assets';
import { rsvp } from '@/lib/wedding';
import { RsvpForm } from './RsvpForm';
import styles from './Rsvp.module.css';

export function Rsvp() {
  return (
    <Section
      id="rsvp"
      tone="dark"
      backdrop={backdrop.damaskGreen}
      labelledBy="rsvp-title"
      className={styles.rsvp}
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

      <SectionHead eyebrow={rsvp.eyebrow} title="R.S.V.P" titleId="rsvp-title">
        <span className="rule-diamond" aria-hidden="true">
          <span />
        </span>
        <p className={styles.deadline}>{rsvp.deadline}</p>
      </SectionHead>

      <Reveal delay={120} className={styles.formWrap}>
        <RsvpForm />
      </Reveal>
    </Section>
  );
}
