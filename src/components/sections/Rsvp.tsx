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
      {/* Callas to either side of the reply card. They sit behind it, not over
          it: at this column width a group drawn in front covers the fields and
          the attendance buttons, so they fan out around the card's edges
          instead. */}
      <Image
        className={`ornament ${styles.callaLeft}`}
        src="/lily_left.png"
        alt=""
        width={3375}
        height={6000}
      />
      <Image
        className={`ornament ${styles.callaRight}`}
        src="/lily_right.png"
        alt=""
        width={3375}
        height={6000}
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
