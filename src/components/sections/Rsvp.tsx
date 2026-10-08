import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop } from '@/lib/assets';
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
