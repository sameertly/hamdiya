import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { FEST } from "../lib/fest-data";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-navy px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold text-gold">404</h1>
        <h2 className="mt-4 text-xl font-medium text-ivory">Page not found</h2>
        <p className="mt-2 text-sm text-white/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gold px-5 py-2 text-sm font-medium text-navy-deep transition-colors hover:bg-gold-soft"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-navy px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-medium tracking-tight text-ivory">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-white/60">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-gold px-4 py-2 text-sm font-medium text-navy-deep transition-colors hover:bg-gold-soft"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-white/25 px-4 py-2 text-sm font-medium text-ivory transition-colors hover:bg-white/10"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const NAV = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/schedule", label: "Schedule" },
  { to: "/contact", label: "Contact" },
] as const;

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-deep/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 flex-col leading-tight">
          <span className="font-display text-lg font-semibold tracking-wide text-gold">
            HAMDIYA 2K26<span className="text-ivory"></span>
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.18em] text-white/50 sm:block">
            {FEST.college}
          </span>
        </Link>
        <nav className="flex items-center gap-0.5 sm:gap-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap px-1.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-gold sm:px-3 sm:text-[13px] sm:tracking-[0.12em]"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-deep text-white/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-xl font-semibold text-gold">
              ComConnect
            </p>
            <p className="mt-1 text-sm">
              {FEST.department} · {FEST.college}
            </p>
            <p className="mt-3 text-sm">
              {FEST.title} — {FEST.dateShort}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.14em]">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/auth"
              className="text-white/40 transition-colors hover:text-gold"
            >
              Organizer Login
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-white/10 pt-5 text-xs text-white/40">
          © 2026 ComConnect · {FEST.department} · {FEST.college}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: "ComConnect — National Level Management Fest | Jamia Hamdard Kannur Campus",
      },
      {
        name: "description",
        content:
          "ComConnect, PG Department of Commerce, Jamia Hamdard Kannur Campus presents a National Level Management Fest. September 30 & October 1, 2026. Prize worth ₹1 Lakh+.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ComConnect Management Fest" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main className="flex-1">
          <Outlet />
        </main>
        <Toaster />
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
