import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Briefcase, Heart, Crown, Sparkles, GraduationCap, Wine, Building2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_site/services")({
  component: Services,
  head: () => ({ meta: [{ title: "Services — SAY Limousine" }, { name: "description", content: "Airport transfers, corporate travel, weddings, proms and VIP hourly charters with SAY Limousine." }] }),
});

const services = [
  { icon: Plane, title: "Airport Transfers", desc: "Live flight monitoring, meet-and-greet inside the terminal, and luggage assistance. Stress-free travel from curb to cabin." },
  { icon: Briefcase, title: "Corporate & Executive", desc: "Discreet, punctual, and Wi-Fi-equipped vehicles for board meetings, roadshows and client entertainment." },
  { icon: Heart, title: "Weddings", desc: "Bridal cars, bridal-party shuttles, and farewell rides — coordinated to the minute for your perfect day." },
  { icon: GraduationCap, title: "Proms & Graduations", desc: "Parent-approved, fully insured, chaperone-friendly luxury transport for memorable milestones." },
  { icon: Sparkles, title: "Special Events & Galas", desc: "Concerts, premieres, anniversaries — arrive at the red carpet ready to be photographed." },
  { icon: Crown, title: "VIP Hourly Charter", desc: "Your personal chauffeur, on standby. Multiple stops, full discretion, billed by the hour." },
  { icon: Wine, title: "Night Out", desc: "Enjoy the evening — we'll handle the navigation, parking and the safe ride home." },
  { icon: Building2, title: "Conventions & Roadshows", desc: "Group logistics with Sprinters and sedans, dispatch coordinated for large delegations." },
];

function Services() {
  return (
    <>
      <section className="pt-40 pb-16 text-center bg-card/30 border-b border-border">
        <span className="divider-gold">Our Services</span>
        <h1 className="mt-5 text-5xl md:text-7xl font-display">Crafted For Every <span className="font-script gradient-gold-text">Occasion</span></h1>
        <p className="mt-5 max-w-2xl mx-auto px-6 text-muted-foreground">A complete portfolio of chauffeured services, tailored to the moment.</p>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group relative p-8 border border-border bg-card/40 hover-lift overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <s.icon className="size-10 text-gold relative" strokeWidth={1.2} />
              <h3 className="mt-6 text-xl font-display relative">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed relative">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link to="/booking" className="inline-flex items-center gap-3 bg-gold text-primary-foreground px-10 py-4 text-xs uppercase tracking-[0.3em] hover:bg-gold-light transition-colors">
            Book Your Service <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
