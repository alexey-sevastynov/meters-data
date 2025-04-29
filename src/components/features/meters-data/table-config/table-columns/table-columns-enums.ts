import { categoryKeys } from "@/enums/category-keys";

export const tableMeterDataColumnKeys = {
    id: "id",
    actions: "actions",
    date: "date",
    light: categoryKeys.light,
    lightDay: categoryKeys.lightDay,
    lightNight: categoryKeys.lightNight,
    gas: categoryKeys.gas,
    water: categoryKeys.water,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
} as const;

export type TableMeterDataColumnKey =
    (typeof tableMeterDataColumnKeys)[keyof typeof tableMeterDataColumnKeys];

export const tableMeterDataColumnLabels = {
    id: "ID",
    actions: "",
    date: "Місяць",
    light: "Світло, кВт",
    lightDay: "Світло день, кВт",
    lightNight: "Світло ніч, кВт",
    gas: "Газ, м³",
    water: "Вода, м³",
    createdAt: "Створено",
    updatedAt: "Оновлено",
} as const;

export type TableMeterDataColumnLabel =
    (typeof tableMeterDataColumnLabels)[keyof typeof tableMeterDataColumnLabels];
