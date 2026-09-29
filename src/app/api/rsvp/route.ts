import { NextResponse } from 'next/server';

export type RsvpPayload = {
  name: string;
  contact: string;
  attending: 'yes' | 'no';
  guests: number;
  dietary: string;
  message: string;
};

function parse(body: unknown): RsvpPayload | null {
  if (typeof body !== 'object' || body === null) return null;
  const raw = body as Record<string, unknown>;

  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const contact = typeof raw.contact === 'string' ? raw.contact.trim() : '';
  const attending = raw.attending === 'no' ? 'no' : 'yes';
  const guests = Number(raw.guests);
  const dietary = typeof raw.dietary === 'string' ? raw.dietary.trim() : '';
  const message = typeof raw.message === 'string' ? raw.message.trim() : '';

  if (name.length < 2 || name.length > 80) return null;
  if (contact.length > 120) return null;
  if (!Number.isInteger(guests) || guests < 0 || guests > 10) return null;
  if (dietary.length > 300) return null;
  if (message.length > 600) return null;

  return { name, contact, attending, guests, dietary, message };
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
      body: JSON.stringify({ ...rsvp, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (error) {
    console.error('[rsvp] webhook failed', error);
    return NextResponse.json({ error: 'Không gửi được, xin thử lại sau.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
