import { createFileRoute } from "@tanstack/react-router";

import portrait from "@/assets/portrait.jpg";
import projectFinance from "@/assets/project-finance.jpg";
import projectWellness from "@/assets/project-wellness.jpg";
import projectSystems from "@/assets/project-systems.jpg";
import aboutDesk from "@/assets/about-desk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mara Ellison — Independent Product Designer" },
      {
        name: "description",
        content:
          "Calm, considered interfaces for people who build carefully. Selected work, services and contact for Mara Ellison, independent product designer.",
      },
      { property: "og:title", content: "Mara Ellison — Independent Product Designer" },
      {
        property: "og:description",
        content:
          "Calm, considered interfaces for people who build carefully. Selected work, services and contact.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const projects = [
  {
    image: projectFinance,
    alt: "Ledger & Loop personal finance dashboard on a laptop in soft morning light",
    category: "Fintech",
    year: "2024",
    title: "Ledger & Loop",
    description:
      "A personal finance app that treats numbers as a calm ledger, not a dashboard of alarm bells.",
  },
  {
    image: projectWellness,
    alt: "Tidepool meditation app on a phone resting on linen fabric",
    category: "Health",
    year: "2023",
    title: "Tidepool",
    description:
      "A breathing-and-sleep companion built around slow interaction and no streaks or guilt.",
  },
  {
    image: projectSystems,
    alt: "Typography specimen sheets and grid layouts on warm paper",
    category: "Design systems",
    year: "2023",
    title: "Almanac UI",
    description:
      "A warm, accessible design system powering a nonprofit's four products from one codebase.",
  },
];

const services = [
  {
    title: "Product & interface design",
    description:
      "End-to-end design for web and mobile — from first sketch to polished, shipped screens.",
  },
  {
    title: "Design systems",
    description:
      "Tokens, components and documentation that let a team move fast without breaking trust.",
  },
  {
    title: "Product audits",
    description:
      "A focused review of an existing product with a prioritised list of what to fix first.",
  },
  {
    title: "Prototyping & testing",
    description:
      "Interactive prototypes and light user testing to settle big decisions before build time.",
  },
];

const elsewhere = [
  { label: "Read.cv", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Are.na", href: "#" },
];

function Index() {
  return (
    <main id="top" className="min-h-screen bg-background font-body text-foreground antialiased">
      {/* Masthead + hero */}
      <section className="bg-background py-6 sm:py-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <header className="flex items-center justify-between pb-8 sm:pb-10">
            <a href="#top" className="font-display text-lg font-medium tracking-tight">
              Mara Ellison
            </a>
            <nav className="hidden items-center gap-7 text-[13px] text-foreground/60 sm:flex">
              <a href="#work" className="transition-colors hover:text-clay">
                Work
              </a>
              <a href="#about" className="transition-colors hover:text-clay">
                About
              </a>
              <a href="#services" className="transition-colors hover:text-clay">
                Services
              </a>
              <a href="#contact" className="text-foreground transition-colors hover:text-clay">
                Contact
              </a>
            </nav>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 py-2 pl-2 pr-3 text-[13px] text-foreground sm:hidden"
            >
              <span className="grid size-4 place-items-center text-clay">✉</span>
              Say hi
            </a>
          </header>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="reveal reveal-1 text-[11px] font-medium uppercase tracking-[0.28em] text-clay">
                Independent product designer
              </p>
              <h1 className="reveal reveal-2 mt-5 font-display text-[clamp(2.6rem,9vw,5rem)] font-medium leading-[1.02] tracking-[-0.02em] text-balance">
                Calm, considered <span className="italic text-sage">interfaces</span> for people
                who build carefully.
              </h1>
              <p className="reveal reveal-3 mt-7 max-w-[46ch] text-pretty text-base text-foreground/70 sm:text-lg">
                I'm Mara. For eight years I've helped small teams turn tangled workflows into
                products that feel quiet, legible, and a little bit inevitable.
              </p>
              <div className="reveal reveal-4 mt-8 flex flex-wrap items-center gap-2">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-[min(1vw,10px)] bg-primary px-5 py-3 text-sm font-medium text-primary-foreground ring-1 ring-primary transition-colors hover:bg-sage hover:ring-sage"
                >
                  See the work
                  <span className="grid size-4 place-items-center">→</span>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-[min(1vw,10px)] px-5 py-3 text-sm font-medium text-foreground ring-1 ring-foreground/20 transition-colors hover:ring-foreground/50"
                >
                  What I do
                </a>
              </div>
            </div>
            <div className="reveal reveal-2 lg:col-span-5">
              <img
                src={portrait}
                alt="Portrait of Mara Ellison in a linen shirt by a warm window"
                width={1080}
                height={1440}
                className="aspect-[4/5] w-full rounded-[min(1vw,12px)] object-cover outline-1 -outline-offset-1 outline-black/5"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-border/70 pt-6 text-[13px] text-foreground/55 lg:mt-14">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-clay" />
              Available for Q3 projects
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-sage" />
              Based in Asheville, NC
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-foreground/40" />
              Remote-friendly, GMT-5
            </span>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section id="work" className="bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-9 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-clay">
                Selected work
              </p>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
                Three recent projects
              </h2>
            </div>
            <a
              href="#contact"
              className="hidden text-[13px] text-foreground/60 transition-colors hover:text-clay sm:inline"
            >
              Full archive →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-[min(1.4vw,14px)] bg-card ring-1 ring-black/5"
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-[11px] text-foreground/50">
                    <span className="uppercase tracking-[0.16em]">{project.category}</span>
                    <span className="size-1 rounded-full bg-border" />
                    <span>{project.year}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-medium">{project.title}</h3>
                  <p className="mt-2 flex-1 text-pretty text-[15px] text-foreground/65">
                    {project.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clay transition-all group-hover:gap-2.5"
                  >
                    Case study <span className="grid size-4 place-items-center">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About + services */}
      <section id="about" className="bg-background py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-clay">About</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              A designer who reads the fine print
            </h2>
            <p className="mt-6 max-w-[44ch] text-pretty text-base text-foreground/70 sm:text-lg">
              I care about the small decisions: the empty state, the keyboard path, the sentence
              that makes a confusing form make sense. Good interfaces feel less designed the more
              thought goes into them.
            </p>
            <img
              src={aboutDesk}
              alt="Mara's desk from above with sketches, coffee and a laptop in warm light"
              loading="lazy"
              width={1024}
              height={768}
              className="mt-8 aspect-[4/3] w-full rounded-[min(1vw,12px)] object-cover outline-1 -outline-offset-1 outline-black/5"
            />
          </div>

          <div id="services" className="scroll-mt-24 lg:col-span-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-clay">
              Services
            </p>
            <ul className="mt-5 divide-y divide-border/70">
              {services.map((service, index) => (
                <li key={service.title} className="flex items-start gap-4 py-5">
                  <span className="w-6 shrink-0 text-right font-display text-lg text-sage">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium">{service.title}</h3>
                    <p className="mt-1 max-w-[52ch] text-pretty text-[15px] text-foreground/65">
                      {service.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-foreground py-16 text-background sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-clay">
                Contact
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,6vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.02em] text-balance">
                Have a product that deserves a little more care?
              </h2>
              <p className="mt-5 max-w-[46ch] text-pretty text-base text-background/70 sm:text-lg">
                I take on a handful of projects each season. Tell me what you're building and where
                it hurts, and I'll reply within two working days.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <a
                  href="mailto:hello@maraellison.design"
                  className="inline-flex items-center gap-2 rounded-[min(1vw,10px)] bg-clay px-5 py-3 text-sm font-medium text-background ring-1 ring-clay transition-colors hover:bg-background hover:text-foreground hover:ring-background"
                >
                  <span className="grid size-4 place-items-center">✉</span>
                  hello@maraellison.design
                </a>
                <a
                  href="#top"
                  className="inline-flex items-center gap-2 rounded-[min(1vw,10px)] px-5 py-3 text-sm font-medium text-background ring-1 ring-background/25 transition-colors hover:ring-background/60"
                >
                  Book a call
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-[min(1.4vw,14px)] bg-background/5 p-6 ring-1 ring-background/10">
                <h3 className="font-display text-lg font-medium">Elsewhere</h3>
                <ul className="mt-4 space-y-1 text-[15px]">
                  {elsewhere.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex items-center justify-between py-2 text-background/75 transition-colors hover:text-clay"
                      >
                        {link.label} <span className="grid size-4 place-items-center">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-background/15 pt-6 text-[13px] text-background/50 sm:flex-row sm:items-center">
            <span className="font-display">Mara Ellison</span>
            <span>© 2026 — Designed and built in the open.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
