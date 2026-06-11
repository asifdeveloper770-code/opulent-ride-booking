import { createFileRoute } from "@tanstack/react-router";
import { Award, Shield, Crown, Users } from "lucide-react";
import interior from "@/assets/about-interior.jpg";
import hero from "@/assets/hero-limo.jpg";

export const Route = createFileRoute("/_site/about")({
  component: About,
  head: () => ({ meta: [{ title: "About — SAY Limousine" }, { name: "description", content: "Fifteen years of redefining luxury ground transportation with SAY Limousine." }] }),
});

function About() {
  return (
    <>
      <section className="relative pt-40 pb-20 text-center bg-card/30 border-b border-border">
        <span className="divider-gold">Our Story</span>
        <h1 className="mt-5 text-5xl md:text-7xl font-display">A Legacy of <span className="font-script gradient-gold-text">Elegance</span></h1>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <img src={interior} alt="Luxury interior" loading="lazy" className="w-full rounded-lg aspect-[4/5] object-cover border border-border" />
          <div>
            <h2 className="text-4xl md:text-5xl font-display leading-tight">Where Every Ride <span className="font-script gradient-gold-text">Tells A Story</span></h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Founded on a simple belief — that luxury is in the details — SAY Limousine has spent over fifteen years perfecting the art of chauffeured travel. From the perfectly chilled bottle of water awaiting you in the cabin, to the polished door handle held open with a warm smile, every moment of your journey is choreographed.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our fleet is curated. Our chauffeurs are tenured professionals. Our dispatchers are awake when you need them most. The result is a transportation experience that doesn't just move you — it elevates you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-4 gap-8 text-center">
          {[
            { i: Crown, n: "15+", l: "Years of Service" },
            { i: Users, n: "50,000+", l: "Satisfied Clients" },
            { i: Award, n: "12", l: "Industry Awards" },
            { i: Shield, n: "100%", l: "Insured Fleet" },
          ].map((s) => (
            <div key={s.l}>
              <s.i className="size-10 text-gold mx-auto" strokeWidth={1.2} />
              <div className="mt-4 text-4xl md:text-5xl font-display gradient-gold-text">{s.n}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-3 gap-8">
          {[
            { t: "Mission", d: "To deliver flawless luxury transportation defined by trust, taste and timeliness." },
            { t: "Vision", d: "To be the chauffeur service that the most discerning travelers recommend without hesitation." },
            { t: "Values", d: "Discretion. Excellence. Hospitality. Safety. Punctuality — without compromise." },
          ].map((v) => (
            <div key={v.t} className="p-8 border border-border bg-card/40 hover-lift">
              <h3 className="text-2xl font-display text-gold">{v.t}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-32">
        <img src={hero} alt="" className="absolute  inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <span className="divider-gold">The Promise</span>
          <p className="mt-6 text-2xl md:text-3xl font-display italic leading-snug">
            "Excellence is not an act — it is a habit. Every door we open is an opportunity to exceed your expectations."
          </p>
          <p className="mt-6 font-script text-gold text-2xl">— The Say Limousine Team</p>
        </div>
      </section>
    </>
  );
}
