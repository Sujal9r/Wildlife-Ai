import { AnimatePresence } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ForestAlertsPage } from './pages/ForestAlertsPage';
import { ProtectedAreasPage } from './pages/ProtectedAreasPage';
import { RangersPage } from './pages/RangersPage';
import { ReportsAnalyticsPage } from './pages/ReportsAnalyticsPage';
import { WildlifeMonitoringPage } from './pages/WildlifeMonitoringPage';

const SESSION_KEY = 'forestra_session';
const SESSION_PROFILE_KEY = 'forestra_profile';

function RoutedApp() {
  const location = useLocation();
  const isAuthenticated =
    localStorage.getItem(SESSION_KEY) === 'active' &&
    Boolean(localStorage.getItem(SESSION_PROFILE_KEY));

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <AuthPage />
          }
        />
        <Route
          element={
            isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/" element={<DashboardPage />} />
          <Route path="/wildlife-monitoring" element={<WildlifeMonitoringPage />} />
          <Route path="/forest-alerts" element={<ForestAlertsPage />} />
          <Route path="/protected-areas" element={<ProtectedAreasPage />} />
          <Route path="/rangers" element={<RangersPage />} />
          <Route path="/reports-analytics" element={<ReportsAnalyticsPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return <RoutedApp />;
}
