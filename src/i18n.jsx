import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// ملف الترجمة
import translation from "../public/locales/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translation.en
      },
      ar: {
        translation: translation.ar
      }
    },
    lng: "ar", // اللغة الافتراضية
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;