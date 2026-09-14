import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitRegistration } from "@/lib/registrations.functions";
import type { FestEvent } from "@/lib/fest-data";

const inputClass =
  "w-full border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-gold";

export function RegistrationForm({ event }: { event: FestEvent }) {
  const submit = useServerFn(submitRegistration);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    teamName: "",
    college: "",
    members: "",
    contactName: "",
    email: "",
    phone: "",
  });

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await submit({ data: { ...form, eventSlug: event.slug, eventName: event.name } });
      setDone(true);
      toast.success("Registration received!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Please check your details and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="mt-12 border border-gold/40 bg-navy p-6 text-ivory sm:p-8">
        <h3 className="font-display text-xl font-semibold text-gold">
          You're in!
        </h3>
        <p className="mt-2 text-sm text-white/70">
          We've received your registration for {event.name}. The organizers will
          reach out to your contact person with next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 border border-border bg-secondary p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold">
        Register for {event.name}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Submit your team details, college and contact. The ComConnect team will
        confirm your slot.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Team name
          </span>
          <input required maxLength={100} value={form.teamName} onChange={set("teamName")} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            College / institution
          </span>
          <input required maxLength={200} value={form.college} onChange={set("college")} className={inputClass} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Team members (names, one per line)
          </span>
          <textarea required maxLength={500} rows={3} value={form.members} onChange={set("members")} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Contact person
          </span>
          <input required maxLength={100} value={form.contactName} onChange={set("contactName")} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Phone
          </span>
          <input
            required
            type="tel"
            maxLength={20}
            inputMode="tel"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={set("phone")}
            className={inputClass}
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Email
          </span>
          <input required type="email" maxLength={255} value={form.email} onChange={set("email")} className={inputClass} />
        </label>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={busy}
            className="bg-navy px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-navy-soft disabled:opacity-60"
          >
            {busy ? "Submitting…" : "Submit registration"}
          </button>
        </div>
      </form>
    </div>
  );
}
