import { useState } from "react";
import {
  Users, ShieldCheck, AlertCircle, Activity, Bell, TrendingUp,
  Star, Check, X, UserCheck, Home as HomeIcon,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";
import { DashboardLayout, StatCard } from "@/components/medina/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";
import { toast } from "@/hooks/use-toast";

interface Pending { id: string; name: string; role: "guide" | "proprietaire"; date: string; email: string; }

const bookingsTrend = [
  { m: "Jan", v: 120 }, { m: "Fév", v: 165 }, { m: "Mar", v: 198 },
  { m: "Avr", v: 240 }, { m: "Mai", v: 312 }, { m: "Juin", v: 390 },
];
const revenueTrend = [
  { m: "Jan", r: 820 }, { m: "Fév", r: 1120 }, { m: "Mar", r: 1390 },
  { m: "Avr", r: 1810 }, { m: "Mai", r: 2240 }, { m: "Juin", r: 2780 },
];
const usersByRole = [
  { name: "Clients", value: 1185, color: "hsl(var(--primary))" },
  { name: "Guides", value: 32, color: "hsl(var(--brown))" },
  { name: "Propriétaires", value: 67, color: "hsl(var(--brown-dark))" },
];

const AdminDashboard = () => {
  const { t } = useI18n();
  const [pending, setPending] = useState<Pending[]>([
    { id: "p1", name: "Amel Bouzidi", role: "guide", email: "amel.b@email.com", date: "2026-05-23" },
    { id: "p2", name: "Karim Daoudi", role: "proprietaire", email: "karim.d@email.com", date: "2026-05-22" },
  ]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState([
    { id: "n1", text: "Nouvelle inscription guide : Amel B.", time: "il y a 5 min", read: false },
    { id: "n2", text: "Nouvelle réservation : Riad El Kantara", time: "il y a 1h", read: false },
    { id: "n3", text: "Nouvel avis 5★ sur le parcours Saveurs", time: "il y a 3h", read: false },
  ]);
  const unread = notifs.filter((n) => !n.read).length;

  const reviews = [
    { id: "r1", author: "Yasmine K.", rating: 5, text: "Guide passionnant, ruelles secrètes inoubliables.", target: "Parcours Authentique" },
    { id: "r2", author: "Sami B.", rating: 5, text: "Accueil chaleureux, repas mémorable chez Lalla Aïcha.", target: "Maison Lalla Aïcha" },
    { id: "r3", author: "Lina H.", rating: 4, text: "Très belle expérience de calligraphie, atelier soigné.", target: "Atelier calligraphie" },
  ];

  const decide = (id: string, ok: boolean) => {
    const p = pending.find((x) => x.id === id);
    setPending((arr) => arr.filter((x) => x.id !== id));
    toast({
      title: ok ? "Compte approuvé" : "Compte refusé",
      description: p ? `${p.name} (${p.role})` : "",
    });
  };

  return (
    <DashboardLayout
      role="admin"
      eyebrow={t("dash.admin.eyebrow")}
      title={t("dash.admin.title")}
      subtitle={t("dash.admin.subtitle")}
    >
      {/* Barre notifs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              if (!notifOpen) setNotifs((arr) => arr.map((n) => ({ ...n, read: true })));
            }}
            className="relative flex items-center gap-2 border border-border-soft px-3 py-2 hover:bg-secondary text-sm font-serif text-ink"
          >
            <Bell className="w-4 h-4 text-brown" />
            Notifications
            {unread > 0 && (
              <span className="absolute -top-1.5 -end-1.5 bg-primary text-primary-foreground text-[10px] font-display rounded-full w-5 h-5 flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
        </div>
      </div>

      {notifOpen && (
        <div className="frame-cirta-soft bg-card p-4 mb-6">
          <ul className="divide-y divide-border-soft">
            {notifs.map((n) => (
              <li key={n.id} className="py-2.5 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-serif text-ink">{n.text}</p>
                  <p className="text-[11px] text-muted-foreground">{n.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label={t("dash.admin.stat.users")} value={1284} hint="+48 ce mois" />
        <StatCard label="Chiffre d'affaires" value="2 780 000 DA" hint="+24% vs M-1" />
        <StatCard label={t("dash.admin.stat.bookings")} value={3120} hint="+18% vs M-1" />
        <StatCard label="Note moyenne" value="4.86" hint="★★★★★" />
      </div>

      {/* Graphiques */}
      <section className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="frame-cirta-soft bg-card p-5 lg:col-span-2">
          <h3 className="font-serif text-lg text-ink mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brown" /> Chiffre d'affaires (kDA)
          </h3>
          <p className="text-xs text-muted-foreground mb-4">6 derniers mois</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="cr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="m" stroke="hsl(var(--brown))" fontSize={12} />
                <YAxis stroke="hsl(var(--brown))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Area type="monotone" dataKey="r" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#cr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="frame-cirta-soft bg-card p-5">
          <h3 className="font-serif text-lg text-ink mb-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-brown" /> Répartition utilisateurs
          </h3>
          <p className="text-xs text-muted-foreground mb-4">par rôle</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={usersByRole} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                  {usersByRole.map((u, i) => <Cell key={i} fill={u.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="frame-cirta-soft bg-card p-5 mb-8">
        <h3 className="font-serif text-lg text-ink mb-1 flex items-center gap-2">
          <Activity className="w-4 h-4 text-brown" /> Réservations / mois
        </h3>
        <div className="h-56 mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookingsTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="m" stroke="hsl(var(--brown))" fontSize={12} />
              <YAxis stroke="hsl(var(--brown))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Bar dataKey="v" fill="hsl(var(--brown))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Confirmations guides / propriétaires */}
      <section className="frame-cirta-soft bg-card p-6 mb-6">
        <h2 className="font-serif text-2xl text-ink mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brown" /> Confirmations en attente
          {pending.length > 0 && (
            <span className="text-xs font-display bg-primary text-primary-foreground px-2 py-0.5 ml-1">{pending.length}</span>
          )}
        </h2>
        {pending.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">Aucun compte en attente.</p>
        ) : (
          <ul className="divide-y divide-border-soft">
            {pending.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-3">
                <span className="w-10 h-10 rounded-full bg-sand-100 border border-brown/30 flex items-center justify-center text-brown">
                  {p.role === "guide" ? <UserCheck className="w-5 h-5" /> : <HomeIcon className="w-5 h-5" />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-ink">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="uppercase tracking-widest text-brown me-2">{p.role}</span>
                    {p.email} · {p.date}
                  </p>
                </div>
                <Button variant="cirta" size="sm" onClick={() => decide(p.id, true)}>
                  <Check className="w-4 h-4 mr-1" /> Approuver
                </Button>
                <Button variant="cirtaOutline" size="sm" onClick={() => decide(p.id, false)}>
                  <X className="w-4 h-4 mr-1" /> Refuser
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Avis récents */}
      <section className="grid lg:grid-cols-2 gap-6">
        <div className="frame-cirta-soft bg-card p-6">
          <h3 className="font-serif text-xl text-ink mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-brown fill-brown" /> Avis récents
          </h3>
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li key={r.id} className="border-b border-border-soft pb-3 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-serif text-ink text-sm">{r.author}</p>
                  <span className="text-xs text-brown">{"★".repeat(r.rating)}</span>
                </div>
                <p className="text-sm text-muted-foreground italic">« {r.text} »</p>
                <p className="text-[11px] uppercase tracking-widest text-brown mt-1">{r.target}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="frame-cirta-soft bg-card p-6">
          <h3 className="font-serif text-xl text-ink mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-brown" /> {t("dash.admin.moderation")}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">3 {t("dash.admin.reports")}</p>
          <h3 className="font-serif text-xl text-ink mt-6 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brown" /> {t("dash.admin.health")}
          </h3>
          <p className="text-sm text-green-700">{t("dash.admin.ok")}</p>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default AdminDashboard;
