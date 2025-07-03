import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage(t("auth.enterEmail"));
      setStatus("error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setMessage(t("auth.resetSent"));
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4" style={{ backgroundImage: "url('/Icons/9161244.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/30 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-xl p-10 max-w-md w-full"
      >
        <motion.h1 className="text-3xl font-bold text-orange-600 mb-4 text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          {t("auth.forgotPassword")}
        </motion.h1>

        <motion.p className="text-sm text-gray-700 mb-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          {t("auth.enterEmailForReset")}
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t("auth.emailAddress")}
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {status === "loading" ? t("auth.sending") : t("auth.sendResetLink")}
          </motion.button>
        </form>

        {message && (
          <motion.p
            className={`mt-4 text-sm text-center ${status === "success" ? "text-green-600" : "text-red-600"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.p>
        )}

        <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <p className="text-sm text-gray-600">
            {t("auth.rememberedPassword")}{" "}
            <Link to="/" className="text-orange-600 font-semibold hover:underline">
              {t("auth.backToLogin")}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;