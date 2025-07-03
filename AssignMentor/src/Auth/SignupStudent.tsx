import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

interface SignUpProps {
  onLogin: (role: "student") => void;
}

const SignUp: React.FC<SignUpProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      toast.error(t("auth.signup.fillAllFields"), {
        position: "top-center",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!strongPasswordRegex.test(password)) {
      toast.error(t("auth.signup.passwordRequirements"), {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    toast.success(t("auth.signup.success"), {
      position: "top-center",
      autoClose: 2000,
      theme: "colored",
    });

    setTimeout(() => {
      localStorage.setItem("authToken", "demoToken");
      localStorage.setItem("userRole", "student");
      onLogin("student");
      navigate("/dashboard/student");
    }, 2100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-cover bg-center" style={{ backgroundImage: "url('/Icons/9161244.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/30 z-10" />
      <ToastContainer />

      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 max-w-4xl w-full z-20 relative"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-1/2 hidden md:flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <img src="/Icons/illustrations_2.jpg" alt="Learning Illustration" className="w-full h-auto max-h-72 object-contain" />
        </motion.div>

        <motion.div className="w-full md:w-1/2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
          <h2 className="text-3xl font-medium text-gray-700">{t("auth.signup.student.title")}</h2>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("auth.signup.student.subtitle")}</h1>
          <p className="text-gray-600 mb-6">{t("auth.signup.student.description")}</p>

          <form className="space-y-4" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder={t("auth.signup.firstName")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="text"
              placeholder={t("auth.signup.lastName")}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="email"
              placeholder={t("auth.signup.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.signup.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-2.5 right-3 text-orange-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition cursor-pointer"
            >
              {t("auth.signup.signupButton")}
            </motion.button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            {t("auth.signup.haveAccount")}
            <Link to="/" className="text-orange-500 ml-1 font-medium hover:underline">
              {t("auth.signup.login")}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;