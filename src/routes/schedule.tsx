import { createFileRoute, Link } from "@tanstack/react-router";
import { EVENTS, FEST } from "@/lib/fest-data";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — ComConnect National Level Management Fest 2026" },
      {
        name: "description",
        content:
          "Day-wise schedule for ComConnect 2026: September 30 and October 1 at Jamia Hamdard Kannur Campus. Seven events across two days.",
      },
      {
        property: "og:title",
        content: "Schedule — ComConnect National Level Management Fest 2026",
      },
      {
        property: "og:description",
        content: "Two days, seven events. Sept 30 & Oct 1, 2026.",
      },
    ],
  }),
  component: SchedulePage,
});

const DAYS = [
  {
    label: "Day 1",
    date: "Wednesday, September 30, 2026",
    filter: (day: string) => day === "Day 1" || day === "Both",
  },
  {
    label: "Day 2",
    date: "Thursday, October 1, 2026",
    filter: (day: string) => day === "Day 2" || day === "Both",
  },
] as const;

function SchedulePage() {
  return (
    <div>
      <section className="bg-navy-deep py-16 text-ivory sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            {FEST.dateShort}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Two days, seven events
          </h1>
          <p className="mt-4 max-w-2xl text-white/65">
            Detailed timings will be shared with registered teams. Spot Games
            run on both days with on-the-spot registration.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          {DAYS.map((d) => (
            <div key={d.label}>
              <div className="flex items-baseline justify-between border-b border-gold/50 pb-3">
                <h2 className="font-display text-2xl font-semibold">
                  {d.label}
                </h2>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {d.date}
                </p>
              </div>
              <ul className="mt-4 divide-y divide-border">
                {EVENTS.filter((e) => d.filter(e.day)).map((event) => (
                  <li key={event.slug}>
                    <Link
                      to="/events/$slug"
                      params={{ slug: event.slug }}
                      className="group flex items-center justify-between gap-4 py-4 transition-colors"
                    >
                      <div>
                        <p className="font-display text-lg font-semibold transition-colors group-hover:text-navy-soft">
                          {event.movie}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {event.name} · {event.category}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-gold">
                        Details →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border border-gold/40 bg-secondary p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold">
            Inauguration & valedictory
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The fest opens on Day 1 morning and closes with the valedictory
            ceremony and prize distribution on Day 2 evening. All participating
            colleges are requested to be present for both.
          </p>
        </div>
      </section>
    </div>
  );
}
