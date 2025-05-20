import { getLocalStorageItem, setLocalStorageItem } from "@/utils/local-storage";
import { ThemeMode, themeModes } from "@/components/context/theme-provider/theme-provider-types";
import { localStorageKeys } from "@/enums/local-storage-keys";
import { isBrowser } from "@/lib/environments";
import { VoidFunc } from "@/types/getter-setter-functions";

export function getInitialTheme() {
    const storedTheme = getLocalStorageItem<ThemeMode>(localStorageKeys.theme);

    if (storedTheme && storedTheme in themeModes) {
        return storedTheme;
    }

    return getSystemThemeMode();
}

export function updateThemeMode(theme: ThemeMode, setTheme: VoidFunc<ThemeMode>) {
    setTheme(theme);
    setLocalStorageItem(localStorageKeys.theme, theme);

    const root = document.documentElement;
    root.classList.remove(themeModes.light, themeModes.dark);
    root.classList.add(theme);
}

export function toggleThemeMode(theme: ThemeMode, setTheme: VoidFunc<ThemeMode>) {
    const newThemeKey = isLightMode(theme) ? themeModes.dark : themeModes.light;

    updateThemeMode(newThemeKey, setTheme);
}

export function isDarkMode(theme: ThemeMode) {
    return theme === themeModes.dark;
}

export function isLightMode(theme: ThemeMode) {
    return theme === themeModes.light;
}

export function setDarkThemeMode(setTheme: VoidFunc<ThemeMode>) {
    updateThemeMode(themeModes.dark, setTheme);
}

export function setLightThemeMode(setTheme: VoidFunc<ThemeMode>) {
    updateThemeMode(themeModes.light, setTheme);
}

function getSystemThemeMode() {
    if (isBrowser() && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? themeModes.dark : themeModes.light;
    }

    return themeModes.light;
}
