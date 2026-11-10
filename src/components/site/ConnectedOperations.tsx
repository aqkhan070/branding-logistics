import { useEffect, useState } from "react";
import {
  Calculator,
  Check,
  FileCheck,
  MapPin,
  Pause,
  Play,
  ArrowRight,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeader } from "./Reveal";
import driverScreens from "@/assets/driver-app-concept.jpg";

const scenarios = [
  {
    name: "QuickBooks",
    icon: Calculator,
    title: "Delivery completed. Books updated.",
    description:
      "Connect approved invoices and carrier bills to QuickBooks, with a visible sync trail and exceptions for your accounting team.",
    stages: ["POD approved", "Invoice prepared", "QuickBooks sync", "Reconciliation"],
    records: [
      "POD-48213 · Approved by dispatch",
      "INV-10931 · Customer invoice prepared",
      "QuickBooks · Invoice & carrier bill mapped",
      "Review queue · Duplicate check completed",
    ],
  },
  {
    name: "1099 tax",
    icon: FileCheck,
    title: "A clearer path to tax-season readiness.",
    description:
      "Bring contractor details, W-9 documents and payment records into a reviewable 1099 preparation workflow. Filing depends on your tax provider and accountant’s approval.",
    stages: ["W-9 collected", "Payments grouped", "Accountant review", "Export for filing"],
    records: [
      "Contractor profile · W-9 on file",
      "Payment ledger · Annual totals assembled",
      "Review queue · Classification & details checked",
      "1099 preparation · Export ready for tax provider",
    ],
  },
  {
    name: "MacroPoint",
    icon: MapPin,
    title: "Shipment visibility, without the check calls.",
    description:
      "Connect Descartes MacroPoint tracking to load milestones, ETA updates and exception alerts in your custom logistics platform.",
    stages: ["Load assigned", "Tracking requested", "Location update", "ETA alert"],
    records: [
      "Load #48213 · Carrier assigned",
      "Tracking request · Driver consent workflow",
      "Shreveport, LA · Sample location received",
      "ETA 4:30 PM · Customer update prepared",
    ],
  },
];

export function ConnectedOperations() {
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const scenario = scenarios[selected] ?? scenarios[0];
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setStage((s) => (s + 1) % 4), 2400);
    return () => clearInterval(timer);
  }, [playing, selected]);
  if (!scenario) return null;
  return (
    <>
      <section id="connected-operations" className="bg-secondary/50 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeader eyebrow="Connected operations" title="From the road to your books." />
          <div
            className="mb-10 flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Integration workflows"
          >
            {scenarios.map((s, i) => (
              <Button
                key={s.name}
                role="tab"
                aria-selected={selected === i}
                variant={selected === i ? "default" : "outline"}
                onClick={() => {
                  setSelected(i);
                  setStage(0);
                  window.__lovableEvents?.track?.("project.workflow_interaction", {
                    surface: "automation",
                    action: `select_${s.name}`,
                  });
                }}
              >
                <s.icon className="h-4 w-4" />
                {s.name}
              </Button>
            ))}
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <scenario.icon className="mb-5 h-9 w-9 text-chart-2" />
              <h3 className="text-3xl font-semibold">{scenario.title}</h3>
              <p className="mt-4 text-muted-foreground">{scenario.description}</p>
              <p className="mt-6 text-xs text-muted-foreground">
                Illustrative integration workflow · No account connected
              </p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 font-semibold">
                Discuss your integration <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div
              className="overflow-hidden rounded-lg border border-navy-border bg-navy text-navy-foreground shadow-float"
              role="tabpanel"
              aria-label={`${scenario.name} workflow`}
            >
              <div className="flex items-center justify-between border-b border-navy-border px-5 py-3">
                <span className="text-sm font-semibold">{scenario.name} · Workflow preview</span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={playing ? "Pause integration workflow" : "Play integration workflow"}
                  title={playing ? "Pause integration workflow" : "Play integration workflow"}
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
              </div>
              <ol className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">
                {scenario.stages.map((s, i) => (
                  <li
                    key={s}
                    className={`border-t-2 pt-3 transition-colors duration-500 ${i <= stage ? "border-signal text-navy-foreground" : "border-navy-border text-navy-muted"}`}
                  >
                    <span
                      className={`mb-3 grid h-8 w-8 place-items-center rounded-full text-xs ${i <= stage ? "bg-signal text-signal-foreground" : "bg-navy-2"}`}
                    >
                      {i < stage ? <Check className="h-4 w-4" /> : i + 1}
                    </span>
                    <span className="text-xs font-medium">{s}</span>
                  </li>
                ))}
              </ol>
              <div className="min-h-[212px] border-t border-navy-border px-5 py-4">
                <p className="mb-3 text-xs text-navy-muted">Activity · Sample records</p>
                {scenario.records.map((r, i) => (
                  <div
                    key={r}
                    className={`flex gap-3 border-b border-navy-border py-3 text-xs transition-opacity duration-500 last:border-0 ${i <= stage ? "opacity-100" : "opacity-30"}`}
                  >
                    <Check
                      className={`h-3.5 w-3.5 shrink-0 ${i <= stage ? "text-signal" : "text-navy-muted"}`}
                    />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="driver-app" className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeader
            eyebrow="Driver mobile app"
            title="One trip. Every detail in your driver’s hand."
            text="Load assignments, trip updates and proof of delivery, connected to the dispatch workflow."
          />
          <Reveal>
            <img
              src={driverScreens}
              loading="lazy"
              width={1536}
              height={1024}
              alt="Three Movara driver-app concept screens: load assignment, trip tracking, and proof of delivery with photo and signature"
              className="mx-auto w-full max-w-5xl rounded-lg"
            />
          </Reveal>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Concept screens · Sample information · Not an existing mobile-app release
          </p>
          <div className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-3">
            {[
              [
                "01",
                "Accept the load",
                "Pickup, delivery, equipment and trip details in one place.",
              ],
              [
                "02",
                "Keep dispatch updated",
                "Share trip milestones and location through a consent-based tracking workflow.",
              ],
              [
                "03",
                "Close the delivery",
                "Capture delivery photos and signatures for the POD approval and invoicing flow.",
              ],
            ].map(([n, t, d]) => (
              <div key={n} className="border-t border-border pt-5">
                <span className="text-xs font-semibold text-chart-2">{n}</span>
                <h3 className="mt-2 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild>
              <a href="#contact">
                <Smartphone className="h-4 w-4" />
                Discuss a driver app
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
