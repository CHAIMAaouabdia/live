import { Users, ShieldCheck, AlertCircle, Activity } from "lucide-react";
import { DashboardLayout, StatCard } from "@/components/medina/DashboardLayout";
import { useI18n } from "@/contexts/I18nContext";

const AdminDashboard = () => {
  const { t } = useI18n();

  const recent = [
    { id: "u1", name: "Yacine M.", role: "client", date: "2026-05-22" },
    { id: "u2", name: "Amel B.", role: "guide", date: "2026-05-21" },
    { id: "u3", name: "Karim D.", role: "proprietaire", date: "2026-05-20" },
  ];

  return (
    <DashboardLayout
      role="admin"
      eyebrow={t("dash.admin.eyebrow")}
      title={t("dash.admin.title")}
      subtitle={t("dash.admin.subtitle")}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard label={t("dash.admin.stat.users")} value={1284} />
        <StatCard label={t("dash.admin.stat.guides")} value={32} />
        <StatCard label={t("dash.admin.stat.owners")} value={67} />
        <StatCard label={t("dash.admin.stat.bookings")} value={3120} />
      </div>

      <section className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="frame-cirta-soft bg-card p-6">
          <h2 className="font-serif text-xl text-ink mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-brown" /> {t("dash.admin.recent")}
          </h2>
          <ul className="divide-y divide-border-soft">
            {recent.map((u) => (
              <li key={u.id} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="font-serif text-ink">{u.name}</p>
                  <p className="text-xs text-brown uppercase tracking-widest">{u.role}</p>
                </div>
                <span className="text-xs text-muted-foreground">{u.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="frame-cirta-soft bg-card p-6">
          <h2 className="font-serif text-xl text-ink mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-brown" /> {t("dash.admin.moderation")}
          </h2>
          <p className="text-sm text-muted-foreground">3 {t("dash.admin.reports")}</p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="frame-cirta-soft bg-card p-6">
          <h3 className="font-serif text-xl text-ink mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-brown" /> {t("dash.admin.activity")}
          </h3>
          <p className="text-sm text-muted-foreground">238 {t("dash.admin.sessions")}</p>
        </div>
        <div className="frame-cirta-soft bg-card p-6">
          <h3 className="font-serif text-xl text-ink mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brown" /> {t("dash.admin.health")}
          </h3>
          <p className="text-sm text-green-700">{t("dash.admin.ok")}</p>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
