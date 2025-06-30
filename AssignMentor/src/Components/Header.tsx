import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  FiLogOut,
  FiChevronDown,
  FiSettings,
  FiUser,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import {
  MdMenu,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
  role: "student" | "admin" | "tutor" | null;
  userName?: string;
}

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  darkMode,
  setDarkMode,
  collapsed,
  setSidebarCollapsed,
  onLogout,
  role,
  userName,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#header-dropdown")) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const roleDisplay = userName
    ? userName
    : role
    ? `${role.charAt(0).toUpperCase()}${role.slice(1)}`
    : "Guest";

  // Determine base path based on role (assuming student for now, adjust for other roles)
  const basePath = role === "student" ? "/dashboard/student" : "/dashboard";

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-gray-900 shadow-md flex items-center justify-between px-4 z-50 transition-all duration-300">
      {/* Left side: Logo & Sidebar toggle */}
      <div className="flex items-center">
        {/* Mobile Sidebar Toggle */}
        <button
          className="text-gray-600 dark:text-gray-300 md:hidden mr-2 hover:text-orange-600 transition"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <MdMenu size={24} />
        </button>

        {/* Desktop Sidebar Collapse Toggle */}
        <button
          className="hidden md:flex items-center justify-center mr-4 text-gray-600 dark:text-gray-300 hover:text-orange-600 transition"
          onClick={() => setSidebarCollapsed(!collapsed)}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label="Toggle sidebar collapse"
        >
          {collapsed ? (
            <MdKeyboardDoubleArrowRight size={24} />
          ) : (
            <MdKeyboardDoubleArrowLeft size={24} />
          )}
        </button>

        {/* Title */}
        <h1 className="text-base sm:text-lg font-semibold text-orange-800 dark:text-white select-none whitespace-nowrap">
          Assignment Dashboard
        </h1>
      </div>

      {/* Right side: Theme toggle & User dropdown */}
      <div className="flex items-center space-x-3 min-w-0">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-600 dark:text-gray-300 hover:text-orange-500 transition"
          title="Toggle Dark Mode"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <FiSun size={20} className="animate-pulse" />
          ) : (
            <FiMoon size={20} />
          )}
        </button>

        {/* User Dropdown */}
        <div className="relative" id="header-dropdown">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded-lg text-sm font-medium text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition w-full sm:w-auto"
            aria-expanded={dropdownOpen}
          >
            <img
              src="/Icons/profile-user.png"
              alt="User"
              className="w-9 h-9 rounded-full object-cover border-2 border-orange-500"
              draggable={false}
              onError={(e) =>
                ((e.target as HTMLImageElement).src = "/default-profile.png")
              }
            />
            <span className="hidden sm:inline truncate max-w-[100px] sm:max-w-[120px]">
              {roleDisplay}
            </span>
            <FiChevronDown />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 ring-1 ring-black ring-opacity-5 animate-fadeIn transition-opacity duration-200">
              <Link
                to={`${basePath}/profile`}
                className="w-full px-4 py-2 flex items-center text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                onClick={() => setDropdownOpen(false)}
              >
                <FiUser className="mr-2" /> View Profile
              </Link>
              <Link
                to={`${basePath}/settings`}
                className="w-full px-4 py-2 flex items-center text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                onClick={() => setDropdownOpen(false)}
              >
                <FiSettings className="mr-2" /> Settings
              </Link>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
              <button
                onClick={() => {
                  onLogout();
                  setDropdownOpen(false);
                }}
                className="w-full px-4 py-2 flex items-center text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-600 transition"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}