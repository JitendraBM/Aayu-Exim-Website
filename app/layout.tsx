import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site as siteDefaults } from "@/content/site";
import { getCompany } from "@/lib/company";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Async because the tagline and description are editable from /admin.
// `metadataBase` uses the committed URL — the canonical origin is not editable.
export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getCompany();

  return {
    metadataBase: new URL(siteDefaults.url),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      url: site.url,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Read once here and pass down: Header is a Client Component and cannot await.
  const { site, contact } = await getCompany();

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="focus:bg-brand-teal focus:text-brand-paper sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded-sm focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Header name={site.name} tagline={site.tagline} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer site={site} contact={contact} />
      </body>
    </html>
  );
}
