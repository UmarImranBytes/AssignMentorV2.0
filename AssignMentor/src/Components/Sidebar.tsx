import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import {
  Home,
  ClipboardList,
  User,
  Clock,
  ChevronDown,
  ChevronUp,
  FilePlus,
  Search,
  Settings,
  MessageSquare,
  Calendar,
  Users,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

type UserRole = "student" | "admin" | "tutor";

interface SidebarProps {
  collapsed: boolean;
  role: "student" | "admin" | "tutor";
  onToggleCollapse: () => void;
  isMobile: boolean;
}

// --- Styling Helpers ---
const orangeHover = "hover:bg-orange-500 dark:hover:bg-orange-700";
const activeOrange = "bg-orange-500 dark:bg-orange-700 text-white";

const linkClass = (pathname: string, path: string) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
    pathname.startsWith(path) ? activeOrange : ""
  } ${orangeHover}`;

const parentMenuClass = (
  open: boolean,
  clicked: boolean,
  isChildActive: boolean
) =>
  `flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors duration-200 ${
    open && clicked && !isChildActive ? activeOrange : ""
  } ${orangeHover}`;

// --- Student Menu ---
function StudentMenu({
  collapsed,
  pathname,
}: {
  collapsed: boolean;
  pathname: string;
}) {
  const [assignmentsOpen, setAssignmentsOpen] = useState(false);
  const [assignmentsClicked, setAssignmentsClicked] = useState(false);
  const { t } = useTranslation();

  const assignmentPaths = [
    "/dashboard/student/postassignments",
    "/dashboard/student/viewassignments",
    "/dashboard/student/recentassignments",
  ];
  const isAssignmentRoute = assignmentPaths.some((path) =>
    pathname.startsWith(path)
  );

  useEffect(() => {
    setAssignmentsOpen(isAssignmentRoute);
    setAssignmentsClicked(isAssignmentRoute);
  }, [pathname]);

  return (
    <>
      <Link
        to="/dashboard/student"
        className={linkClass(pathname, "/dashboard/student")}
      >
        <Home size={20} />
        {!collapsed && <span>{t("Dashboard")}</span>}
      </Link>

      <button
        onClick={() => {
          const willClose = assignmentsOpen;
          setAssignmentsOpen(!assignmentsOpen);
          setAssignmentsClicked(!willClose);
        }}
        className={parentMenuClass(assignmentsOpen, assignmentsClicked, isAssignmentRoute)}
      >
        <div className="flex items-center gap-3">
          <ClipboardList size={20} />
          {!collapsed && <span>{t("Assignments")}</span>}
        </div>
        {!collapsed &&
          (assignmentsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
      </button>

      <div
        className={`pl-10 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
          assignmentsOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <Link
          to="/dashboard/student/postassignments"
          className={linkClass(pathname, "/dashboard/student/postassignments")}
        >
          <FilePlus size={16} />
          {!collapsed && <span>{t("Post Assignment")}</span>}
        </Link>
        <Link
          to="/dashboard/student/viewassignments"
          className={linkClass(pathname, "/dashboard/student/viewassignments")}
        >
          <Search size={16} />
          {!collapsed && <span>{t("View Assignments")}</span>}
        </Link>
        <Link
          to="/dashboard/student/recentassignments"
          className={linkClass(pathname, "/dashboard/student/recentassignments")}
        >
          <Clock size={16} />
          {!collapsed && <span>{t("Recent")}</span>}
        </Link>
      </div>

      <Link
        to="/dashboard/student/calendar"
        className={linkClass(pathname, "/dashboard/student/calendar")}
      >
        <Calendar size={20} />
        {!collapsed && <span>{t("Calendar")}</span>}
      </Link>

      <Link
        to="/dashboard/student/complaint"
        className={linkClass(pathname, "/dashboard/student/complaint")}
      >
        <MessageSquare size={20} />
        {!collapsed && <span>{t("Complaint")}</span>}
      </Link>

      <Link
        to="/dashboard/student/profile"
        className={linkClass(pathname, "/dashboard/student/profile")}
      >
        <User size={20} />
        {!collapsed && <span>{t("Profile")}</span>}
      </Link>

      <Link
        to="/dashboard/student/settings"
        className={linkClass(pathname, "/dashboard/student/settings")}
      >
        <Settings size={20} />
        {!collapsed && <span>{t("Settings")}</span>}
      </Link>
    </>
  );
}

// --- Admin Menu ---
function AdminMenu({
  collapsed,
  pathname,
}: {
  collapsed: boolean;
  pathname: string;
}) {
  const { t } = useTranslation();

  return (
    <>
      <Link to="/dashboard/admin" className={linkClass(pathname, "/dashboard/admin")}> 
        <Users size={20} />
        {!collapsed && <span>{t("Admin Dashboard")}</span>}
      </Link>
    </>
  );
}

// --- Tutor Menu ---
function TutorMenu({
  collapsed,
  pathname,
}: {
  collapsed: boolean;
  pathname: string;
}) {
  const { t } = useTranslation();
  const [assignmentsOpen, setAssignmentsOpen] = useState(false);
  const [assignmentsClicked, setAssignmentsClicked] = useState(false);

  const assignmentPaths = [
    "/dashboard/tutor/submitassignment",
    "/dashboard/tutor/viewassignments",
  ];
  const isAssignmentRoute = assignmentPaths.some((path) =>
    pathname.startsWith(path)
  );

  useEffect(() => {
    setAssignmentsOpen(isAssignmentRoute);
    setAssignmentsClicked(isAssignmentRoute);
  }, [pathname]);

  return (
    <>
      <Link to="/dashboard/tutor" className={linkClass(pathname, "/dashboard/tutor")}>
        <BookOpen size={20} />
        {!collapsed && <span>{t("Tutor Dashboard")}</span>}
      </Link>


      <button
        onClick={() => {
          const willClose = assignmentsOpen;
          setAssignmentsOpen(!assignmentsOpen);
          setAssignmentsClicked(!willClose);
        }}
        className={parentMenuClass(assignmentsOpen, assignmentsClicked, isAssignmentRoute)}
      >
        <div className="flex items-center gap-3">
          <ClipboardList size={20} />
          {!collapsed && <span>{t("Assignments")}</span>}
        </div>
        {!collapsed &&
          (assignmentsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
      </button>

      <div
        className={`pl-10 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
          assignmentsOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <Link
          to="/dashboard/tutor/submitassignment"
          className={linkClass(pathname, "/dashboard/tutor/submitassignment")}
        >
          <FilePlus size={16} />
          {!collapsed && <span>{t("Submit Assignment")}</span>}
        </Link>
        <Link
          to="/dashboard/tutor/viewassignments"
          className={linkClass(pathname, "/dashboard/tutor/viewassignments")}
        >
          <Search size={16} />
          {!collapsed && <span>{t("View Assignments")}</span>}
        </Link>
      </div>

      <Link
        to="/dashboard/tutor/messages"
        className={linkClass(pathname, "/dashboard/tutor/messages")}
      >
        <MessageCircle size={20} />
        {!collapsed && <span>{t("Messages")}</span>}
      </Link>

      <Link
        to="/dashboard/tutor/profile"
        className={linkClass(pathname, "/dashboard/tutor/profile")}
      >
        <User size={20} />
        {!collapsed && <span>{t("Profile")}</span>}
      </Link>

      <Link
        to="/dashboard/tutor/settings"
        className={linkClass(pathname, "/dashboard/tutor/settings")}
      >
        <Settings size={20} />
        {!collapsed && <span>{t("Settings")}</span>}
      </Link>
    </>
  );
}

// --- Shared (Optional) ---
function CommonMenu() {
  return <></>; // Add shared links if needed
}

// --- Sidebar Wrapper ---
const Sidebar: React.FC<SidebarProps> = ({ collapsed, role }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside
      className={`fixed z-30 h-full bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ${
        collapsed ? "w-0 md:w-16" : "w-64"
      }`}
    >
      <nav className="flex flex-col h-full">
        <div className="flex-1 px-2 py-18 space-y-2">
          {role === "student" && (
            <StudentMenu collapsed={collapsed} pathname={pathname} />
          )}
          {role === "admin" && (
            <AdminMenu collapsed={collapsed} pathname={pathname} />
          )}
          {role === "tutor" && (
            <TutorMenu collapsed={collapsed} pathname={pathname} />
          )}
          <CommonMenu />
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;