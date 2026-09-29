'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Render as something other than a div — e.g. `li`, `section`. */
  as?: ElementType;
  className?: string;
  /** Stagger, in ms, applied via the --reveal-delay custom property. */
  delay?: number;
};

/**
 * Fades + lifts its children the first time they scroll into view.
 * The visual work lives in the global `.reveal` class, which is inert under
 * `prefers-reduced-motion`, so this stays a no-op for those users.
 */
export function Reveal({ children, as: Tag = 'div', className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      // Threshold 0 with a small pixel inset: sections are exactly one screen
      // tall, so a percentage threshold can leave the last element in a section
      // permanently hidden when that section is scrolled flush to the top.
      { rootMargin: '0px 0px -40px 0px', threshold: 0 },
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
        const box = node.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) setShown(true);
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
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={className ? `reveal ${className}` : 'reveal'}
      data-shown={shown || undefined}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
