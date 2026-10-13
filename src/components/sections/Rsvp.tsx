import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { loose } from '@/lib/composition';
import { rsvp } from '@/lib/wedding';
import { RsvpForm } from './RsvpForm';
import styles from './Rsvp.module.css';

/** The reply card: the couple's mark, one instruction, and the form. */
export function Rsvp() {
  return (
    <section id="rsvp" data-tone="shell" className={styles.rsvp} aria-labelledby="rsvp-title">
      <Reveal className={styles.head}>
        <Image
          className={styles.mark}
          src={loose.monogramOval.src}
          alt=""
          width={loose.monogramOval.w}
          height={loose.monogramOval.h}
          sizes="(min-width: 40rem) 9rem, 30vw"
        />
        <h2 id="rsvp-title" className={styles.heading}>
          {rsvp.heading}
        </h2>
        <p className={`caps caps-sm ${styles.deadline}`}>{rsvp.deadline}</p>
      </Reveal>

      <Reveal delay={120} className={styles.formWrap}>
        <RsvpForm />
      </Reveal>

      <a className="link-quiet" href="#thiep">
        Quay lại
      </a>
    </section>
  );
}
