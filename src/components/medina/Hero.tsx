import { useState } from "react";
import { Search, MapPin, Calendar, Users, Wallet, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as DateCalendar } from "@/components/ui/calendar";
import { useI18n } from "@/contexts/I18nContext";
import hero from "@/assets/hero-constantine.jpg";

const formatDate = (d?: Date, locale = "fr-FR") =>
  d ? d.toLocaleDateString(locale, { day: "numeric", month: "short" }) : "—";

export const Hero = () => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();

  const [where, setWhere] = useState("Constantine");
  const [from, setFrom] = useState<Date | undefined>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  });
  const [to, setTo] = useState<Date | undefined>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 13);
    return d;
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState(25000);

  const locale = lang === "EN" ? "en-US" : lang === "AR" ? "ar-DZ" : "fr-FR";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (where) params.set("q", where);
    if (from) params.set("from", from.toISOString().slice(0, 10));
    if (to) params.set("to", to.toISOString().slice(0, 10));
    params.set("guests", String(adults + children));
    params.set("max", String(budget));
    navigate(`/hebergement?${params.toString()}`);
  };

  const guestsLabel = `${adults} ${adults > 1 ? t("search.guests.adults") : t("search.guests.adult")}${
    children > 0 ? ` · ${children}` : ""
  }`;

  return (
    <section id="accueil" className="relative min-h-[88vh] flex flex-col">
      <div className="absolute inset-0">
        <img
          src={hero}
          alt="Pont Sidi M'Cid surplombant les gorges du Rhumel à Constantine"
          className="w-full h-full object-cover image-warm"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-dark/40 via-transparent to-transparent" />
      </div>

      <div className="relative flex-1 flex items-center">
        <div className="container mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-3xl fade-up">
            <div className="ornament mb-8">
              <span className="eyebrow text-sand-50">{t("hero.eyebrow")}</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-sand-50 leading-[1.05] mb-8">
              {t("hero.title.a")}
              <br />
              <em className="text-sand-100 font-light">{t("hero.title.b")}</em>
            </h1>
            <p className="text-sand-100/90 text-lg md:text-xl max-w-xl font-light leading-relaxed mb-10">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="cirta" size="xl" onClick={() => navigate("/experiences")}>
                {t("hero.cta.exp")}
              </Button>
              <Button
                variant="cirtaOutline"
                size="xl"
                onClick={() => navigate("/hebergement")}
                className="border-sand-50 text-sand-50 hover:bg-sand-50 hover:text-brown-dark"
              >
                {t("hero.cta.stay")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Airbnb-style search bar */}
      <div className="relative z-10 container mx-auto px-6 lg:px-10 -mb-12 pb-4">
        <form onSubmit={submit} className="frame-cirta bg-card max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] divide-y md:divide-y-0 md:divide-x divide-border-soft">
            {/* Destination */}
            <div className="p-4">
              <label className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-brown" />
                <span className="eyebrow text-[10px]">{t("search.where")}</span>
              </label>
              <input
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                placeholder={t("search.where.ph")}
                className="w-full bg-transparent font-serif text-base text-ink focus:outline-none placeholder:text-muted-foreground"
              />
            </div>

            {/* Check-in */}
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" className="text-left p-4 hover:bg-secondary/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brown" />
                    <span className="eyebrow text-[10px]">{t("search.checkin")}</span>
                  </div>
                  <span className="font-serif text-base text-ink">{formatDate(from, locale)}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0 bg-card border border-border">
                <DateCalendar
                  mode="single"
                  selected={from}
                  onSelect={setFrom}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Check-out */}
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" className="text-left p-4 hover:bg-secondary/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brown" />
                    <span className="eyebrow text-[10px]">{t("search.checkout")}</span>
                  </div>
                  <span className="font-serif text-base text-ink">{formatDate(to, locale)}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0 bg-card border border-border">
                <DateCalendar
                  mode="single"
                  selected={to}
                  onSelect={setTo}
                  disabled={(d) => d <= (from ?? new Date())}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Guests + budget combined */}
            <Popover>
              <PopoverTrigger asChild>
                <button type="button" className="text-left p-4 hover:bg-secondary/40 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Users className="w-3.5 h-3.5 text-brown" />
                    <span className="eyebrow text-[10px]">{t("search.guests")}</span>
                  </div>
                  <span className="font-serif text-base text-ink">{guestsLabel}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-72 bg-card border border-border p-5 space-y-5">
                <Counter
                  label={t("search.guests.adults")}
                  value={adults}
                  onChange={(v) => setAdults(Math.max(1, v))}
                  min={1}
                />
                <Counter
                  label={lang === "EN" ? "Children" : lang === "AR" ? "أطفال" : "Enfants"}
                  value={children}
                  onChange={(v) => setChildren(Math.max(0, v))}
                />
                <div className="pt-3 border-t border-border-soft">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2 eyebrow text-[10px]">
                      <Wallet className="w-3 h-3" /> {t("search.budget")}
                    </span>
                    <span className="font-serif text-sm text-brown-dark">
                      {budget.toLocaleString(locale)} DA
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={25000}
                    step={500}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-[hsl(var(--primary))]"
                  />
                </div>
              </PopoverContent>
            </Popover>

            {/* Submit */}
            <div className="p-3 flex items-center">
              <Button type="submit" variant="cirta" size="xl" className="h-[58px] w-full md:w-auto md:px-7">
                <Search className="w-4 h-4 mr-2" /> {t("search.search")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const Counter = ({
  label,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) => (
  <div className="flex items-center justify-between">
    <span className="font-serif text-base text-ink">{label}</span>
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className="w-8 h-8 border border-border-soft text-brown hover:bg-secondary disabled:opacity-30 flex items-center justify-center"
        aria-label={`-${label}`}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="font-serif w-5 text-center">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-8 h-8 border border-border-soft text-brown hover:bg-secondary flex items-center justify-center"
        aria-label={`+${label}`}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);
