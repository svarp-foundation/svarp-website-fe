import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import hi from './locales/hi/translation.json';
import th from './locales/th/translation.json';
import es from './locales/es/translation.json';
import fr from './locales/fr/translation.json';
import ar from './locales/ar/translation.json';
import zh from './locales/zh/translation.json';
import ja from './locales/ja/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      th: { translation: th },
      es: { translation: es },
      fr: { translation: fr },
      ar: { translation: ar },
      zh: { translation: zh },
      ja: { translation: ja },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'th', 'es', 'fr', 'ar', 'zh', 'ja'],
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
