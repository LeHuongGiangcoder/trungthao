import Image from 'next/image';
import { element } from '@/lib/assets';
import { ceremony, couple, thanks } from '@/lib/wedding';
import styles from './PaperCard.module.css';

/** The main invitation, set inside the engraved deckled card. */
export function PaperCard() {
  return (
    <div className={styles.card}>
      <Image
        className={styles.paper}
        src={element.paperCard}
        alt=""
        fill
        sizes="(min-width: 40rem) 30rem, 100vw"
        quality={88}
      />

      <div className={styles.body}>
        <p className={styles.eyebrow}>Trân trọng kính mời</p>
        <span className={styles.divider} />
        <p className={styles.lead}>
          Đến dự tiệc mừng lễ thành hôn cùng gia đình chúng tôi
        </p>

        <p className={styles.names}>
          <span>{couple.groom.name}</span>
          <span className={styles.and}>và</span>
          <span>{couple.bride.name}</span>
        </p>

        <div className={styles.when}>
          <p className={styles.whenTop}>
            Vào hồi {ceremony.time} | {ceremony.weekday}
          </p>
          <p className={styles.whenDate}>{ceremony.dateLine}</p>
          <p className={styles.whenLunar}>({ceremony.lunar})</p>
        </div>

        <div className={styles.where}>
          <p className={styles.whereHall}>Tại {ceremony.hall}</p>
          <p className={styles.whereVenue}>{ceremony.venue}</p>
          <p className={styles.whereAddress}>{ceremony.address}</p>
        </div>

        <p className={styles.closing}>{thanks.sign}</p>
      </div>
    </div>
  );
}
