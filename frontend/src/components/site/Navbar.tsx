import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/say-limo-logo.jpeg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          to="/"
          className={`flex items-center gap-3 overflow-hidden transition-all duration-500 ${scrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <img
            src={logo}
            alt="SAY Limousine"
            className="h-14 w-15 rounded-full object-cover ring-1 ring-gold/50 transition-transform group-hover:scale-105"
          />

        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-sm uppercase tracking-[0.18em] text-foreground/85 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+15551234567" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-gold transition-colors">
            <Phone className="size-4 text-gold" /> +1 (713) 408-5577
          </a>
          <Link
            to="/booking"
            className="relative overflow-hidden inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-[0.22em] text-primary-foreground bg-gold hover:bg-gold-light transition-colors rounded-lg"
          >
            Book Now
          </Link>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border  bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="text-sm  uppercase tracking-widest text-foreground/85 hover:text-gold py-2">
                {item.label}
              </Link>
            ))}
            <Link to="/booking" onClick={() => setOpen(false)} className="mt-2  inline-flex justify-center bg-gold text-primary-foreground py-3 text-xs uppercase tracking-widest">
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
