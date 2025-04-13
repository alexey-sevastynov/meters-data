import { languageKeys } from "@/enums/language-keys";

export function currentLanguage(lang: string) {
    if (lang === languageKeys.en) return "English";

    if (lang === languageKeys.ua) return "Українська";
}
