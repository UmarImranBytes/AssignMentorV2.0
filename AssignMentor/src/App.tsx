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
import "./i18n"; // Ensure i18n is initialized

import { useTranslation } from "react-i18next";

import Login from "./Auth/Login";
import Signin from "./Auth/SignIn";
import SignupStudent from "./Auth/SignupStudent";
import SignupTutor from "./Auth/SignupTutor";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";

import DashboardUser from "./User/DashboardUser";
import PostAssignments from "./User/PostAssignmets";
import ViewAssignments from "./User/ViewAssignments";
import RecentAssignments from "./User/RecentAssignments";
import Profile from "./User/Profile";
import Settings from "./User/Settings";
import Calendar from "./User/Calendar";
import Complaint from "./User/Complaint";

import TutorDashboard from "./Tutor/DashboardTutor";
import SubmitAssignment from "./Tutor/SubmitAssignmet";
import TutorViewAssignments from "./Tutor/ViewAssignment";
import TutorComplaint from "./Tutor/Complaints";
import TutorProfile from "./Tutor/Profile";
import TutorSettings from "./Tutor/Settings";

import AdminDashboard from "./Admin/DashboardAdmin";
import ManageUsers from "./Admin/ManageUsers";
import AdminProfile from "./Admin/Profile";
import AdminSettings from "./Admin/Settings";
import ViewAssignmentsAdmin from "./Admin/ViewAssignments";
import AdminComplaints from "./Admin/Complaints";

import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import { Menu, X } from "lucide-react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

function DashboardLayout({ role }: { role: "student" | "admin" | "tutor" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location, isMobile]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <>
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

      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <Sidebar
          collapsed={isMobile ? !sidebarOpen : sidebarCollapsed}
          role={role}
          onToggleCollapse={toggleSidebar}
          isMobile={isMobile}
        />
        <main
          className={`flex-2 overflow-y-auto transition-all duration-500 ${
            sidebarCollapsed ? "ml-0 md:ml-16" : "ml-0 md:ml-64"
          }`}
          style={{ paddingTop: "1.5rem" }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}

function AnimatedRoutes({ onLogin }: { onLogin: (role: "student" | "admin" | "tutor") => void }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login onLogin={onLogin} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup/student" element={<SignupStudent onLogin={() => onLogin("student")} />} />
        <Route path="/signup/tutor" element={<SignupTutor onLogin={() => onLogin("tutor")} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [userRole, setUserRole] = useState<"student" | "admin" | "tutor" | null>(() => {
    return localStorage.getItem("userRole") as "student" | "admin" | "tutor" | null;
  });

  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = ["ar", "ur"].includes(lang) ? "rtl" : "ltr";
  }, []);

  const handleLogin = (role: "student" | "admin" | "tutor") => {
    localStorage.setItem("userRole", role);
    setUserRole(role);
  };

  return (
    <>
      <Routes>
        <Route path="/*" element={<AnimatedRoutes onLogin={handleLogin} />} />
        {userRole && (
          <Route path="/dashboard" element={<DashboardLayout role={userRole} />}>
            {userRole === "student" && (
              <>
                <Route index element={<DashboardUser />} />
                <Route path="student" element={<DashboardUser />} />
                <Route path="student/postassignments" element={<PostAssignments />} />
                <Route path="student/viewassignments" element={<ViewAssignments />} />
                <Route path="student/recentassignments" element={<RecentAssignments />} />
                <Route path="student/profile" element={<Profile />} />
                <Route path="student/settings" element={<Settings />} />
                <Route path="student/complaint" element={<Complaint />} />
                <Route path="student/calendar" element={<Calendar />} />
              </>
            )}
            {userRole === "tutor" && (
              <>
                <Route index element={<TutorDashboard />} />
                <Route path="tutor" element={<TutorDashboard />} />
                <Route path="tutor/submitassignment" element={<SubmitAssignment />} />
                <Route path="tutor/viewassignments" element={<TutorViewAssignments />} />
                <Route path="tutor/complaint" element={<TutorComplaint />} />
                <Route path="tutor/profile" element={<TutorProfile />} />
                <Route path="tutor/settings" element={<TutorSettings />} />
              </>
            )}
            {userRole === "admin" && (
              <>
                <Route index element={<AdminDashboard />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/users" element={<ManageUsers />} />
                <Route path="admin/profile" element={<AdminProfile />} />
                <Route path="admin/settings" element={<AdminSettings />} />
                <Route path="admin/viewassignments" element={<ViewAssignmentsAdmin />} />
                <Route path="admin/complaints" element={<AdminComplaints />} />
              </>
            )}
            <Route path="*" element={<Navigate to={`/dashboard/${userRole}`} replace />} />
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
        rtl={["ar", "ur"].includes(i18n.language)}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
