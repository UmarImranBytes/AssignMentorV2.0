import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

interface TutorSignupProps {
  onLogin: (role: "tutor") => void;
}

const TutorSignup: React.FC<TutorSignupProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [experience, setExperience] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleCvUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error(t("auth.signup.tutor.invalidFileType"));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(t("auth.signup.tutor.fileTooLarge"));
        return;
      }

      setCvFile(file);
    }
  };

  const removeCvFile = () => {
    setCvFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !experience || !cvFile) {
      toast.error(t("auth.signup.tutor.fillAllFields"));
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(t("auth.signup.passwordRequirements"));
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("experience", experience);
    if (cvFile) formData.append("cv", cvFile);

    toast.success(t("auth.signup.tutor.success"), {
      position: "top-center",
      autoClose: 2500,
      theme: "colored",
    });

    onLogin("tutor");

    setTimeout(() => {
      navigate("/dashboard/tutor");
    }, 2600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/Icons/9161244.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/30 z-0" />
      <ToastContainer />

      <motion.div
        className="relative z-10 bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-5xl mx-4 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="hidden md:block md:w-1/2 p-6 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <img src="/Icons/teacher.jpg" alt="Tutor Illustration" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 p-8 sm:p-10"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">
            {t("auth.signup.tutor.title")}
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={t("auth.signup.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="password"
              placeholder={t("auth.signup.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={t("auth.signup.firstName")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <input
                type="text"
                placeholder={t("auth.signup.lastName")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <input
              type="text"
              placeholder={t("auth.signup.tutor.experience")}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />

            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-orange-500 rounded-lg cursor-pointer hover:bg-orange-50 transition">
              <span className="text-orange-600 font-semibold">
                {cvFile ? t("auth.signup.tutor.changeCV") : t("auth.signup.tutor.uploadCV")}
              </span>
              <input
                type="file"
                accept=".doc,.docx,.pdf"
                className="hidden"
                onChange={handleCvUpload}
              />
            </label>

            {cvFile && (
              <div className="flex items-center justify-between bg-orange-100 p-2 rounded-lg">
                <span className="text-sm text-orange-700 truncate max-w-xs">
                  {cvFile.name}
                </span>
                <button
                  type="button"
                  onClick={removeCvFile}
                  className="text-red-600 font-semibold hover:underline"
                >
                  {t("auth.signup.tutor.remove")}
                </button>
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 p-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              {t("auth.signup.tutor.signupButton")}
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

export default TutorSignup;