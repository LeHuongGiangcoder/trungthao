'use client';

import { useState, type FormEvent } from 'react';
import type { RsvpBody } from '@/app/api/rsvp/route';
import { rsvp } from '@/lib/wedding';
import styles from './Rsvp.module.css';

type Status = 'idle' | 'sending' | 'done';

export function RsvpForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(rsvp.guestOptions[0]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setStatus('sending');
    setError(null);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          attending: 'yes',
          guests,
          dietary: data.get('dietary'),
          note: data.get('note'),
          message: data.get('message'),
        } satisfies RsvpBody),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? 'Không gửi được, xin thử lại sau.');
      }

      setStatus('done');
    } catch (cause) {
      setStatus('idle');
      setError(cause instanceof Error ? cause.message : 'Không gửi được, xin thử lại sau.');
    }
  }

  if (status === 'done') {
    return (
      <div className={styles.done} role="status">
        <p className={styles.doneTitle}>Cảm ơn quý khách</p>
        <span className="rule-diamond" aria-hidden="true">
          <span />
        </span>
        <p className={styles.doneNote}>
          Gia đình chúng tôi đã nhận được phản hồi và rất mong được gặp quý khách.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="rsvp-name">
          Họ và tên
        </label>
        <input
          className={styles.input}
          id="rsvp-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rsvp-email">
          Email
        </label>
        <input
          className={styles.input}
          id="rsvp-email"
          name="email"
          type="email"
          maxLength={120}
          autoComplete="email"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rsvp-dietary">
          Yêu cầu về đồ ăn (nếu có)
        </label>
        <textarea
          className={styles.textarea}
          id="rsvp-dietary"
          name="dietary"
          rows={3}
          maxLength={300}
        />
      </div>

      {/* Party size. Radios rather than a select: there are three of them, and
          on the card they are three bars you tap. */}
      <fieldset className={styles.field}>
        <legend className={styles.label}>Số lượng tham gia</legend>
        <div className={styles.guests}>
          {rsvp.guestOptions.map((n) => (
            <label key={n} className={styles.guest} data-chosen={guests === n || undefined}>
              <input
                className="sr-only"
                type="radio"
                name="guests"
                value={n}
                checked={guests === n}
                onChange={() => setGuests(n)}
              />
              {n}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rsvp-note">
          Ghi chú
        </label>
        <input className={styles.input} id="rsvp-note" name="note" type="text" maxLength={300} />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rsvp-message">
          Lời nhắn gửi
        </label>
        <textarea
          className={styles.textarea}
          id="rsvp-message"
          name="message"
          rows={3}
          maxLength={600}
        />
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button className={styles.submit} type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Đang gửi…' : 'Gửi'}
      </button>
    </form>
  );
}
