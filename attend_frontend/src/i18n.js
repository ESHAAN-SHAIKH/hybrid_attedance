import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import hiTranslation from './locales/hi/translation.json';
import urTranslation from './locales/ur/translation.json';
import paTranslation from './locales/pa/translation.json';

// The translations
const resources = {
  en: {
    translation: enTranslation
  },
  hi: {
    translation: hiTranslation
  },
  ur: {
    translation: urTranslation
  },
  pa: {
    translation: paTranslation
  }
};

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: savedLanguage, // use saved language or default to 'en'
    fallbackLng: "en", // use en if selected language is not available
    debug: true, // Enable debug mode to see what's happening

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;