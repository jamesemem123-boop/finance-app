import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: { translation: { "settings": "Settings", "language": "English" } },
  es: { translation: { "settings": "Ajustes", "language": "Español" } },
  fr: { translation: { "settings": "Paramètres", "language": "Français" } },
  ig: { translation: { "settings": "Ntọala", "language": "Igbo" } },
  yo: { translation: { "settings": "Ètò", "language": "Yorùbá" } },
  ha: { translation: { "settings": "Saituna", "language": "Hausa" } },
  ar: { translation: { "settings": "إعدادات", "language": "العربية" } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;