import { useState } from "react";
import { Users, Star, Calendar, MessageCircle, Plus, X } from "lucide-react";
import { DashboardLayout, StatCard } from "@/components/medina/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useI18n } from "@/contexts/I18nContext";
import { parcours } from "@/data/medina";

const GuideDashboard = () => {
  const { t } = useI18n();

  const upcoming = [
    { id: "t1", parcours: parcours[1].title, date: "2026-05-25", client: "Sami B.", people: 2 },
    { id: "t2", parcours: parcours[2].title, date: "2026-05-27", client: "Lina H.", people: 4 },
    { id: "t3", parcours: parcours[0].title, date: "2026-05-30", client: "Karim D.", people: 3 },
  ];

  return (
    <DashboardLayout
      role="guide"
      eyebrow={t("dash.guide.eyebrow")}
      title={t("dash.guide.title")}
      subtitle={t("dash.guide.subtitle")}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label={t("dash.guide.stat.tours")} value={42} />
        <StatCard label={t("dash.guide.stat.upcoming")} value={upcoming.length} />
        <StatCard label={t("dash.guide.stat.rating")} value="4.9" hint="★★★★★" />
        <StatCard label={t("dash.guide.stat.revenue")} value="186 000 DA" />
      </div>

      <section className="frame-cirta-soft bg-card p-6 mb-6">
        <h2 className="font-serif text-2xl text-ink mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brown" /> {t("dash.guide.upcoming")}
        </h2>
        <ul className="divide-y divide-border-soft">
          {upcoming.map((u) => (
            <li key={u.id} className="flex items-center gap-4 py-3">
              <div className="font-display text-brown text-xs tracking-widest w-24 shrink-0">{u.date}</div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-ink truncate">{u.parcours}</p>
                <p className="text-xs text-muted-foreground">
                  <Users className="w-3 h-3 inline mr-1" /> {u.client} · {u.people} pers.
                </p>
              </div>
              <button className="text-[10px] font-display uppercase tracking-widest text-brown border border-border-soft px-3 py-1.5 hover:bg-secondary">
                {t("dash.guide.confirm")}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="frame-cirta-soft bg-card p-6">
          <h3 className="font-serif text-xl text-ink mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-brown fill-brown" /> {t("dash.guide.reviews")}
          </h3>
          <p className="text-sm text-muted-foreground italic">
            « Guide passionnant, ruelles secrètes inoubliables. » — Yasmine
          </p>
        </div>
        <div className="frame-cirta-soft bg-card p-6">
          <h3 className="font-serif text-xl text-ink mb-3 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-brown" /> {t("dash.guide.messages")}
          </h3>
          <p className="text-sm text-muted-foreground">3 {t("dash.guide.messages.new")}</p>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default GuideDashboard;
