import { Heart, Calendar, Sparkles, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { DashboardLayout, StatCard } from "@/components/medina/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";

const ClientDashboard = () => {
  const { t, locale } = useI18n();
  const { bookings, favorites } = useAuth();
  const spent = bookings.reduce((s, b) => s + b.total, 0);

  return (
    <DashboardLayout
      role="client"
      eyebrow={t("dash.client.eyebrow")}
      title={t("dash.client.title")}
      subtitle={t("dash.client.subtitle")}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label={t("dash.client.stat.bookings")} value={bookings.length} />
        <StatCard label={t("dash.client.stat.favorites")} value={favorites.length} />
        <StatCard label={t("dash.client.stat.spent")} value={`${spent.toLocaleString(locale)} DA`} />
        <StatCard label={t("dash.client.stat.points")} value={bookings.length * 50} hint={t("dash.client.stat.points.hint")} />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <Link to="/parcours" className="frame-cirta-soft bg-card p-5 hover:shadow-elegant transition-all">
          <Compass className="w-6 h-6 text-brown mb-3" />
          <h3 className="font-serif text-lg text-ink mb-1">{t("dash.client.quick.parcours")}</h3>
          <p className="text-xs text-muted-foreground">{t("dash.client.quick.parcours.desc")}</p>
        </Link>
        <Link to="/experiences" className="frame-cirta-soft bg-card p-5 hover:shadow-elegant transition-all">
          <Sparkles className="w-6 h-6 text-brown mb-3" />
          <h3 className="font-serif text-lg text-ink mb-1">{t("dash.client.quick.exp")}</h3>
          <p className="text-xs text-muted-foreground">{t("dash.client.quick.exp.desc")}</p>
        </Link>
        <Link to="/hebergement" className="frame-cirta-soft bg-card p-5 hover:shadow-elegant transition-all">
          <Calendar className="w-6 h-6 text-brown mb-3" />
          <h3 className="font-serif text-lg text-ink mb-1">{t("dash.client.quick.stay")}</h3>
          <p className="text-xs text-muted-foreground">{t("dash.client.quick.stay.desc")}</p>
        </Link>
      </div>

      <section className="frame-cirta-soft bg-card p-6">
        <h2 className="font-serif text-2xl text-ink mb-4">{t("dash.client.recent")}</h2>
        {bookings.length === 0 ? (
          <p className="text-sm text-muted-foreground italic font-serif">{t("dash.client.recent.empty")}</p>
        ) : (
          <ul className="divide-y divide-border-soft">
            {bookings.slice(0, 5).map((b) => (
              <li key={b.id} className="flex items-center gap-4 py-3">
                <img src={b.itemImage} alt="" className="w-14 h-14 object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-ink truncate">{b.itemTitle}</p>
                  <p className="text-xs text-muted-foreground">
                    {b.date} · {b.qty} {b.unit}
                  </p>
                </div>
                <span className="font-serif text-brown">{b.total.toLocaleString(locale)} DA</span>
                <span className="text-[10px] font-display uppercase tracking-widest text-brown border border-border-soft px-2 py-1">
                  {b.status === "confirmed" ? t("dash.confirmed") : t("dash.pending")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {favorites.length > 0 && (
        <section className="frame-cirta-soft bg-card p-6 mt-6">
          <h2 className="font-serif text-2xl text-ink mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-brown" /> {t("dash.client.favs")}
          </h2>
          <p className="text-sm text-muted-foreground font-serif">
            {favorites.length} {t("dash.client.favs.count")}
          </p>
        </section>
      )}
    </DashboardLayout>
  );
};

export default ClientDashboard;
