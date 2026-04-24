import { useState } from "react";
import { Menu, X, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Hébergement", href: "#hebergement" },
  { label: "Expériences", href: "#experiences" },
  { label: "Constantine", href: "#constantine" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"FR" | "EN" | "AR">("FR");

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border-soft">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Live Médina" className="h-12 w-auto" width={200} height={120} />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-serif text-base text-ink hover:text-brown transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-brown after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            {/* Lang */}
            <div className="hidden sm:flex items-center gap-1 border border-border-soft px-2 py-1.5 text-xs font-display tracking-widest">
              <Globe className="w-3.5 h-3.5 text-brown mr-1" />
              {(["FR", "EN", "AR"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-1.5 transition-colors ${
                    lang === l ? "text-brown-dark font-semibold" : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <Button variant="cirtaGhost" size="sm" className="hidden sm:inline-flex">
              <User className="w-4 h-4 mr-1" /> Connexion
            </Button>
            <Button variant="cirta" size="sm" className="hidden sm:inline-flex">
              S'inscrire
            </Button>

            <button
              className="lg:hidden p-2 text-ink"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden pb-6 border-t border-border-soft pt-4 space-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-serif text-lg text-ink py-1"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="cirtaOutline" size="sm" className="flex-1">Connexion</Button>
              <Button variant="cirta" size="sm" className="flex-1">S'inscrire</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
