import { useEffect, useMemo, useState } from "react";
import { Star, MapPin, Search, SlidersHorizontal, X, Calendar, Users, Heart } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/medina/Header";
import { Footer } from "@/components/medina/Footer";
import { SectionHeading } from "@/components/medina/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookingDialog, BookingItem } from "@/components/medina/BookingDialog";
import { accommodations, Accommodation, AccommodationType } from "@/data/medina";
import { useI18n } from "@/contexts/I18nContext";
import { useAuth } from "@/contexts/AuthContext";

type Filter = "Tous" | AccommodationType;

const Hebergement = () => {
  const { t, locale } = useI18n();
  const { isFavorite, toggleFavorite } = useAuth();
  const [params, setParams] = useSearchParams();

  const [filter, setFilter] = useState<Filter>("Tous");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [maxPrice, setMaxPrice] = useState(Number(params.get("max")) || 25000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<"recommended" | "price-asc" | "price-desc" | "rating">("recommended");
  const [advanced, setAdvanced] = useState(false);

  const fromDate = params.get("from");
  const toDate = params.get("to");
  const guests = params.get("guests");

  useEffect(() => {
    const q = params.get("q");
    const max = params.get("max");
    if (q !== null) setQuery(q);
    if (max !== null) setMaxPrice(Number(max) || 25000);
  }, [params]);

  const [booking, setBooking] = useState<BookingItem | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const filtered = useMemo(() => {
    let r: Accommodation[] = accommodations.filter((a) => {
      if (filter !== "Tous" && a.type !== filter) return false;
      if (a.price > maxPrice) return false;
      if (a.rating < minRating) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !a.name.toLowerCase().includes(q) &&
          !a.location.toLowerCase().includes(q) &&
          !a.description.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [filter, query, maxPrice, minRating, sort]);

  const reserve = (a: Accommodation) => {
    setBooking({
      id: a.id,
      title: a.name,
      subtitle: `${a.sub} · ${a.location}`,
      image: a.img,
      price: a.price,
      unit: t("stay.unit"),
    });
    setBookingOpen(true);
  };

  const filterLabel = (f: Filter) =>
    f === "Tous" ? t("stay.cat.all") : f === "Classique" ? t("stay.cat.classic") : t("stay.cat.local");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 lg:px-10 py-16">
          <SectionHeading
            eyebrow={t("stay.eyebrow")}
            title={t("stay.title")}
            subtitle={t("stay.subtitle")}
            align="center"
          />

          {(fromDate || toDate || guests) && (
            <div className="frame-cirta-soft bg-secondary/50 px-5 py-3 mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-serif">
              <span className="eyebrow text-[10px]">{t("stay.recap")}</span>
              {fromDate && toDate && (
                <span className="flex items-center gap-1.5 text-ink">
                  <Calendar className="w-3.5 h-3.5 text-brown" />
                  {new Date(fromDate).toLocaleDateString(locale, { day: "numeric", month: "short" })}
                  {" → "}
                  {new Date(toDate).toLocaleDateString(locale, { day: "numeric", month: "short" })}
                </span>
              )}
              {guests && (
                <span className="flex items-center gap-1.5 text-ink">
                  <Users className="w-3.5 h-3.5 text-brown" />
                  {guests} {Number(guests) > 1 ? t("search.guests.adults") : t("search.guests.adult")}
                </span>
              )}
              <button
                onClick={() => setParams({})}
                className="ms-auto text-xs text-brown hover:text-ink flex items-center gap-1 font-display uppercase tracking-widest"
              >
                <X className="w-3 h-3" /> {t("stay.recap.clear")}
              </button>
            </div>
          )}

          <div className="frame-cirta-soft bg-card p-5 md:p-6 mb-8 space-y-5">
            <div className="grid md:grid-cols-[1fr_auto_auto] gap-3 items-center">
              <div className="relative">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("stay.search.ph")}
                  className="ps-10 rounded-none border-border-soft bg-transparent font-serif"
                />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="border border-border-soft px-3 py-2 bg-transparent text-sm font-serif text-ink"
              >
                <option value="recommended">{t("stay.sort.recommended")}</option>
                <option value="price-asc">{t("stay.sort.priceAsc")}</option>
                <option value="price-desc">{t("stay.sort.priceDesc")}</option>
                <option value="rating">{t("stay.sort.rating")}</option>
              </select>
              <button
                onClick={() => setAdvanced((v) => !v)}
                className="flex items-center gap-2 text-sm text-brown font-serif px-3 py-2 border border-border-soft hover:bg-secondary"
              >
                <SlidersHorizontal className="w-4 h-4" /> {t("stay.filters.advanced")}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["Tous", "Classique", "Chez l'habitant"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 text-xs font-display uppercase tracking-[0.18em] border transition-all ${
                    filter === f
                      ? "bg-primary text-primary-foreground border-brown-dark"
                      : "border-border text-brown hover:bg-secondary"
                  }`}
                >
                  {filterLabel(f)}
                </button>
              ))}
            </div>

            {advanced && (
              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border-soft">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="eyebrow text-[10px]">{t("stay.filters.priceMax")}</span>
                    <span className="font-serif text-brown">{maxPrice.toLocaleString(locale)} DA</span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={25000}
                    step={500}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[hsl(var(--primary))]"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="eyebrow text-[10px]">{t("stay.filters.minRating")}</span>
                    <span className="font-serif text-brown flex items-center gap-1">
                      <Star className="w-3 h-3 fill-brown" /> {minRating.toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step={0.1}
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full accent-[hsl(var(--primary))]"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground font-serif">
              <span className="text-ink font-semibold">{filtered.length}</span>{" "}
              {filtered.length > 1 ? t("stay.count.many") : t("stay.count.one")}
            </p>
            {(query || filter !== "Tous" || maxPrice < 25000 || minRating > 0) && (
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("Tous");
                  setMaxPrice(25000);
                  setMinRating(0);
                }}
                className="text-xs text-brown hover:text-ink flex items-center gap-1 font-display uppercase tracking-widest"
              >
                <X className="w-3 h-3" /> {t("stay.reset")}
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 frame-cirta-soft bg-card">
              <p className="font-serif text-2xl text-ink mb-2">{t("stay.empty.title")}</p>
              <p className="text-muted-foreground text-sm">{t("stay.empty.sub")}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((it) => {
                const fav = isFavorite(it.id);
                return (
                  <article key={it.id} className="group frame-cirta-soft bg-card overflow-hidden flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={it.img}
                        alt={it.name}
                        loading="lazy"
                        className="w-full h-full object-cover image-warm transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-3 start-3 text-[10px] font-display uppercase tracking-[0.18em] bg-card/95 text-brown-dark px-2.5 py-1 border border-border">
                        {it.type === "Classique" ? t("stay.cat.classic") : t("stay.cat.local")}
                      </span>
                      <button
                        onClick={() => toggleFavorite(it.id)}
                        aria-label="favorite"
                        className="absolute top-3 end-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur flex items-center justify-center text-brown-dark hover:bg-card transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${fav ? "fill-brown-dark" : ""}`} />
                      </button>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-serif text-xl text-ink leading-tight">{it.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-brown shrink-0">
                          <Star className="w-3.5 h-3.5 fill-brown" />
                          <span className="font-medium">{it.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <MapPin className="w-3 h-3" /> {it.location}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {it.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {it.features.slice(0, 3).map((f) => (
                          <span
                            key={f}
                            className="text-[10px] font-serif text-brown border border-border-soft px-2 py-0.5"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-4 border-t border-border-soft">
                        <div>
                          <p className="font-serif text-2xl text-ink leading-none">
                            {it.price.toLocaleString(locale)}
                            <span className="text-sm text-muted-foreground"> DA</span>
                          </p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                            {t("stay.unit")}
                          </p>
                        </div>
                        <Button variant="cirta" size="sm" onClick={() => reserve(it)}>
                          {t("stay.book")}
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} item={booking} />
    </div>
  );
};

export default Hebergement;
