import { ArrowUpRight, Check, FileText, MapPin, Package, Truck } from "lucide-react";

const headings = [
  "Dispatch board",
  "Fleet control",
  "Freight bookings",
  "Warehouse inventory",
  "Shipment journey",
  "Finance & operations",
  "Route planner",
  "Customer workspace",
];

function RouteMap({ dispatch = false }: { dispatch?: boolean }) {
  return (
    <div className="relative h-[100px] overflow-hidden bg-secondary">
      <svg viewBox="0 0 240 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g className="text-border" stroke="currentColor" strokeWidth="5" fill="none">
          <path d="M-10 25L250 70M15-10L100 110M150-10L195 110M-10 85L250 15" />
        </g>
        <path
          d="M35 73L85 59L130 67L185 32L210 38"
          className="text-chart-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="5 3"
        />
        <circle cx="35" cy="73" r="5" className="fill-chart-2" />
        <circle cx="210" cy="38" r="5" className="fill-signal" />
      </svg>
      <span className="absolute left-2 top-2 rounded bg-card px-1.5 py-1 text-[9px] font-medium">
        {dispatch ? "3 stops · 42 mi" : "Dallas → Atlanta"}
      </span>
      <span className="absolute left-[53%] top-[49%] grid h-6 w-6 place-items-center rounded bg-primary text-primary-foreground shadow-card motion-safe:group-hover:translate-x-2 transition-transform duration-700">
        <Truck className="h-3.5 w-3.5" />
      </span>
      <span className="absolute bottom-2 right-2 rounded bg-card px-1.5 py-1 text-[9px]">
        {dispatch ? "Optimized route" : "ETA 2:45 PM"}
      </span>
    </div>
  );
}

function Row({ first, second, status }: { first: string; second: string; status: string }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-1 border-b border-border/60 py-2 last:border-0">
      <span className="font-semibold">{first}</span>
      <span className="truncate text-muted-foreground">{second}</span>
      <span className="rounded bg-signal/15 px-1.5 py-0.5 text-foreground">{status}</span>
    </div>
  );
}

export function SolutionPreview({ variant }: { variant: number }) {
  return (
    <div className="h-[220px] overflow-hidden rounded-lg border border-border bg-secondary/40 text-[10px] text-foreground shadow-sm">
      <div className="flex h-8 items-center justify-between border-b border-border bg-primary px-3 text-primary-foreground">
        <span className="font-semibold">{headings[variant]}</span>
        <span className="text-[8px] opacity-70">SAMPLE</span>
      </div>
      <div className="p-2.5">
        {variant === 0 && (
          <>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-muted-foreground">Today's loads</span>
              <span className="font-semibold">24 active</span>
            </div>
            <Row first="#LD-4821" second="DAL → ATL" status="In transit" />
            <Row first="#LD-4822" second="CHI → DEN" status="Assigned" />
            <Row first="#LD-4823" second="HOU → AUS" status="Delivered" />
            <div className="mt-2 flex items-center gap-1 text-muted-foreground">
              <Check className="h-3 w-3 text-chart-2" /> 92% on-time performance
            </div>
          </>
        )}
        {variant === 1 && (
          <>
            <div className="mb-2 flex items-end justify-between">
              <div>
                <span className="text-muted-foreground">Vehicles available</span>
                <p className="text-xl font-semibold">
                  38 <span className="text-[10px] font-normal text-muted-foreground">/ 42</span>
                </p>
              </div>
              <Truck className="h-7 w-7 text-chart-2" />
            </div>
            <div className="mb-2 flex h-1.5 overflow-hidden rounded bg-border">
              <span className="w-[90%] bg-chart-2" />
              <span className="w-[10%] bg-signal" />
            </div>
            <Row first="TRK-108" second="J. Martinez" status="On route" />
            <Row first="TRK-112" second="Service due" status="Tomorrow" />
          </>
        )}
        {variant === 2 && (
          <>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold">Booking #FR-2048</span>
              <Package className="h-4 w-4 text-chart-2" />
            </div>
            <div className="flex items-center justify-between border-y border-border py-2">
              <span>Los Angeles</span>
              <ArrowUpRight className="h-3 w-3 text-chart-2" />
              <span>New York</span>
            </div>
            <Row first="Dry van" second="18 pallets" status="Confirmed" />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-muted-foreground">Quote total</span>
              <span className="text-base font-semibold">$2,840</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-muted-foreground">
              <FileText className="h-3 w-3" /> BOL ready · Carrier assigned
            </div>
          </>
        )}
        {variant === 3 && (
          <>
            <div className="mb-2 flex justify-between">
              <span className="font-semibold">Storage utilization</span>
              <span>84%</span>
            </div>
            <div className="grid grid-cols-10 gap-1" aria-hidden="true">
              {Array.from({ length: 30 }, (_, i) => (
                <span
                  key={i}
                  className={`h-3 rounded-sm ${i < 25 ? (i % 4 === 0 ? "bg-chart-2/60" : "bg-signal/70") : "bg-border"}`}
                />
              ))}
            </div>
            <Row first="Zone A" second="1,240 units" status="Receiving" />
            <Row first="Zone B" second="860 units" status="Picking" />
            <div className="mt-1 text-muted-foreground">32 orders ready for dispatch</div>
          </>
        )}
        {variant === 4 && (
          <>
            <RouteMap />
            <div className="mt-2 flex items-center justify-between">
              <span className="font-semibold">#SHP-20931</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" /> In transit
              </span>
            </div>
            <div className="mt-1 text-muted-foreground">Last checkpoint: Shreveport, LA</div>
          </>
        )}
        {variant === 5 && (
          <>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-muted-foreground">Monthly revenue</span>
                <p className="text-xl font-semibold">$128,450</p>
              </div>
              <span className="text-chart-2">↗ 12.8%</span>
            </div>
            <div className="mt-2 flex h-10 items-end gap-1" aria-hidden="true">
              {["h-3", "h-5", "h-4", "h-7", "h-6", "h-8", "h-10"].map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-t-sm ${h} ${i === 6 ? "bg-chart-2" : "bg-primary/65"}`}
                />
              ))}
            </div>
            <Row first="Invoices" second="18 paid" status="6 pending" />
          </>
        )}
        {variant === 6 && (
          <>
            <RouteMap dispatch />
            <div className="mt-2 flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-chart-2" />
              <span className="font-semibold">Driver: Alex M.</span>
              <span className="ml-auto text-muted-foreground">TRK-108</span>
            </div>
            <div className="mt-1 text-muted-foreground">Pickup → Warehouse → Delivery</div>
          </>
        )}
        {variant === 7 && (
          <>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold">Welcome, Acme Freight</span>
              <span className="grid h-5 w-5 place-items-center rounded-full bg-chart-2/15 text-[8px]">
                AF
              </span>
            </div>
            <Row first="My shipments" second="4 active" status="Track" />
            <Row first="Documents" second="BOL & POD" status="12 files" />
            <Row first="Invoices" second="$4,280" status="2 open" />
            <div className="mt-2 flex items-center gap-1 text-muted-foreground">
              <Check className="h-3 w-3 text-chart-2" /> Latest delivery confirmed
            </div>
          </>
        )}
      </div>
    </div>
  );
}
