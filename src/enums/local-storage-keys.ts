export const localStorageKeys = {
    lang: "lang",
    theme: "theme",
} as const;

export type LocalStorageKey = (typeof localStorageKeys)[keyof typeof localStorageKeys];
