import { useMemo, useState } from "react";
import { Lock, Clock, Star, MapPin, Sparkles, UserCheck, ArrowRight } from "lucide-react";
import { Header } from "@/components/medina/Header";
import { Footer } from "@/components/medina/Footer";
import { SectionHeading } from "@/components/medina/SectionHeading";
import { Button } from "@/components/ui/button";
import { BookingDialog, BookingItem } from "@/components/medina/BookingDialog";
import { parcours, Parcours as ParcoursT, personalGuides } from "@/data/medina";
import { useI18n } from "@/contexts/I18nContext";

const ParcoursPage = () => {
  const { t, locale } = useI18n();
  const [active, setActive] = useState<ParcoursT>(parcours[0]);
  const [withGuide, setWithGuide] = useState(false);
  const [guideId, setGuideId] = useState<string>(personalGuides[0].id);
  const [booking, setBooking] = useState<BookingItem | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const computedPrice = useMemo(() => {
    return active.basePrice + (withGuide ? active.withGuidePrice : 0);
  }, [active, withGuide]);

  const reserve = () => {
    const guide = personalGuides.find((g) => g.id === guideId);
    setBooking({
      id: active.id + (withGuide ? `-guide-${guideId}` : ""),
      title: active.title,
      subtitle:
        `${active.subtitle} · ${active.duration}` +
        (withGuide && guide ? ` · ${t("parcours.with")} ${guide.name}` : ""),
      image: active.img,
      price: computedPrice,
      unit: t("exp.unit"),
    });
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 lg:px-10 py-16">
          <SectionHeading
            eyebrow={t("parcours.eyebrow")}
            title={t("parcours.title")}
            subtitle={t("parcours.subtitle")}
          />

          {/* Sélecteur de parcours */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {parcours.map((p) => {
              const selected = active.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className={`group text-left frame-cirta-soft bg-card overflow-hidden transition-all ${
                    selected ? "ring-2 ring-[hsl(var(--primary))] shadow-elegant" : "hover:shadow-elegant"
                  }`}
                >
                  <div className="relative aspect-[5/3] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover image-warm transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/60 to-transparent" />
                    <span
                      className={`absolute top-3 end-3 text-[10px] font-display uppercase tracking-[0.18em] px-2.5 py-1 ${
                        p.tier === "Gratuit"
                          ? "bg-sand-100 text-brown-dark border border-brown-dark/30"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {p.tier === "Gratuit" ? t("parcours.free") : t("parcours.premium")}
                    </span>
                    <div className="absolute bottom-3 start-4 text-sand-50">
                      <p className="eyebrow text-[10px] text-sand-100/90 mb-1">{p.subtitle}</p>
                      <h3 className="font-serif text-xl leading-tight">{p.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-serif mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {p.duration}
                      </span>
                      <span className="flex items-center gap-1 text-brown">
                        <Star className="w-3 h-3 fill-brown" /> {p.rating}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Détail du parcours actif — timeline */}
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
            <div className="frame-cirta bg-card p-6 md:p-10">
              <p className="eyebrow text-[10px] mb-2">{active.subtitle}</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4 leading-tight">
                {active.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{active.description}</p>

              <ol className="relative border-s-2 border-border-soft ps-8 space-y-6">
                {active.steps.map((s, i) => (
                  <li key={i} className="relative">
                    <span
                      className={`absolute -start-[42px] top-0 w-9 h-9 rounded-full flex items-center justify-center border-2 font-display text-sm ${
                        s.locked
                          ? "bg-sand-100 border-brown/40 text-brown/70"
                          : "bg-primary border-brown-dark text-primary-foreground"
                      }`}
                    >
                      {s.locked ? (
                        <Lock className="w-3.5 h-3.5" strokeWidth={2} />
                      ) : (
                        <span className="leading-none">{i + 1}</span>
                      )}
                    </span>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`font-serif text-lg ${
                            s.locked ? "text-brown/80 italic" : "text-ink"
                          }`}
                        >
                          {s.title}
                        </h4>
                        {s.desc && !s.locked && (
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {s.desc}
                          </p>
                        )}
                        {s.locked && (
                          <p className="text-xs text-brown/70 mt-1 italic">
                            🔒 {t("parcours.unlock")}
                          </p>
                        )}
                      </div>
                      {s.duration && (
                        <span className="shrink-0 text-[10px] font-display uppercase tracking-[0.2em] text-brown border border-border-soft px-2 py-1 whitespace-nowrap">
                          {s.duration}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Carte de réservation */}
            <aside className="frame-cirta-soft bg-card p-6 md:p-8 h-fit sticky top-24">
              <p className="eyebrow text-[10px] mb-2">{t("parcours.summary")}</p>
              <h3 className="font-serif text-2xl text-ink mb-1">{active.title}</h3>
              <p className="text-xs text-muted-foreground font-serif mb-5 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {active.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Constantine
                </span>
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm border-b border-border-soft pb-3">
                  <span className="font-serif text-ink">
                    {active.tier === "Gratuit" ? t("parcours.priceFree") : t("parcours.priceBase")}
                  </span>
                  <span className="font-serif text-brown">
                    {active.basePrice === 0
                      ? t("parcours.free")
                      : `${active.basePrice.toLocaleString(locale)} DA`}
                  </span>
                </div>

                <label className="flex items-start gap-3 p-3 border border-border-soft cursor-pointer hover:bg-secondary/40 transition-colors">
                  <input
                    type="checkbox"
                    checked={withGuide}
                    onChange={(e) => setWithGuide(e.target.checked)}
                    className="mt-1 accent-[hsl(var(--primary))]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-ink flex items-center gap-2 text-sm">
                        <UserCheck className="w-4 h-4 text-brown" /> {t("parcours.addGuide")}
                      </span>
                      <span className="font-serif text-brown text-sm">
                        +{active.withGuidePrice.toLocaleString(locale)} DA
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t("parcours.guideDesc")}</p>
                  </div>
                </label>

                {withGuide && (
                  <div className="space-y-2 pl-3 border-s-2 border-brown/20">
                    {personalGuides.map((g) => (
                      <label
                        key={g.id}
                        className={`flex items-center gap-3 p-2.5 border cursor-pointer transition-colors ${
                          guideId === g.id
                            ? "border-brown-dark bg-sand-100"
                            : "border-border-soft hover:bg-secondary/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="guide"
                          checked={guideId === g.id}
                          onChange={() => setGuideId(g.id)}
                          className="accent-[hsl(var(--primary))]"
                        />
                        <div className="w-9 h-9 rounded-full bg-brown-dark text-sand-50 flex items-center justify-center font-display text-xs">
                          {g.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-sm text-ink leading-tight">{g.name}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{g.bio}</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-brown">
                          <Star className="w-3 h-3 fill-brown" /> {g.rating}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-end justify-between border-t border-border-soft pt-4 mb-5">
                <span className="font-display uppercase tracking-[0.2em] text-xs text-brown">
                  {t("parcours.total")}
                </span>
                <span className="font-serif text-2xl text-ink">
                  {computedPrice === 0
                    ? t("parcours.free")
                    : `${computedPrice.toLocaleString(locale)} DA`}
                </span>
              </div>

              <Button variant="cirta" size="lg" className="w-full" onClick={reserve}>
                <Sparkles className="w-4 h-4 mr-2" />
                {active.tier === "Gratuit" && !withGuide
                  ? t("parcours.start")
                  : t("parcours.reserve")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              {active.tier === "Premium" && (
                <p className="text-[11px] text-muted-foreground text-center mt-3 italic">
                  {t("parcours.premiumNote")}
                </p>
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} item={booking} />
    </div>
  );
};

export default ParcoursPage;
