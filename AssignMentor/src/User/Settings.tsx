import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import {
  FaMoon,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ur", label: "اردو", flag: "🇵🇰", rtl: true }
];

export default function Settings() {
  const { t, i18n } = useTranslation();

  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [emailNotifications, setEmailNotifications] = useState(
    localStorage.getItem("emailNotifications") === "false" ? false : true
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);

    const selected = LANGUAGES.find((l) => l.code === language);
    if (selected?.rtl) {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", language);
    } else {
      document.documentElement.removeAttribute("dir");
      document.documentElement.setAttribute("lang", language);
    }
  }, [language, i18n]);

  useEffect(() => {
    localStorage.setItem("emailNotifications", String(emailNotifications));
  }, [emailNotifications]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error(t("password_mismatch"));
      return;
    }
    toast.success(t("password_success"));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">{t("settings.title")}</h1>
      <div className="space-y-4">
        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-gray-700 dark:text-gray-300">
            <FaMoon className="mr-2" />
            {t("dark_mode")}
          </label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => {
              setDarkMode(!darkMode);
              toast.success(
                `${t("theme")}: ${!darkMode ? t("dark") : t("light")}`
              );
            }}
            className="w-5 h-5"
          />
        </div>

        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <label className="flex items-center text-gray-700 dark:text-gray-300">
            <FaEnvelope className="mr-2" />
            {t("email_notifications")}
          </label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => {
              setEmailNotifications(!emailNotifications);
              toast.info(
                `${t("email_notifications")}: ${
                  !emailNotifications ? t("enabled") : t("disabled")
                }`
              );
            }}
            className="w-5 h-5"
          />
        </div>

        {/* Language Picker */}
        <div>
          <label className="flex items-center text-gray-700 dark:text-gray-300 mb-1">
            <span className="mr-2">🌐</span>
            {t("language")}
          </label>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              const sel = LANGUAGES.find((l) => l.code === e.target.value);
              toast.success(`${t("language")}: ${sel?.label}`);
            }}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* Password Change */}
        <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-3">
          <div className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
            <FaLock className="mr-2" />
            {t("change_password")}
          </div>
          <input
            type="password"
            placeholder={t("current_password")}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder={t("new_password")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder={t("confirm_password")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded transition"
          >
            {t("update_password")}
          </button>
        </form>

      </div>
    </div>
  );
}
