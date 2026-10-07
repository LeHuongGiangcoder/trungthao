import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Tone } from '@/components/Section';
import styles from './Screen.module.css';

/** One piece of art from `story`, drawn on the shared 9:16 frame. */
export type Art = { src: string; w: number; h: number };

/**
 * A screen built by stacking full-frame art rather than by laying out pieces.
 *
 * Every layer is drawn on the same 9:16 canvas with its placement already in
 * it, so they are all painted into one 9:16 *sheet* centred on the screen.
 * Anything positioned in percentages — the welcome card's oval, say — is
 * placed inside that sheet too, so the whole composition holds together at any
 * screen shape instead of each piece being cropped against the viewport.
 *
 * `fit` says what the sheet does when the screen is not 9:16:
 * - `contain` (the default) letterboxes it against the screen's own ground, so
 *   nothing is ever cut off. Right for cards and lettering.
 * - `cover` grows the sheet past the screen and lets it crop. Right when the
 *   art is a photograph that should bleed.
 *
 * `ground` is a separate full-bleed layer painted behind the sheet, for the
 * textures and photographs that should fill the screen whatever the sheet does.
 */
export function Screen({
  id,
  tone,
  ground,
  groundAlt = '',
  fit = 'contain',
  labelledBy,
  className,
  children,
}: {
  id?: string;
  tone: Tone;
  ground?: Art;
  groundAlt?: string;
  fit?: 'cover' | 'contain';
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={className ? `${styles.screen} ${className}` : styles.screen}
      aria-labelledby={labelledBy}
    >
      {ground ? (
        <Image
          className={styles.ground}
          src={ground.src}
          alt={groundAlt}
          fill
          sizes="(min-width: 40rem) 30rem, 100vw"
        />
      ) : null}

      <div className={`${styles.sheet} ${fit === 'cover' ? styles.cover : styles.contain}`}>
        {children}
      </div>
    </section>
  );
}

/** One layer of a `Screen`'s sheet. Decorative by default; pass `alt` for the
 *  one piece of art on a screen that carries its meaning. */
export function Layer({
  art,
  alt = '',
  className,
  preload,
}: {
  art: Art;
  alt?: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <Image
      className={className ? `${styles.layer} ${className}` : styles.layer}
      src={art.src}
      alt={alt}
      fill
      sizes="(min-width: 40rem) 30rem, 100vw"
      preload={preload}
    />
  );
}
