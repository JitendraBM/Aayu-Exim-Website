import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Access control for /admin.
 *
 * One shared password, no user accounts — the audience is the two or three
 * people at Aayu Exim who maintain the contact block. The session is a signed,
 * self-contained cookie (expiry + HMAC), so there is nothing to store server
 * side and nothing to keep in sync across Vercel's serverless instances.
 *
 * Both env vars must be set or /admin refuses to work at all. Failing closed
 * matters here: a missing ADMIN_PASSWORD must never mean "no password needed".
 */

const COOKIE = "aayu_admin";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

export function isAdminEnabled(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

/** Constant-time string compare that tolerates differing lengths. */
function equals(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  if (left.length !== right.length) {
    // Still hash both so the comparison cost does not leak the length.
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

function sign(payload: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return equals(input, expected);
}

export async function startAdminSession(): Promise<void> {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = String(expiresAt);
  const store = await cookies();

  store.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function verifyAdmin(): Promise<boolean> {
  if (!isAdminEnabled()) return false;

  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return false;

  const separator = token.lastIndexOf(".");
  if (separator < 1) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  if (!equals(signature, sign(payload))) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}
