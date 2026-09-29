import Image from 'next/image';
import { PaperCard } from '@/components/PaperCard';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop, element } from '@/lib/assets';
import { ceremony } from '@/lib/wedding';
import styles from './WeddingInfo.module.css';

export function WeddingInfo() {
  return (
    <Section id="thiep" tone="light" backdrop={backdrop.damask} labelledBy="info-title">
      <Image className={`ornament ${styles.toileTop}`} src={element.toileFlorals} alt="" width={640} height={1044} />
      <Image className={`ornament ${styles.toileBottom}`} src={element.toileFlorals} alt="" width={640} height={1044} />

      <SectionHead eyebrow="Thiệp mời" title="Thiệp Chính" titleId="info-title" />

      <Reveal className={styles.card} delay={120}>
        <PaperCard />
      </Reveal>

      <Reveal delay={200}>
        <a className={styles.mapLink} href={ceremony.mapUrl} target="_blank" rel="noopener noreferrer">
          <PinIcon className={styles.mapIcon} />
          Xem bản đồ
        </a>
      </Reveal>
    </Section>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
