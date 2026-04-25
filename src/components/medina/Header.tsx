import { useState } from "react";
import { Menu, X, Globe, User } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const links = [
  { label: "Accueil", to: "/" },
  { label: "Hébergement", to: "/hebergement" },
  { label: "Expériences", to: "/experiences" },
  { label: "Bibliothèque", to: "/bibliotheque" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"FR" | "EN" | "AR">("FR");
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border-soft">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Live Médina" className="h-12 w-auto" width={200} height={120} />
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `font-serif text-base transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:transition-all hover:after:w-full ${
                    isActive
                      ? "text-brown after:w-full after:bg-brown"
                      : "text-ink hover:text-brown after:w-0 after:bg-brown"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
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
            <Button
              variant="cirta"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => navigate("/hebergement")}
            >
              Réserver
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

        {open && (
          <div className="lg:hidden pb-6 border-t border-border-soft pt-4 space-y-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block font-serif text-lg text-ink py-1"
              >
                {l.label}
              </Link>
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
