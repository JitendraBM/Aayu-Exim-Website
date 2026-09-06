import type { ReactNode } from "react";

interface HeroProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** CTA buttons. */
  actions?: ReactNode;
  /** Compact variant for inner pages; the full-height version is home only. */
  size?: "page" | "home";
}

export function Hero({ eyebrow, title, lede, actions, size = "page" }: HeroProps) {
  const home = size === "home";

  return (
    <section className="border-brand-line bg-brand-ink text-brand-paper border-b">
      <div
        className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${home ? "py-24 lg:py-36" : "py-16 lg:py-24"}`}
      >
        {eyebrow && (
          <p className="text-brand-teal-bright text-xs font-semibold tracking-[0.18em] uppercase">
            {eyebrow}
          </p>
        )}
        <h1
          className={`mt-4 font-semibold tracking-tight text-balance ${
            home ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-5xl"
          }`}
        >
          {title}
        </h1>
        {lede && (
          <p className="text-brand-paper/75 mt-6 max-w-2xl text-lg leading-relaxed">{lede}</p>
        )}
        {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
      </div>
    </section>
  );
}
