import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Add language detection
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: { /* English translations */ } },
      ar: { translation: { /* Arabic translations */ } }
    },
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie']
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
