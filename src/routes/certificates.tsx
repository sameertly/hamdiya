import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { FEST } from "@/lib/fest-data";
import { CERTIFICATES, type CertificateEntry } from "@/lib/certificates-data";
import certPdf from "@/assets/participant-certificates.pdf.asset.json";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Participant Certificates — HAMDIYA 2K26" },
      {
        name: "description",
        content:
          "Find and download your HAMDIYA 2K26 certificate of participation by searching your name.",
      },
      { property: "og:title", content: "Participant Certificates — HAMDIYA 2K26" },
      {
        property: "og:description",
        content: "Search your name and download your certificate of participation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CertificatesPage,
});

let pdfCache: Promise<ArrayBuffer> | null = null;
const loadPdf = () =>
  (pdfCache ??= fetch(certPdf.url).then((r) => {
    if (!r.ok) throw new Error("load failed");
    return r.arrayBuffer();
  }));

function CertificatesPage() {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState<number | null>(null);

  const matches = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 3) return [];
    return CERTIFICATES.filter((c) => c.n.toLowerCase().includes(s)).slice(0, 30);
  }, [q]);

  async function download(c: CertificateEntry) {
    setBusy(c.p);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const src = await PDFDocument.load(await loadPdf());
      const out = await PDFDocument.create();
      const [page] = await out.copyPages(src, [c.p - 1]);
      out.addPage(page);
      const bytes = await out.save();
      const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = `HAMDIYA26-Certificate-${c.n.replace(/\s+/g, "_")}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch {
      toast.error("Could not prepare the certificate. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <section className="bg-navy-deep py-16 text-ivory sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">{FEST.dateShort}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
            Participant Certificates
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Type your name as given during registration and download your certificate of
            participation.
          </p>
        </div>
      </section>

      <section className="bg-navy py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search your name (at least 3 letters)"
            aria-label="Search your name"
            className="w-full rounded-md border border-gold/40 bg-navy-deep px-4 py-3 text-ivory placeholder:text-white/40 focus:border-gold focus:outline-none"
          />
          <div className="mt-6 space-y-3">
            {q.trim().length >= 3 && matches.length === 0 && (
              <p className="text-sm text-white/70">
                No certificate found for that name. Try a shorter part of your name.
              </p>
            )}
            {matches.map((c) => (
              <div
                key={c.p}
                className="flex flex-col gap-3 rounded-md border border-white/10 bg-navy-deep p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-ivory">{c.n}</p>
                  <p className="text-sm text-white/60">
                    {c.e} · {c.c}
                  </p>
                </div>
                <button
                  onClick={() => download(c)}
                  disabled={busy !== null}
                  className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-navy-deep disabled:opacity-60"
                >
                  {busy === c.p ? "Preparing…" : "Download"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
