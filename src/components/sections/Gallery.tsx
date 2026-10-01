import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';
import { backdrop, couplePhoto, piece } from '@/lib/assets';
import styles from './Gallery.module.css';

/** A collage laid up in layers. The carved oval is the tray at the back, the
 *  couple's main print sits squarely on it with a lace trim down one edge, and
 *  the lilies thread between the polaroids so the pieces read as one pile
 *  rather than separate cut-outs. */
export function Gallery() {
  return (
    <Section
      id="gallery"
      tone="dark"
      backdrop={backdrop.damaskGreen}
      labelledBy="gallery-title"
      className={styles.gallery}
    >
      <SectionHead eyebrow="Khoảnh khắc" title="Gallery" titleId="gallery-title" />

      <Reveal className={styles.scene}>
        {/* The tray: set in behind, so the main print lands on top of it. */}
        <Image
          className={styles.tray}
          src={piece.ovalFrameCarved.src}
          alt=""
          width={piece.ovalFrameCarved.w}
          height={piece.ovalFrameCarved.h}
        />

        <Image
          className={styles.lilyBack}
          src={piece.lilyBack.src}
          alt=""
          width={piece.lilyBack.w}
          height={piece.lilyBack.h}
        />

        <Image
          className={styles.spray}
          src={piece.spraySide.src}
          alt=""
          width={piece.spraySide.w}
          height={piece.spraySide.h}
        />

        {/* The main print. The lace runs round all four edges and is the only
            border it has — no paper mount underneath. */}
        <div className={styles.main}>
          <div className={styles.mainWindow}>
            <Image
              className={styles.photo}
              src={couplePhoto.studioVeil.src}
              alt="Bảo Trung và Thu Thảo"
              fill
              sizes="(min-width: 40rem) 17rem, 60vw"
            />
          </div>

          <Image className={styles.laceL} src={piece.laceStrip.src} alt="" width={piece.laceStrip.w} height={piece.laceStrip.h} />
          <Image className={styles.laceR} src={piece.laceStrip.src} alt="" width={piece.laceStrip.w} height={piece.laceStrip.h} />
          <Image className={styles.laceT} src={piece.laceStripH.src} alt="" width={piece.laceStripH.w} height={piece.laceStripH.h} />
          <Image className={styles.laceB} src={piece.laceStripH.src} alt="" width={piece.laceStripH.w} height={piece.laceStripH.h} />
        </div>

        {/* Both polaroids put the photograph above the frame art: the art's own
            window carries a half-opaque grey film that would otherwise wash the
            picture out. object-position keeps the groom in frame. */}
        <div className={`${styles.polaroid} ${styles.polaroidTop}`}>
          <Image
            className={styles.polaroidArt}
            src={piece.photoFrame.src}
            alt=""
            width={piece.photoFrame.w}
            height={piece.photoFrame.h}
          />
          <div className={styles.polaroidWindow}>
            <Image
              className={styles.photo}
              src={couplePhoto.studioPair.src}
              alt="Bảo Trung và Thu Thảo"
              fill
              sizes="(min-width: 40rem) 11rem, 38vw"
            />
          </div>
        </div>

        <div className={`${styles.polaroid} ${styles.polaroidLow}`}>
          <Image
            className={styles.polaroidArt}
            src={piece.photoFrame.src}
            alt=""
            width={piece.photoFrame.w}
            height={piece.photoFrame.h}
          />
          <div className={styles.polaroidWindow}>
            <Image
              className={styles.photo}
              src={couplePhoto.studioFull.src}
              alt="Bảo Trung và Thu Thảo"
              fill
              sizes="(min-width: 40rem) 10rem, 34vw"
            />
          </div>
        </div>

        <Image
          className={styles.lilyFront}
          src={piece.lily.src}
          alt=""
          width={piece.lily.w}
          height={piece.lily.h}
        />

        <Image
          className={styles.pearls}
          src={piece.pearls.src}
          alt=""
          width={piece.pearls.w}
          height={piece.pearls.h}
        />

        {/* The signature tag, resting on the pile at the front. */}
        <div className={styles.card}>
          <Image
            className={styles.cardArt}
            src={piece.pearlCard.src}
            alt=""
            width={piece.pearlCard.w}
            height={piece.pearlCard.h}
          />
          <p className={styles.cardName}>
            <span>Trung</span>
            <span className={styles.cardAmp}>&amp;</span>
            <span>Thảo</span>
          </p>
        </div>

        <Image
          className={styles.roses}
          src={piece.roseCluster.src}
          alt=""
          width={piece.roseCluster.w}
          height={piece.roseCluster.h}
        />
      </Reveal>
    </Section>
  );
}
