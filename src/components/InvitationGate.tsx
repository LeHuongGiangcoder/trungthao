'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { backdrop, intro } from '@/lib/assets';
import { couple } from '@/lib/wedding';
import styles from './InvitationGate.module.css';

const SETTLE_MS = 1700; // just past --dur-curtain

/**
 * Holds the page behind a sealed envelope until the guest opens it, then
 * blurs the envelope away to reveal the invitation underneath.
 *
 * The screen is the printed object and nothing else: the couple announced in
 * gilt on the green ground, the envelope laid under them with the wax seal
 * stamped across its flap, and the one button to open it.
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
          <Image
            className={styles.ground}
            src={backdrop.damaskGreen}
            alt=""
            fill
            sizes="(min-width: 40rem) 30rem, 100vw"
            preload
          />

          <h1 className={styles.names}>
            <span>{couple.groom.name}</span>
            <Image
              className={styles.amp}
              src={intro.ampersand.src}
              alt="và"
              width={intro.ampersand.w}
              height={intro.ampersand.h}
            />
            <span>{couple.bride.name}</span>
          </h1>

          {/* The envelope, with its caption printed on the flap and the wax
              laid over the point where the flap closes. */}
          <div className={styles.envelope}>
            <Image
              className={styles.paper}
              src={intro.envelopeBack.src}
              alt=""
              width={intro.envelopeBack.w}
              height={intro.envelopeBack.h}
              sizes="(min-width: 40rem) 27rem, 90vw"
              preload
            />
            <p className={styles.caption}>&ldquo;A love letter from us&rdquo;</p>
            <div className={styles.seal}>
              <Image
                className={styles.wax}
                src={intro.waxSeal.src}
                alt=""
                width={intro.waxSeal.w}
                height={intro.waxSeal.h}
              />
              <Image
                className={styles.monogram}
                src={intro.monogram.src}
                alt=""
                width={intro.monogram.w}
                height={intro.monogram.h}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`btn btn-glass ${styles.button}`}
              onClick={openInvitation}
            >
              Mở thiệp
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
