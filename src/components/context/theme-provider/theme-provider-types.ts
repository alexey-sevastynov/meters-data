export const themeModes = {
    dark: "dark",
    light: "light",
} as const;

export type ThemeMode = (typeof themeModes)[keyof typeof themeModes];
