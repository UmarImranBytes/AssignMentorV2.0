import React, { useState } from "react";
import { Link } from "react-router"; // fixed import
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // ✅ i18n hook

const RequestPasswordReset: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(t("resetSent"));
    setError(null);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('/Icons/9161244.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/30 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-white bg-opacity-90 p-10 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <motion.h2
          className="text-3xl font-bold text-orange-600 mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t("forgotPassword")}
        </motion.h2>

        {message && (
          <motion.p
            className="mb-4 text-green-700 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.p>
        )}
        {error && (
          <motion.p
            className="mb-4 text-red-700 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              {t("emailAddress")}
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-orange-700"
          >
            {t("sendLink")}
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-gray-600">
            {t("remembered")}{" "}
            <Link to="/" className="text-orange-600 font-semibold hover:underline">
              {t("backToLogin")}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RequestPasswordReset;
