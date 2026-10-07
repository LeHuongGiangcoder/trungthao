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
 * it, so the section itself is held to 9:16 and each layer fills it. Anything
 * positioned in percentages — the welcome card's oval, say — is placed against
 * the same box, so the whole composition holds together at any width.
 *
 * `ground` is a layer painted behind the rest, for the textures and
 * photographs the other pieces are laid on.
 */
export function Screen({
  id,
  tone,
  ground,
  groundAlt = '',
  tall,
  labelledBy,
  className,
  children,
}: {
  id?: string;
  tone: Tone;
  ground?: Art;
  groundAlt?: string;
  /** Let the screen run to the full viewport instead of holding 9:16. Only
   *  for screens whose art is a ground, with no layers to keep in register. */
  tall?: boolean;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={[styles.screen, tall ? styles.tall : '', className ?? ''].filter(Boolean).join(' ')}
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

      <div className={styles.sheet}>{children}</div>
    </section>
  );
}

/** One layer of a `Screen`. Decorative by default; pass `alt` for the one
 *  piece of art on a screen that carries its meaning. */
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
