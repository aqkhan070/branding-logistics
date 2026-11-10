import { Package, Truck, TrendingUp, MapPin } from "lucide-react";

const stats = [
  { label: "Total Shipments", value: "12,480", delta: "+8.2%", icon: Package },
  { label: "Active Deliveries", value: "342", delta: "+3.1%", icon: Truck },
  { label: "On-time Rate", value: "96.4%", delta: "+1.4%", icon: TrendingUp },
];

const orders = [
  { id: "SHP-20931", route: "Dallas → Atlanta", status: "In transit" },
  { id: "SHP-20928", route: "Chicago → Denver", status: "Delivered" },
  { id: "SHP-20925", route: "Toronto → Detroit", status: "Pickup" },
];

const bars = [40, 62, 48, 75, 58, 88, 70, 94, 66, 80, 72, 98];

export function Dashboard() {
  return (
    <div className="relative rounded-3xl border border-navy-border bg-navy p-4 text-navy-foreground shadow-float sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-navy-muted/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-navy-muted/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-navy-muted/40" />
        </div>
        <span className="text-xs text-navy-muted">Operations overview · Sample data</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-navy-2 p-3">
            <s.icon className="h-4 w-4 text-signal" />
            <p className="mt-2 text-[11px] text-navy-muted">{s.label}</p>
            <p className="font-display text-lg font-semibold">{s.value}</p>
            <p className="text-[10px] text-signal">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-5 gap-3">
        <div className="relative col-span-3 h-40 overflow-hidden rounded-xl bg-navy-2">
          <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full">
            <g stroke="currentColor" className="text-navy-border" strokeWidth="1">
              {Array.from({ length: 10 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 32} y1="0" x2={i * 32} y2="160" />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 32} x2="300" y2={i * 32} />
              ))}
            </g>
            <path d="M30 120 C 90 40, 160 140, 270 40" fill="none" stroke="currentColor" className="animate-dash text-signal" strokeWidth="2.5" />
            <path d="M40 40 C 110 90, 180 30, 250 120" fill="none" stroke="currentColor" className="animate-dash text-chart-2" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
          <span className="absolute left-[9%] top-[72%] h-3 w-3 rounded-full bg-signal">
            <span className="absolute inset-0 rounded-full bg-signal animate-pulse-dot" />
          </span>
          <span className="absolute right-[9%] top-[22%] flex items-center gap-1 rounded-md bg-navy px-2 py-1 text-[10px]">
            <MapPin className="h-3 w-3 text-signal" /> ETA 2h 14m
          </span>
          <span className="absolute bottom-2 left-3 text-[11px] text-navy-muted">Shipment tracking</span>
        </div>
        <div className="col-span-2 rounded-xl bg-navy-2 p-3">
          <p className="text-[11px] text-navy-muted">Revenue overview</p>
          <div className="mt-3 flex h-24 items-end gap-1">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-signal/80" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="mt-2 font-display text-sm font-semibold">$1.28M</p>
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-navy-2 p-3">
        <p className="mb-2 text-[11px] text-navy-muted">Recent orders</p>
        <ul className="space-y-1.5">
          {orders.map((o) => (
            <li key={o.id} className="flex items-center justify-between text-xs">
              <span className="font-medium">{o.id}</span>
              <span className="text-navy-muted">{o.route}</span>
              <span className="rounded-full bg-signal/15 px-2 py-0.5 text-[10px] text-signal">{o.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MiniPreview({ variant = 0 }: { variant?: number }) {
  const rows = [70, 45, 85, 55];
  return (
    <div className="rounded-xl border border-border bg-secondary p-3">
      <div className="mb-2 flex gap-1">
        <span className="h-1.5 w-8 rounded-full bg-foreground/15" />
        <span className="h-1.5 w-4 rounded-full bg-accent" />
      </div>
      {variant % 2 === 0 ? (
        <div className="space-y-1.5">
          {rows.map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="h-1.5 rounded-full bg-foreground/15" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-10 items-end gap-1">
          {[30, 60, 45, 80, 55, 90, 70].map((h, i) => (
            <span key={i} className="flex-1 rounded-sm bg-primary/70" style={{ height: `${h}%` }} />
          ))}
        </div>
      )}
    </div>
  );
}
