import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { EVENTS } from "@/lib/fest-data";
import { fetchResults, POSITIONS, type ResultRow } from "@/lib/results-data";

export const Route = createFileRoute("/_authenticated/manage-results")({
  head: () => ({
    meta: [
      { title: "Update Results — Organizer View | HAMDIYA 2K26" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ManageResultsPage,
});

function ManageResultsPage() {
  const queryClient = useQueryClient();
  const [eventSlug, setEventSlug] = useState(EVENTS[0]?.slug ?? "");
  const [position, setPosition] = useState<string>(POSITIONS[0]);
  const [teamName, setTeamName] = useState("");
  const [college, setCollege] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["results"],
    queryFn: fetchResults,
  });
  const rows = data ?? [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const event = EVENTS.find((ev) => ev.slug === eventSlug);
    if (!event || !teamName.trim()) {
      toast.error("Pick an event and enter a team or participant name.");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("results").insert({
      event_slug: event.slug,
      event_name: event.name,
      position,
      team_name: teamName.trim(),
      college: college.trim(),
      note: note.trim(),
      sort_order: POSITIONS.indexOf(position as (typeof POSITIONS)[number]),
    });
    setSaving(false);
    if (error) {
      toast.error("Could not publish this result. Please try again.");
      return;
    }
    toast.success("Result published.");
    setTeamName("");
    setCollege("");
    setNote("");
    queryClient.invalidateQueries({ queryKey: ["results"] });
  }

  async function handleDelete(row: ResultRow) {
    const { error } = await supabase.from("results").delete().eq("id", row.id);
    if (error) {
      toast.error("Could not remove this result.");
      return;
    }
    toast.success("Result removed.");
    queryClient.invalidateQueries({ queryKey: ["results"] });
  }

  const inputClass =
    "w-full border border-white/15 bg-navy-deep px-3 py-2 text-sm text-ivory outline-none placeholder:text-white/35 focus:border-gold";

  return (
    <div className="bg-navy py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">
          Organizer view
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-ivory">
          Update results
        </h1>
        <div className="mt-2 flex gap-4 text-xs uppercase tracking-[0.16em] text-white/50">
          <Link to="/admin" className="hover:text-gold">
            Registrations
          </Link>
          <Link to="/results" className="hover:text-gold">
            Public results page
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-4 border border-white/10 bg-navy-deep/60 p-6 sm:grid-cols-2"
        >
          <label className="text-sm text-white/70">
            Event
            <select
              value={eventSlug}
              onChange={(e) => setEventSlug(e.target.value)}
              className={`mt-1 ${inputClass}`}
            >
              {EVENTS.map((ev) => (
                <option key={ev.slug} value={ev.slug} className="bg-navy-deep">
                  {ev.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-white/70">
            Position
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className={`mt-1 ${inputClass}`}
            >
              {POSITIONS.map((p) => (
                <option key={p} value={p} className="bg-navy-deep">
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-white/70">
            Team / participant
            <input
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              maxLength={120}
              className={`mt-1 ${inputClass}`}
              placeholder="Team name"
            />
          </label>
          <label className="text-sm text-white/70">
            College
            <input
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              maxLength={150}
              className={`mt-1 ${inputClass}`}
              placeholder="College name"
            />
          </label>
          <label className="text-sm text-white/70 sm:col-span-2">
            Note (optional)
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={200}
              className={`mt-1 ${inputClass}`}
              placeholder="e.g. Best presentation"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-gold px-5 py-2 text-sm font-medium text-navy-deep transition-colors hover:bg-gold-soft disabled:opacity-60"
            >
              {saving ? "Publishing…" : "Publish result"}
            </button>
          </div>
        </form>

        <div className="mt-12 space-y-8">
          {isLoading ? <p className="text-sm text-white/60">Loading…</p> : null}
          {EVENTS.map((ev) => {
            const evRows = rows.filter((r) => r.event_slug === ev.slug);
            return (
              <section key={ev.slug}>
                <h2 className="font-display text-xl text-ivory">{ev.name}</h2>
                {evRows.length === 0 ? (
                  <p className="mt-1 text-sm text-white/45">
                    No results published yet.
                  </p>
                ) : (
                  <ul className="mt-2 divide-y divide-white/10 border-y border-white/10">
                    {evRows.map((r) => (
                      <li
                        key={r.id}
                        className="flex items-center justify-between gap-4 py-3 text-sm"
                      >
                        <span className="text-white/80">
                          <span className="text-gold">{r.position}</span> ·{" "}
                          {r.team_name}
                          {r.college ? ` — ${r.college}` : ""}
                          {r.note ? ` (${r.note})` : ""}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(r)}
                          className="shrink-0 border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-white/70 hover:text-gold"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

