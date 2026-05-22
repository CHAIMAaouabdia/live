import { Home, TrendingUp, Calendar, Plus } from "lucide-react";
import { DashboardLayout, StatCard } from "@/components/medina/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";
import { accommodations } from "@/data/medina";

const OwnerDashboard = () => {
  const { t, locale } = useI18n();
  const myListings = accommodations.slice(0, 3);

  return (
    <DashboardLayout
      role="proprietaire"
      eyebrow={t("dash.owner.eyebrow")}
      title={t("dash.owner.title")}
      subtitle={t("dash.owner.subtitle")}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label={t("dash.owner.stat.listings")} value={myListings.length} />
        <StatCard label={t("dash.owner.stat.bookings")} value={28} />
        <StatCard label={t("dash.owner.stat.occupancy")} value="78%" />
        <StatCard label={t("dash.owner.stat.revenue")} value="412 000 DA" />
      </div>

      <section className="frame-cirta-soft bg-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-ink flex items-center gap-2">
            <Home className="w-5 h-5 text-brown" /> {t("dash.owner.listings")}
          </h2>
          <Button variant="cirta" size="sm"><Plus className="w-4 h-4 mr-1" /> {t("dash.owner.add")}</Button>
        </div>
        <ul className="divide-y divide-border-soft">
          {myListings.map((l) => (
            <li key={l.id} className="flex items-center gap-4 py-3">
              <img src={l.img} alt="" className="w-16 h-16 object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-serif text-ink truncate">{l.title}</p>
                <p className="text-xs text-muted-foreground">{l.location}</p>
              </div>
              <span className="font-serif text-brown">{l.price.toLocaleString(locale)} DA</span>
              <button className="text-[10px] font-display uppercase tracking-widest text-brown border border-border-soft px-3 py-1.5 hover:bg-secondary">
                {t("dash.owner.edit")}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="frame-cirta-soft bg-card p-6">
          <h3 className="font-serif text-xl text-ink mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brown" /> {t("dash.owner.upcoming")}
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Dar Ben Badis</span><span className="text-brown">2026-05-26</span></li>
            <li className="flex justify-between"><span>Riad El Kantara</span><span className="text-brown">2026-05-29</span></li>
            <li className="flex justify-between"><span>Maison Souika</span><span className="text-brown">2026-06-02</span></li>
          </ul>
        </div>
        <div className="frame-cirta-soft bg-card p-6">
          <h3 className="font-serif text-xl text-ink mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brown" /> {t("dash.owner.perf")}
          </h3>
          <p className="text-sm text-muted-foreground">+18% {t("dash.owner.vsMonth")}</p>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default OwnerDashboard;
