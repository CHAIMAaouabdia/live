import { useMemo, useState } from "react";
import { Star, MapPin, Search, Clock, X, SlidersHorizontal, Heart, Users } from "lucide-react";
import { Header } from "@/components/medina/Header";
import { Footer } from "@/components/medina/Footer";
import { SectionHeading } from "@/components/medina/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookingDialog, BookingItem } from "@/components/medina/BookingDialog";
import { experiences, Experience, ExperienceCategory } from "@/data/medina";

type Filter = "Tous" | ExperienceCategory;

const cats: { id: Filter; icon: typeof Clock; label: string; desc: string }[] = [
  { id: "Simple", icon: Clock, label: "Simple", desc: "Activités courtes et ciblées." },
  { id: "VIP", icon: Users, label: "VIP", desc: "Parcours immersifs sur 1 à 3 jours." },
  { id: "Solidaire", icon: Heart, label: "Solidaire", desc: "Tourisme participatif et engagé." },
];

const Experiences = () => {
  const [filter, setFilter] = useState<Filter>("Tous");
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(35000);
  const [sort, setSort] = useState<"recommended" | "price-asc" | "price-desc" | "rating">("recommended");
  const [advanced, setAdvanced] = useState(false);

  const [booking, setBooking] = useState<BookingItem | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const filtered = useMemo(() => {
    let r: Experience[] = experiences.filter((e) => {
      if (filter !== "Tous" && e.badge !== filter) return false;
      if (e.price > maxPrice) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !e.title.toLowerCase().includes(q) &&
          !e.cat.toLowerCase().includes(q) &&
          !e.location.toLowerCase().includes(q) &&
          !e.description.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [filter, query, maxPrice, sort]);

  const choose = (e: Experience) => {
    setBooking({
      id: e.id,
      title: e.title,
      subtitle: `${e.cat} · ${e.duration} · ${e.location}`,
      image: e.img,
      price: e.price,
      unit: "par personne",
    });
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 lg:px-10 py-16">
          <SectionHeading
            eyebrow="Expériences à Constantine"
            title="Le cœur battant de Live Médina"
            subtitle="Trois manières d'entrer dans la vie de Cirta : simple, immersive ou solidaire — toujours portée par celles et ceux qui l'habitent."
          />

          {/* Catégories */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {cats.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(filter === c.id ? "Tous" : c.id)}
                className={`text-left p-6 border transition-all ${
                  filter === c.id
                    ? "bg-primary text-primary-foreground border-brown-dark"
                    : "frame-cirta-soft bg-card hover:bg-secondary"
                }`}
              >
                <c.icon
                  className={`w-6 h-6 mb-3 ${filter === c.id ? "text-sand-50" : "text-brown"}`}
                  strokeWidth={1.4}
                />
                <p
                  className={`font-display text-xs uppercase tracking-[0.25em] mb-1 ${
                    filter === c.id ? "text-sand-100" : "text-brown"
                  }`}
                >
                  {c.label}
                </p>
                <p className={`text-sm ${filter === c.id ? "text-sand-50/90" : "text-muted-foreground"}`}>
                  {c.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Recherche + tri */}
          <div className="frame-cirta-soft bg-card p-5 mb-8 space-y-4">
            <div className="grid md:grid-cols-[1fr_auto_auto] gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher une expérience…"
                  className="pl-10 rounded-none border-border-soft bg-transparent font-serif"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="border border-border-soft px-3 py-2 bg-transparent text-sm font-serif text-ink"
              >
                <option value="recommended">Recommandés</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Mieux notés</option>
              </select>
              <button
                onClick={() => setAdvanced((v) => !v)}
                className="flex items-center gap-2 text-sm text-brown font-serif px-3 py-2 border border-border-soft hover:bg-secondary"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filtres
              </button>
            </div>
            {advanced && (
              <div className="pt-4 border-t border-border-soft">
                <div className="flex items-center justify-between mb-2">
                  <span className="eyebrow text-[10px]">Prix max</span>
                  <span className="font-serif text-brown">{maxPrice.toLocaleString("fr-FR")} DA</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={35000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[hsl(var(--primary))]"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground font-serif">
              <span className="text-ink font-semibold">{filtered.length}</span> expérience{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
            </p>
            {(query || filter !== "Tous" || maxPrice < 35000) && (
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("Tous");
                  setMaxPrice(35000);
                }}
                className="text-xs text-brown hover:text-ink flex items-center gap-1 font-display uppercase tracking-widest"
              >
                <X className="w-3 h-3" /> Réinitialiser
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 frame-cirta-soft bg-card">
              <p className="font-serif text-2xl text-ink mb-2">Aucune expérience trouvée.</p>
              <p className="text-muted-foreground text-sm">Essayez d'autres mots-clés ou élargissez vos filtres.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((it) => (
                <article
                  key={it.id}
                  className="group relative frame-cirta-soft bg-card overflow-hidden flex flex-col stamp-corners"
                >
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <img
                      src={it.img}
                      alt={it.title}
                      loading="lazy"
                      className="w-full h-full object-cover image-warm transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 text-[10px] font-display uppercase tracking-[0.18em] bg-primary text-primary-foreground px-2.5 py-1">
                      {it.badge}
                    </span>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <p className="eyebrow text-[10px]">{it.cat} · {it.duration}</p>
                      <span className="flex items-center gap-1 text-xs text-brown">
                        <Star className="w-3 h-3 fill-brown" /> {it.rating}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-ink leading-snug mb-2">{it.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <MapPin className="w-3 h-3" /> {it.location}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                      {it.description}
                    </p>
                    <div className="flex items-end justify-between pt-4 border-t border-border-soft">
                      <p className="font-serif text-lg text-brown">
                        {it.priceLabel ?? `${it.price.toLocaleString("fr-FR")} DA`}
                      </p>
                      <Button variant="cirta" size="sm" onClick={() => choose(it)}>
                        Choisir
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} item={booking} />
    </div>
  );
};

export default Experiences;
