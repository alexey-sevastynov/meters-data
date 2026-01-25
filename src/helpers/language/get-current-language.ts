import { language } from "@/constants/language";
import { LanguageKey, languageKeys } from "@/enums/language-keys";
import { enUS, uk } from "date-fns/locale";

export function getCurrentLanguage(lang: string) {
    return lang.toLowerCase() === language.ua.toLowerCase() ? language.ua : language.en;
}

export function getLocale(languageKey: LanguageKey) {
    switch (languageKey) {
        case languageKeys.en:
            return enUS;
        case languageKeys.ua:
            return uk;
        default:
            return enUS;
    }
}
