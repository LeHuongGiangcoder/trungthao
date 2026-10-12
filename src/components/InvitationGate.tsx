'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { MusicToggle } from '@/components/MusicToggle';
import { composition, loose } from '@/lib/composition';
import { couple } from '@/lib/wedding';
import styles from './InvitationGate.module.css';

const SETTLE_MS = 1700; // just past --dur-curtain

const { envSealed, envWax, envLetterhead } = composition.envelope;

/**
 * Holds the page behind a sealed envelope until the guest opens it.
 *
 * The screen is one photograph — a draped table in a stone hall — with the
 * letter standing on it. Everything on the envelope is placed inside a box
 * of the envelope's own proportions, in fractions measured off the art, so
 * the wax lands on the fold and the lettering on the flap at any width.
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
            src={loose.envGround.src}
            alt=""
            fill
            sizes="100vw"
            preload
          />

          <div className={styles.envelope}>
            <Image
              className={styles.paper}
              src={envSealed.src}
              alt=""
              width={envSealed.w}
              height={envSealed.h}
              sizes="(min-width: 40rem) 27rem, 88vw"
              preload
            />

            <h1 className={styles.letterhead}>
              <span className="sr-only">
                A love letter from {couple.bride.name} &amp; {couple.groom.name}
              </span>
              <Image
                src={envLetterhead.src}
                alt=""
                width={envLetterhead.w}
                height={envLetterhead.h}
                sizes="(min-width: 40rem) 11rem, 36vw"
                preload
              />
            </h1>

            <Image
              className={styles.wax}
              src={envWax.src}
              alt=""
              width={envWax.w}
              height={envWax.h}
              sizes="(min-width: 40rem) 5rem, 16vw"
              preload
            />

            <button type="button" className={styles.open} onClick={openInvitation}>
              Mở thiệp
            </button>
          </div>
        </div>
      </div>

      <div
        className={styles.content}
        data-open={open || undefined}
        data-settled={settled || undefined}
      >
        {children}
      </div>

      <MusicToggle active={open} />
    </>
  );
}
