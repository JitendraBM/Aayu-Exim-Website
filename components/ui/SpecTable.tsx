import type { SpecRow } from "@/content/_types";

/**
 * Two-column technical specification table.
 * Unconfirmed values (`TODO:` prefixed) are rendered in muted italics and
 * labelled, so an unverified spec can never be mistaken for a published one.
 */
export function SpecTable({ rows, caption }: { rows: SpecRow[]; caption?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-md border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <tbody>
          {rows.map((row) => {
            const pending = row.value.startsWith("TODO");
            return (
              <tr key={row.label} className="border-brand-line border-b last:border-0">
                <th scope="row" className="w-1/2 py-4 pr-6 align-top font-medium">
                  {row.label}
                </th>
                <td className={`py-4 align-top ${pending ? "text-brand-muted italic" : ""}`}>
                  {pending ? "To be confirmed" : row.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** A simple labelled list, for grades / packing / applications. */
export function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-brand-teal text-xs font-semibold tracking-[0.16em] uppercase">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => {
          const pending = item.startsWith("TODO");
          return (
            <li
              key={item}
              className={`flex gap-3 ${pending ? "text-brand-muted italic" : "text-brand-ink"}`}
            >
              <span aria-hidden className="text-brand-teal">
                —
              </span>
              <span>{pending ? "To be confirmed" : item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
