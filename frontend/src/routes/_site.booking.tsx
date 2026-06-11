import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/site/BookingForm";
import { Clock, Shield, Star } from "lucide-react";

export const Route = createFileRoute("/_site/booking")({
  component: Booking,
  head: () => ({ meta: [{ title: "Book Your Chauffeur — SAY Limousine" }, { name: "description", content: "Reserve your luxury chauffeur with SAY Limousine. Quick, secure booking with 24/7 concierge support." }] }),
});

function Booking() {
  return (
    <>
      <section className="pt-40 pb-12 text-center bg-card/30 border-b border-border">
        <span className="divider-gold">Reservation</span>
        <h1 className="mt-5 text-5xl md:text-7xl font-display">Book Your <span className="font-script gradient-gold-text">Chauffeur</span></h1>
        <p className="mt-5 max-w-2xl mx-auto px-6 text-muted-foreground">Complete the form below — our concierge will confirm within minutes.</p>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
          <aside className="space-y-6">
            {[
              { i: Clock, t: "24/7 Concierge", d: "Day or night, we're a single call away from any adjustment." },
              { i: Shield, t: "Secure Reservation", d: "Your data is encrypted. No charge until your chauffeur confirms." },
              { i: Star, t: "Flat Rate Pricing", d: "All-inclusive quotes with gratuity, tolls and parking built in." },
            ].map((c) => (
              <div key={c.t} className="p-6 border border-border bg-card/40">
                <c.i className="size-7 text-gold" strokeWidth={1.2} />
                <h3 className="mt-4 font-display text-xl">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </div>
            ))}
            <div className="p-6 border border-gold/50 bg-gold/5">
              <h3 className="font-display text-xl text-gold">Prefer to call?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Our concierge team is standing by 24/7.</p>
              <a href="tel:+17134085577" className="mt-4 inline-block text-xl font-display">+1 (713) 408-5577</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
