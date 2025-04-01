export const languageKeys = {
    en: "en",
    ua: "ua",
} as const;

export type LanguageKey = (typeof languageKeys)[keyof typeof languageKeys];
