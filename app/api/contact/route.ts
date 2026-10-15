import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Enquiry form handler.
 *
 * Validates the submission, drops honeypot traffic, then emails it to the
 * enquiries inbox through Google Workspace SMTP. Reply-To is the enquirer, so
 * replying from Gmail goes straight back to them.
 *
 * Configuration (see .env.example): SMTP_USER + SMTP_PASS (a Google App
 * Password, never the account password), optional ENQUIRY_TO. Without them,
 * production fails closed — the form shows an error instead of a false
 * "sent" — while development only logs the enquiry.
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

/** Trim, cap length and flatten newlines for single-line fields. */
function oneLine(value: string | undefined, max = 200): string {
  return (value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

function getTransport() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;

  return {
    from: user,
    to: process.env.ENQUIRY_TO || user,
    transporter: nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user, pass },
    }),
  };
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

  const name = oneLine(body.name, 120);
  const email = oneLine(body.email, 254);
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

  const company = oneLine(body.company);
  const country = oneLine(body.country);
  const division = oneLine(body.division);

  const mail = getTransport();

  if (!mail) {
    if (process.env.NODE_ENV === "production") {
      console.error("[enquiry] SMTP_USER/SMTP_PASS not set — enquiry not delivered");
      return NextResponse.json(
        { error: "Your enquiry could not be sent. Please email us directly." },
        { status: 500 },
      );
    }
    console.info("[enquiry] SMTP not configured; logged only (dev)", {
      name,
      email,
      company: company || null,
      country: country || null,
      division: division || null,
      messageLength: message.length,
    });
    return NextResponse.json({ ok: true });
  }

  const text = [
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Company:  ${company || "-"}`,
    `Country:  ${country || "-"}`,
    `Interest: ${division || "-"}`,
    "",
    "Requirement:",
    message,
    "",
    "—",
    "Sent from the enquiry form on aayuexim.com. Reply to this email to answer the enquirer.",
  ].join("\n");

  try {
    await mail.transporter.sendMail({
      from: { name: "Aayu Exim Website", address: mail.from },
      to: mail.to,
      replyTo: { name, address: email },
      subject: `Website enquiry: ${division || "General"} — ${name}${company ? ` (${company})` : ""}`,
      text,
    });
  } catch (error) {
    console.error("[enquiry] delivery failed", error);
    return NextResponse.json(
      { error: "Your enquiry could not be sent. Please try again or email us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
