import { ButtonLink } from "@/components/ui/Button";
import { CardGrid } from "@/components/ui/CardGrid";
import { CTA } from "@/components/ui/CTA";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import { groupStats, pillars } from "@/content/pillars";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero
        size="home"
        eyebrow={site.name}
        title={site.tagline}
        lede="We manufacture ceramic tiles across four owned units, build and fit out industrial facilities end to end, and export a broad commodity portfolio from India."
        actions={
          <>
            <ButtonLink href="/export" variant="onDark">
              Browse the export directory
            </ButtonLink>
            <ButtonLink href="/contact" variant="onDark">
              Send an enquiry
            </ButtonLink>
          </>
        }
      />

      <Section
        tone="paper"
        eyebrow="What we do"
        title="Three businesses under one export house"
        lede="Manufacturing, project delivery and trade — held together by the documentation, logistics and quality discipline that exporting demands."
      >
        <CardGrid
          cards={pillars.map((pillar) => ({
            eyebrow: pillar.eyebrow,
            title: pillar.title,
            description: pillar.summary,
            href: pillar.href,
          }))}
        />
      </Section>

      <Section tone="tint" eyebrow="Scale" title="Capability at a glance">
        <StatBand stats={groupStats} />
        <p className="text-brand-muted mt-8 max-w-2xl text-sm">
          Figures shown as &ldquo;—&rdquo; are pending confirmation from the business and will be
          published once verified.
        </p>
      </Section>

      <Section
        tone="paper"
        eyebrow="Why Aayu Exim"
        title="Owned production, single-point accountability"
        lede="Most exporters broker someone else's output. Our tile business runs on units we own, and our industrial division keeps every finishing trade in-house — so schedule and quality commitments are ours to keep, not somebody else's to explain."
      >
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.slug}>
              <h3 className="text-lg font-semibold tracking-tight">{pillar.title}</h3>
              <ul className="text-brand-muted mt-4 space-y-3 text-sm">
                {pillar.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span aria-hidden className="text-brand-teal">
                      —
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
