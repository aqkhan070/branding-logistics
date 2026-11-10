import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

const services = [
  "Transportation Management (TMS)",
  "Fleet Management",
  "Freight Management",
  "Warehouse Management (WMS)",
  "Shipment Tracking & Delivery",
  "Custom Logistics ERP",
  "Integrations & Automation",
  "Modernize an existing system",
  "Something else",
];

type Errors = Partial<Record<"name" | "email" | "company" | "service" | "message", string>>;

const field =
  "w-full rounded-xl border border-navy-border bg-navy-2 px-4 py-3 text-sm text-navy-foreground placeholder:text-navy-muted/70 outline-none transition focus:border-signal focus:ring-2 focus:ring-signal/30";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const next: Errors = {};
    if (v("name").length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) next.email = "Please enter a valid email.";
    if (v("company").length < 2) next.company = "Please enter your company.";
    if (!v("service")) next.service = "Please choose a service.";
    if (v("message").length < 20) next.message = "Tell us a little more (at least 20 characters).";
    else if (v("message").length > 2000) next.message = "Please keep it under 2000 characters.";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    }, 700);
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-center rounded-2xl border border-navy-border bg-navy-2 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-signal" />
        <h3 className="mt-4 text-xl font-semibold text-navy-foreground">Thanks — we've got your project details.</h3>
        <p className="mt-2 text-sm text-navy-muted">Our team will get back to you within one business day.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-signal hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  const Err = ({ k }: { k: keyof Errors }) =>
    errors[k] ? <p className="mt-1.5 text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-navy-muted">Name</label>
        <input id="name" name="name" maxLength={100} className={field} placeholder="Jane Cooper" />
        <Err k="name" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-navy-muted">Work email</label>
        <input id="email" name="email" type="email" maxLength={255} className={field} placeholder="jane@company.com" />
        <Err k="email" />
      </div>
      <div>
        <label htmlFor="company" className="mb-1.5 block text-xs font-medium text-navy-muted">Company</label>
        <input id="company" name="company" maxLength={120} className={field} placeholder="Company name" />
        <Err k="company" />
      </div>
      <div>
        <label htmlFor="service" className="mb-1.5 block text-xs font-medium text-navy-muted">Service required</label>
        <select id="service" name="service" defaultValue="" className={field}>
          <option value="" disabled>Select a service</option>
          {services.map((s) => <option key={s}>{s}</option>)}
        </select>
        <Err k="service" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-navy-muted">Project description</label>
        <textarea id="message" name="message" rows={5} maxLength={2000} className={field} placeholder="What are you looking to build or improve?" />
        <Err k="message" />
      </div>
      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 text-sm text-destructive sm:col-span-2">
          <AlertCircle className="h-4 w-4" /> Please fix the highlighted fields.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-signal-foreground shadow-glow transition hover:-translate-y-0.5 disabled:opacity-60 sm:col-span-2 sm:justify-self-start"
      >
        {status === "sending" ? "Sending…" : "Start Your Project"} <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
