import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook, Instagram, Music2, Twitter } from "lucide-react";
import logo from "@/assets/say-limo-logo.jpeg";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="SAY Limousine" className="h-12 w-12 rounded-full object-cover ring-1 ring-gold/50" />
            <div>
              <div className="font-display text-xl tracking-widest">SAY</div>
              <div className="font-script text-gold -mt-1">Limousine</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            Premier luxury chauffeur and limousine services. Discretion, punctuality, and elegance — delivered every ride.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              {
                icon: Facebook,
                link: "https://www.facebook.com/share/196EdvpjYX/?mibextid=wwXIfr",
              },
              {
                icon: Instagram,
                link: "https://www.instagram.com/saylimousine?igsh=MWZqd3BvbTYzd3Rncw%3D%3D&utm_source=qr",
              },
              {
                icon: Twitter,
                link: "https://x.com/saylimousine?s=11",
              },
              {
                icon: Music2,
                link: "https://www.tiktok.com/@saylimousine?_r=1&_t=ZS-96uHrkybrm5",
              },
            ].map(({ icon: Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="size-9 grid place-items-center border border-border hover:border-gold hover:text-gold transition-colors"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-gold mb-5">Navigate</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              { to: "/", label: "Home" },
              { to: "/fleet", label: "Our Fleet" },
              { to: "/services", label: "Services" },
              { to: "/about", label: "About Us" },
              { to: "/booking", label: "Book a Ride" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-gold transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-gold mb-5">Services</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {["Airport Transfers", "Corporate Travel", "Weddings", "Proms & Events", "Night Out", "Hourly Charter"].map(s => (
              <li key={s} className="hover:text-gold transition-colors cursor-default">{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.25em] text-gold mb-5">Contact</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3"><Phone className="size-4 text-gold mt-0.5" /> +1 (555) 123-4567</li>
            <li className="flex gap-3"><Mail className="size-4 text-gold mt-0.5" /> bookings@saylimousine.com</li>
            {/* <li className="flex gap-3"><MapPin className="size-4 text-gold mt-0.5" /> 1240 Madison Ave, New York, NY</li> */}
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground tracking-wider">
        © {new Date().getFullYear()} SAY Limousine. All rights reserved. Crafted with elegance.
      </div>
    </footer>
  );
}
