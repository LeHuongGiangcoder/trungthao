import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop, piece } from '@/lib/assets';
import { agenda } from '@/lib/wedding';
import styles from './Agenda.module.css';

/** The order of the evening: the hour on the left, a diamond on the spine and
 *  the stop itself on the right. Each row sits dimmed until it is scrolled to,
 *  then lights up. */
export function Agenda() {
  return (
    <Section
      id="chuong-trinh"
      tone="dark"
      backdrop={backdrop.damaskGreen}
      labelledBy="agenda-title"
      className={styles.agenda}
    >


      <SectionHead eyebrow="Trình tự buổi lễ" title="Chương Trình" titleId="agenda-title">
        <span className="rule-diamond" aria-hidden="true">
          <span />
        </span>
        <p className={styles.subtitle}>Thời gian dự kiến</p>
      </SectionHead>

      <ol className={styles.list}>
        {agenda.map((stop) => (
          <Reveal as="li" key={stop.time} className={styles.item} fade={false}>
            <p className={styles.time}>{stop.time}</p>

            <div className={styles.spine} aria-hidden="true">
              <span className={styles.spineLine} />
              <span className={styles.diamond} />
            </div>

            <div className={styles.detail}>
              <h3 className={styles.itemTitle}>{stop.title}</h3>
              <p className={styles.note}>{stop.note}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
