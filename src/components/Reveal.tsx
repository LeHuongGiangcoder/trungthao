'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Render as something other than a div — e.g. `li`, `section`. */
  as?: ElementType;
  className?: string;
  /** Stagger, in ms, applied via the --reveal-delay custom property. */
  delay?: number;
  /**
   * How far up the screen the element must come before it counts as reached,
   * as a fraction of the viewport height. The default, 0, reveals as soon as
   * it is 40px in, which is right for a block of type. A tall piece whose
   * first edge enters the screen long before the guest is looking at it wants
   * a hold, so its motion runs while they are watching rather than before.
   */
  hold?: number;
  /**
   * Set false to skip the shared fade-and-lift. The element then styles its
   * own before and after states off `data-shown` — the agenda uses this to sit
   * dimmed and brighten as it is scrolled to, rather than being invisible.
   */
  fade?: boolean;
};

/**
 * Fades + lifts its children the first time they scroll into view.
 * The visual work lives in the global `.reveal` class, which is inert under
 * `prefers-reduced-motion`, so this stays a no-op for those users.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  fade = true,
  hold = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    // Where the top of the element has to reach before it counts as on
    // screen, measured up from the bottom of the viewport.
    const inset = hold ? `${Math.round(hold * 100)}%` : '40px';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      // Threshold 0 with an inset on the bottom edge: sections are exactly one
      // screen tall, so a percentage threshold can leave the last element in a
      // section permanently hidden when that section is scrolled flush to the
      // top.
      { rootMargin: `0px 0px -${inset} 0px`, threshold: 0 },
    );

    observer.observe(node);

    // Nothing on an invitation may end up permanently invisible. If the element
    // is on screen but the observer hasn't reported (delivery is suspended
    // while the tab is hidden, and anchors can skip past a section), reveal it
    // anyway on the next frame the page is actually visible.
    let raf = 0;
    const settleIfVisible = () => {
      raf = requestAnimationFrame(() => {
        if (document.visibilityState !== 'visible') return;
        // The same line the observer uses, or the guard would undo the hold.
        const line = window.innerHeight - (hold ? window.innerHeight * hold : 40);
        const box = node.getBoundingClientRect();
        if (box.top < line && box.bottom > 0) setShown(true);
      });
    };

    const guard = window.setTimeout(settleIfVisible, 1200);
    document.addEventListener('visibilitychange', settleIfVisible);

    return () => {
      observer.disconnect();
      window.clearTimeout(guard);
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', settleIfVisible);
    };
  }, [shown, hold]);

  return (
    <Tag
      ref={ref}
      className={[fade && 'reveal', className].filter(Boolean).join(' ') || undefined}
      data-shown={shown || undefined}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
