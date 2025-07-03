import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface LoginProps {
  onLogin: (role: "student" | "admin" | "tutor") => void;
}

function Login({ onLogin }: LoginProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"student" | "admin" | "tutor">("student");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    localStorage.setItem("authToken", "demoToken");
    localStorage.setItem("userRole", role);

    onLogin(role);
    navigate(`/dashboard/student`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/Icons/9161244.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/40 to-white/30 z-0" />

      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-xl p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full mx-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="hidden md:flex flex-1 justify-center items-center">
          <img src="/Icons/illustrations.jpg" alt="Login Illustration" className="object-contain max-w-xs w-full h-auto" />
        </div>

        <div className="flex-1 w-full">
          <h2 className="text-3xl font-medium text-gray-700">{t("auth.login.title")}</h2>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("auth.login.subtitle")}</h1>
          <p className="text-gray-600 mb-6 text-sm">{t("auth.login.description")}</p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder={t("auth.login.yourEmail")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={role !== "admin"}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.login.yourPassword")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={role !== "admin"}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">
                {t("auth.login.rememberMe")}
              </label>
            </div>

            <div className="space-x-4 text-sm">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={() => setRole("student")}
                  className="mr-2"
                />
                {t("auth.roles.student")}
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                  className="mr-2"
                />
                {t("auth.roles.admin")}
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="tutor"
                  checked={role === "tutor"}
                  onChange={() => setRole("tutor")}
                  className="mr-2"
                />
                {t("auth.roles.tutor")}
              </label>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition duration-300"
            >
              {t("auth.login.loginButton")}
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center border py-2 rounded-md hover:bg-gray-50 transition duration-300"
            >
              <img src="/Icons/google.png" alt="Google" className="w-5 h-5 mr-2" />
              {t("auth.login.googleLogin")}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-500 flex justify-center gap-4">
            <span>
              {t("auth.login.noAccount")}
              <Link to="/signin" className="text-orange-500 ml-1 hover:underline">
                {t("auth.login.signUp")}
              </Link>
            </span>
            <span>|</span>
            <span>
              <Link to="/forgot-password" className="text-orange-500 hover:underline">
                {t("auth.login.forgotPassword")}
              </Link>
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;