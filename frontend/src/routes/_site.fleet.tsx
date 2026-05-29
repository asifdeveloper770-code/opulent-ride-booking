import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Briefcase, Wine, ArrowRight } from "lucide-react";
import sedan from "@/assets/fleet-sedan.jpg";
import suv from "@/assets/fleet-suv.jpg";
import stretch from "@/assets/fleet-stretch.jpg";
import sprinter from "@/assets/fleet-sprinter.jpg";

export const Route = createFileRoute("/_site/fleet")({
  component: Fleet,
  head: () => ({ meta: [{ title: "Our Fleet — SAY Limousine" }, { name: "description", content: "Browse the SAY Limousine luxury fleet: sedans, executive SUVs, stretch limos and premium sprinters." }] }),
});

const fleet = [
  { img: sedan, name: "Luxury Sedan", model: "Mercedes-Benz S-Class", pax: 3, lug: 3, desc: "The pinnacle of executive comfort. Whisper-quiet, beautifully appointed, and effortlessly powerful." },
  { img: suv, name: "Executive SUV", model: "Cadillac Escalade", pax: 6, lug: 6, desc: "Commanding presence with first-class space. Perfect for VIPs, families and executives on the move." },
  { img: stretch, name: "Stretch Limousine", model: "Chrysler 300 Stretch", pax: 10, lug: 4, desc: "Iconic glamour with bar, mood lighting and premium audio. The unforgettable arrival." },
  { img: sprinter, name: "Luxury Sprinter", model: "Mercedes-Benz Sprinter", pax: 14, lug: 14, desc: "Boardroom-on-wheels with reclining captain's chairs and conference seating for groups and roadshows." },
];

function Fleet() {
  return (
    <>
      <section className="pt-40 pb-16 text-center bg-card/30 border-b border-border">
        <span className="divider-gold">The Fleet</span>
        <h1 className="mt-5 text-5xl md:text-7xl font-display">A Garage of <span className="font-script gradient-gold-text">Distinction</span></h1>
        <p className="mt-5 max-w-2xl mx-auto px-6 text-muted-foreground">Every vehicle in our fleet is hand-selected, professionally detailed daily, and equipped to exceed your every expectation.</p>
      </section>

      <section className="py-20 space-y-20">
        {fleet.map((v, i) => (
          <div key={v.name} className="mx-auto max-w-7xl px-6">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 ? "lg:[&>:first-child]:order-2" : ""}`}>
              <div className="group overflow-hidden border border-border">
                <img src={v.img} alt={v.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div>
                <span className="divider-gold">Vehicle {String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 text-4xl md:text-5xl font-display">{v.name}</h2>
                <p className="text-gold mt-1 tracking-widest text-sm uppercase">{v.model}</p>
                <p className="mt-6 text-muted-foreground leading-relaxed">{v.desc}</p>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { i: Users, l: "Passengers", v: v.pax },
                    { i: Briefcase, l: "Luggage", v: v.lug },
                    { i: Wine, l: "Bar Service", v: "Yes" },
                  ].map((s) => (
                    <div key={s.l} className="p-4 border border-border bg-card/40">
                      <s.i className="size-5 text-gold" />
                      <div className="mt-2 font-display text-xl">{s.v}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
                    </div>
                  ))}
                </div>
                <Link to="/booking" className="mt-8 inline-flex items-center gap-3 bg-gold text-primary-foreground px-7 py-3.5 text-xs uppercase tracking-[0.3em] hover:bg-gold-light transition-colors">
                  Reserve This Vehicle <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
