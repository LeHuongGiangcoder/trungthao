import Image from 'next/image';
import { piece } from '@/lib/assets';
import { ceremony, photos } from '@/lib/wedding';
import styles from './Envelope.module.css';

/**
 * The opened invitation, built as a collage: the envelope front is the floor,
 * and the cards, the lace heart and the spray are laid around it so the whole
 * thing reads as one object photographed from above.
 *
 * Every piece is placed in percentages of the collage box and the box keeps a
 * fixed aspect ratio, so the arrangement holds at any width.
 */
export function Envelope() {
  return (
    <div className={styles.collage}>
      {/* --- The envelope front: the floor everything else is laid on ----- */}
      <Image
        className={styles.paper}
        src={piece.envelope.src}
        alt=""
        width={piece.envelope.w}
        height={piece.envelope.h}
        preload
      />

      <Image
        className={styles.saveTheDate}
        src={piece.saveTheDateCard.src}
        alt=""
        width={piece.saveTheDateCard.w}
        height={piece.saveTheDateCard.h}
      />

      {/* The mat has no window cut in it, so the portrait is laid on top of
          the art rather than behind it, clipped to an oval that leaves the
          scalloped rim and its four sprigs showing. */}
      <div className={styles.oval}>
        <Image src={piece.ovalDoily.src} alt="" width={piece.ovalDoily.w} height={piece.ovalDoily.h} />
        <div className={styles.ovalWindow}>
          {photos.portrait ? (
            <Image className={styles.photo} src={photos.portrait} alt="" fill sizes="50vw" />
          ) : (
            <p className={styles.monogram}>
              T <span>&amp;</span> T
            </p>
          )}
        </div>
      </div>

      <div className={styles.snap}>
        <Image src={piece.photoFrame.src} alt="" width={piece.photoFrame.w} height={piece.photoFrame.h} />
        {photos.candid ? (
          <div className={styles.snapWindow}>
            <Image className={styles.photo} src={photos.candid} alt="" fill sizes="40vw" />
          </div>
        ) : null}
      </div>

      <div className={styles.heart}>
        <Image src={piece.heartMat.src} alt="" width={piece.heartMat.w} height={piece.heartMat.h} />
        <p className={styles.heartDate}>{ceremony.dateLine}</p>
      </div>

      <Image
        className={styles.seal}
        src={piece.waxSeal.src}
        alt=""
        width={piece.waxSeal.w}
        height={piece.waxSeal.h}
      />

      <Image
        className={styles.spray}
        src={piece.spraySide.src}
        alt=""
        width={piece.spraySide.w}
        height={piece.spraySide.h}
      />
    </div>
  );
}
