import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Workflow,
  Plug,
  Layers,
  FileSpreadsheet,
  Unplug,
  EyeOff,
  TrendingDown,
  Route as RouteIcon,
  Truck,
  Container,
  Warehouse,
  PackageSearch,
  Network,
  Navigation,
  Users,
  Search,
  PenTool,
  Code2,
  Rocket,
  CreditCard,
  Calculator,
  MapPin,
  Contact,
  Bell,
  Cloud,
  RefreshCw,
  Ship,
  Bike,
  Boxes,
  Factory,
  Building2,
  ShieldCheck,
  Gauge,
  KeyRound,
  LifeBuoy,
  Linkedin,
  Mail,
  Phone,
  Check,
  Sparkles,
} from "lucide-react";
import { Dashboard, MiniPreview } from "@/components/site/Dashboard";
import { Reveal, SectionHeader } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { AgentDemo } from "@/components/site/AgentDemo";
import { Automation } from "@/components/site/Automation";
import { ShipmentShowcase } from "@/components/site/ShipmentShowcase";
import { HelpChat } from "@/components/site/HelpChat";
import { SolutionPreview } from "@/components/site/SolutionPreview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Movara — Custom Logistics Software Development" },
      {
        name: "description",
        content:
          "We design and build custom TMS, fleet, freight, warehouse and supply chain software around how your logistics business actually runs.",
      },
      { property: "og:title", content: "Movara — Custom Logistics Software Development" },
      {
        property: "og:description",
        content:
          "Custom logistics software built around your business: TMS, fleet, freight, WMS, tracking and integrations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["Services", "#solutions"],
  ["AI Agents", "#agents"],
  ["Automation", "#automation"],
  ["Industries", "#industries"],
  ["Our Work", "#work"],
  ["About Us", "#process"],
  ["Contact", "#contact"],
] as const;

function Logo({ dark }: { dark?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-signal text-signal-foreground">
        <Navigation className="h-4 w-4" />
      </span>
      <span className={dark ? "text-navy-foreground" : "text-foreground"}>Movara</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 transition-all ${scrolled ? "border-b border-navy-border bg-navy/85 backdrop-blur-xl" : "bg-transparent"} text-navy-foreground`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo dark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="text-sm font-medium text-navy-muted transition hover:text-signal"
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-signal-foreground shadow-glow transition hover:-translate-y-0.5 lg:inline-flex"
        >
          Let's Discuss Your Project
        </a>
        <button
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          className="border-t border-navy-border bg-navy px-5 pb-6 pt-2 lg:hidden"
          aria-label="Mobile"
        >
          {nav.map(([l, h]) => (
            <a
              key={l}
              href={h}
              onClick={() => setOpen(false)}
              className="block border-b border-navy-border py-3 font-medium"
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-signal py-3 text-center font-semibold text-signal-foreground"
          >
            Let's Discuss Your Project
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative -mt-16 overflow-hidden bg-navy pt-16 text-navy-foreground"
    >
      <div className="pointer-events-none absolute inset-0 grid-dark" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-signal/15 blur-3xl animate-glow" />
      <div className="pointer-events-none absolute -left-40 top-40 h-[30rem] w-[30rem] rounded-full bg-chart-2/15 blur-3xl animate-glow [animation-delay:1.5s]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden bg-navy-border">
        <div className="h-full w-1/4 bg-gradient-to-r from-transparent via-signal to-transparent animate-beam" />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-14 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs font-medium text-navy-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-glow" /> Software that moves
            your business forward
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Custom Logistics Software Built Around{" "}
            <span className="text-gradient text-glow">Your Business.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-navy-muted">
            Transform complex logistics operations into streamlined digital workflows. We design and
            develop powerful software for transportation, freight, fleet, warehousing, and supply
            chain businesses.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-signal-foreground shadow-glow transition hover:-translate-y-0.5"
            >
              Discuss Your Project <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#agents"
              className="inline-flex items-center gap-2 glass rounded-full px-6 py-3.5 text-sm font-semibold transition hover:border-signal"
            >
              See the AI Agent
            </a>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["Built Around Your Operations", Workflow],
              ["Seamless System Integrations", Plug],
              ["Scalable Enterprise Solutions", Layers],
            ].map(([t, I]) => {
              const Icon = I as typeof Workflow;
              return (
                <li key={t as string} className="flex items-center gap-2 text-sm font-medium">
                  <Icon className="h-4 w-4 shrink-0 text-signal" /> {t as string}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="animate-rise relative animate-float [animation-delay:200ms]">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-signal/20 blur-3xl" />
          <Dashboard />
          <div className="absolute -bottom-6 -left-6 hidden glass rounded-2xl p-4 sm:block">
            <p className="text-xs text-navy-muted">Fleet overview</p>
            <div className="mt-1 flex items-center gap-3">
              <span className="font-display text-2xl font-semibold">128</span>
              <span className="text-xs text-navy-muted">vehicles · 94% active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const problems = [
  {
    t: "Manual Operations",
    d: "Disconnected spreadsheets and manual processes slow down daily operations.",
    i: FileSpreadsheet,
  },
  {
    t: "Disconnected Systems",
    d: "Different departments use separate systems that don't communicate.",
    i: Unplug,
  },
  {
    t: "Limited Visibility",
    d: "It's hard to monitor shipments, fleets, deliveries, and performance.",
    i: EyeOff,
  },
  {
    t: "Growing Operational Costs",
    d: "Inefficient workflows and outdated software keep pushing costs up.",
    i: TrendingDown,
  },
];

function Problem() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="The problem"
          title="Logistics Operations Shouldn't Be This Complicated."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p, idx) => (
            <Reveal key={p.t} delay={idx * 80}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary transition group-hover:bg-accent">
                  <p.i className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const solutions = [
  {
    t: "Transportation Management System (TMS)",
    d: "Shipments, dispatching, carrier management, and delivery workflows.",
    i: RouteIcon,
  },
  {
    t: "Fleet Management Software",
    d: "Vehicles, drivers, maintenance schedules, fuel, and fleet performance.",
    i: Truck,
  },
  {
    t: "Freight Management Software",
    d: "Bookings, quotations, documentation, invoicing, and coordination.",
    i: Container,
  },
  {
    t: "Warehouse Management System (WMS)",
    d: "Inventory, stock movement, receiving, and dispatching.",
    i: Warehouse,
  },
  {
    t: "Shipment Tracking & Delivery",
    d: "Delivery statuses, proof of delivery, and real-time visibility.",
    i: PackageSearch,
  },
  {
    t: "Custom Logistics ERP",
    d: "Finance, operations, procurement, HR, and inventory in one platform.",
    i: Network,
  },
  {
    t: "Route & Dispatch Management",
    d: "Schedules, driver assignments, dispatch, and route planning.",
    i: Navigation,
  },
  {
    t: "Logistics Customer Portals",
    d: "Self-serve bookings, documents, invoices, and tracking for customers.",
    i: Users,
  },
];

function Solutions() {
  return (
    <section id="solutions" className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Solutions"
          title="Everything Your Logistics Business Needs. Built Your Way."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, idx) => (
            <Reveal key={s.t} delay={(idx % 4) * 80}>
              <a
                href="#contact"
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-chart-2/50 hover:shadow-float"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <s.i className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:rotate-45 group-hover:text-foreground" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{s.t}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.d}</p>
                <div className="mt-5">
                  <SolutionPreview variant={idx} />
                </div>
                <span className="mt-4 text-sm font-semibold">Explore Solution →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const whys = [
  { t: "Designed Around Your Workflow", i: Workflow },
  { t: "Integrations With Existing Systems", i: Plug },
  { t: "Complete Operational Visibility", i: Gauge },
  { t: "Scalable Architecture", i: Layers },
  { t: "Ownership and Flexibility", i: KeyRound },
  { t: "Long-Term Technical Support", i: LifeBuoy },
];

function Why() {
  return (
    <section id="why" className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60">
            Why custom software
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
            Your Business Is Unique. Your Software Should Be Too.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Off-the-shelf tools force you to work their way. We build around the processes that make
            your operation competitive — and you own the result.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {whys.map((w) => (
              <li key={w.t} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/30 text-primary">
                  <w.i className="h-4 w-4" />
                </span>
                <span className="pt-1.5 text-sm font-semibold">{w.t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={150}>
          <div className="relative rounded-3xl bg-navy-glow p-8 shadow-float">
            <div className="grid grid-cols-3 gap-3 text-center text-xs text-navy-foreground">
              {["Customer Portal", "Driver App", "Ops Dashboard"].map((x) => (
                <div key={x} className="rounded-xl border border-navy-border bg-navy-2 p-3">
                  {x}
                </div>
              ))}
            </div>
            <div className="mx-auto my-4 h-8 w-px bg-signal" />
            <div className="rounded-2xl border border-signal/40 bg-navy-2 p-5 text-center text-navy-foreground">
              <Sparkles className="mx-auto h-5 w-5 text-signal" />
              <p className="mt-2 font-display font-semibold">Your Logistics Platform</p>
              <p className="text-xs text-navy-muted">Business rules · Workflows · Data</p>
            </div>
            <div className="mx-auto my-4 h-8 w-px bg-signal" />
            <div className="grid grid-cols-4 gap-3 text-center text-[11px] text-navy-muted">
              {["Accounting", "GPS", "ERP", "Email"].map((x) => (
                <div key={x} className="rounded-lg border border-navy-border p-2">
                  {x}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const steps = [
  {
    t: "Discover",
    d: "Understand your operations, challenges, requirements, and goals.",
    i: Search,
  },
  {
    t: "Design",
    d: "Plan workflows, system architecture, data structure, and user experience.",
    i: PenTool,
  },
  { t: "Develop", d: "Build, integrate, test, and deliver your custom solution.", i: Code2 },
  { t: "Scale", d: "Deploy, maintain, optimize, and continuously improve.", i: Rocket },
];

function Process() {
  return (
    <section id="process" className="bg-navy-glow py-24 text-navy-foreground">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          dark
          eyebrow="How we work"
          title="From Business Challenges to Powerful Software."
        />
        <div className="relative grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-navy-border md:block" />
          {steps.map((s, idx) => (
            <Reveal key={s.t} delay={idx * 120}>
              <div className="relative">
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-signal text-signal-foreground shadow-glow">
                  <s.i className="h-6 w-6" />
                </span>
                <p className="mt-6 text-xs font-semibold text-signal">0{idx + 1}</p>
                <h3 className="mt-1 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-navy-muted">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const integrations = [
  { t: "Third-party APIs", i: Plug },
  { t: "Payment gateways", i: CreditCard },
  { t: "Accounting & ERP", i: Calculator },
  { t: "GPS & tracking", i: MapPin },
  { t: "CRM", i: Contact },
  { t: "Automated notifications", i: Bell },
  { t: "Cloud infrastructure", i: Cloud },
  { t: "Data synchronization", i: RefreshCw },
];

function Integrations() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Integrations & automation"
          title="Connect Your Entire Logistics Ecosystem."
          text="We connect your software with the business applications, tracking services, accounting systems and communication tools you already rely on."
        />
        <Reveal>
          <div className="relative mx-auto grid max-w-5xl items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="grid gap-3">
              {integrations.slice(0, 4).map((x) => (
                <Chip key={x.t} {...x} />
              ))}
            </div>
            <div className="mx-auto grid h-40 w-40 place-items-center rounded-full bg-navy text-center text-navy-foreground shadow-float ring-8 ring-accent/30">
              <div>
                <Navigation className="mx-auto h-7 w-7 text-signal" />
                <p className="mt-2 font-display text-sm font-semibold">
                  Central
                  <br />
                  Platform
                </p>
              </div>
            </div>
            <div className="grid gap-3">
              {integrations.slice(4).map((x) => (
                <Chip key={x.t} {...x} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Chip({ t, i: I }: { t: string; i: typeof Plug }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-card transition hover:border-primary/30">
      <I className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium">{t}</span>
      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
    </div>
  );
}

const industries = [
  { t: "Freight & Cargo", i: Ship },
  { t: "Transportation", i: Truck },
  { t: "Courier & Delivery", i: Bike },
  { t: "Fleet Operations", i: Gauge },
  { t: "Warehousing", i: Boxes },
  { t: "Supply Chain", i: Network },
  { t: "Distribution", i: Factory },
];

function Industries() {
  return (
    <section id="industries" className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Industries"
          title="Technology Solutions for Every Part of Logistics."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {industries.map((x, idx) => (
            <Reveal key={x.t} delay={(idx % 4) * 70}>
              <div className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition hover:bg-primary hover:text-primary-foreground">
                <x.i className="h-6 w-6 text-primary transition group-hover:text-accent" />
                <span className="font-display font-semibold">{x.t}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={210}>
            <a
              href="#contact"
              className="flex h-full items-center justify-between rounded-2xl bg-accent p-5 font-display font-semibold text-accent-foreground"
            >
              Your industry? <ArrowRight className="h-5 w-5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const dieseltechModules = [
  "Loads & dispatch",
  "Carrier network",
  "Lane Maker & Truck Board",
  "Invoicing & Quick Pay",
  "QuickBooks sync",
  "Live driver tracking",
  "Agent leaderboard & pay",
  "1099 e-filing",
];
const flow = ["Book", "Cover", "Track", "Invoice", "Sync", "1099"];

function Work() {
  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="Our work" title="Built for Real Business Operations." />
        <Reveal>
          <article className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-card lg:grid-cols-2">
            <div className="p-8 sm:p-10">
              <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold">
                Freight Brokerage
              </span>
              <h3 className="mt-4 text-3xl font-semibold">Dieseltech</h3>
              <p className="mt-3 text-muted-foreground">
                A freight brokerage TMS that runs the whole desk — customers, carriers, loads,
                documents, invoicing and QuickBooks in one system, with role-based access for
                brokers, dispatch and accounting.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {dieseltechModules.map((m) => (
                  <li key={m} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" /> {m}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Discuss a similar project <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="bg-navy-glow p-8 text-navy-foreground sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-signal">Desk workflow</p>
              <ol className="mt-5 flex flex-wrap items-center gap-2">
                {flow.map((f, i) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="rounded-lg border border-navy-border bg-navy-2 px-3 py-2 text-sm">
                      {f}
                    </span>
                    {i < flow.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-navy-muted" />}
                  </li>
                ))}
              </ol>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  ["Brokers", Building2],
                  ["Dispatch", Truck],
                  ["Accounting", Calculator],
                ].map(([t, I]) => {
                  const Icon = I as typeof Truck;
                  return (
                    <div key={t as string} className="rounded-xl bg-navy-2 p-4">
                      <Icon className="h-5 w-5 text-signal" />
                      <p className="mt-2 text-sm font-semibold">{t as string}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 rounded-xl border border-navy-border p-4 text-sm text-navy-muted">
                <ShieldCheck className="mb-2 h-5 w-5 text-signal" />
                Credit checks at booking, missing-POD reminders, auto-generated confirmations, BOLs
                and remittance PDFs.
              </div>
            </div>
          </article>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {["Fleet operations platform", "Warehouse & inventory system"].map((p, i) => (
            <Reveal key={p} delay={i * 100}>
              <div className="rounded-2xl border border-dashed border-input bg-secondary/50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Placeholder project
                </p>
                <h3 className="mt-2 text-lg font-semibold">{p}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Case study coming soon.</p>
                <div className="mt-4">
                  <MiniPreview variant={i} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs: [string, string][] = [
  [
    "What type of logistics software do you develop?",
    "Transportation and freight management, fleet management, warehouse systems, shipment tracking, dispatch tools, customer portals and custom logistics ERPs.",
  ],
  [
    "Can you build software around our existing business processes?",
    "Yes. We start by mapping how your team works today, then design the software around those workflows rather than forcing you into a template.",
  ],
  [
    "Can you integrate with our existing ERP or accounting software?",
    "Yes. We regularly connect platforms with accounting systems, ERPs, tracking providers, email and other third-party services.",
  ],
  [
    "Can you modernize our existing logistics application?",
    "Yes. We can extend, refactor or gradually replace legacy systems while keeping your operations running.",
  ],
  [
    "Do you provide ongoing maintenance and support?",
    "Yes. We offer long-term support, monitoring, improvements and new feature development after launch.",
  ],
  [
    "Can you develop cloud-based logistics platforms?",
    "Yes. We build secure, cloud-hosted platforms that scale with your business and are accessible from anywhere.",
  ],
  [
    "How do you estimate project costs and timelines?",
    "After a discovery call we define scope and priorities, then share a phased estimate so you know what you get at each stage.",
  ],
];

function FAQ() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeader eyebrow="FAQ" title="Questions, answered." />
        <Accordion
          type="single"
          collapsible
          className="rounded-2xl border border-border bg-card px-6 shadow-card"
        >
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left font-display text-base">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="px-5 pb-24">
      <div className="mx-auto grid max-w-7xl gap-12 overflow-hidden rounded-[2rem] bg-navy-glow p-8 sm:p-14 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-semibold text-navy-foreground sm:text-5xl">
            Let's Build the Software Your Logistics Business Needs.
          </h2>
          <p className="mt-5 text-lg text-navy-muted">
            Whether you're modernizing existing operations, building a new logistics platform, or
            connecting disconnected systems, let's discuss how custom software can move your
            business forward.
          </p>
          <div className="mt-8 space-y-3 text-sm text-navy-foreground">
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-signal" /> hello@movara.dev
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-signal" /> +1 (000) 000-0000
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function Footer() {
  const cols: [string, string[]][] = [
    ["Services", ["Custom Development", "Integrations", "Modernization", "Support"]],
    ["Solutions", ["TMS", "Fleet Management", "WMS", "Logistics ERP"]],
    ["Industries", ["Freight & Cargo", "Courier", "Warehousing", "Supply Chain"]],
    ["Company", ["About Us", "Our Work", "Contact"]],
  ];
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-navy-border p-6 sm:flex-row sm:items-center">
          <p className="font-display text-xl font-semibold">Ready to map out your project?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-signal-foreground"
          >
            Schedule a Consultation <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm text-navy-muted">
              Custom software for logistics, transportation, freight, fleet and supply chain
              businesses.
            </p>
            <a
              href="#"
              aria-label="LinkedIn"
              className="mt-5 inline-grid h-9 w-9 place-items-center rounded-lg border border-navy-border hover:border-signal"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
          {cols.map(([h, items]) => (
            <div key={h}>
              <p className="text-sm font-semibold">{h}</p>
              <ul className="mt-4 space-y-2">
                {items.map((i) => (
                  <li key={i}>
                    <a
                      href="#contact"
                      className="text-sm text-navy-muted hover:text-navy-foreground"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-14 border-t border-navy-border pt-6 text-xs text-navy-muted">
          © {new Date().getFullYear()} Movara. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <AgentDemo />
        <ShipmentShowcase />
        <Solutions />
        <Why />
        <Automation />
        <Process />
        <Integrations />
        <Industries />
        <Work />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <HelpChat />
    </>
  );
}
