import type { ContentBlock } from "@/content/_types";
import { contentKey, display, isPending } from "@/lib/placeholder";

/** A bulleted list of content strings, placeholder-safe. */
export function BulletList({
  items,
  columns = 1,
  className = "",
}: {
  items: string[];
  columns?: 1 | 2;
  className?: string;
}) {
  const layout = columns === 2 ? "grid gap-3 sm:grid-cols-2" : "space-y-2";

  return (
    <ul className={`${layout} text-sm ${className}`}>
      {items.map((item, index) => (
        <li
          key={contentKey(item, index)}
          className={`flex gap-3 ${isPending(item) ? "text-brand-muted italic" : ""}`}
        >
          <span aria-hidden className="text-brand-teal">
            —
          </span>
          <span>{display(item)}</span>
        </li>
      ))}
    </ul>
  );
}

/** A plain list of content strings without bullets (certifications, notes). */
export function PlainList({ items }: { items: string[] }) {
  return (
    <ul className="text-brand-muted mt-4 space-y-2 text-sm">
      {items.map((item, index) => (
        <li key={contentKey(item, index)} className={isPending(item) ? "italic" : ""}>
          {display(item)}
        </li>
      ))}
    </ul>
  );
}

/**
 * Renders `ContentBlock`s as a column grid — heading, prose and optional
 * bullets. Shared by the ceramic tiles hub and the industrial division pages
 * so placeholder handling stays in one place.
 */
export function ContentBlocks({
  blocks,
  columns = 3,
}: {
  blocks: ContentBlock[];
  columns?: 2 | 3;
}) {
  const cols = columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <div className={`grid gap-12 ${cols}`}>
      {blocks.map((block) => (
        <div key={block.title}>
          <h3 className="text-lg font-semibold tracking-tight">{block.title}</h3>
          <p
            className={`text-brand-muted mt-4 text-sm leading-relaxed ${
              isPending(block.body) ? "italic" : ""
            }`}
          >
            {display(block.body, "Content to be confirmed.")}
          </p>
          {block.bullets && <BulletList items={block.bullets} className="text-brand-muted mt-5" />}
        </div>
      ))}
    </div>
  );
}
