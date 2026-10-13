import Image from 'next/image';
import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/Section';
import { intro, inviteArt } from '@/lib/assets';
import { ceremony } from '@/lib/wedding';
import styles from './Invite.module.css';

/** The card drawn out of its envelope: "Save the Date" across the top, the
 *  lace card rising behind, and the invitation's own lines set on the lace
 *  mat laid over it. The envelope's front pocket overlaps the bottom, so the
 *  card reads as held rather than floating.
 *
 *  As the screen is reached the mat rises out of that pocket, which is where
 *  the motion comes from: it starts low enough to be behind the envelope and
 *  is lifted into place, lines and all. */
export function Invite() {
  return (
    <Section id="loi-moi" tone="shell" labelledBy="invite-title" className={styles.screen}>
      <Reveal className={styles.headingWrap}>
        <h2 id="invite-title" className={styles.heading}>
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
        </h2>
      </Reveal>

      <Reveal className={styles.collage} fade={false}>
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
            src={inviteArt.doily.src}
            alt=""
            width={inviteArt.doily.w}
            height={inviteArt.doily.h}
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
