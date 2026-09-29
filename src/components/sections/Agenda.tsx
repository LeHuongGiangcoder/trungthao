import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop, element } from '@/lib/assets';
import { agenda } from '@/lib/wedding';
import styles from './Agenda.module.css';

export function Agenda() {
  return (
    <Section id="chuong-trinh" tone="light" backdrop={backdrop.damask} labelledBy="agenda-title">
      <Image className={`ornament ${styles.frame}`} src={element.botanicalFrame} alt="" width={900} height={1274} />

      <SectionHead eyebrow="Trình tự buổi lễ" title="Chương Trình" titleId="agenda-title" />

      <ol className={styles.list}>
        {agenda.map((stop, i) => (
          <Reveal as="li" key={stop.time} className={styles.item} delay={i * 110}>
            <p className={styles.time}>{stop.time}</p>
            <div className={styles.spine} aria-hidden="true">
              <span className={styles.node} />
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
