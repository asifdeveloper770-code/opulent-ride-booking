import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Award, Clock, Crown, Plane, Briefcase, Heart, Sparkles, GraduationCap, Star, Quote } from "lucide-react";
import heroImg from "@/assets/hero-limo.jpg";
import heroVideo from "@/assets/hero-video2.mp4";
import sedan from "@/assets/fleet-sedan.jpg";
import suv from "@/assets/fleet-suv.jpg";
import stretch from "@/assets/fleet-stretch.jpg";
import sprinter from "@/assets/fleet-sprinter.jpg";
import interior from "@/assets/about-interior.jpg";
import { BookingForm } from "@/components/site/BookingForm";
import { SectionTitle } from "@/components/site/SectionTitle";
import logo from "@/assets/say-limo-logo.jpeg";

export const Route = createFileRoute("/_site/")({
  component: Home,
});

const services = [
  { icon: Plane, title: "Airport Transfers", desc: "Punctual, monitored flights, meet-and-greet service with a professional chauffeur." },
  { icon: Briefcase, title: "Corporate Travel", desc: "Executive transport, roadshows and discreet point-to-point service for business." },
  { icon: Heart, title: "Weddings", desc: "Make your day flawless with our impeccably appointed wedding chauffeur packages." },
  { icon: GraduationCap, title: "Proms & Graduations", desc: "Safe, glamorous and unforgettable transportation for life's biggest milestones." },
  { icon: Sparkles, title: "Night Out & Events", desc: "Concerts, galas, fine dining — arrive in style and leave the driving to us." },
  { icon: Crown, title: "VIP Hourly Charter", desc: "Personal chauffeur at your disposal — by the hour, by the day, by your schedule." },
];

const fleet = [
  { img: suv, name: "Executive SUV", pax: "1–6 Passengers", model: "GMC Yukon XL" },
  // { img: sedan, name: "Luxury Sedan", pax: "1–3 Passengers", model: "Mercedes-Benz S-Class" },
  { img: stretch, name: "Stretch Limousine", pax: "1–10 Passengers", model: "Chrysler 300 Stretch" },
  { img: sprinter, name: "Luxury Sprinter", pax: "1–14 Passengers", model: "Mercedes Sprinter" },
];

const testimonials = [
  { name: "Olivia M.", role: "Wedding Client", text: "From first call to final farewell, SAY Limousine delivered perfection. The chauffeur was a true gentleman and the car was breathtaking." },
  { name: "Daniel R.", role: "Corporate Executive", text: "I rely on SAY for every executive transfer. Always on time, always discreet, always immaculate. The standard others should aspire to." },
  { name: "Sophia L.", role: "Anniversary", text: "The interior felt like a private lounge. Champagne ready, music perfect — they made our anniversary unforgettable." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <video
            autoPlay muted loop playsInline
            // poster="heroImg"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = "none"; }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <img src={heroImg} alt="Luxury Cadillac limousine" className="absolute inset-0 w-full h-full object-cover kenburns -z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 w-full">
          <div className="grid lg:grid-cols-12 gap-12 ">
            <div className="lg:col-span-7 fade-up">
              <div className="flex items-center gap-4 mb-6 justify-center ">
                <img
                  src={logo}
                  alt="SAY Limousine"
                  className="h-40 w-40 rounded-full object-cover border border-gold/40 shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                />
                <div>
                </div>
              </div>
              <span className="divider-gold">Premier Luxury Transportation</span>
              <h1 className="mt-6 text-5xl md:text-7xl lg:text-8xl font-display leading-[0.95]">
                Arrive Like
                <br />
                <span className="font-script gradient-gold-text text-6xl md:text-8xl lg:text-9xl">Royalty</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-foreground/80 leading-relaxed">
                SAY Limousine offers an unrivaled chauffeur experience — impeccable vehicles, world-class drivers, and the discretion you expect from a true luxury service.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/booking" className="group inline-flex items-center gap-3 bg-gold rounded-lg text-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold-light transition-colors">
                  Reserve Now <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/fleet" className="group inline-flex items-center rounded-lg gap-3 border border-gold/60 text-foreground px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold/10 hover:border-gold transition-all">
                  View Our Fleet
                </Link>
              </div>

              <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg">
                {[
                  { n: "15+", l: "Years Of Excellence" },
                  { n: "50k+", l: "Happy Clients" },
                  { n: "24/7", l: "Concierge" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-3xl md:text-4xl font-display gradient-gold-text">{s.n}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <BookingForm compact />
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[10px] uppercase tracking-[0.4em] text-gold/80 animate-pulse">
          Scroll to Explore
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-10">
          {[
            { icon: Crown, title: "Uncompromising Luxury", desc: "Late-model premium vehicles maintained to showroom perfection." },
            { icon: Shield, title: "Licensed & Insured", desc: "Fully insured fleet, background-checked chauffeurs, full DOT compliance." },
            { icon: Clock, title: "Always On Time", desc: "Real-time flight tracking and live dispatch ensure flawless punctuality." },
          ].map((f) => (
            <div key={f.title} className="group p-8 border border-border hover-lift bg-background/40">
              <f.icon className="size-10 text-gold" strokeWidth={1.2} />
              <h3 className="mt-6 text-2xl font-display">{f.title}</h3>
              <p className="mt-3 text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Our Services" title={<>Crafted For Every <span className="font-script gradient-gold-text">Occasion</span></>} subtitle="From boardroom to ballroom — we provide the perfect ride for every chapter of your journey." center />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="group relative p-8 border border-border bg-card/40 overflow-hidden hover-lift">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-gold/5 to-transparent" />
                <s.icon className="size-9 text-gold relative" strokeWidth={1.2} />
                <h3 className="mt-5 text-xl font-display relative">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed relative">{s.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold relative">
                  Learn More <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="py-28 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionTitle eyebrow="The Fleet" title={<>A Garage of <span className="font-script gradient-gold-text">Distinction</span></>} subtitle="Hand-selected, meticulously maintained, exquisitely appointed. Choose your style." />
            <Link to="/fleet" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold hover:gap-3 transition-all">
              View All Vehicles <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleet.map((v) => (
              <div key={v.name} className="group relative overflow-hidden border border-border bg-background">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={v.img} alt={v.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-gold">{v.pax}</div>
                  <h3 className="mt-2 text-xl font-display">{v.name}</h3>
                  <p className="text-sm text-muted-foreground">{v.model}</p>
                  <Link to="/booking" className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    Reserve <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={interior} alt="Luxury interior" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block p-8 bg-card border border-gold/40 shadow-gold">
              <Award className="size-10 text-gold mx-auto" strokeWidth={1.2} />
              <div className="mt-3 font-display text-2xl text-center">Award Winning</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground text-center">Luxury Service 2024</div>
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="About SAY Limousine" title={<>A Legacy of <span className="font-script gradient-gold-text">Refined Service</span></>} subtitle="For over fifteen years, SAY Limousine has redefined luxury ground transportation. Every detail — from the polish of our chrome to the warmth of our chauffeurs' welcome — is engineered to make you feel like the most important passenger of the day." />
            <ul className="mt-8 space-y-4">
              {[
                "Professional chauffeurs with 10+ years of experience",
                "Premium fleet maintained to showroom standards",
                "Discreet, white-glove service for VIP clientele",
                "Flat-rate pricing with no hidden fees",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-foreground/85">
                  <Star className="size-5 text-gold mt-0.5 fill-gold/40" /> {t}
                </li>
              ))}
            </ul>
            <Link to="/about" className="mt-10 inline-flex items-center rounded-lg gap-3 border border-gold/60 px-8 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold/10 transition-all">
              Our Story <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 bg-card/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Client Voices" title={<>What Our <span className="font-script gradient-gold-text">Patrons</span> Say</>} center />
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="relative p-8 border border-border bg-background/50 hover-lift">
                <Quote className="size-10 text-gold/40" />
                <p className="mt-4 text-foreground/85 leading-relaxed italic">"{t.text}"</p>
                <div className="mt-6 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-gold text-gold" />)}
                </div>
                <div className="mt-4">
                  <div className="font-display text-lg">{t.name}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <span className="divider-gold">Ready When You Are</span>
          <h2 className="mt-6 text-5xl md:text-6xl font-display">Your Chauffeur <span className="font-script gradient-gold-text">Awaits</span></h2>
          <p className="mt-6 text-muted-foreground">Reserve in under 60 seconds. Concierge available 24/7 by phone.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="bg-gold text-primary-foreground px-10 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold-light transition-colors rounded-lg">Book Online</Link>
            <a href="tel:+17134085577" className="border border-gold/60 px-10 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold/10 transition-all rounded-lg">Call +1 (713) 408-5577</a>
          </div>
        </div>
      </section>
    </>
  );
}
