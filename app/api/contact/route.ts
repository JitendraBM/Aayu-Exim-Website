import { NextResponse } from "next/server";

/**
 * Enquiry form handler.
 *
 * TODO (before launch): wire this to a real delivery mechanism. It currently
 * validates and logs, then returns success — so no enquiry actually reaches
 * anyone. Pick one:
 *   - transactional email (Resend / SendGrid / AWS SES) to contact.emails
 *   - a CRM or shared inbox webhook
 * Add the provider key as an environment variable; never commit it.
 */

interface Enquiry {
  name: string;
  email: string;
  message: string;
  company?: string;
  country?: string;
  division?: string;
  /** Honeypot field — must be empty. */
  website?: string;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Partial<Enquiry>;

  try {
    body = (await request.json()) as Partial<Enquiry>;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Bots fill every field they find; people never see this one.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please provide your name, email and requirement." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (message.length > 5000) {
    return NextResponse.json({ error: "Your message is too long." }, { status: 400 });
  }

  // TODO: replace this with real delivery. Until then the enquiry only reaches
  // the server log, which nobody monitors — do not go live in this state.
  console.info("[enquiry] received", {
    name,
    email,
    company: body.company?.trim() || null,
    country: body.country?.trim() || null,
    division: body.division?.trim() || null,
    messageLength: message.length,
  });

  return NextResponse.json({ ok: true });
}
