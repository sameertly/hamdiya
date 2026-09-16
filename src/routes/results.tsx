import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { EVENTS, FEST } from "@/lib/fest-data";
import { fetchResults, type ResultRow } from "@/lib/results-data";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Live Results — HAMDIYA 2K26 Management Fest" },
      {
        name: "description",
        content:
          "Live winners and runners-up for every event at HAMDIYA 2K26, the National Level Management Fest by ComConnect, Jamia Hamdard Kannur Campus.",
      },
      { property: "og:title", content: "Live Results — HAMDIYA 2K26" },
      {
        property: "og:description",
        content: "Winners announced event by event, updated live through the fest.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["results"],
    queryFn: fetchResults,
    refetchInterval: 30000,
  });

  const rows = data ?? [];
  const byEvent = (slug: string): ResultRow[] =>
    rows.filter((r) => r.event_slug === slug);

  return (
    <div>
      <section className="bg-navy-deep py-16 text-ivory sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            {FEST.dateShort}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
            Results
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Winners are published here event by event as each competition wraps
            up. This page refreshes on its own.
            {isFetching ? " Updating…" : ""}
          </p>
        </div>
      </section>

      <section className="bg-navy py-14 sm:py-20">
        <div className="mx-auto max-w-5xl space-y-12 px-4 sm:px-6">
          {error ? (
            <p className="text-sm text-white/70">
              Results could not be loaded right now. Please refresh in a moment.
            </p>
          ) : null}

          {EVENTS.map((event) => {
            const eventResults = byEvent(event.slug);
            return (
              <article
                key={event.slug}
                className="border border-white/10 bg-navy-deep/60 p-6 sm:p-8"
              >
                <header className="border-b border-white/10 pb-4">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-gold">
                    {event.movie}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ivory sm:text-3xl">
                    {event.name}
                  </h2>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/45">
                    {event.category} · {event.day}
                  </p>
                </header>

                {isLoading ? (
                  <p className="pt-5 text-sm text-white/55">Loading…</p>
                ) : eventResults.length === 0 ? (
                  <p className="pt-5 text-sm text-white/55">
                    Results not announced yet.
                  </p>
                ) : (
                  <ol className="divide-y divide-white/10 pt-2">
                    {eventResults.map((r) => (
                      <li
                        key={r.id}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                      >
                        <div>
                          <p className="font-display text-lg text-ivory">
                            {r.team_name}
                          </p>
                          {r.college ? (
                            <p className="text-sm text-white/55">{r.college}</p>
                          ) : null}
                          {r.note ? (
                            <p className="mt-1 text-sm text-white/45">{r.note}</p>
                          ) : null}
                        </div>
                        <span className="text-xs uppercase tracking-[0.18em] text-gold">
                          {r.position}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}

                <Link
                  to="/events/$slug"
                  params={{ slug: event.slug }}
                  className="mt-5 inline-block text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-soft"
                >
                  Event details →
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
