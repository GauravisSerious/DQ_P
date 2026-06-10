import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import PublicLayout from "./layouts/PublicLayout";
import { useAudit } from "./context/AuditContext";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import ResultsDashboardPage from "./pages/app/ResultsDashboardPage";
import RunningAuditPage from "./pages/app/RunningAuditPage";
import SettingsPage from "./pages/app/SettingsPage";
import WizardPage from "./pages/app/WizardPage";
import MsldResultsPage from "./pages/app/MsldResultsPage";
import NotFoundPage from "./pages/system/NotFoundPage";

function App() {
  const { user } = useAudit();
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/app"
        element={user ? <AppLayout /> : <Navigate to="/auth" replace />}
      >
        <Route index element={<Navigate to="audit" replace />} />
        <Route path="audit" element={<WizardPage />} />
        <Route path="running" element={<RunningAuditPage />} />
        <Route path="results" element={<ResultsDashboardPage />} />
        
        {/* MSLD Routes */}
        <Route path="msld" element={<MsldResultsPage />} />
        <Route path="msld/running" element={<Navigate to="/app/msld" replace />} />
        <Route path="msld/results" element={<MsldResultsPage />} />
        
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
