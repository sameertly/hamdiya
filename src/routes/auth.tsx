import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect:
      typeof search["redirect"] === "string"
        ? (search["redirect"] as string)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Organizer Sign In — ComConnect 2026" },
      { name: "description", content: "Sign in for ComConnect organizers to view event registrations." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const inputClass =
  "w-full border border-white/25 bg-navy px-3 py-2.5 text-sm text-ivory outline-none transition-colors placeholder:text-white/40 focus:border-gold";

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const target =
    redirect && redirect.startsWith("/") && !redirect.startsWith("//")
      ? redirect
      : "/admin";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setNotice(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        await navigate({ to: target, replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          toast.error(error.message);
          return;
        }
        if (data.session) {
          await navigate({ to: target, replace: true });
        } else {
          setNotice(
            "Account created. Check your email for a confirmation link, then sign in."
          );
          setMode("signin");
        }
      }
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    if (busy) return;
    setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error(
          result.error instanceof Error
            ? result.error.message
            : "Google sign-in failed. Please try again."
        );
        setBusy(false);
      }
      // On success the browser navigates away; session is set on return.
    } catch (err) {
      toast.error("Google sign-in failed. Please try again.");
      setBusy(false);
      if (err instanceof Error) console.error(err);
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-navy px-4 py-16">
      <div className="w-full max-w-md border border-white/15 bg-navy-deep p-6 sm:p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-gold">
          ComConnect 2026
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ivory">
          Organizer sign in
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Restricted to the ComConnect organizing team. Sign in to view event
          registrations.
        </p>

        {notice && (
          <p className="mt-4 border border-gold/40 bg-navy p-3 text-xs text-gold">
            {notice}
          </p>
        )}

        <form onSubmit={onEmailSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-white/50">
              Email
            </span>
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-[0.12em] text-white/50">
              Password
            </span>
            <input
              required
              type="password"
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-navy-deep transition-colors hover:bg-gold-soft disabled:opacity-60"
          >
            {busy
              ? "Please wait…"
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-white/40">
          <span className="h-px flex-1 bg-white/15" />
          or
          <span className="h-px flex-1 bg-white/15" />
        </div>

        <button
          onClick={onGoogle}
          disabled={busy}
          className="w-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-white/10 disabled:opacity-60"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-xs text-white/50">
          {mode === "signin" ? "New organizer?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setNotice(null);
            }}
            className="text-gold transition-colors hover:text-gold-soft"
          >
            {mode === "signin" ? "Create an account" : "Sign in instead"}
          </button>
        </p>
      </div>
    </div>
  );
}
