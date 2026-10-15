import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Redis } from "@upstash/redis";
import { LIST_FIELD_KEYS, type CompanyOverrides } from "./company-schema";

/**
 * Where admin edits to the company details live.
 *
 * Production is Vercel, whose filesystem is read-only at runtime — a write would
 * silently vanish. So when the Vercel KV (Upstash) env vars are present we store
 * the override document there. Without them (i.e. `npm run dev`) we fall back to
 * a JSON file so the admin screen is usable locally with no external service.
 *
 * The file fallback is deliberately dev-only: it is gitignored, and on a
 * read-only filesystem `writeOverrides` will throw rather than pretend to save.
 */

const KEY = "company:overrides";
const FILE = join(process.cwd(), "data", "company-overrides.json");

function kv(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

/** True when edits will persist properly (i.e. a real store is configured). */
export function hasDurableStore(): boolean {
  return kv() !== null;
}

/**
 * Drop anything that is not a key we recognise, and coerce each value to the
 * shape the schema promises. The store is trusted less than the code: a stale
 * document written by an older version must not reach the page as, say, a
 * number where a string is expected.
 */
function normalise(raw: unknown): CompanyOverrides {
  if (typeof raw !== "object" || raw === null) return {};
  const source = raw as Record<string, unknown>;
  const out: CompanyOverrides = {};

  for (const [key, value] of Object.entries(source)) {
    if (LIST_FIELD_KEYS.includes(key as keyof CompanyOverrides)) {
      if (Array.isArray(value)) {
        const lines = value.filter((item): item is string => typeof item === "string");
        if (lines.length > 0) Object.assign(out, { [key]: lines });
      }
    } else if (typeof value === "string" && value.trim() !== "") {
      Object.assign(out, { [key]: value });
    }
  }

  return out;
}

export async function readOverrides(): Promise<CompanyOverrides> {
  const redis = kv();

  if (redis) {
    // The Upstash client already JSON-parses what it stored.
    return normalise(await redis.get(KEY));
  }

  try {
    return normalise(JSON.parse(await readFile(FILE, "utf8")));
  } catch {
    // No file yet, or unreadable — no overrides, fall back to content/site.ts.
    return {};
  }
}

export async function writeOverrides(next: CompanyOverrides): Promise<void> {
  const redis = kv();

  if (redis) {
    await redis.set(KEY, next);
    return;
  }

  await mkdir(dirname(FILE), { recursive: true });
  await writeFile(FILE, `${JSON.stringify(next, null, 2)}\n`, "utf8");
}
