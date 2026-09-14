import { createFileRoute, Link } from "@tanstack/react-router";
import { FEST } from "@/lib/fest-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Registration — ComConnect Management Fest 2026" },
      {
        name: "description",
        content:
          "Register your team for ComConnect 2026, the National Level Management Fest by the PG Department of Commerce, Jamia Hamdard Kannur Campus. Sept 30 & Oct 1.",
      },
      {
        property: "og:title",
        content: "Contact & Registration — ComConnect Management Fest 2026",
      },
      {
        property: "og:description",
        content:
          "Reach the ComConnect team to register your college for the fest on Sept 30 & Oct 1, 2026.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <section className="bg-navy-deep py-16 text-ivory sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            Contact & registration
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Bring your college to ComConnect
          </h1>
          <p className="mt-4 max-w-2xl text-white/65">
            Send us your college name, team size and the events you want to
            enter — the ComConnect team will get back to you with registration
            details.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              How to register
            </h2>
            <ol className="mt-6 space-y-6">
              {[
                {
                  step: "01",
                  title: "Form your team",
                  body: "Check each event page for team sizes — most events take 2–4 members, and The Best Manager is a solo flagship.",
                },
                {
                  step: "02",
                  title: "Write to us",
                  body: "Email or call the coordinators with your college, team details and chosen events.",
                },
                {
                  step: "03",
                  title: "Confirm your slot",
                  body: "You'll receive confirmation with the fest schedule, venue map and reporting times.",
                },
              ].map((s) => (
                <li key={s.step} className="flex gap-5">
                  <span className="font-display text-2xl font-semibold text-gold">
                    {s.step}
                  </span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-6">
            <div className="border border-gold/40 bg-navy p-6 text-ivory sm:p-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                Organized by
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-gold">
                {FEST.organizer}
              </p>
              <p className="mt-1 text-sm text-white/70">{FEST.department}</p>
              <p className="text-sm text-white/70">{FEST.college}</p>
              <div className="mt-6 border-t border-white/10 pt-5 text-sm">
                <p className="text-white/50">Fest dates</p>
                <p className="mt-1 font-medium text-gold">{FEST.dates}</p>
              </div>
            </div>

            <div className="border border-border bg-card p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold">
                Coordinators
              </h3>
              <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">
                {"Staff Co-Ordinator: Ms. Salina P K, Mob: 9847853935\nStudent Co-Ordinator: Ms. Fathimathul Rifa P K, Mob: 9544998385\n\n\n"}
              </p>
              <Link
                to="/events"
                className="mt-6 inline-block border border-navy px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-navy transition-colors hover:bg-navy hover:text-ivory"
              >
                Browse events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
