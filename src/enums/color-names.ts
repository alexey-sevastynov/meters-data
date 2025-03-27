export const colorNames = {
    white: "white",
    black: "black",
    green: "green",
    red: "red",
    grey: "grey",
} as const;

export type ColorName = (typeof colorNames)[keyof typeof colorNames];
