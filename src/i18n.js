import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./locales/en.json";
import hi from "./locales/hi.json";

const resources = { en: { translation: en }, hi: { translation: hi } };

// v3+: findBestLanguageTag  |  v2/older: findBestAvailableLanguage
const findBest =
  RNLocalize.findBestLanguageTag ?? RNLocalize.findBestAvailableLanguage;

const best = findBest ? findBest(Object.keys(resources)) : null;
const languageTag = best?.languageTag ?? "en";

i18n.use(initReactI18next).init({
  resources,
  lng: languageTag,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// optional: call from a button to switch
export const changeLanguage = (lng) => i18n.changeLanguage(lng);

export default i18n;
