import Image from 'next/image';

type IconProps = { className?: string };

const createAgendaIcon = (filename: string) => {
  return function AgendaImage({ className }: IconProps) {
    return (
      <div className={className} style={{ position: 'relative' }}>
        <Image 
          src={`/agenda/${filename}`} 
          alt="" 
          fill 
          style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
        />
      </div>
    );
  };
};

export const ArchIcon = createAgendaIcon('24.png');
export const RingsIcon = createAgendaIcon('25.png');
export const DinnerIcon = createAgendaIcon('26.png');
export const ToastIcon = createAgendaIcon('27.png');

/** The small bow that ties the spine between stops. */
export function BowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 8C8.6 4.6 5.4 3.4 3.4 4.6 1.6 5.7 1.8 8.6 4 9.6c2 1 5 .3 7-1.6Z" />
        <path d="M13 8c2.4-3.4 5.6-4.6 7.6-3.4 1.8 1.1 1.6 4-.6 5-2 1-5 .3-7-1.6Z" />
        <circle cx="12" cy="8" r="1.3" />
        <path d="M10.6 9.2 8.8 14M13.4 9.2 15.2 14" />
      </g>
    </svg>
  );
}

export const agendaIcons = [ArchIcon, RingsIcon, DinnerIcon, ToastIcon];
