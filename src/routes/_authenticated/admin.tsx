import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getRegistrations, type RegistrationDTO } from "@/lib/admin.functions";
import { EVENTS } from "@/lib/fest-data";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Registrations — Organizer View | ComConnect 2026" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const CSV_HEADERS = [
  "Registered at",
  "Event",
  "Team name",
  "College",
  "Members",
  "Contact person",
  "Email",
  "Phone",
];

function csvEscape(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function exportCsv(rows: RegistrationDTO[]) {
  const lines = [
    CSV_HEADERS.join(","),
    ...rows.map((r) =>
      [
        new Date(r.createdAt).toLocaleString("en-IN"),
        r.eventName,
        r.teamName,
        r.college,
        r.members.replace(/\n/g, " | "),
        r.contactName,
        r.email,
        r.phone,
      ]
        .map(csvEscape)
        .join(",")
    ),
  ];
  const blob = new Blob(["\uFEFF" + lines.join("\r\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `comconnect-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function AdminPage() {
  const fetchRegs = useServerFn(getRegistrations);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [eventFilter, setEventFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["registrations"],
    queryFn: () => fetchRegs(),
    refetchInterval: 30000,
  });

  const rows = data ?? [];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (eventFilter !== "all" && r.eventSlug !== eventFilter) return false;
      if (!q) return true;
      return [
        r.teamName,
        r.college,
        r.members,
        r.contactName,
        r.email,
        r.phone,
        r.eventName,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [rows, eventFilter, search]);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="bg-navy py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              Organizer view
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ivory">
              Registrations
            </h1>
            <p className="mt-1 text-sm text-white/60">
              {filtered.length} of {rows.length} submissions shown
              {isFetching ? " · refreshing…" : ""}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => exportCsv(filtered)}
              disabled={filtered.length === 0}
              className="bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy-deep transition-colors hover:bg-gold-soft disabled:opacity-50"
            >
              Export CSV
            </button>
            <button
              onClick={handleSignOut}
              className="border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <select
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
            className="border border-white/25 bg-navy-deep px-3 py-2 text-sm text-ivory outline-none"
          >
            <option value="all">All events</option>
            {EVENTS.map((e) => (
              <option key={e.slug} value={e.slug}>
                {e.name}
              </option>
            ))}
          </select>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search team, college, email, phone…"
            className="min-w-56 flex-1 border border-white/25 bg-navy-deep px-3 py-2 text-sm text-ivory outline-none placeholder:text-white/40 focus:border-gold"
          />
          <button
            onClick={() => refetch()}
            className="border border-white/25 px-4 py-2 text-sm text-ivory transition-colors hover:bg-white/10"
          >
            Refresh
          </button>
        </div>

        {error ? (
          <div className="mt-8 border border-gold/40 bg-navy-deep p-6">
            <p className="text-sm text-gold">
              {error instanceof Error
                ? error.message
                : "Could not load registrations."}
            </p>
          </div>
        ) : isLoading ? (
          <p className="mt-8 text-sm text-white/60">Loading registrations…</p>
        ) : filtered.length === 0 ? (
          <p className="mt-8 text-sm text-white/60">
            No registrations yet. Submissions from the event pages will appear
            here automatically.
          </p>
        ) : (
          <div className="mt-8 overflow-x-auto border border-white/15">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-navy-deep text-[10px] uppercase tracking-[0.14em] text-white/50">
                  <th className="px-4 py-3 font-medium">Registered</th>
                  <th className="px-4 py-3 font-medium">Event</th>
                  <th className="px-4 py-3 font-medium">Team</th>
                  <th className="px-4 py-3 font-medium">College</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                </tr>
              </thead>
              <tbody className="text-ivory/90">
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-white/10 align-top transition-colors hover:bg-white/5"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-white/60">
                      {new Date(r.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gold">{r.eventName}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-ivory">{r.teamName}</p>
                      <p className="mt-1 max-w-64 whitespace-pre-line text-xs text-white/55">
                        {r.members}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-white/80">{r.college}</td>
                    <td className="px-4 py-3">
                      <p className="text-ivory">{r.contactName}</p>
                      <p className="text-xs text-white/60">{r.phone}</p>
                      <p className="text-xs text-white/60">{r.email}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
