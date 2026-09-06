"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNav, site } from "@/content/site";

/**
 * Sticky site header. The mobile menu is a plain disclosure — no animation
 * library, no portal — which keeps it keyboard-accessible by default.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-brand-line bg-brand-paper/95 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Link href="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          {/* TODO: replace with the official logo file once supplied (public/brand/). */}
          <span className="text-brand-ink text-lg font-semibold tracking-tight">{site.name}</span>
          <span className="text-brand-muted mt-1 text-[0.65rem] tracking-[0.14em] uppercase">
            {site.tagline}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`hover:text-brand-teal-dark text-sm font-medium transition-colors ${
                    isActive(item.href) ? "text-brand-teal-dark" : "text-brand-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="border-brand-line rounded-sm border px-4 py-2 text-sm font-medium lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="border-brand-line border-t lg:hidden"
      >
        <ul className="mx-auto w-full max-w-6xl px-6 py-2 sm:px-8">
          {primaryNav.map((item) => (
            <li key={item.href} className="border-brand-line border-b last:border-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`block py-4 text-sm font-medium ${
                  isActive(item.href) ? "text-brand-teal-dark" : "text-brand-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
