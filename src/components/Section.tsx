import Image from 'next/image';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/Reveal';

export type Tone = 'light' | 'dark';

type SectionProps = {
  id?: string;
  /** Picks the colour set the whole subtree reads from. */
  tone: Tone;
  /** Full-bleed backdrop; sections below the hero alternate cream and green. */
  backdrop: string;
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
      <Image
        className="backdrop"
        src={backdrop}
        alt=""
        fill
        sizes="(min-width: 40rem) 30rem, 100vw"
      />
      {children}
    </section>
  );
}

/** Eyebrow + calligraphic title, the opening of every section. */
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
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId} className="section-title">
        {title}
      </h2>
      {children}
    </Reveal>
  );
}
