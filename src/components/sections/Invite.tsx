import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { backdrop, intro } from '@/lib/assets';
import { ceremony } from '@/lib/wedding';
import styles from './Hero.module.css';

/** The card drawn out of its envelope: "Save the Date" in gilt across the
 *  green, the lace card rising behind, and the invitation's own lines set on
 *  the oval doily laid over it. The envelope's front pocket overlaps the
 *  bottom, so the card reads as held rather than floating. */
export function Hero() {
  return (
    <Section id="thiep" tone="dark" backdrop={backdrop.damaskGreen} labelledBy="hero-title" className={styles.hero}>
      <Reveal className={styles.headingWrap}>
        <h1 id="hero-title" className={styles.heading}>
          <span className="sr-only">Save the Date</span>
          <Image
            className={styles.headingArt}
            src={intro.saveTheDate.src}
            alt=""
            width={intro.saveTheDate.w}
            height={intro.saveTheDate.h}
            sizes="(min-width: 40rem) 27rem, 90vw"
            preload
          />
        </h1>
      </Reveal>

      <Reveal className={styles.collage} delay={160}>
        {/* The card, back-most: only its lace crown shows above the doily. */}
        <Image
          className={styles.card}
          src={intro.laceCard.src}
          alt=""
          width={intro.laceCard.w}
          height={intro.laceCard.h}
          sizes="(min-width: 40rem) 27rem, 92vw"
          preload
        />

        <div className={styles.oval}>
          <Image
            src={intro.ovalDoily.src}
            alt=""
            width={intro.ovalDoily.w}
            height={intro.ovalDoily.h}
            sizes="(min-width: 40rem) 20rem, 70vw"
            preload
          />
          <div className={styles.lines}>
            <p className={styles.invite}>
              Trân trọng kính mời
              <br />
              đến tham dự tiệc mừng
              <br />
              lễ thành hôn cùng
              <br />
              gia đình chúng tôi!
            </p>
            <p className={styles.date}>{ceremony.dateLine}</p>
          </div>
        </div>

        {/* The envelope's front pocket, laid over everything. */}
        <Image
          className={styles.pocket}
          src={intro.envelopeFront.src}
          alt=""
          width={intro.envelopeFront.w}
          height={intro.envelopeFront.h}
          sizes="(min-width: 40rem) 30rem, 100vw"
          preload
        />
      </Reveal>

      <p className={styles.scrollHint} aria-hidden="true">
        <span className={styles.scrollLine} />
        Cuộn xuống
      </p>
    </Section>
  );
}
