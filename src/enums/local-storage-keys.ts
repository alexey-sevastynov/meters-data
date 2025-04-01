export const localStorageKeys = {
    lang: "lang",
} as const;

export type LocalStorageKey = (typeof localStorageKeys)[keyof typeof localStorageKeys];
