import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router";
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth Pages
import Login from "./Auth/Login";
import Signin from "./Auth/SignIn";
import SignupStudent from "./Auth/SignupStudent";
import SignupTutor from "./Auth/SignupTutor";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";

// Student Pages
import DashboardUser from "./User/DashboardUser";
import PostAssignments from "./User/PostAssignmets";
import ViewAssignments from "./User/ViewAssignments";
import RecentAssignments from "./User/RecentAssignments";
import Profile from "./User/Profile";
import Settings from "./User/Settings";
import Calendar from "./User/Calendar";
import Complaint from "./User/Complaint";

// Tutor Pages
import TutorDashboard from "./Tutor/DashboardTutor";
import SubmitAssignment from "./Tutor/SubmitAssignmet";
import TutorViewAssignments from "./Tutor/ViewAssignment";
import TutorCalendar from "./Tutor/Calendar";
import TutorComplaint from "./Tutor/Complaints";
import TutorProfile from "./Tutor/Profile";
import TutorSettings from "./Tutor/Settings";

// Components
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import { Menu, X } from "lucide-react";

// Custom hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

// Dashboard layout
function DashboardLayout({ role }: { role: "student" | "admin" | "tutor" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();

  // Auto-close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location, isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          className="fixed z-30 p-2 md:hidden top-4 left-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onLogout={handleLogout}
        role={role}
        userName="Demo User"
      />

      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Sidebar
          collapsed={isMobile ? !sidebarOpen : sidebarCollapsed}
          role={role}
          onToggleCollapse={toggleSidebar}
          isMobile={isMobile}
        />
        <main
          className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ${
            sidebarCollapsed ? "ml-0 md:ml-16" : "ml-0 md:ml-64"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

// Auth Routes
function AnimatedRoutes({
  onLogin,
}: {
  onLogin: (role: "student" | "admin" | "tutor") => void;
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login onLogin={onLogin} />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/signup/student"
          element={<SignupStudent onLogin={() => onLogin("student")} />}
        />
        <Route
          path="/signup/tutor"
          element={<SignupTutor onLogin={() => onLogin("tutor")} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

// App Component
export default function App() {
  const [userRole, setUserRole] = useState<"student" | "admin" | "tutor" | null>(
    () => {
      return localStorage.getItem("userRole") as
        | "student"
        | "admin"
        | "tutor"
        | null;
    }
  );

  const handleLogin = (role: "student" | "admin" | "tutor") => {
    localStorage.setItem("userRole", role);
    setUserRole(role);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<AnimatedRoutes onLogin={handleLogin} />} />
        {userRole && (
          <Route path="/dashboard" element={<DashboardLayout role={userRole} />}>
            {/* Student Routes */}
            {userRole === "student" && (
              <>
                <Route index element={<DashboardUser />} />
                <Route path="student" element={<DashboardUser />} />
                <Route
                  path="student/postassignments"
                  element={<PostAssignments />}
                />
                <Route
                  path="student/viewassignments"
                  element={<ViewAssignments />}
                />
                <Route
                  path="student/recentassignments"
                  element={<RecentAssignments />}
                />
                <Route path="student/profile" element={<Profile />} />
                <Route path="student/settings" element={<Settings />} />
                <Route path="student/complaint" element={<Complaint />} />
                <Route path="student/calendar" element={<Calendar />} />
              </>
            )}

            {/* Tutor Routes */}
            {userRole === "tutor" && (
              <>
                <Route index element={<TutorDashboard />} />
                <Route path="tutor" element={<TutorDashboard />} />
                <Route
                  path="tutor/submitassignment"
                  element={<SubmitAssignment />}
                />
                <Route
                  path="tutor/viewassignments"
                  element={<TutorViewAssignments />}
                />
                <Route path="tutor/calendar" element={<TutorCalendar />} />
                <Route path="tutor/complaint" element={<TutorComplaint />} />
                <Route path="tutor/profile" element={<TutorProfile />} />
                <Route path="tutor/settings" element={<TutorSettings />} />
              </>
            )}

            <Route
              path="*"
              element={<Navigate to={`/dashboard/${userRole}`} replace />}
            />
          </Route>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}