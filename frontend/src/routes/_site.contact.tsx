import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { apiPost } from "@/lib/api";

export const Route = createFileRoute("/_site/contact")({
  component: Contact,
  head: () => ({ meta: [{ title: "Contact — SAY Limousine" }, { name: "description", content: "Get in touch with the SAY Limousine concierge team. 24/7 reservations and support." }] }),
});

const schema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().min(7).max(20),
  subject: z.string().trim().min(1).max(120),
  message: z.string().trim().min(5).max(800),
});

function Contact() {
  const [data, setData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      toast.error("Please review the form");
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      await apiPost("/api/contact", r.data);
      toast.success("Message sent — we'll be in touch shortly.");
      setData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inp = "w-full bg-input/60 border border-border focus:border-gold focus:outline-none px-4 py-3 text-sm transition-colors";

  return (
    <>
      <section className="pt-40 pb-12 text-center bg-card/30 border-b border-border">
        <span className="divider-gold">Contact</span>
        <h1 className="mt-5 text-5xl md:text-7xl font-display">Get In <span className="font-script gradient-gold-text">Touch</span></h1>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {[
              { i: Phone, t: "Phone", v: " +1 (713) 408-5577", h: "tel:+17134085577" },
              { i: Mail, t: "Email", v: "booking@saylimousine.com", h: "mailto:booking@saylimousine.com" },
              // { i: MapPin, t: "Headquarters", v: "1240 Madison Ave, New York, NY 10128" },
              { i: Clock, t: "Hours", v: "24 Hours / 7 Days a Week" },
            ].map((c) => (
              <div key={c.t} className="p-6 border border-border bg-card/40 hover-lift">
                <c.i className="size-6 text-gold" strokeWidth={1.2} />
                <h3 className="mt-3 font-display text-lg">{c.t}</h3>
                {c.h ? (
                  <a href={c.h} className="mt-1 block text-muted-foreground hover:text-gold transition-colors">{c.v}</a>
                ) : (
                  <p className="mt-1 text-muted-foreground">{c.v}</p>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="lg:col-span-3 p-8 md:p-10 border border-border bg-card/60 shadow-elegant">
            <h2 className="text-3xl font-display">Send Us A Message</h2>
            <div className="mt-6 grid md:grid-cols-2 gap-5">
              {(["name","email","phone","subject"] as const).map((f) => (
                <div key={f} className={f === "subject" ? "md:col-span-2" : ""}>
                  <label className="block text-[11px] uppercase tracking-[0.22em] text-gold mb-2">{f}</label>
                  <input className={inp} value={data[f]} onChange={(e) => setData({ ...data, [f]: e.target.value })} type={f === "email" ? "email" : f === "phone" ? "tel" : "text"} />
                  {errors[f] && <p className="text-xs text-destructive mt-1">{errors[f]}</p>}
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-[11px] uppercase tracking-[0.22em] text-gold mb-2">Message</label>
                <textarea className={`${inp} min-h-[150px] resize-none`} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} maxLength={800} />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>
            </div>
            <button disabled={isSubmitting} className="mt-8 w-full rounded-lg bg-gold text-primary-foreground py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold-light transition-colors">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
