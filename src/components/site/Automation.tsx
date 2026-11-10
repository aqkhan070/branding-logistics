import { useEffect, useState } from "react";
import {
  Inbox,
  ShieldCheck,
  Truck,
  MapPin,
  FileText,
  Receipt,
  RefreshCw,
  CheckCircle2,
  Zap,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { Reveal, SectionHeader } from "./Reveal";
import { Button } from "@/components/ui/button";

const steps = [
  { t: "Order received", d: "Load created from email or portal", i: Inbox },
  { t: "Credit check", d: "Customer limit verified", i: ShieldCheck },
  { t: "Carrier matched", d: "Best carrier on the lane assigned", i: Truck },
  { t: "Live tracking", d: "GPS pings & ETA updates", i: MapPin },
  { t: "Documents", d: "Confirmation, BOL & POD collected", i: FileText },
  { t: "Invoice sent", d: "Generated and emailed", i: Receipt },
  { t: "Accounting sync", d: "Pushed to your books", i: RefreshCw },
];

const logs = [
  "Load #DT-48213 created from customer email",
  "Credit limit OK — $42,000 available",
  "Matched 4 carriers · assigned Swift Lane LLC",
  "Tracking started · driver 12 mi from pickup",
  "BOL generated · POD uploaded by driver",
  "Invoice INV-10931 emailed to customer",
  "Invoice synced to accounting ✓",
];

export function Automation() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setActive((a) => (a + 1) % (steps.length + 1)), 1400);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <section
      id="automation"
      className="relative overflow-hidden bg-navy-glow py-28 text-navy-foreground"
    >
      <div className="pointer-events-none absolute inset-0 grid-dark opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionHeader
          dark
          eyebrow="Automated operations"
          title="Workflows That Run Themselves."
          text="From the moment an order lands to the moment it's in your books — every step automated, visible and traceable."
        />
        <div className="mb-8 flex items-center justify-end gap-2">
          <span className="mr-2 text-xs text-navy-muted">Sample workflow</span>
          <Button
            variant="ghost"
            size="icon"
            title={playing ? "Pause workflow" : "Play workflow"}
            aria-label={playing ? "Pause workflow" : "Play workflow"}
            onClick={() => {
              setPlaying(!playing);
              window.__lovableEvents?.track?.("project.workflow_interaction", {
                surface: "automation",
                action: playing ? "pause" : "play",
              });
            }}
          >
            {playing ? <Pause /> : <Play />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="Restart workflow"
            aria-label="Restart workflow"
            onClick={() => {
              setActive(0);
              setPlaying(true);
              window.__lovableEvents?.track?.("project.workflow_interaction", {
                surface: "automation",
                action: "restart",
              });
            }}
          >
            <RotateCcw />
          </Button>
        </div>

        <Reveal>
          <div className="relative grid gap-3 md:grid-cols-7">
            <div className="absolute left-[7%] right-[7%] top-8 hidden h-px overflow-hidden bg-navy-border md:block">
              <div
                className="h-full bg-signal transition-all duration-700"
                style={{
                  width: `${(Math.min(active, steps.length - 1) / (steps.length - 1)) * 100}%`,
                }}
              />
              <span className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-signal shadow-glow animate-flow-dot" />
            </div>
            {steps.map((s, i) => {
              const done = i < active;
              const now = i === active;
              return (
                <div
                  key={s.t}
                  className="relative flex flex-row items-center gap-4 md:flex-col md:text-center"
                >
                  <span
                    className={`relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-2xl border transition-all duration-500 ${
                      now
                        ? "scale-110 border-signal bg-signal text-signal-foreground shadow-glow"
                        : done
                          ? "border-signal/50 bg-navy-2 text-signal"
                          : "border-navy-border bg-navy-2 text-navy-muted"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-6 w-6" /> : <s.i className="h-6 w-6" />}
                    {now && (
                      <span className="absolute inset-0 rounded-2xl border border-signal animate-ping" />
                    )}
                  </span>
                  <div className="md:mt-3">
                    <p
                      className={`font-display text-sm font-semibold transition ${done || now ? "text-navy-foreground" : "text-navy-muted"}`}
                    >
                      {s.t}
                    </p>
                    <p className="mt-1 text-xs text-navy-muted">{s.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="glass h-full rounded-2xl p-5 font-mono text-xs">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-signal">
                  <Zap className="h-3.5 w-3.5" /> automation.log
                </span>
                <span className="text-navy-muted">live</span>
              </div>
              <ul className="space-y-2">
                {logs.slice(0, Math.max(active, 1)).map((l, i) => (
                  <li key={l} className="flex animate-rise gap-3">
                    <span className="text-navy-muted">{`00:0${i}:${String(12 + i * 7).padStart(2, "0")}`}</span>
                    <span className="text-signal">✓</span>
                    <span>{l}</span>
                  </li>
                ))}
                <li className="text-signal">
                  <span className="animate-blink">▍</span>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid h-full grid-cols-2 gap-4">
              {[
                ["0", "Manual data entry"],
                ["24/7", "Always running"],
                ["7", "Steps automated"],
                ["1", "Source of truth"],
              ].map(([v, l]) => (
                <div key={l} className="glass rounded-2xl p-5">
                  <p className="font-display text-3xl font-semibold text-gradient">{v}</p>
                  <p className="mt-1 text-xs text-navy-muted">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
