import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TutorComplaint() {
  const { t } = useTranslation();
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: send tutor complaint to backend

    setTimeout(() => {
      setSubmitted(false);
      setComplaint("");
    }, 3000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto min-h-screen flex items-center justify-center">
      <div className="w-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-2xl p-8 transition duration-300 hover:shadow-xl">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          {t("complaint.title")}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              placeholder={t("complaint.placeholder")}
              className="w-full p-4 border-none rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:outline-none resize-y transition duration-200 shadow-md placeholder-gray-400 dark:placeholder-gray-500"
              rows={6}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            disabled={submitted}
          >
            {submitted ? t("complaint.submitting") : t("complaint.submitButton")}
          </button>
          {submitted && (
            <p className="text-green-600 dark:text-green-400 text-center animate-pulse">
              {t("complaint.successMessage")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}