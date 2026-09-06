import Link from "next/link";

export interface Crumb {
  label: string;
  /** Omit on the final (current) crumb. */
  href?: string;
}

/** Breadcrumb trail for pages more than one level deep. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-brand-line bg-brand-tint border-b">
      <ol className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 px-6 py-4 text-sm sm:px-8">
        <li>
          <Link href="/" className="text-brand-muted hover:text-brand-teal-dark">
            Home
          </Link>
        </li>
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-2">
              <span aria-hidden className="text-brand-muted">
                /
              </span>
              {crumb.href && !last ? (
                <Link href={crumb.href} className="text-brand-muted hover:text-brand-teal-dark">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-brand-ink font-medium">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
