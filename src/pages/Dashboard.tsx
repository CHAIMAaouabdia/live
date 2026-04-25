import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Calendar, CreditCard, Heart, LogOut, MapPin, Receipt, Star, User as UserIcon } from "lucide-react";
import { Header } from "@/components/medina/Header";
import { Footer } from "@/components/medina/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";
import { accommodations, experiences } from "@/data/medina";
import { toast } from "@/hooks/use-toast";

type Tab = "bookings" | "favorites" | "profile";

const Dashboard = () => {
  const { user, bookings, favorites, signOut, isLoading, toggleFavorite } = useAuth();
  const { t, locale } = useI18n();
  const [tab, setTab] = useState<Tab>("bookings");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-serif text-muted-foreground">{t("common.loading")}</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: "/dashboard" }} replace />;
  }

  const allItems = [
    ...accommodations.map((a) => ({ id: a.id, title: a.name, sub: a.location, img: a.img, price: a.price, kind: "stay" as const })),
    ...experiences.map((e) => ({ id: e.id, title: e.title, sub: e.location, img: e.img, price: e.price, kind: "exp" as const })),
  ];
  const favItems = allItems.filter((it) => favorites.includes(it.id));

  const handleSignOut = () => {
    signOut();
    toast({ title: t("auth.signedOut") });
  };

  const memberSince = new Date(user.createdAt).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const initials = user.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-10">
        <div className="container mx-auto px-6 lg:px-10 py-12 max-w-6xl">
          {/* Profile card */}
          <div className="frame-cirta bg-card p-6 md:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brown to-brown-dark text-sand-50 flex items-center justify-center font-display text-2xl tracking-wider shrink-0">
              {initials}
            </div>
            <div className="flex-1">
              <p className="eyebrow mb-1">{t("dash.welcome")}</p>
              <h1 className="font-serif text-3xl md:text-4xl text-ink leading-tight mb-1">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {t("dash.profile.member")} : {memberSince}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-6 text-center">
              <Stat value={bookings.length} label={t("dash.tab.bookings")} />
              <Stat value={favorites.length} label={t("dash.tab.favorites")} />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-border-soft">
            <TabBtn active={tab === "bookings"} onClick={() => setTab("bookings")} icon={Receipt} label={t("dash.tab.bookings")} />
            <TabBtn active={tab === "favorites"} onClick={() => setTab("favorites")} icon={Heart} label={t("dash.tab.favorites")} />
            <TabBtn active={tab === "profile"} onClick={() => setTab("profile")} icon={UserIcon} label={t("dash.tab.profile")} />
          </div>

          {/* BOOKINGS */}
          {tab === "bookings" && (
            <>
              {bookings.length === 0 ? (
                <Empty
                  title={t("dash.bookings.empty.title")}
                  sub={t("dash.bookings.empty.sub")}
                  cta={
                    <Button variant="cirta" asChild>
                      <Link to="/experiences">{t("dash.bookings.explore")}</Link>
                    </Button>
                  }
                />
              ) : (
                <ul className="space-y-4">
                  {bookings.map((b) => (
                    <li
                      key={b.id}
                      className="frame-cirta-soft bg-card overflow-hidden grid sm:grid-cols-[140px_1fr_auto] gap-0 sm:gap-5"
                    >
                      <div className="aspect-[4/3] sm:aspect-auto sm:h-full overflow-hidden">
                        <img src={b.itemImage} alt={b.itemTitle} className="w-full h-full object-cover image-warm" />
                      </div>
                      <div className="p-5 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-display uppercase tracking-widest bg-sand-100 text-brown-dark px-2 py-0.5">
                            {t("dash.bookings.confirmed")}
                          </span>
                          <span className="text-xs text-muted-foreground font-display tracking-widest">
                            {t("dash.bookings.ref")} : {b.ref}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl text-ink leading-tight">{b.itemTitle}</h3>
                        {b.itemSubtitle && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {b.itemSubtitle}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-brown" />
                            {new Date(b.date).toLocaleDateString(locale)}
                          </span>
                          <span>
                            {b.qty} {b.unit}
                          </span>
                          <span className="flex items-center gap-1">
                            <CreditCard className="w-3 h-3 text-brown" />
                            {t(`booking.method.${b.method === "free" ? "card" : b.method}`)}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 sm:text-right border-t sm:border-t-0 sm:border-l border-border-soft flex sm:flex-col sm:items-end justify-between sm:justify-center gap-2">
                        <p className="font-serif text-2xl text-ink leading-none">
                          {b.total === 0 ? "—" : `${b.total.toLocaleString(locale)} DA`}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {new Date(b.createdAt).toLocaleDateString(locale)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* FAVORITES */}
          {tab === "favorites" && (
            <>
              {favItems.length === 0 ? (
                <Empty title={t("dash.favorites.empty.title")} sub={t("dash.favorites.empty.sub")} />
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {favItems.map((it) => (
                    <article key={it.id} className="frame-cirta-soft bg-card overflow-hidden flex flex-col">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img src={it.img} alt={it.title} className="w-full h-full object-cover image-warm" />
                        <button
                          onClick={() => toggleFavorite(it.id)}
                          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur flex items-center justify-center text-brown-dark hover:bg-card"
                          aria-label="Retirer"
                        >
                          <Heart className="w-4 h-4 fill-brown-dark" />
                        </button>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-serif text-lg text-ink leading-tight">{it.title}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" /> {it.sub}
                        </p>
                        <div className="mt-auto pt-3 flex items-end justify-between">
                          <p className="font-serif text-brown text-base">
                            {it.price === 0 ? "—" : `${it.price.toLocaleString(locale)} DA`}
                          </p>
                          <Button size="sm" variant="cirtaOutline" asChild>
                            <Link to={it.kind === "stay" ? "/hebergement" : "/experiences"}>
                              {t("nav.book")}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}

          {/* PROFILE */}
          {tab === "profile" && (
            <div className="frame-cirta-soft bg-card p-6 md:p-8 max-w-xl">
              <div className="space-y-4 mb-8">
                <Row label={t("auth.name")} value={user.name} />
                <Row label={t("auth.email")} value={user.email} />
                <Row label={t("dash.profile.member")} value={memberSince} />
              </div>
              <Button variant="cirtaOutline" onClick={handleSignOut} className="w-full">
                <LogOut className="w-4 h-4 mr-2" /> {t("dash.profile.signout")}
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Stat = ({ value, label }: { value: number; label: string }) => (
  <div>
    <p className="font-serif text-3xl text-brown-dark leading-none">{value}</p>
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</p>
  </div>
);

const TabBtn = ({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Star;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 text-xs font-display uppercase tracking-widest flex items-center gap-2 border-b-2 -mb-px transition-colors ${
      active ? "border-brown text-brown-dark" : "border-transparent text-muted-foreground hover:text-ink"
    }`}
  >
    <Icon className="w-4 h-4" /> {label}
  </button>
);

const Empty = ({ title, sub, cta }: { title: string; sub: string; cta?: React.ReactNode }) => (
  <div className="frame-cirta-soft bg-card text-center py-16 px-6">
    <p className="font-serif text-2xl text-ink mb-2">{title}</p>
    <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">{sub}</p>
    {cta}
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-border-soft">
    <span className="eyebrow text-[10px]">{label}</span>
    <span className="font-serif text-ink text-base">{value}</span>
  </div>
);

export default Dashboard;
