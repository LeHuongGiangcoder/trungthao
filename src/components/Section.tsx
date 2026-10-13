import Image from 'next/image';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';
import { ornament } from '@/lib/assets';

export type Tone = 'light' | 'dark' | 'shell';

type SectionProps = {
  id?: string;
  /** Picks the colour set the whole subtree reads from — and, since
   *  `.section` paints `--bg-ground`, the section's ground with it. */
  tone: Tone;
  /** Full-bleed texture over that ground. Only for the screens that still
   *  want one; the beige screens are flat. */
  backdrop?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

/**
 * One screen of the invitation. Every section shares this shell, so they all
 * stand exactly one viewport tall with their content optically centred.
 */
export function Section({ id, tone, backdrop, labelledBy, className, children }: SectionProps) {
  return (
    <section
      id={id}
      data-tone={tone}
      className={className ? `section ${className}` : 'section'}
      aria-labelledby={labelledBy}
    >
      {backdrop ? (
        <Image
          className="backdrop"
          src={backdrop}
          alt=""
          fill
          sizes="(min-width: 40rem) 30rem, 100vw"
        />
      ) : null}
      {children}
    </section>
  );
}

/** Crest, eyebrow and calligraphic title — the opening of every section. */
export function SectionHead({
  eyebrow,
  title,
  titleId,
  children,
}: {
  eyebrow: string;
  title: string;
  titleId?: string;
  children?: ReactNode;
}) {
  return (
    <Reveal className="section-head">
      <Image
        className="section-icon"
        src={ornament.flower.src}
        alt=""
        width={ornament.flower.w}
        height={ornament.flower.h}
      />
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId} className="section-title">
        {title}
      </h2>
      {children}
    </Reveal>
  );
}
