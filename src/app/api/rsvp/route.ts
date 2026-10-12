import { NextResponse } from 'next/server';

/** What the reply card sends. */
export type RsvpBody = {
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  attending: 'yes' | 'no';
  guests: number;
  dietary: FormDataEntryValue | null;
  note: FormDataEntryValue | null;
  message: FormDataEntryValue | null;
};

export type RsvpPayload = {
  name: string;
  email: string;
  attending: 'yes' | 'no';
  guests: number;
  dietary: string;
  /** "Ghi chú" — a short practical remark, as distinct from the wishes. */
  note: string;
  message: string;
};

function parse(body: unknown): RsvpPayload | null {
  if (typeof body !== 'object' || body === null) return null;
  const raw = body as Record<string, unknown>;

  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  // `contact` is the field's former name; accepted so an older client still
  // reaches the sheet.
  const emailRaw = raw.email ?? raw.contact;
  const email = typeof emailRaw === 'string' ? emailRaw.trim() : '';
  const attending = raw.attending === 'no' ? 'no' : 'yes';
  const guests = Number(raw.guests);
  const dietary = typeof raw.dietary === 'string' ? raw.dietary.trim() : '';
  const note = typeof raw.note === 'string' ? raw.note.trim() : '';
  const message = typeof raw.message === 'string' ? raw.message.trim() : '';

  if (name.length < 2 || name.length > 80) return null;
  if (email.length > 120) return null;
  if (!Number.isInteger(guests) || guests < 0 || guests > 10) return null;
  if (dietary.length > 300) return null;
  if (note.length > 300) return null;
  if (message.length > 600) return null;

  return { name, email, attending, guests, dietary, note, message };
}

/**
 * The shape the couple's Apps Script reads.
 *
 * The address goes out under both names. The script in
 * scripts/rsvp-apps-script.gs takes `email`; the one deployed before it took
 * `contact`, and sending both means the sheet keeps filling whichever of the
 * two is live. Drop `contact` once the new script has been deployed for good.
 */
function forSheet(rsvp: RsvpPayload) {
  return { ...rsvp, contact: rsvp.email };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Dữ liệu không hợp lệ.' }, { status: 400 });
  }

  const rsvp = parse(body);
  if (!rsvp) {
    return NextResponse.json({ error: 'Vui lòng kiểm tra lại thông tin.' }, { status: 422 });
  }

  const webhook = process.env.RSVP_WEBHOOK_URL;
  if (!webhook) {
    // No sink configured yet — keep the guest's submission out of the void by
    // at least recording it server-side.
    console.info('[rsvp]', { ...rsvp, at: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...forSheet(rsvp), submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (error) {
    console.error('[rsvp] webhook failed', error);
    return NextResponse.json({ error: 'Không gửi được, xin thử lại sau.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
