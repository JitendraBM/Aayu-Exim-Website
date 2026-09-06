import type { Stat } from "@/content/_types";
import { display, isPending } from "@/lib/placeholder";

/**
 * A row of capability figures.
 * Unconfirmed values render as an em dash in a muted style, and their notes as
 * "To be confirmed", so a placeholder is obvious in review and never looks like
 * a published fact.
 */
export function StatBand({ stats, tone = "paper" }: { stats: Stat[]; tone?: "paper" | "ink" }) {
  const onDark = tone === "ink";

  return (
    <dl
      className={`grid gap-px overflow-hidden rounded-sm sm:grid-cols-2 lg:grid-cols-4 ${
        onDark ? "bg-brand-paper/15" : "bg-brand-line"
      }`}
    >
      {stats.map((stat) => {
        const pending = isPending(stat.value);
        return (
          <div key={stat.label} className={`p-7 ${onDark ? "bg-brand-ink" : "bg-brand-paper"}`}>
            <dt
              className={`text-xs font-semibold tracking-[0.16em] uppercase ${
                onDark ? "text-brand-paper/70" : "text-brand-muted"
              }`}
            >
              {stat.label}
            </dt>
            <dd
              className={`mt-3 text-4xl font-semibold tracking-tight ${
                pending
                  ? "text-brand-muted text-2xl italic"
                  : onDark
                    ? "text-brand-paper"
                    : "text-brand-teal"
              }`}
            >
              {pending ? "—" : stat.value}
            </dd>
            {stat.note && (
              <p
                className={`mt-2 text-sm ${onDark ? "text-brand-paper/60" : "text-brand-muted"} ${
                  isPending(stat.note) ? "italic" : ""
                }`}
              >
                {display(stat.note)}
              </p>
            )}
          </div>
        );
      })}
    </dl>
  );
}
