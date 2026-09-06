import Link from "next/link";
import type { Card } from "@/content/_types";

/** Linked (or static) cards in a responsive grid. Used on every hub page. */
export function CardGrid({ cards, columns = 3 }: { cards: Card[]; columns?: 2 | 3 }) {
  const cols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-6 ${cols}`}>
      {cards.map((card) => {
        const inner = (
          <>
            {card.eyebrow && (
              <p className="text-brand-teal text-xs font-semibold tracking-[0.16em] uppercase">
                {card.eyebrow}
              </p>
            )}
            <h3 className="mt-2 text-xl font-semibold tracking-tight">{card.title}</h3>
            <p className="text-brand-muted mt-3 text-sm leading-relaxed">{card.description}</p>
            {card.href && (
              <span className="text-brand-teal-dark mt-5 inline-block text-sm font-semibold">
                Learn more →
              </span>
            )}
          </>
        );

        const shared = "flex flex-col rounded-sm border border-brand-line bg-brand-paper p-7";

        return card.href ? (
          <Link
            key={card.title}
            href={card.href}
            className={`${shared} hover:border-brand-teal transition-colors`}
          >
            {inner}
          </Link>
        ) : (
          <div key={card.title} className={shared}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
