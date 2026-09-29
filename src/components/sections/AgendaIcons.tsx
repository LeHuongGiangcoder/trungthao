/* Line-drawn marks for the four stops of the evening, in the same thin ink as
   the botanical work around them. */

type IconProps = { className?: string };

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** Đón khách — a garden arch, echoing the bridge elsewhere on the page. */
export function ArchIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <g {...stroke}>
        <path d="M11 40V24a13 13 0 0 1 26 0v16" />
        <path d="M16 40V24a8 8 0 0 1 16 0v16" />
        <path d="M8 40h32" />
        <circle cx="24" cy="9.5" r="1.6" />
        <path d="M18 15.5c-2-1.4-4.2-1.2-5.4.3M30 15.5c2-1.4 4.2-1.2 5.4.3" />
      </g>
    </svg>
  );
}

/** Lễ cưới — two bands, joined. */
export function RingsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <g {...stroke}>
        <circle cx="19" cy="28" r="10" />
        <circle cx="30" cy="28" r="10" />
        <path d="m24.5 13-3 4h6l-3-4Z" />
        <path d="M24.5 13v-2" />
      </g>
    </svg>
  );
}

/** Tiệc tối — a laid place setting. */
export function DinnerIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <g {...stroke}>
        <circle cx="24" cy="24" r="11" />
        <circle cx="24" cy="24" r="7.5" />
        <path d="M9 12v9a2.5 2.5 0 0 0 2.5 2.5h0V36M11.5 12v7M9 12h5v7" />
        <path d="M38 12c1.8 1.2 2.4 4 1.6 7-.5 1.8-1.6 3-1.6 3V36" />
      </g>
    </svg>
  );
}

/** Tiệc sau lễ — two glasses raised. */
export function ToastIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <g {...stroke}>
        <path d="M14 11.5 8 15l4.5 10a4 4 0 0 0 7.4-3L14 11.5Z" />
        <path d="m16.7 25.8 4.2 9.6M17 38.5l7.5-3.2" />
        <path d="M34 11.5 40 15l-4.5 10a4 4 0 0 1-7.4-3L34 11.5Z" />
        <path d="m31.3 25.8-4.2 9.6M31 38.5l-7.5-3.2" />
      </g>
    </svg>
  );
}

/** The small bow that ties the spine between stops. */
export function BowIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden="true">
      <g {...stroke} strokeWidth={1}>
        <path d="M11 8C8.6 4.6 5.4 3.4 3.4 4.6 1.6 5.7 1.8 8.6 4 9.6c2 1 5 .3 7-1.6Z" />
        <path d="M13 8c2.4-3.4 5.6-4.6 7.6-3.4 1.8 1.1 1.6 4-.6 5-2 1-5 .3-7-1.6Z" />
        <circle cx="12" cy="8" r="1.3" />
        <path d="M10.6 9.2 8.8 14M13.4 9.2 15.2 14" />
      </g>
    </svg>
  );
}

export const agendaIcons = [ArchIcon, RingsIcon, DinnerIcon, ToastIcon];
