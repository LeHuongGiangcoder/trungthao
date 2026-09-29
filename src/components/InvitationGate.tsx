'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { backdrop } from '@/lib/assets';
import { ceremony, couple } from '@/lib/wedding';
import styles from './InvitationGate.module.css';

const SETTLE_MS = 1700; // just past --dur-curtain

/**
 * Holds the page behind a closed envelope until the guest opens it, then
 * blurs the envelope away to reveal the invitation underneath.
 */
export function InvitationGate({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [settled, setSettled] = useState(false);

  // Scroll stays locked while the envelope is closed.
  useEffect(() => {
    document.body.dataset.locked = open ? 'false' : 'true';
    return () => {
      delete document.body.dataset.locked;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => setSettled(true), SETTLE_MS);
    return () => window.clearTimeout(id);
  }, [open]);

  const openInvitation = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setOpen(true);
  }, []);

  return (
    <>
      <div
        className={styles.gate}
        data-open={open || undefined}
        data-settled={settled || undefined}
        aria-hidden={open || undefined}
        inert={open}
      >
        <div className={styles.frame}>
          <div className={styles.photo}>
            <Image
              className={styles.envelope}
              src={backdrop.envelope}
              alt=""
              fill
              sizes="(min-width: 40rem) 30rem, 100vw"
              preload
            />

            <div className={styles.onEnvelope}>
              <p className={styles.eyebrow}>Save the date</p>
              <h1 className={styles.names}>
                <span>{couple.groom.name}</span>
                <span className={styles.amp}>và</span>
                <span>{couple.bride.name}</span>
              </h1>
            </div>

            <p className={styles.date}>{ceremony.dateLine}</p>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.button} onClick={openInvitation}>
              <SealIcon />
              Open invitation
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content} data-open={open || undefined} data-settled={settled || undefined}>
        {children}
      </div>
    </>
  );
}

function SealIcon() {
  return (
    <svg className={styles.seal} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2.75 6.75v10.5a1.5 1.5 0 0 0 1.5 1.5h15.5a1.5 1.5 0 0 0 1.5-1.5V6.75a1.5 1.5 0 0 0-1.5-1.5H4.25a1.5 1.5 0 0 0-1.5 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
