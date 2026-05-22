import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/contexts/I18nContext";
import { AuthProvider, useAuth, dashboardPathForRole } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import Hebergement from "./pages/Hebergement.tsx";
import Experiences from "./pages/Experiences.tsx";
import Parcours from "./pages/Parcours.tsx";
import Bibliotheque from "./pages/Bibliotheque.tsx";
import Auth from "./pages/Auth.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ClientDashboard from "./pages/dashboards/ClientDashboard.tsx";
import GuideDashboard from "./pages/dashboards/GuideDashboard.tsx";
import OwnerDashboard from "./pages/dashboards/OwnerDashboard.tsx";
import AdminDashboard from "./pages/dashboards/AdminDashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const DashboardRedirect = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) return null;
  if (!user) return <Navigate to="/auth" replace />;
  return <Navigate to={dashboardPathForRole(user.role)} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/hebergement" element={<Hebergement />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/parcours" element={<Parcours />} />
              <Route path="/bibliotheque" element={<Bibliotheque />} />
              <Route path="/auth" element={<Auth mode="signin" />} />
              <Route path="/auth/signup" element={<Auth mode="signup" />} />
              <Route path="/dashboard" element={<DashboardRedirect />} />
              <Route path="/dashboard/legacy" element={<Dashboard />} />
              <Route path="/client" element={<ClientDashboard />} />
              <Route path="/guide" element={<GuideDashboard />} />
              <Route path="/proprietaire" element={<OwnerDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
