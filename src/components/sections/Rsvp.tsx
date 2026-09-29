import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop, element } from '@/lib/assets';
import { rsvp } from '@/lib/wedding';
import { RsvpForm } from './RsvpForm';
import styles from './Rsvp.module.css';

export function Rsvp() {
  return (
    <Section id="rsvp" tone="dark" backdrop={backdrop.damaskGreen} labelledBy="rsvp-title">
      <Image className={`ornament ${styles.frame}`} src={element.swallowFrame} alt="" width={900} height={1274} />

      <SectionHead eyebrow="Xác nhận tham dự" title="R.S.V.P" titleId="rsvp-title">
        <p className={styles.note}>{rsvp.note}</p>
        <p className={styles.deadline}>{rsvp.deadline}</p>
      </SectionHead>

      <Reveal delay={120}>
        <RsvpForm />
      </Reveal>
    </Section>
  );
}
