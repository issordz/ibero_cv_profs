import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import FacultyDirectory from "./pages/FacultyDirectory";
import FacultyProfile from "./pages/FacultyProfile";
import Reports from "./pages/Reports";
import ValidacionesPendientes from "./pages/ValidacionesPendientes";
import UserManagement from "./pages/UserManagement";
import ProfileSection from "./pages/professor/ProfileSection";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Cargando...
      </div>
    );
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const RecaptchaBadgeController = () => {
  const { isAuthenticated } = useAuth();

  // Cargar el script de reCAPTCHA v3 dinámicamente
  useEffect(() => {
    const scriptId = "recaptcha-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Controlar visibilidad del badge
  useEffect(() => {
    const styleId = "recaptcha-badge-style";
    let style = document.getElementById(styleId);
    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      document.head.appendChild(style);
    }
    style.textContent = isAuthenticated
      ? ".grecaptcha-badge { visibility: hidden !important; }"
      : "";
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, [isAuthenticated]);

  return null;
};

const LoginRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Cargando...
      </div>
    );
  return isAuthenticated ? (
    <Navigate to="/profile/datos-generales" replace />
  ) : (
    <Login />
  );
};

const RoleBasedRedirect = () => {
  const { user } = useAuth();
  if (user?.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/profile/datos-generales" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RecaptchaBadgeController />
        <Routes>
          <Route path="/" element={<LoginRoute />} />
          {/* Role-based redirect after login */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <RoleBasedRedirect />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>
          <Route
            path="/faculty"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<FacultyDirectory />} />
          </Route>
          <Route
            path="/faculty/:id"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<FacultyProfile />} />
          </Route>
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Reports />} />
          </Route>
          <Route
            path="/validaciones-pendientes"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ValidacionesPendientes />} />
          </Route>
          <Route
            path="/user-management"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserManagement />} />
          </Route>

          {/* Professor Routes */}
          <Route
            path="/profile/:section"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileSection />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
