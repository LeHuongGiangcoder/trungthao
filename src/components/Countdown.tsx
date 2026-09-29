'use client';

import { useEffect, useState } from 'react';

const UNITS = [
  { key: 'days', label: 'Ngày', per: 86_400_000 },
  { key: 'hours', label: 'Giờ', per: 3_600_000 },
  { key: 'minutes', label: 'Phút', per: 60_000 },
  { key: 'seconds', label: 'Giây', per: 1000 },
] as const;

function split(msLeft: number) {
  let rest = Math.max(0, msLeft);
  return UNITS.map(({ key, label, per }) => {
    const value = Math.floor(rest / per);
    rest -= value * per;
    return { key, label, value };
  });
}

type CountdownProps = {
  target: string;
  className?: string;
  unitClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
};

/** Time remaining until the ceremony. Renders dashes until mounted so the
 *  server and client markup agree. */
export function Countdown({
  target,
  className,
  unitClassName,
  valueClassName,
  labelClassName,
}: CountdownProps) {
  const [msLeft, setMsLeft] = useState<number | null>(null);

  useEffect(() => {
    const at = new Date(target).getTime();
    const tick = () => setMsLeft(at - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const parts = msLeft === null ? null : split(msLeft);

  return (
    <div className={className} role="timer" aria-label="Thời gian còn lại">
      {UNITS.map((unit, i) => (
        <div key={unit.key} className={unitClassName}>
          <span className={valueClassName}>
            {parts ? String(parts[i].value).padStart(2, '0') : '––'}
          </span>
          <span className={labelClassName}>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
