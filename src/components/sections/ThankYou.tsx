import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { backdrop, element, gilt, piece } from '@/lib/assets';
import { ceremony, couple, thanks } from '@/lib/wedding';
import styles from './ThankYou.module.css';

export function ThankYou() {
  return (
    <Section tone="light" backdrop={backdrop.damask} labelledBy="thanks-title" className={styles.thanks}>
      <Image className={`ornament ${styles.birds}`} src={element.birds} alt="" width={700} height={560} />

      {/* The names sit inside the oval; everything else reads below it. */}
      <Reveal className={styles.plaque}>
        <Image
          className={styles.frame}
          src={piece.ovalFrameGreen.src}
          alt=""
          width={piece.ovalFrameGreen.w}
          height={piece.ovalFrameGreen.h}
          sizes="(min-width: 40rem) 24rem, 80vw"
        />

        {/* Two lilies on the oval's right shoulder, the nearer one in front. */}
        <Image
          className={styles.lilyBack}
          src={piece.lilyBack.src}
          alt=""
          width={piece.lilyBack.w}
          height={piece.lilyBack.h}
        />
        <Image
          className={styles.lily}
          src={piece.lily.src}
          alt=""
          width={piece.lily.w}
          height={piece.lily.h}
        />
        <Image
          className={styles.butterfly}
          src={piece.butterflyPale.src}
          alt=""
          width={piece.butterflyPale.w}
          height={piece.butterflyPale.h}
        />

        <div className={styles.plaqueInner}>
          <Image className="section-icon" src={gilt.crest} alt="" width={560} height={635} />
          <p className={styles.eyebrow}>Thank you</p>
          <h2 id="thanks-title" className={styles.names}>
            <span>Trung</span>
            <span className={styles.and}>&</span>
            <span>Thảo</span>
          </h2>
        </div>
      </Reveal>

      <Reveal className={styles.closing} delay={140}>
        <div className={styles.lines}>
          {thanks.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <p className={styles.sign}>{thanks.sign}</p>
        <p className={styles.date}>{ceremony.dateLine}</p>
      </Reveal>
    </Section>
  );
}
