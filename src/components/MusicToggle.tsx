'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './MusicToggle.module.css';

/**
 * The invitation's music, and the one control for it.
 *
 * The clip is the first 15 seconds of the source, faded at both ends so the
 * loop seam does not click — see scripts/optimize-audio.cjs.
 *
 * Playback starts the moment the guest opens the envelope — that tap is the
 * gesture every browser wants before it will let a page make a sound, so it
 * is the only moment autoplay is allowed to work. If it is refused anyway
 * (a muted-by-default tab, a reduced-data setting), the toggle simply stays
 * in its off state and the guest can start it themselves.
 */
export function MusicToggle({ active }: { active: boolean }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = ref.current;
    if (!active || !audio) return;
    audio.volume = 0.55;
    void audio.play().then(
      () => setPlaying(true),
      () => setPlaying(false),
    );
  }, [active]);

  const toggle = useCallback(() => {
    const audio = ref.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <>
      <audio ref={ref} src="/audio.m4a" loop preload="auto" />

      <button
        type="button"
        className={styles.toggle}
        data-visible={active || undefined}
        data-playing={playing || undefined}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Tắt nhạc' : 'Bật nhạc'}
      >
        {/* A ring of notches that turns while the music runs — a record, not
            a loudspeaker, so it reads as something playing rather than a
            volume control. */}
        <svg className={styles.disc} viewBox="0 0 48 48" aria-hidden="true">
          <circle className={styles.rim} cx="24" cy="24" r="21" />
          <circle className={styles.rimInner} cx="24" cy="24" r="15" />
          <circle className={styles.hub} cx="24" cy="24" r="3.2" />
        </svg>

        <svg className={styles.mark} viewBox="0 0 24 24" aria-hidden="true">
          {playing ? (
            <path d="M9 18V6.6l9-1.8V16" />
          ) : (
            <>
              <path d="M9 18V6.6l9-1.8V16" />
              <path className={styles.slash} d="M4 20 20 4" />
            </>
          )}
          <circle cx="6.6" cy="18" r="2.6" />
          <circle cx="15.6" cy="16" r="2.6" />
        </svg>
      </button>
    </>
  );
}
