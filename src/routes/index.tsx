import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import heroImg from "@/assets/hero.jpg";
import { EVENTS, FEST } from "@/lib/fest-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "ComConnect 2026 — National Level Management Fest | Jamia Hamdard Kannur Campus",
      },
      {
        name: "description",
        content:
          "Jamia Hamdard Kannur Campus, PG Department of Commerce presents ComConnect — a National Level Management Fest on September 30 & October 1, 2026. Prize worth ₹1 Lakh+. Seven events across management, marketing, finance, HR and more.",
      },
      {
        property: "og:title",
        content:
          "ComConnect — National Level Management Fest · Sept 30 & Oct 1, 2026",
      },
      {
        property: "og:description",
        content:
          "Prize worth ₹1 Lakh+. Seven events. Two days. Jamia Hamdard Kannur Campus, PG Department of Commerce.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: new URL(heroImg, "https://id-preview--7747fa64-7a04-463d-ae3b-e03fedb32a97.lovable.app").href,
      },
      {
        name: "twitter:image",
        content: new URL(heroImg, "https://id-preview--7747fa64-7a04-463d-ae3b-e03fedb32a97.lovable.app").href,
      },
],
  }),
  component: HomePage,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function HomePage() {
  useReveal();
  const flagship = EVENTS.find((e) => e.slug === "the-best-manager")!;

  return (
    <div>
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden bg-navy-deep text-ivory">
        <img
          src={heroImg}
          alt="City skyline at dusk seen from a boardroom"
          width={1536}
          height={864}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/40 to-navy-deep" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
          <p className="whitespace-pre-line text-xs uppercase tracking-[0.3em] text-gold sm:text-sm">
            {"JAMIA HAMDARD KANNUR CAMPUS\nPG DEPARTMENT OF COMMERCE"}
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl whitespace-pre-line font-display text-4xl font-semibold leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            {"HAMDIYA 2K26\nNational Level Management Fest"}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/75 sm:text-lg">
            Two days. Seven events. The sharpest business minds from colleges
            across the country — on one campus.
          </p>

          <dl className="mt-10 flex flex-wrap justify-center gap-x-12 gap-y-6">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                Dates
              </dt>
              <dd className="mt-1 font-display text-xl text-gold sm:text-2xl">
                Sept 30 <span className="text-white/60">Wed</span> · Oct 1{" "}
                <span className="text-white/60">Thu</span>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                Prize pool
              </dt>
              <dd className="mt-1 font-display text-xl text-gold sm:text-2xl">
                Worth ₹1 Lakh+
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                Events
              </dt>
              <dd className="mt-1 font-display text-xl text-gold sm:text-2xl">
                7 Competitions
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/events"
              className="bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-navy-deep transition-colors hover:bg-gold-soft"
            >
              Explore events
            </Link>
            <Link
              to="/contact"
              className="border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              Register your team
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Event strip ============ */}
      <section className="rule-double bg-background">
        <div className="mx-auto max-w-6xl overflow-hidden px-4 py-3 sm:px-6">
          <p className="whitespace-nowrap text-center font-display text-sm italic text-muted-foreground">
            The Wolfs of the Wall Street · Goodwill Hunting · Squid Game · John
            Wick · SCAM (1992) · The Billion Dollar Code · The Office
          </p>
        </div>
      </section>

      {/* ============ About ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="reveal grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              About the fest
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Where future managers are made
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground sm:text-lg">
            <p>
              ComConnect — the commerce association of the PG Department of
              Commerce, Jamia Hamdard Kannur Campus — opens its doors to
              colleges nationwide for two days of competition, strategy and
              showcase.
            </p>
            <p>
              From the boardroom to the trading floor, every event is built
              around a film you know and a skill the industry demands. Bring
              your team, test your nerve, and take your share of a prize pool
              worth over one lakh rupees.
            </p>
          </div>
        </div>
      </section>

      {/* ============ Events grid ============ */}
      <section className="bg-navy py-20 text-ivory sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold">
                The line-up
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Seven events, seven stories
              </h2>
            </div>
            <Link
              to="/events"
              className="text-sm font-medium uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-soft"
            >
              View all details →
            </Link>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((event) => (
              <Link
                key={event.slug}
                to="/events/$slug"
                params={{ slug: event.slug }}
                className="reveal group bg-navy p-6 transition-colors hover:bg-navy-soft sm:p-8"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold/80">
                  {event.category}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug">
                  {event.movie}
                </h3>
                <p className="mt-1 text-sm text-white/60">{event.name}</p>
                <p className="mt-4 text-sm text-gold">{event.tagline}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.14em] text-white/40 transition-colors group-hover:text-gold">
                  Event details →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Flagship highlight ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="reveal grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              Flagship event
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">
              {flagship.movie}
            </h2>
            <p className="mt-2 text-lg font-medium text-muted-foreground">
              {flagship.name}
            </p>
            <p className="mt-5 text-muted-foreground sm:text-lg">
              {flagship.description}
            </p>
          </div>
          <div className="border border-gold/40 bg-secondary p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              First prize
            </p>
            <p className="mt-2 font-display text-6xl font-semibold text-navy">
              {flagship.firstPrize}
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              The single largest prize of the fest. One winner.
            </p>
            <Link
              to="/events/$slug"
              params={{ slug: flagship.slug }}
              className="mt-8 inline-block bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-navy-soft"
            >
              See how to win it
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-navy-deep py-20 text-center text-ivory sm:py-24">
        <div className="reveal mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Seats fill fast. Bring your best team.
          </h2>
          <p className="mt-4 text-white/65">
            {FEST.dateShort} · {FEST.college}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-navy-deep transition-colors hover:bg-gold-soft"
            >
              Get in touch
            </Link>
            <Link
              to="/schedule"
              className="border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              View schedule
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
