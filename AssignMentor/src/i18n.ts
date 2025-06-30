import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ur from "./locales/ur.json";
import fr from "./locales/fr.json";
import ar from "./locales/ar.json";
import zh from "./locales/zh.json";

i18n
  .use(LanguageDetector) // Detect language from browser
  .use(initReactI18next) // Integrate with React
  .init({
    resources: {
      en: { translation: en },
      ur: { translation: ur },
      fr: { translation: fr },
      ar: { translation: ar },
      zh: { translation: zh },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"],
    },
  });

export default i18n;
