import { Countdown } from '@/components/Countdown';
import { Reveal } from '@/components/Reveal';
import { ceremony, families } from '@/lib/wedding';
import styles from './WeddingInfo.module.css';

/* "28 . 10 . 2026" is the form the date takes everywhere else on the card;
   here it is read out in words, the way it is on the printed invitation. */
const [day, month, year] = ceremony.dateLine.split(' . ');

/**
 * The invitation proper: where, when, how long to go, and the one line that
 * asks for an answer.
 *
 * It is a block rather than a screen of its own — on the printed card these
 * lines sit under the collage, and the hero reads as one page because of it.
 *
 * Everything is live type rather than drawn art: it is the part a guest will
 * read out to someone else, so it has to be selectable, searchable and
 * reflowable.
 *
 * "Trân trọng kính mời …" is deliberately not repeated here — it opens the
 * invitation one screen earlier, on `Invite`.
 */
export function WeddingInfo() {
  return (
    <div id="thoi-gian" className={styles.info}>
      <h2 className="sr-only">Thông tin lễ cưới</h2>

      {/* The two families open the card, as they do on a printed Vietnamese
          invitation: they are who it is from. The groom's side on the left,
          the bride's on the right, each parent on a line of their own. */}
      <Reveal className={styles.families}>
        {families.map((family) => (
          <div key={family.side} className={styles.family}>
            <p className={`caps caps-sm ${styles.side}`}>{family.side}</p>
            <p className={styles.parent}>{family.father}</p>
            <p className={styles.parent}>{family.mother}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className={styles.place} delay={80}>
        <p className="caps caps-sm">Lễ cưới diễn ra tại</p>
        <p className="caps">{ceremony.hall}</p>
        <p className={styles.venue}>{ceremony.venue}</p>
        <p className={`caps caps-sm ${styles.address}`}>{ceremony.address}</p>
      </Reveal>

      <Reveal className={`caps ${styles.when}`} delay={160}>
        <p>
          Vào ngày {day} tháng {month} năm {year}
        </p>
        <p>
          Hồi {ceremony.time}, {ceremony.weekday}
        </p>
      </Reveal>

      <Reveal delay={240}>
        <Countdown
          target={ceremony.isoDate}
          className={styles.countdown}
          unitClassName={styles.unit}
          valueClassName={styles.value}
          labelClassName={`caps caps-xs ${styles.label}`}
        />
      </Reveal>

      <Reveal delay={320} className={styles.ask}>
        <a className="btn btn-mocha" href="#rsvp">
          Quý khách sẽ đến chứ?
        </a>
      </Reveal>

      {/* The lunar date is not printed on the card, but a guest looking for
          it should still find it on the page. */}
      <p className="sr-only">{ceremony.lunar}</p>

      <a
        className="link-quiet"
        href={ceremony.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Xem bản đồ
      </a>
    </div>
  );
}
