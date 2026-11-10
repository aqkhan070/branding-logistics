import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send, MapPin, Truck, FileCheck2, DollarSign, Sparkles } from "lucide-react";
import { Reveal, SectionHeader } from "./Reveal";
import mascot from "@/assets/movara-dispatch-assistant.png";

type Msg = { role: "user" | "agent"; text: string; card?: Card };
type Card = { title: string; rows: [string, string][]; progress?: number };

const answers: { match: RegExp; text: string; card: Card }[] = [
  {
    match: /where|load|locat|track/i,
    text: "Load #DT-48213 is on the move. Driver is on I-40 near Amarillo, TX, running 18 min ahead of schedule.",
    card: { title: "Load #DT-48213 · Dallas → Phoenix", rows: [["Driver", "M. Alvarez · Truck 214"], ["Last ping", "2 min ago"], ["ETA", "Tomorrow 09:40 AM"]], progress: 46 },
  },
  {
    match: /pod|document|deliver/i,
    text: "3 delivered loads are still missing a POD. I've emailed the carriers and CC'd the assigned agents.",
    card: { title: "Missing POD", rows: [["#DT-48190", "Reminder sent"], ["#DT-48177", "Reminder sent"], ["#DT-48165", "Uploaded 1m ago ✓"]] },
  },
  {
    match: /revenue|profit|money|margin/i,
    text: "This week's gross is $284,120 with an average margin of 14.8% — up 2.1% from last week.",
    card: { title: "Revenue · This week", rows: [["Gross", "$284,120"], ["Margin", "14.8%"], ["Top lane", "Chicago → Atlanta"]] },
  },
  {
    match: /cover|truck|carrier|need/i,
    text: "5 loads still need a truck. I found 12 carriers who already run these lanes and ranked them by rating.",
    card: { title: "Need to cover", rows: [["#DT-48230", "4 carriers matched"], ["#DT-48228", "3 carriers matched"], ["#DT-48226", "5 carriers matched"]] },
  },
];

const suggestions = ["Where is my current load?", "Which loads need a truck?", "Any missing PODs?", "How's revenue this week?"];

function reply(q: string): Msg {
  const hit = answers.find((a) => a.match.test(q));
  if (hit) return { role: "agent", text: hit.text, card: hit.card };
  return { role: "agent", text: "In a live system I'd answer that from your own data. Try asking about a load, POD, carriers or revenue." };
}

export function AgentDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "agent", text: "Hi, I'm your operations agent. Ask me anything about your loads, carriers or revenue." },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  function ask(q: string) {
    const text = q.trim().slice(0, 200);
    if (!text || typing) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    window.__lovableEvents?.track?.("project.agent_question", { surface: "operations_demo", source: suggestions.includes(text) ? "suggestion" : "typed" });
    setTimeout(() => {
      setMsgs((m) => [...m, reply(text)]);
      setTyping(false);
    }, 1100);
  }

  return (
    <section id="agents" className="relative overflow-hidden bg-navy py-28 text-navy-foreground">
      <div className="pointer-events-none absolute inset-0 grid-dark" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-signal/10 blur-3xl animate-glow" />
      <div className="relative mx-auto max-w-7xl px-5">
        <SectionHeader dark eyebrow="AI operations agents" title="Just Ask Your System." text="We build AI agents into your software, so your team can ask in plain language and get answers from live operational data." />
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="space-y-4">
            {[
              [MapPin, "Live load tracking", "“Where is my current load?” — position, ETA and driver in seconds."],
              [Truck, "Freight coverage", "Find carriers that already run the lane and rank them."],
              [FileCheck2, "Document follow-up", "Chase missing PODs and paperwork automatically."],
              [DollarSign, "Revenue insights", "Ask for margins, top lanes and agent performance."],
            ].map(([I, t, d]) => {
              const Icon = I as typeof MapPin;
              return (
                <div key={t as string} className="glass flex gap-4 rounded-2xl p-5 transition hover:border-signal/50">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-signal/15 text-signal"><Icon className="h-5 w-5" /></span>
                  <div>
                    <p className="font-display font-semibold">{t as string}</p>
                    <p className="mt-1 text-sm text-navy-muted">{d as string}</p>
                  </div>
                </div>
              );
            })}
          </Reveal>

          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl border border-signal/30 bg-navy-2 shadow-glow">
              <div className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-signal/5 to-transparent animate-scan" />
              <div className="flex items-center gap-3 border-b border-navy-border px-5 py-4">
                <span className="relative grid h-9 w-9 place-items-center rounded-full bg-signal text-signal-foreground">
                  <img src={mascot} alt="" width={1024} height={1024} className="h-9 w-9 object-contain" />
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-navy-2 bg-signal" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Ops Agent</p>
                  <p className="text-xs text-signal">● Online · Interactive demo</p>
                </div>
              </div>
              <div ref={box} className="h-[380px] space-y-4 overflow-y-auto p-5" aria-live="polite">
                {msgs.map((m, i) => (
                  <div key={i} className={`flex animate-rise ${m.role === "user" ? "justify-end" : ""}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-signal text-signal-foreground" : "glass"}`}>
                      {m.text}
                      {m.card && (
                        <div className="mt-3 rounded-xl border border-navy-border bg-navy p-3">
                          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-signal"><Sparkles className="h-3 w-3" /> {m.card.title}</p>
                          {m.card.progress !== undefined && (
                            <div className="relative mb-3 h-1.5 rounded-full bg-navy-border">
                              <div className="h-full rounded-full bg-signal" style={{ width: `${m.card.progress}%` }} />
                              <Truck className="absolute -top-2 h-5 w-5 -translate-x-1/2 text-signal" style={{ left: `${m.card.progress}%` }} />
                            </div>
                          )}
                          {m.card.rows.map(([k, v]) => (
                            <div key={k} className="flex justify-between py-0.5 text-xs">
                              <span className="text-navy-muted">{k}</span><span>{v}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="glass inline-flex gap-1 rounded-2xl px-4 py-3">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-signal" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 px-5 pb-3">
                {suggestions.map((s) => (
                  <button key={s} disabled={typing} onClick={() => { window.__lovableEvents?.track?.("project.suggested_question", { surface: "operations_demo", suggestion: String(suggestions.indexOf(s)) }); ask(s); }} className="rounded-full border border-navy-border px-3 py-1.5 text-xs text-navy-muted transition hover:border-signal hover:text-signal">
                    {s}
                  </button>
                ))}
              </div>
              <form onSubmit={(e: FormEvent) => { e.preventDefault(); ask(input); }} className="flex gap-2 border-t border-navy-border p-4">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={200}
                  placeholder="Ask about a load, carrier or invoice…"
                  aria-label="Ask the agent"
                  className="flex-1 rounded-xl bg-navy px-4 py-3 text-sm outline-none ring-signal/40 placeholder:text-navy-muted/70 focus:ring-2"
                />
                <button type="submit" aria-label="Send" className="grid h-11 w-11 place-items-center rounded-xl bg-signal text-signal-foreground transition hover:scale-105">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
            <p className="mt-3 text-center text-xs text-navy-muted">Demo with sample data — your agent would answer from your own systems.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
