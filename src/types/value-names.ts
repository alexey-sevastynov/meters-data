export const unitNames = {
    kW: "kW",
    m3: "m³",
    piece: "piece",
} as const;

export type UnitName = (typeof unitNames)[keyof typeof unitNames];
