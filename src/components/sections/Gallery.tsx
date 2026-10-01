import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop, couplePhoto, piece } from '@/lib/assets';
import styles from './Gallery.module.css';

/** Two beaded frames hanging on their thread, set off to the left, with a
 *  larger polaroid laid over them to the right. Each photograph sits in a
 *  clipped window beneath its frame, so the beading laps over its edges. */
export function Gallery() {
  return (
    <Section
      id="gallery"
      tone="light"
      backdrop={backdrop.damask}
      labelledBy="gallery-title"
      className={styles.gallery}
    >
      <SectionHead eyebrow="Khoảnh khắc" title="Gallery" titleId="gallery-title" />

      <Reveal className={styles.scene}>
        <div className={styles.hanging}>
          <div className={`${styles.window} ${styles.windowTop}`}>
            <Image
              className={styles.photo}
              src={couplePhoto.studioPair.src}
              alt="Bảo Trung và Thu Thảo"
              fill
              sizes="(min-width: 40rem) 9rem, 30vw"
            />
          </div>

          <div className={`${styles.window} ${styles.windowBottom}`}>
            <Image
              className={styles.photo}
              src={couplePhoto.studioFull.src}
              alt="Bảo Trung và Thu Thảo"
              fill
              sizes="(min-width: 40rem) 12rem, 40vw"
            />
          </div>

          <Image
            className={styles.frames}
            src={piece.beadFrames.src}
            alt=""
            width={piece.beadFrames.w}
            height={piece.beadFrames.h}
          />
        </div>

        <div className={styles.polaroid}>
          <div className={styles.polaroidWindow}>
            <Image
              className={styles.photo}
              src={couplePhoto.embrace.src}
              alt="Bảo Trung và Thu Thảo"
              fill
              sizes="(min-width: 40rem) 17rem, 58vw"
            />
          </div>

          <Image
            className={styles.polaroidArt}
            src={piece.photoFrame.src}
            alt=""
            width={piece.photoFrame.w}
            height={piece.photoFrame.h}
          />
        </div>
      </Reveal>
    </Section>
  );
}
