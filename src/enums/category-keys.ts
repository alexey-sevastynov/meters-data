export const categoryKeys = {
    light: "light",
    lightDay: "lightDay",
    lightNight: "lightNight",
    gas: "gas",
    water: "water",
} as const;

export type categoryKey = (typeof categoryKeys)[keyof typeof categoryKeys];
