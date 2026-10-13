import { Countdown } from '@/components/Countdown';
import { Reveal } from '@/components/Reveal';
import { ceremony, couple, families } from '@/lib/wedding';
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

      <Reveal className={styles.place}>
        <p className="caps caps-sm">Lễ cưới diễn ra tại</p>
        <p className="caps">{ceremony.hall}</p>
        <p className={styles.venue}>{ceremony.venue}</p>
        <p className={`caps caps-sm ${styles.address}`}>{ceremony.address}</p>
      </Reveal>

      <Reveal className={`caps ${styles.when}`} delay={120}>
        <p>
          Vào ngày {day} tháng {month} năm {year}
        </p>
        <p>
          Hồi {ceremony.time}, {ceremony.weekday}
        </p>
      </Reveal>

      <Reveal delay={200}>
        <Countdown
          target={ceremony.isoDate}
          className={styles.countdown}
          unitClassName={styles.unit}
          valueClassName={styles.value}
          labelClassName={`caps caps-xs ${styles.label}`}
        />
      </Reveal>

      <Reveal delay={280} className={styles.ask}>
        <a className="btn btn-mocha" href="#rsvp">
          Quý khách sẽ đến chứ?
        </a>
      </Reveal>

      {/* Not printed on the card, but a guest looking for the families or for
          the lunar date should still find them on the page. */}
      <div className="sr-only">
        <p>
          {couple.groom.name} và {couple.bride.name}
        </p>
        <p>{ceremony.lunar}</p>
        {families.map((family) => (
          <p key={family.side}>
            {family.side}: {family.father}, {family.mother}
          </p>
        ))}
      </div>

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
