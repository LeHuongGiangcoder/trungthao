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
        src={piece.saveTheDate.src}
        alt=""
        width={piece.saveTheDate.w}
        height={piece.saveTheDate.h}
      />

      <div className={styles.oval}>
        <Image src={piece.ovalFrame.src} alt="" width={piece.ovalFrame.w} height={piece.ovalFrame.h} />
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
        <Image src={piece.heartDoily.src} alt="" width={piece.heartDoily.w} height={piece.heartDoily.h} />
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
