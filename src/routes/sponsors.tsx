import { createFileRoute } from "@tanstack/react-router";
import { SPONSOR_TIERS, type Sponsor } from "@/lib/sponsors-data";
import { FEST } from "@/lib/fest-data";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Our Sponsors — HAMDIYA'26 National Level Management Fest" },
      {
        name: "description",
        content:
          "Meet the partners powering HAMDIYA'26 at Jamia Hamdard Kannur Campus: title partner, stage sponsor, Best Manager sponsor and co-sponsors.",
      },
      {
        property: "og:title",
        content: "Our Sponsors — HAMDIYA'26 Management Fest",
      },
      {
        property: "og:description",
        content: "The partners supporting HAMDIYA'26, Sept 30 – Oct 1, 2026.",
      },
    ],
  }),
  component: SponsorsPage,
});

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="flex flex-col items-center border border-border bg-card p-6 text-center">
      <div className="flex h-28 w-full items-center justify-center border border-dashed border-border bg-secondary">
        {sponsor.logo ? (
          <img
            src={sponsor.logo}
            alt={sponsor.name ? `${sponsor.name} logo` : "Sponsor logo"}
            loading="lazy"
            className="max-h-24 max-w-[80%] object-contain"
          />
        ) : (
          <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Logo coming soon
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-lg font-semibold">
        {sponsor.name || "To be announced"}
      </p>
      {sponsor.instagram ? (
        <a
          href={`https://instagram.com/${sponsor.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 text-sm text-muted-foreground transition-colors hover:text-navy-soft"
        >
          @{sponsor.instagram}
        </a>
      ) : (
        <span className="mt-1 text-sm text-muted-foreground">@—</span>
      )}
    </div>
  );
}

function SponsorsPage() {
  return (
    <div>
      <section className="bg-navy-deep py-16 text-ivory sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            {FEST.dateShort}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Our Sponsors
          </h1>
          <p className="mt-4 max-w-2xl text-white/65">
            HAMDIYA'26 is made possible by our partners. Sponsor names, logos
            and Instagram pages are added here as they are confirmed.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-14 px-4 py-14 sm:px-6 sm:py-20">
        {SPONSOR_TIERS.map((tier) => (
          <div key={tier.id}>
            <div className="flex items-baseline justify-between border-b border-gold/50 pb-3">
              <h2 className="font-display text-2xl font-semibold">
                {tier.title}
              </h2>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {tier.note}
              </p>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tier.sponsors.map((sponsor, i) => (
                <SponsorCard key={`${tier.id}-${i}`} sponsor={sponsor} />
              ))}
            </div>
          </div>
        ))}

        <div className="border border-gold/40 bg-secondary p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold">
            Want to sponsor HAMDIYA'26?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Reach the PG Department of Commerce office at Jamia Hamdard Kannur
            Campus, or contact the fest coordinators listed on the Contact page.
          </p>
        </div>
      </section>
    </div>
  );
}
