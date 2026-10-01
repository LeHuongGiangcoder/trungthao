import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { backdrop, couplePhoto, element, piece } from '@/lib/assets';
import { ceremony, thanks } from '@/lib/wedding';
import styles from './ThankYou.module.css';

export function ThankYou() {
  return (
    <Section tone="light" backdrop={backdrop.damask} labelledBy="thanks-title" className={styles.thanks}>
      <Image className={`ornament ${styles.birds}`} src={element.birds} alt="" width={700} height={560} />

      {/* A photograph fills the oval. The frame's opening is genuinely cut out,
          so the picture sits behind it and the moulding masks it to the oval. */}
      <Reveal className={styles.plaque}>
        <div className={styles.portrait}>
          <Image
            className={styles.portraitPhoto}
            src={couplePhoto.embrace.src}
            alt="Bảo Trung và Thu Thảo"
            fill
            sizes="(min-width: 40rem) 19rem, 64vw"
          />
        </div>

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

        {/* The lettering has come off the oval, but the section still needs the
            heading it is labelled by. */}
        <h2 id="thanks-title" className="sr-only">
          Trung &amp; Thảo
        </h2>
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
