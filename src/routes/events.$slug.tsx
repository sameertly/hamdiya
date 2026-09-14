import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { EVENTS, getEvent } from "@/lib/fest-data";
import { RegistrationForm } from "@/components/RegistrationForm";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = getEvent(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Event not found — ComConnect 2026" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { event } = loaderData;
    return {
      meta: [
        {
          title: `${event.movie} (${event.name}) — ComConnect 2026`,
        },
        {
          name: "description",
          content: `${event.description} ${event.firstPrize ? `First prize ${event.firstPrize}.` : ""} ${event.prizeNote ?? ""} ComConnect National Level Management Fest, Sept 30 & Oct 1, 2026.`.trim(),
        },
        {
          property: "og:title",
          content: `${event.movie} (${event.name}) — ComConnect 2026`,
        },
        {
          property: "og:description",
          content: event.tagline,
        },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: EventDetailPage,
});

function EventDetailPage() {
  const { event } = Route.useLoaderData();
  const others = EVENTS.filter((e) => e.slug !== event.slug).slice(0, 3);

  return (
    <div>
      <section className="bg-navy-deep py-16 text-ivory sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            to="/events"
            className="text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold-soft"
          >
            ← All events
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-gold">
            HUMAN RESOURCES
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            {event.movie}
          </h1>
          <p className="mt-2 text-lg text-white/70">{event.name}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              About the event
            </h2>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              {event.description}
            </p>

            <h2 className="mt-12 font-display text-2xl font-semibold">
              Rules & guidelines
            </h2>
            <ul className="mt-4 space-y-3">
              {event.rules.map((rule, i) => (
                <li key={i} className="flex gap-3 text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-gold" />
                  {rule}
                </li>
              ))}
            </ul>

            <RegistrationForm event={event} />
          </div>

          <aside>
            <div className="border border-gold/40 bg-navy p-6 text-ivory sm:p-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                Prizes
              </p>
              {event.prizeNote ? (
                <p className="mt-3 font-display text-3xl font-semibold text-gold">
                  {event.prizeNote}
                </p>
              ) : (
                <div className="mt-4 space-y-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">
                      First prize
                    </p>
                    <p className="mt-1 font-display text-3xl font-semibold text-gold">
                      {event.firstPrize}
                    </p>
                  </div>
                  {event.secondPrize && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">
                        Second prize
                      </p>
                      <p className="mt-1 font-display text-3xl font-semibold text-gold">
                        {event.secondPrize}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-display text-xl font-semibold">
            More events
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((e) => (
              <Link
                key={e.slug}
                to="/events/$slug"
                params={{ slug: e.slug }}
                className="group border border-border p-5 transition-colors hover:border-gold"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-gold">
                  {e.category}
                </p>
                <p className="mt-2 font-display text-lg font-semibold">
                  {e.movie}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{e.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
