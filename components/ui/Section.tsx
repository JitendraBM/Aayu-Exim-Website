import type { ReactNode } from "react";

type Tone = "paper" | "tint" | "ink" | "teal";

const toneClasses: Record<Tone, string> = {
  paper: "bg-brand-paper text-brand-ink",
  tint: "bg-brand-tint text-brand-ink",
  ink: "bg-brand-ink text-brand-paper",
  teal: "bg-brand-teal text-brand-paper",
};

interface SectionProps {
  /** Optional — a section can be heading and lede only. */
  children?: ReactNode;
  /** Background band. Alternate `paper` and `tint` down a page. */
  tone?: Tone;
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  title?: string;
  /** Supporting sentence under the heading. */
  lede?: string;
  /** Heading level — use h1 only on the page's first section. */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}

/**
 * A full-width background band with a constrained inner column.
 * Every page section on the site goes through this so vertical rhythm and
 * measure stay consistent.
 */
export function Section({
  children,
  tone = "paper",
  eyebrow,
  title,
  lede,
  as: Heading = "h2",
  id,
  className = "",
}: SectionProps) {
  const muted = tone === "ink" || tone === "teal" ? "text-brand-paper/75" : "text-brand-muted";
  const eyebrowColor =
    tone === "ink" || tone === "teal" ? "text-brand-paper/70" : "text-brand-teal";

  return (
    <section id={id} className={`${toneClasses[tone]} ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
        {(eyebrow || title || lede) && (
          <div className="max-w-3xl">
            {eyebrow && (
              <p className={`text-xs font-semibold tracking-[0.18em] uppercase ${eyebrowColor}`}>
                {eyebrow}
              </p>
            )}
            {title && (
              <Heading className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {title}
              </Heading>
            )}
            {lede && <p className={`mt-5 text-lg leading-relaxed ${muted}`}>{lede}</p>}
          </div>
        )}
        {children && <div className={title || lede ? "mt-14" : ""}>{children}</div>}
      </div>
    </section>
  );
}
