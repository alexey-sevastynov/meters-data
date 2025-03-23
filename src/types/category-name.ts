export const categoryNames = {
    light: "Light general",
    lightDay: "Light day",
    lightNight: "Light night",
    gas: "Gas",
    water: "Water",
} as const;

export type CategoryName = (typeof categoryNames)[keyof typeof categoryNames];
