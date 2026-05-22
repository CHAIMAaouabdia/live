import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/medina/Header";
import { Footer } from "@/components/medina/Footer";
import { useAuth, UserRole, dashboardPathForRole } from "@/contexts/AuthContext";
import { useI18n } from "@/contexts/I18nContext";

interface Props {
  role: UserRole;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const DashboardLayout = ({ role, eyebrow, title, subtitle, children }: Props) => {
  const { user, isLoading } = useAuth();
  const { t } = useI18n();

  if (isLoading) return null;
  if (!user) return <Navigate to="/auth" replace />;
  if (user.role !== role) return <Navigate to={dashboardPathForRole(user.role)} replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-6 lg:px-10 py-12">
          <header className="mb-10">
            <p className="eyebrow text-[10px] mb-2">{eyebrow}</p>
            <h1 className="font-serif text-3xl md:text-4xl text-ink mb-1">{title}</h1>
            {subtitle && <p className="text-muted-foreground font-serif">{subtitle}</p>}
            <p className="text-xs text-brown mt-3 font-serif italic">
              {t("dash.welcome")} <span className="text-ink not-italic">{user.name}</span>
            </p>
          </header>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface StatProps {
  label: string;
  value: string | number;
  hint?: string;
}

export const StatCard = ({ label, value, hint }: StatProps) => (
  <div className="frame-cirta-soft bg-card p-5">
    <p className="eyebrow text-[10px] mb-2">{label}</p>
    <p className="font-serif text-3xl text-ink">{value}</p>
    {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
  </div>
);
