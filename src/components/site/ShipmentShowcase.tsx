import { useEffect, useState } from "react";
import {
  Truck,
  Mail,
  Bell,
  MessageCircle,
  Check,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Navigation,
} from "lucide-react";
import mascot from "@/assets/movara-dispatch-assistant.png";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export function ShipmentShowcase() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [role, setRole] = useState<"system" | "carrier">("system");
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setStep((s) => (s + 1) % 6), 2400);
    return () => clearInterval(timer);
  }, [playing]);
  return (
    <section id="shipment-experience" className="overflow-hidden bg-secondary/60 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase text-primary">
              Connected logistics · Sample journey
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold sm:text-5xl">
              One shipment.
              <br />
              Everyone in the loop.
            </h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold">
            Build your connected operation <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div className="overflow-hidden rounded-lg border border-navy-border bg-navy text-navy-foreground shadow-float">
              <div className="flex items-center justify-between border-b border-navy-border p-4">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-signal" />
                  <span className="text-sm font-semibold">Shipment control</span>
                </div>
                <span className="text-xs text-signal">● Sample GPS feed</span>
              </div>
              <div className="shipment-map relative h-72 overflow-hidden sm:h-80">
                <svg
                  viewBox="0 0 600 320"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <g
                    className="text-navy-border"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="14"
                  >
                    <path d="M-20 250 130 200 290 230 620 70" />
                    <path d="M80-10 180 140 210 340" />
                    <path d="M430-10 390 150 480 340" />
                    <path d="M-20 70 220 95 390 150 620 160" />
                  </g>
                  <path
                    d="M65 245 C140 230 155 115 255 145 S395 240 530 80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-signal"
                    strokeDasharray="7 5"
                  />
                  <circle cx="65" cy="245" r="7" fill="currentColor" className="text-signal" />
                  <circle cx="530" cy="80" r="7" fill="currentColor" className="text-signal" />
                </svg>
                <span className="absolute bottom-9 left-6 text-xs font-semibold">Dallas, TX</span>
                <span className="absolute right-6 top-9 text-xs font-semibold">Atlanta, GA</span>
                <div className={`map-vehicle ${playing ? "" : "is-paused"}`}>
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-signal text-signal-foreground shadow-glow">
                    <Truck className="h-6 w-6" />
                  </span>
                </div>
                <div className="absolute left-4 top-4 rounded-md border border-navy-border bg-navy/90 px-3 py-2 text-xs">
                  <p className="font-semibold">Truck 214 · M. Alvarez</p>
                  <p className="mt-1 text-navy-muted">68 mph · On schedule</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-navy-border p-4">
                <div>
                  <p className="text-sm font-semibold">
                    #DT-48213{" "}
                    <span className="ml-2 text-signal">
                      {step === 0 ? "Carrier confirmed" : step === 5 ? "Delivered" : "In transit"}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-navy-muted">Dallas → Atlanta · ETA 09:40 AM</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={playing ? "Pause shipment demo" : "Play shipment demo"}
                    title={playing ? "Pause" : "Play"}
                    onClick={() => {
                      setPlaying(!playing);
                      window.__lovableEvents?.track?.("project.workflow_interaction", {
                        action: playing ? "pause" : "play",
                        surface: "shipment",
                      });
                    }}
                  >
                    {playing ? <Pause /> : <Play />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Restart shipment demo"
                    title="Restart"
                    onClick={() => {
                      setStep(0);
                      setPlaying(true);
                      window.__lovableEvents?.track?.("project.workflow_interaction", {
                        action: "restart",
                        surface: "shipment",
                      });
                    }}
                  >
                    <RotateCcw />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5">
                <img
                  src={mascot}
                  alt="Milo, Movara’s logistics assistant"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-36 w-36 shrink-0 object-contain motion-safe:animate-float max-sm:h-24 max-sm:w-24"
                />
                <div>
                  <p className="text-xs text-muted-foreground">YOUR DIGITAL DISPATCH TEAM</p>
                  <h3 className="mt-2 text-xl font-semibold">Milo is on it.</h3>
                  <div className="mt-3 flex gap-1 rounded-md bg-secondary p-1">
                    {(["system", "carrier"] as const).map((r) => (
                      <Button
                        key={r}
                        size="sm"
                        variant={role === r ? "default" : "ghost"}
                        onClick={() => {
                          setRole(r);
                          window.__lovableEvents?.track?.("project.workflow_interaction", {
                            action: `select_${r}`,
                            surface: "shipment",
                          });
                        }}
                      >
                        {r === "system" ? "System agent" : "Carrier agent"}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 min-h-12 text-sm text-muted-foreground">
                {role === "system"
                  ? "Shipment milestones become customer updates. Your system agent keeps operations, documents and communication connected."
                  : "Your carrier agent checks lane availability, coordinates pickup and follows up with drivers — while your team stays in control."}
              </p>
              <div className="mt-6 border-t border-border">
                {[
                  {
                    name: "Email",
                    icon: Mail,
                    detail: "Shipment dispatched · tracking link included",
                    at: 1,
                  },
                  {
                    name: "WhatsApp",
                    icon: MessageCircle,
                    detail: "Your load is on the way. ETA: 09:40 AM",
                    at: 2,
                  },
                  {
                    name: "Customer portal",
                    icon: Bell,
                    detail: "Shipment status and ETA updated in app",
                    at: 3,
                  },
                ].map((c) => (
                  <div
                    key={c.name}
                    className={`flex items-center gap-3 border-b border-border py-4 transition-opacity duration-500 ${step >= c.at ? "opacity-100" : "opacity-40"}`}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent/25 text-primary">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{c.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{c.detail}</p>
                    </div>
                    {step >= c.at && <Check className="h-4 w-4 shrink-0 text-primary" />}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">
                Illustrated workflow · No messages are sent
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
