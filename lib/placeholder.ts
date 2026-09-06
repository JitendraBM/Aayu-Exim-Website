/**
 * Placeholder handling.
 *
 * Unconfirmed business content is written in `content/` with a `TODO:` prefix.
 * Nothing with that prefix may ever reach the page as-is: it renders as
 * "To be confirmed" instead. This is the single place that decides that, so a
 * new component cannot forget the check the way a scattered
 * `value.startsWith("TODO")` would.
 *
 * `npm run check:placeholders` lists what is still outstanding and blocks a
 * release while any remain.
 */

const PREFIX = "TODO";
const FALLBACK = "To be confirmed";

/** True when a content value is an unfilled placeholder. */
export function isPending(value: string | undefined | null): boolean {
  return typeof value === "string" && value.trimStart().startsWith(PREFIX);
}

/** The text to actually render for a content value. */
export function display(value: string, fallback: string = FALLBACK): string {
  return isPending(value) ? fallback : value;
}

/** Drop every placeholder from a list. Returns [] if all are pending. */
export function realOnly(values: readonly string[]): string[] {
  return values.filter((value) => !isPending(value));
}

/**
 * A stable React key for a content string.
 * Placeholder text is long and repetitive, and using it directly as a key
 * leaks `TODO:` strings into the serialised RSC payload.
 */
export function contentKey(value: string, index: number): string {
  return isPending(value) ? `pending-${index}` : value;
}
