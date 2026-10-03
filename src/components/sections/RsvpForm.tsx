'use client';

import { useState, type FormEvent } from 'react';
import { rsvp } from '@/lib/wedding';
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
          contact: data.get('contact'),
          attending: data.get('attending'),
          guests: attending === 'yes' ? Number(data.get('guests') ?? 1) : 0,
          dietary: data.get('dietary'),
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
      <div className={`paper-card ${styles.done}`} data-tone="light" role="status">
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
    <form className={`paper-card ${styles.form}`} data-tone="light" onSubmit={handleSubmit}>
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
          placeholder="Họ tên đầy đủ"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="rsvp-contact">
          Số điện thoại hoặc email
        </label>
        <input
          className={styles.input}
          id="rsvp-contact"
          name="contact"
          type="text"
          maxLength={120}
          autoComplete="tel"
          placeholder="Để gia đình liên hệ"
        />
      </div>

      <fieldset className={styles.field}>
        <legend className={styles.label}>Quý khách có tham dự?</legend>
        <div className={styles.choices}>
          <label className={`btn ${styles.choice}`}>
            <input
              type="radio"
              name="attending"
              value="yes"
              checked={attending === 'yes'}
              onChange={() => setAttending('yes')}
            />
            Vui lòng nhận lời
          </label>
          <label className={`btn ${styles.choice}`}>
            <input
              type="radio"
              name="attending"
              value="no"
              checked={attending === 'no'}
              onChange={() => setAttending('no')}
            />
            Rất tiếc xin vắng
          </label>
        </div>
      </fieldset>

      {attending === 'yes' && (
        <>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="rsvp-guests">
              Số người tham dự
            </label>
            <select className={styles.select} id="rsvp-guests" name="guests" defaultValue="1">
              {Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} người
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="rsvp-dietary">
              Yêu cầu về ẩm thực
            </label>
            <input
              className={styles.input}
              id="rsvp-dietary"
              name="dietary"
              type="text"
              maxLength={300}
              placeholder="Ăn chay, dị ứng…"
            />
          </div>
        </>
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

      <button className={`btn ${styles.submit}`} type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Đang gửi…' : 'Gửi phản hồi'}
      </button>
    </form>
  );
}
