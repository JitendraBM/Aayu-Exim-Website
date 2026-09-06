import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "onDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold tracking-wide transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-brand-teal text-brand-paper hover:bg-brand-teal-dark",
  secondary:
    "border border-brand-line text-brand-ink hover:border-brand-teal hover:text-brand-teal-dark",
  onDark: "border border-brand-paper/40 text-brand-paper hover:bg-brand-paper hover:text-brand-ink",
};

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

/** The only call-to-action style on the site. Renders a Next.js Link. */
export function ButtonLink({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

/** Same styling for a real <button>, used by the enquiry form. */
export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
