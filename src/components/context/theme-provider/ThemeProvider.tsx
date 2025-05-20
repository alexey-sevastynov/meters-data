import { VoidFuncNoParam } from "@/types/getter-setter-functions";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeMode, themeModes } from "@/components/context/theme-provider/theme-provider-types";
import {
    getInitialTheme,
    isDarkMode,
    isLightMode,
    setDarkThemeMode,
    setLightThemeMode,
    toggleThemeMode,
    updateThemeMode,
} from "@/components/context/theme-provider/themeProvider.funcs";

interface ThemeContextType {
    themeMode: ThemeMode;
    toggleThemeMode: VoidFuncNoParam;
    setDarkThemeMode: VoidFuncNoParam;
    setLightThemeMode: VoidFuncNoParam;
    isDarkMode: boolean;
    isLightMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    themeMode: themeModes.light,
    toggleThemeMode: () => {},
    setDarkThemeMode: () => {},
    setLightThemeMode: () => {},
    isDarkMode: false,
    isLightMode: true,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeMode>(getInitialTheme());

    useEffect(() => {
        updateThemeMode(theme, setTheme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                themeMode: theme,
                toggleThemeMode: () => toggleThemeMode(theme, setTheme),
                setDarkThemeMode: () => setDarkThemeMode(setTheme),
                setLightThemeMode: () => setLightThemeMode(setTheme),
                isDarkMode: isDarkMode(theme),
                isLightMode: isLightMode(theme),
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
