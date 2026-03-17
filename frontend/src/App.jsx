import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import "@/App.css";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RiskPanel from "./pages/RiskPanel";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import UserDashboard from "./pages/UserDashboard";
import { getAuthToken } from "./lib/api";

function ProtectedRoute({ children }) {
  const token = getAuthToken();
  if (!token) {
    return <Navigate to="/ngo/login" replace />;
  }
  return children;
}

function AppShell() {
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/ngo/login" ||
    location.pathname === "/ngo/signup" ||
    location.pathname === "/user/login" ||
    location.pathname === "/user/signup";

  const isDashboard =
    location.pathname === "/ngo/dashboard" ||
    location.pathname === "/user/dashboard";
  const isRiskPanel = location.pathname === "/ngo/risk-panel";

  return (
    <div className="App min-h-screen bg-[#0f0f14] text-white overflow-x-hidden">
      <div className="noise-overlay" />

      {!isAuthRoute && (
        <Navbar
          variant={
            isDashboard ? "dashboard" : isRiskPanel ? "risk-panel" : "landing"
          }
        />
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/ngo/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ngo/risk-panel"
          element={
            <ProtectedRoute>
              <RiskPanel />
            </ProtectedRoute>
          }
        />
        <Route path="/ngo/login" element={<Login />} />
        <Route path="/ngo/signup" element={<Signup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;

