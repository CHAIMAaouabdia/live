import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock, KeyRound, ArrowRight, ArrowLeft, Lock as LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";
import { toast } from "@/hooks/use-toast";

const AdminAccess = () => {
  const { t } = useI18n();
  const { signInAdmin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password || !code) {
      setError(t("auth.error.required"));
      return;
    }
    setLoading(true);
    const res = await signInAdmin(email, password, code);
    setLoading(false);
    if (res.error) {
      setError(t(res.error));
      return;
    }
    toast({ title: t("auth.admin.welcome"), description: email });
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-ink text-sand-50 flex flex-col">
      {/* Top bar */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-sand-50/70 hover:text-sand-50 font-display">
            <ArrowLeft className="w-3.5 h-3.5" />
            {t("auth.admin.back")}
          </Link>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-sand-50/60 font-display">
            <LockIcon className="w-3 h-3" />
            {t("auth.admin.secure")}
          </div>
        </div>
      </header>

      <main className="flex-1 grid lg:grid-cols-2">
        {/* Brand panel */}
        <aside className="hidden lg:flex flex-col justify-between p-14 border-r border-white/10 bg-gradient-to-br from-ink via-[#1a120b] to-[#2a1a0c]">
          <div>
            <div className="inline-flex items-center gap-2 mb-10">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
              <span className="font-display text-xs uppercase tracking-[0.32em] text-amber-200/90">
                Live Médina · Console
              </span>
            </div>
            <h1 className="font-serif text-5xl leading-tight mb-6">
              {t("auth.admin.title")}
            </h1>
            <p className="text-sand-50/70 max-w-md leading-relaxed">
              {t("auth.admin.subtitle")}
            </p>
          </div>
          <ul className="space-y-3 text-sm text-sand-50/70">
            <li className="flex items-start gap-3"><span className="text-amber-300 mt-0.5">·</span>{t("auth.admin.bullet1")}</li>
            <li className="flex items-start gap-3"><span className="text-amber-300 mt-0.5">·</span>{t("auth.admin.bullet2")}</li>
            <li className="flex items-start gap-3"><span className="text-amber-300 mt-0.5">·</span>{t("auth.admin.bullet3")}</li>
          </ul>
        </aside>

        {/* Form panel */}
        <section className="flex items-center justify-center p-6 md:p-14">
          <div className="w-full max-w-md">
            <div className="border border-white/15 bg-white/[0.03] backdrop-blur-sm p-8 md:p-10">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-amber-300/30 bg-amber-300/5 mb-5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span className="font-display text-[10px] uppercase tracking-[0.28em] text-amber-200">
                    {t("auth.admin.badge")}
                  </span>
                </div>
                <h2 className="font-serif text-3xl mb-2">{t("auth.admin.formTitle")}</h2>
                <p className="text-sm text-sand-50/60">{t("auth.admin.formSub")}</p>
              </div>

              <form onSubmit={submit} className="space-y-5">
                <DarkField icon={Mail} label={t("auth.email")}>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@livemedina.dz"
                    className="rounded-none border-white/15 bg-black/20 text-sand-50 placeholder:text-sand-50/30"
                    autoComplete="email"
                  />
                </DarkField>
                <DarkField icon={Lock} label={t("auth.password")}>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="rounded-none border-white/15 bg-black/20 text-sand-50 placeholder:text-sand-50/30"
                    autoComplete="current-password"
                  />
                </DarkField>
                <DarkField icon={KeyRound} label={t("auth.admin.code")}>
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="MEDINA-XXXX"
                    className="rounded-none border-white/15 bg-black/20 text-sand-50 placeholder:text-sand-50/30 tracking-[0.2em] font-mono uppercase"
                  />
                  <p className="text-[10px] text-sand-50/40 mt-1.5 leading-snug">
                    {t("auth.admin.codeHint")}
                  </p>
                </DarkField>

                {error && (
                  <div className="border border-red-400/40 bg-red-400/10 text-red-200 text-xs px-3 py-2 font-serif">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full rounded-none bg-amber-300 text-ink hover:bg-amber-200 font-display uppercase tracking-[0.2em] text-xs"
                >
                  {loading ? t("common.loading") : t("auth.admin.cta")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <Link
                  to="/auth"
                  className="text-xs text-sand-50/60 hover:text-sand-50 font-display uppercase tracking-[0.22em]"
                >
                  {t("auth.admin.toPublic")}
                </Link>
              </div>
            </div>
            <p className="text-center text-[10px] text-sand-50/40 mt-6 font-display uppercase tracking-[0.28em]">
              {t("auth.admin.footer")}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

const DarkField = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center gap-2 mb-1.5">
      <Icon className="w-3.5 h-3.5 text-amber-300" />
      <span className="font-display text-[10px] uppercase tracking-[0.22em] text-sand-50/70">{label}</span>
    </div>
    {children}
  </div>
);

export default AdminAccess;
