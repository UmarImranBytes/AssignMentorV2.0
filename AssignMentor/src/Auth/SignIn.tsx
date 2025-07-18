import { Link } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Signin = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: "url('/Icons/9161244.png')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/30 z-0" />

      <motion.div
        className="relative z-10 bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 max-w-4xl w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <motion.div
          className="hidden md:block flex-1"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        >
          <img
            src="/Icons/illustrations.jpg"
            alt="Sign In Illustration"
            className="w-full h-auto max-h-72 object-contain"
          />
        </motion.div>

        <div className="flex-1 w-full text-center">
          <h2 className="text-3xl font-medium text-gray-700">{t("auth.signin.ready")}</h2>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("auth.signin.joinUs")}</h1>
          <p className="text-gray-600 mb-6 text-sm">{t("auth.signin.selectType")}</p>

          <div className="flex flex-col gap-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                to="/signup/student"
                className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold text-lg hover:bg-orange-600 hover:scale-105 transition duration-300 block"
              >
                {t("auth.signin.signupStudent")}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link
                to="/signup/tutor"
                className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold text-lg hover:bg-orange-600 hover:scale-105 transition duration-300 shadow block"
              >
                {t("auth.signin.signupTutor")}
              </Link>
            </motion.div>
          </div>

          <motion.p
            className="text-sm text-center mt-6 text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            {t("auth.signin.haveAccount")}
            <Link to="/" className="text-orange-500 ml-1 hover:underline">
              {t("auth.signin.login")}
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Signin;