export const localStorageKeys = {
    lang: "lang",
    theme: "theme",
    isSidebarCollapsed: "isSidebarCollapsed",
} as const;

export type LocalStorageKey = (typeof localStorageKeys)[keyof typeof localStorageKeys];
