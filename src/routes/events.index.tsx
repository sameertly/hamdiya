import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { EVENTS } from "@/lib/fest-data";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      {
        title: "Events — ComConnect National Level Management Fest 2026",
      },
      {
        name: "description",
        content:
          "Seven events at ComConnect 2026: Management Mavericks, Marketing Mania, Treasure Hunt, The Best Manager, Spot Games, Finance Arena and HR Minds. Prizes worth ₹1 Lakh+.",
      },
      {
        property: "og:title",
        content: "Events — ComConnect National Level Management Fest 2026",
      },
      {
        property: "og:description",
        content:
          "Seven competitions across management, marketing, finance, HR and on-the-spot games. Sept 30 & Oct 1, 2026.",
      },
    ],
  }),
  component: EventsPage,
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
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function EventsPage() {
  useReveal();

  return (
    <div>
      <section className="bg-navy-deep py-16 text-ivory sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            Competitions
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            General Rules & Guidelines
          </h1>
          <p className="mt-4 max-w-2xl whitespace-pre-line text-white/65">
            {`1. Registration is mandatory for participation in all events. Participants must report on time and adhere to the schedule provided by the organizers.

2. All participants must carry a valid college/institutional ID card and produce it whenever required by the organizers.

3. All members of a team must belong to the same college/institution. There is no limit on the number of teams that may participate from a single college/institution.

4. Students from all academic disciplines are eligible to participate, including students pursuing professional courses or coaching programmes such as CA, CMA, CS, and ACCA.

5. The rules and instructions for each round will be announced before its commencement and must be strictly followed. Teams must qualify in each round to proceed to the subsequent round(s), wherever applicable.

6. Time limits prescribed for each activity/round must be strictly adhered to. Exceeding the allotted time may result in a penalty or disqualification.

7. Use of electronic devices and internet facilities is permitted only when specifically authorized by the organizers.

8. Misconduct, malpractice, cheating, or violation of event rules will result in disqualification. All participants must maintain discipline, professionalism, sportsmanship, and fair play throughout the event.

9. Participants are required to cooperate with the organizers and comply with all event-related instructions to ensure the smooth and fair conduct of the event.

10. The decision of the judges/jury will be final and binding in all matters concerning the event`}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event) => (
            <Link
              key={event.slug}
              to="/events/$slug"
              params={{ slug: event.slug }}
              className="reveal group flex flex-col border border-border bg-card p-6 transition-colors hover:border-gold sm:p-8"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                  {event.category}
                </p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {event.day}
                </p>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-snug">
                {event.movie}
              </h2>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                {event.name}
              </p>
              <p className="mt-4 flex-1 text-sm text-muted-foreground">
                {event.tagline}
              </p>
              <div className="mt-6 border-t border-border pt-4">
                {event.prizeNote ? (
                  <p className="text-sm font-semibold text-navy">
                    {event.prizeNote}
                  </p>
                ) : (
                  <div className="flex gap-6 text-sm">
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        First
                      </span>
                      <span className="font-semibold text-navy">
                        {event.firstPrize}
                      </span>
                    </span>
                    {event.secondPrize && (
                      <span>
                        <span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          Second
                        </span>
                        <span className="font-semibold text-navy">
                          {event.secondPrize}
                        </span>
                      </span>
                    )}
                  </div>
                )}
              </div>
              <p className="mt-5 text-xs uppercase tracking-[0.14em] text-gold">
                View details →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
