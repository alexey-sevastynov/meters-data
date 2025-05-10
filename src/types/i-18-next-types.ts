import { supportedLangs } from "@/constants/language";
import englishTranslate from "@/store/i18n/en/translation.json";

export type SupportedLang = keyof typeof supportedLangs;
export type TranslationsByLang = Record<SupportedLang, TranslationKeys>;
export type TranslationKeys = typeof englishTranslate;
