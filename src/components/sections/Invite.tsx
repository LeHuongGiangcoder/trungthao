import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { ceremony, couple } from '@/lib/wedding';
import styles from './Invite.module.css';

/**
 * The line that invites, set on the beige ground.
 *
 * This screen used to be a collage — a gilt "Save the Date", a lace card and
 * an oval doily, all drawn for a deep green ground. Measured against the
 * shell the rest of the invitation is now printed on, that art fell from
 * about 7:1 contrast to under 2:1, which is to say it disappeared. So the
 * screen is set in live type instead: the same words, in the couple's own
 * hand, with nothing behind them.
 */
export function Invite() {
  return (
    <Section id="loi-moi" tone="shell" labelledBy="invite-title" className={styles.screen}>
      <Reveal className={styles.block}>
        <p className="caps caps-sm">Save the Date</p>

        <h2 id="invite-title" className={styles.names}>
          {couple.groom.name} <span className={styles.amp}>&amp;</span> {couple.bride.name}
        </h2>

        <span className="rule-diamond" aria-hidden="true">
          <span />
        </span>

        <p className={styles.invite}>
          Trân trọng kính mời
          <br />
          đến tham dự tiệc mừng lễ thành hôn
          <br />
          cùng gia đình chúng tôi!
        </p>

        <p className={styles.date}>{ceremony.dateLine}</p>
      </Reveal>

      <p className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        Cuộn xuống
      </p>
    </Section>
  );
}
