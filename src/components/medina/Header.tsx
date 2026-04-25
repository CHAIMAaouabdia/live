import { useState } from "react";
import { Menu, X, Globe, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useI18n, Lang } from "@/contexts/I18nContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const links = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.stay"), to: "/hebergement" },
    { label: t("nav.experiences"), to: "/experiences" },
    { label: t("nav.library"), to: "/bibliotheque" },
  ];

  const handleSignOut = () => {
    signOut();
    toast({ title: t("auth.signedOut") });
    navigate("/");
  };

  const initials = user
    ? user.name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border-soft">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img src={logo} alt="Live Médina" className="h-11 w-auto" width={200} height={120} />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-xl md:text-2xl font-bold tracking-[0.18em] text-brown-dark uppercase">
                Live <span className="text-brown">Médina</span>
              </span>
              <span className="font-serif italic text-[10px] tracking-[0.3em] uppercase text-brown/70 mt-1">
                Cirta · Constantine
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `font-serif text-base transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:transition-all hover:after:w-full ${
                    isActive
                      ? "text-brown-dark font-semibold after:w-full after:bg-brown"
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
              {(["FR", "EN", "AR"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-1.5 transition-colors ${
                    lang === l
                      ? "text-brown-dark font-bold underline underline-offset-4"
                      : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hidden sm:flex items-center gap-2 border border-border-soft pl-2 pr-3 py-1.5 hover:bg-secondary transition-colors">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-brown to-brown-dark text-sand-50 flex items-center justify-center font-display text-[11px] tracking-wider">
                      {initials}
                    </span>
                    <span className="font-serif text-sm text-ink max-w-[110px] truncate">{user.name.split(" ")[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-brown" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 p-2 bg-card border border-border">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-serif text-ink hover:bg-secondary"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brown" /> {t("nav.dashboard")}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-serif text-ink hover:bg-secondary text-start"
                  >
                    <LogOut className="w-4 h-4 text-brown" /> {t("nav.signout")}
                  </button>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <Button
                  variant="cirtaGhost"
                  size="sm"
                  className="hidden sm:inline-flex"
                  onClick={() => navigate("/auth")}
                >
                  <User className="w-4 h-4 mr-1" /> {t("nav.login")}
                </Button>
                <Button
                  variant="cirta"
                  size="sm"
                  className="hidden sm:inline-flex"
                  onClick={() => navigate("/auth/signup")}
                >
                  {t("nav.signup")}
                </Button>
              </>
            )}

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
            <div className="flex items-center gap-1 border border-border-soft px-2 py-1.5 text-xs font-display tracking-widest w-fit">
              <Globe className="w-3.5 h-3.5 text-brown mr-1" />
              {(["FR", "EN", "AR"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-1.5 ${
                    lang === l ? "text-brown-dark font-bold underline underline-offset-4" : "text-muted-foreground"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            {user ? (
              <div className="flex gap-2 pt-2">
                <Button variant="cirtaOutline" size="sm" className="flex-1" asChild>
                  <Link to="/dashboard" onClick={() => setOpen(false)}>
                    <LayoutDashboard className="w-4 h-4 mr-1" /> {t("nav.dashboard")}
                  </Link>
                </Button>
                <Button variant="cirta" size="sm" className="flex-1" onClick={() => { handleSignOut(); setOpen(false); }}>
                  <LogOut className="w-4 h-4 mr-1" /> {t("nav.signout")}
                </Button>
              </div>
            ) : (
              <div className="flex gap-2 pt-2">
                <Button variant="cirtaOutline" size="sm" className="flex-1" asChild>
                  <Link to="/auth" onClick={() => setOpen(false)}>{t("nav.login")}</Link>
                </Button>
                <Button variant="cirta" size="sm" className="flex-1" asChild>
                  <Link to="/auth/signup" onClick={() => setOpen(false)}>{t("nav.signup")}</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
