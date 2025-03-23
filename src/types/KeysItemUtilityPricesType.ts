export const utilityMeterKeys = {
    light: "light",
    lightDay: "lightDay",
    lightNight: "lightNight",
    gas: "gas",
    water: "water",
} as const;

export type UtilityMeterKey = (typeof utilityMeterKeys)[keyof typeof utilityMeterKeys];
