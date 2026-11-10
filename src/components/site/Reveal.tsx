import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, text, dark }: { eyebrow: string; title: string; text?: string; dark?: boolean }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center">
      <p className={cn("text-xs font-semibold uppercase tracking-[0.2em]", dark ? "text-signal" : "text-primary/60")}>{eyebrow}</p>
      <h2 className={cn("mt-3 text-3xl font-semibold sm:text-5xl", dark ? "text-navy-foreground" : "text-foreground")}>{title}</h2>
      {text && <p className={cn("mt-4 text-lg", dark ? "text-navy-muted" : "text-muted-foreground")}>{text}</p>}
    </Reveal>
  );
}
