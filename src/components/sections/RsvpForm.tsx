'use client';

import { useState, type FormEvent } from 'react';
import styles from './Rsvp.module.css';

type Status = 'idle' | 'sending' | 'done';

export function RsvpForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');

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
          attending: data.get('attending'),
          guests: Number(data.get('guests') ?? 0),
          message: data.get('message'),
        }),
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
        <CheckIcon className={styles.doneMark} />
        <p className={styles.doneTitle}>Cảm ơn quý khách</p>
        <p className={styles.doneNote}>
          Gia đình chúng tôi đã nhận được phản hồi và rất mong được gặp quý khách.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
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
          placeholder="Nguyễn Văn A"
        />
      </div>

      <fieldset className={styles.field}>
        <legend className={styles.label}>Quý khách có tham dự?</legend>
        <div className={styles.choices}>
          <label className={styles.choice}>
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={attending === 'yes'}
              onChange={() => setAttending('yes')}
            />
            Có, chắc chắn
          </label>
          <label className={styles.choice}>
            <input
              type="radio"
              name="attending"
              value="no"
              checked={attending === 'no'}
              onChange={() => setAttending('no')}
            />
            Rất tiếc, không
          </label>
        </div>
      </fieldset>

      {attending === 'yes' && (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="rsvp-guests">
            Số người đi cùng
          </label>
          <input
            className={styles.input}
            id="rsvp-guests"
            name="guests"
            type="number"
            inputMode="numeric"
            min={0}
            max={10}
            defaultValue={0}
          />
        </div>
      )}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rsvp-message">
          Lời chúc gửi tới cô dâu chú rể
        </label>
        <textarea
          className={styles.textarea}
          id="rsvp-message"
          name="message"
          maxLength={600}
          placeholder="Chúc hai bạn trăm năm hạnh phúc…"
        />
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button className={styles.submit} type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Đang gửi…' : 'Gửi phản hồi'}
      </button>
    </form>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
      <path
        d="m7.75 12.25 2.9 2.9 5.6-6.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
