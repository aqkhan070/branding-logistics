import { useEffect, useState, type ComponentType } from "react";
import {
  Bell,
  Calculator,
  FileCheck,
  FileText,
  LayoutGrid,
  MapPin,
  Sparkles,
  Trophy,
  Truck,
  Waypoints,
} from "lucide-react";
import { Reveal, SectionHeader } from "./Reveal";

type Chip = {
  t: string;
  short: string;
  detail: string;
  i: ComponentType<{ className?: string }>;
};

const featureChips: Chip[] = [
  {
    t: "Loads & dispatch",
    short: "Loads",
    detail: "Book, assign, and run the desk from one load board.",
    i: Truck,
  },
  {
    t: "Multi-stop pickups & deliveries",
    short: "Multi-stop",
    detail: "Multiple pickups and deliveries on one load, tracked end to end.",
    i: Waypoints,
  },
  {
    t: "Carrier network · Lane Maker · Truck Board",
    short: "Carriers",
    detail: "Find coverage fast with lane history and the truck board.",
    i: LayoutGrid,
  },
  {
    t: "Live map tracking",
    short: "Live map",
    detail: "See where the truck is and share ETA without check calls.",
    i: MapPin,
  },
  {
    t: "Missing POD alerts",
    short: "Missing POD",
    detail: "Chase paperwork automatically when a POD is still missing.",
    i: Bell,
  },
  {
    t: "Confirmation · BOL · Drayage PDFs",
    short: "Docs / BOL",
    detail: "Generate confirmations, BOLs, and drayage PDFs from the desk.",
    i: FileText,
  },
  {
    t: "Invoicing & QuickBooks sync",
    short: "QuickBooks",
    detail: "Invoice the load and push mapped bills into QuickBooks.",
    i: Calculator,
  },
  {
    t: "Form 1099 · W-9 & contractor pay",
    short: "Form 1099",
    detail: "W-9s and contractor pay totals ready for 1099 prep and export.",
    i: FileCheck,
  },
  {
    t: "Agent leaderboard · commissions",
    short: "Agent pay",
    detail: "Track agent performance, commissions, and payout readiness.",
    i: Trophy,
  },
  {
    t: "AI ops answers",
    short: "AI ops",
    detail: "Ask plain-language questions about loads, PODs, and coverage.",
    i: Sparkles,
  },
];

function useFeatureIndex(length: number, ms = 3000) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setInterval(() => setActive((a) => (a + 1) % length), ms);
    return () => clearInterval(t);
  }, [length, ms]);
  return active;
}

/** Radius as % of the square orbit box — guide + spokes use the same value. */
const ORBIT_R_PCT = 44;

function OrbitShowcase() {
  const n = featureChips.length;
  const active = useFeatureIndex(n);
  const current = featureChips[active] ?? featureChips[0];
  const ActiveIcon = current?.i ?? Truck;
  const [spin, setSpin] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setSpin((s) => (s + (dt / 1000) * (360 / 56)) % 360);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const positions = featureChips.map((_, i) => {
    const deg = (360 / n) * i - 90 + spin;
    const rad = (deg * Math.PI) / 180;
    return {
      left: 50 + ORBIT_R_PCT * Math.cos(rad),
      top: 50 + ORBIT_R_PCT * Math.sin(rad),
    };
  });
  const activePos = positions[active] ?? { left: 50, top: 50 };

  return (
    <div className="feature-orbit-stage relative overflow-hidden rounded-[2rem] border border-navy-border bg-navy px-4 py-10 text-navy-foreground shadow-float sm:px-8 sm:py-12">
      <div className="pointer-events-none absolute inset-0 grid-dark opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-3xl" />

      <div className="relative mx-auto aspect-square w-full max-w-[42rem]">
        {/* Orbit guide */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-dashed border-signal/35"
          style={{
            width: `${ORBIT_R_PCT * 2}%`,
            height: `${ORBIT_R_PCT * 2}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Spoke to active chip */}
        <svg className="pointer-events-none absolute inset-0 z-[5] h-full w-full" aria-hidden>
          <line
            x1="50%"
            y1="50%"
            x2={`${activePos.left}%`}
            y2={`${activePos.top}%`}
            className="stroke-signal/50"
            strokeWidth="2"
            strokeDasharray="6 8"
          />
        </svg>

        {/* Center hub */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-5 sm:p-8">
          <div className="flex w-[13rem] flex-col items-center rounded-[1.75rem] border border-signal/25 bg-navy-2/95 px-4 py-5 text-center shadow-glow sm:w-[15.5rem] sm:px-5 sm:py-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-signal text-signal-foreground">
              <Truck className="h-6 w-6" />
            </span>
            <p className="mt-3 text-[11px] font-semibold tabular-nums tracking-[0.2em] text-signal">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-signal/90">
              <ActiveIcon className="h-3.5 w-3.5" /> Now showing
            </p>
            <p className="mt-2 font-display text-base font-semibold leading-snug sm:text-lg">
              {current?.t}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-navy-muted">{current?.detail}</p>
          </div>
        </div>

        {/* Chips */}
        <div className="absolute inset-0 z-10">
          {featureChips.map((f, i) => {
            const Icon = f.i;
            const on = i === active;
            const pos = positions[i]!;
            return (
              <div
                key={f.t}
                className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3.5 py-2.5 shadow-card transition-[background-color,border-color,box-shadow,color,transform] duration-500 sm:px-4 sm:py-3 ${
                  on
                    ? "feature-orbit-active z-30 scale-110 border-signal bg-navy text-navy-foreground shadow-glow ring-2 ring-signal/50"
                    : "border-navy-border bg-navy-2/90 text-navy-foreground backdrop-blur-sm"
                }`}
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              >
                <Icon className={`h-5 w-5 shrink-0 ${on ? "text-signal" : "text-signal/80"}`} />
                <span className="whitespace-nowrap text-xs font-semibold sm:text-sm">{f.short}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function FeatureShowcase() {
  return (
    <section id="features" className="bg-secondary/60 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Capability showcase"
          title="What you can run from one freight desk."
          text="Built around your operation — we can tailor it. Sample data shown; based on real brokerage TMS capabilities."
        />
        <Reveal>
          <OrbitShowcase />
        </Reveal>
        <p className="mx-auto mt-6 max-w-3xl text-center text-base text-muted-foreground sm:text-lg">
          Live ops features lead. Concept-only extras (like a driver app or WhatsApp alerts) are
          labeled when shown.
        </p>
      </div>
    </section>
  );
}
