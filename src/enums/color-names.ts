export const colorNames = {
    white: "white",
    black: "black",
    lightGreen: "lightGreen",
    darkGreen: "darkGreen",
    green: "green",
    red: "red",
    lightRed: "lightRed",
    darkGrey: "darkGrey",
    grey: "grey",
    lightGrey: "lightGrey",
} as const;

export type ColorName = (typeof colorNames)[keyof typeof colorNames];
