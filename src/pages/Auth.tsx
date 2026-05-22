import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Compass, Home, ShieldCheck } from "lucide-react";
import { Header } from "@/components/medina/Header";
import { Footer } from "@/components/medina/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, UserRole, dashboardPathForRole } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";
import { toast } from "@/hooks/use-toast";

type Mode = "signin" | "signup";

const roleOptions: { id: UserRole; icon: React.ComponentType<{ className?: string }>; labelKey: string; descKey: string }[] = [
  { id: "client", icon: User, labelKey: "auth.role.client", descKey: "auth.role.client.desc" },
  { id: "guide", icon: Compass, labelKey: "auth.role.guide", descKey: "auth.role.guide.desc" },
  { id: "proprietaire", icon: Home, labelKey: "auth.role.owner", descKey: "auth.role.owner.desc" },
  { id: "admin", icon: ShieldCheck, labelKey: "auth.role.admin", descKey: "auth.role.admin.desc" },
];

const Auth = ({ mode: initialMode }: { mode: Mode }) => {
  const { t } = useI18n();
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("client");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const customRedirect = (location.state as { from?: string } | null)?.from;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password || (mode === "signup" && !name)) {
      setError(t("auth.error.required"));
      return;
    }
    if (mode === "signup" && password.length < 6) {
      setError(t("auth.error.passwordShort"));
      return;
    }
    setLoading(true);
    const res = mode === "signup" ? await signUp(name, email, password, role) : await signIn(email, password);
    setLoading(false);
    if (res.error) {
      setError(t(res.error));
      return;
    }
    toast({ title: t("auth.welcome"), description: email });
    const dest = customRedirect ?? (res.role ? dashboardPathForRole(res.role) : "/");
    navigate(dest, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-md frame-cirta bg-card p-8 md:p-10">
          <div className="text-center mb-8">
            <p className="eyebrow mb-2">Live Médina · Cirta</p>
            <h1 className="font-serif text-3xl text-ink mb-2 leading-tight">
              {mode === "signin" ? t("auth.signin.title") : t("auth.signup.title")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === "signin" ? t("auth.signin.sub") : t("auth.signup.sub")}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <Field icon={User} label={t("auth.name")}>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Amina B."
                  className="rounded-none border-border-soft bg-transparent"
                />
              </Field>
            )}
            {mode === "signup" && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brown" />
                  <span className="eyebrow text-[10px]">{t("auth.role.label")}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {roleOptions.map((r) => {
                    const selected = role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`text-start p-3 border transition-all ${
                          selected
                            ? "bg-primary text-primary-foreground border-brown-dark"
                            : "border-border-soft hover:bg-secondary"
                        }`}
                      >
                        <r.icon className={`w-4 h-4 mb-1 ${selected ? "text-sand-50" : "text-brown"}`} />
                        <p className={`font-display text-[10px] uppercase tracking-[0.18em] mb-0.5 ${selected ? "text-sand-100" : "text-brown"}`}>
                          {t(r.labelKey)}
                        </p>
                        <p className={`text-[11px] leading-snug ${selected ? "text-sand-50/90" : "text-muted-foreground"}`}>
                          {t(r.descKey)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <Field icon={Mail} label={t("auth.email")}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.dz"
                className="rounded-none border-border-soft bg-transparent"
                autoComplete="email"
              />
            </Field>
            <Field icon={Lock} label={t("auth.password")}>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="rounded-none border-border-soft bg-transparent"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </Field>

            {error && (
              <div className="border border-destructive/40 bg-destructive/10 text-destructive text-xs px-3 py-2 font-serif">
                {error}
              </div>
            )}

            <Button type="submit" variant="cirta" size="lg" className="w-full" disabled={loading}>
              {loading ? t("common.loading") : mode === "signin" ? t("auth.signin.cta") : t("auth.signup.cta")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border-soft text-center space-y-3">
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-sm text-brown hover:text-brown-dark font-serif"
            >
              {mode === "signin" ? t("auth.toSignup") : t("auth.toSignin")}{" "}
              <span className="underline underline-offset-4">
                {mode === "signin" ? t("auth.signup.cta") : t("auth.signin.cta")}
              </span>
            </button>
            <div>
              <Link
                to="/"
                className="text-xs text-muted-foreground hover:text-ink font-display uppercase tracking-widest"
              >
                {t("auth.guest")}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Field = ({
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
      <Icon className="w-3.5 h-3.5 text-brown" />
      <span className="eyebrow text-[10px]">{label}</span>
    </div>
    {children}
  </div>
);

export default Auth;
