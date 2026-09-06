import Link from "next/link";
import { contact, footerNav, site } from "@/content/site";
import { isPending } from "@/lib/placeholder";

/**
 * Contact values are filtered through `isPending` so a placeholder appears as
 * an explicit "to be confirmed" line rather than as a real-looking address.
 * This is deliberate — the old WordPress site published its theme's demo
 * address and phone numbers as if they were Aayu Exim's.
 */
const pending = isPending;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-brand-line bg-brand-ink text-brand-paper mt-auto border-t">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="text-lg font-semibold tracking-tight">{site.name}</p>
            <p className="text-brand-paper/70 mt-2 text-sm">{site.tagline}</p>

            <address className="text-brand-paper/70 mt-8 space-y-1 text-sm not-italic">
              {contact.addressLines.map((line) =>
                pending(line) ? null : <div key={line}>{line}</div>,
              )}
              {contact.addressLines.every(pending) && (
                <div className="italic">Registered address to be confirmed</div>
              )}
            </address>

            <div className="mt-6 space-y-1 text-sm">
              {contact.phones.map((phone) =>
                pending(phone) ? null : (
                  <div key={phone}>
                    <a
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="text-brand-paper/70 hover:text-brand-paper"
                    >
                      {phone}
                    </a>
                  </div>
                ),
              )}
              {contact.emails.map((email) =>
                pending(email) ? null : (
                  <div key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="text-brand-paper/70 hover:text-brand-paper"
                    >
                      {email}
                    </a>
                  </div>
                ),
              )}
              {contact.phones.every(pending) && contact.emails.every(pending) && (
                <div className="text-brand-paper/50 text-sm italic">
                  Contact details to be confirmed
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h2 className="text-brand-paper/50 text-xs font-semibold tracking-[0.16em] uppercase">
                  {group.heading}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-brand-paper/75 hover:text-brand-paper text-sm transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-brand-paper/15 text-brand-paper/50 mt-14 border-t pt-8 text-xs">
          © {year} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
