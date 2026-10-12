'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { Reveal } from '@/components/Reveal';
import { loose } from '@/lib/composition';
import { planner } from '@/lib/wedding';
import styles from './Planner.module.css';

/**
 * The band that closes the invitation proper: the hall the letter was
 * photographed in, dimmed right down, with the couple's mark laid on it and
 * the one address to write to.
 *
 * It is the same photograph as the envelope screen's, so the page comes back
 * round to where it opened.
 */
export function Planner() {
  /* "Quay lại" returns to the top of the invitation, which is as close as a
     one-page site gets to the envelope the guest came in through. */
  const toTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className={styles.planner} aria-labelledby="planner-title">
      <Image
        className={styles.ground}
        src={loose.envGround.src}
        alt=""
        fill
        sizes="(min-width: 40rem) 30rem, 100vw"
      />

      <Reveal className={styles.body}>
        <p className={styles.eyebrow}>{planner.eyebrow}</p>

        <Image
          className={styles.mark}
          src={loose.monogramOvalLight.src}
          alt=""
          width={loose.monogramOvalLight.w}
          height={loose.monogramOvalLight.h}
          sizes="(min-width: 40rem) 9rem, 32vw"
        />

        <h2 id="planner-title" className="sr-only">
          Liên hệ
        </h2>

        <p className={styles.note}>{planner.note}</p>
        <a className={styles.email} href={`mailto:${planner.email}`}>
          {planner.email}
        </a>

        <button type="button" className={styles.back} onClick={toTop}>
          {planner.back}
        </button>
      </Reveal>
    </section>
  );
}
