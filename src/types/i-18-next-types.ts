import { supportedLangs } from "@/store/i18n/config";
import englishTranslate from "@/store/i18n/en/translation.json";

export type SupportedLang = keyof typeof supportedLangs;
export type TranslationsByLang = Record<SupportedLang, TranslationKeys>;
export type TranslationKeys = typeof englishTranslate;
