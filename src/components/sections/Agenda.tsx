import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop } from '@/lib/assets';
import { agenda } from '@/lib/wedding';
import { BowIcon, agendaIcons } from './AgendaIcons';
import styles from './Agenda.module.css';

export function Agenda() {
  return (
    <Section
      id="chuong-trinh"
      tone="dark"
      backdrop={backdrop.damaskGreen}
      labelledBy="agenda-title"
      className={styles.agenda}
    >
      <SectionHead eyebrow="Trình tự buổi lễ" title="Chương Trình" titleId="agenda-title" />

      <ol className={styles.list}>
        {agenda.map((stop, i) => {
          const Mark = agendaIcons[i % agendaIcons.length];
          return (
            <Reveal as="li" key={stop.time} className={styles.item} delay={i * 110}>
              <Mark className={styles.icon} />
              <div className={styles.spine} aria-hidden="true">
                <span className={styles.spineLine} />
                <BowIcon className={styles.bow} />
              </div>
              <div className={styles.detail}>
                <p className={styles.time}>{stop.time}</p>
                <h3 className={styles.itemTitle}>{stop.title}</h3>
                <p className={styles.note}>{stop.note}</p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
