import { Layer, Screen } from '@/components/Screen';
import { story } from '@/lib/assets';
import { ceremony, couple, families } from '@/lib/wedding';
import styles from './WeddingInfo.module.css';

/**
 * The invitation proper: one engraved card on embossed damask.
 *
 * The lettering is part of the art, so the same words are repeated here for
 * screen readers and for anyone searching the page — the card itself carries
 * no selectable text.
 */
export function WeddingInfo() {
  return (
    <Screen
      id="thoi-gian"
      tone="light"
      ground={story.infoDamask}
      labelledBy="info-title"
      className={styles.info}
    >
      <Layer art={story.infoFrame} />
      <Layer art={story.infoText} />

      <h2 id="info-title" className={styles.title}>
        Thông tin đám cưới
      </h2>

      <div className="sr-only">
        <p>Trân trọng kính mời đến dự tiệc mừng lễ thành hôn cùng gia đình chúng tôi</p>
        <p>
          {couple.groom.name} và {couple.bride.name}
        </p>
        <p>
          Vào hồi {ceremony.time}, {ceremony.weekday} {ceremony.dateLine} ({ceremony.lunar})
        </p>
        <p>
          Tại {ceremony.hall}, {ceremony.venue}, {ceremony.address}
        </p>
        {families.map((family) => (
          <p key={family.side}>
            {family.side}: {family.father}, {family.mother}
          </p>
        ))}
      </div>

      <a
        className={styles.mapLink}
        href={ceremony.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Xem bản đồ
      </a>
    </Screen>
  );
}
