import { categoryKeys } from "@/enums/category-keys";
import { technicalColumnKeys } from "./table-constants";

export const tableColumnTypes = {
    string: 0,
    number: 1,
    boolean: 2,
    date: 3,
    actions: 4,
} as const;

export type TableColumnTypes = (typeof tableColumnTypes)[keyof typeof tableColumnTypes];

export const tableColumnAligns = {
    left: 0,
    right: 1,
    center: 2,
} as const;

export type TableColumnAlign = (typeof tableColumnAligns)[keyof typeof tableColumnAligns];

export const tableSortDirection = {
    asc: 0,
    desc: 1,
} as const;

export type TableSortDirection = (typeof tableSortDirection)[keyof typeof tableSortDirection];

export const tableMeterDataColumnKeys = {
    id: technicalColumnKeys.id,
    actions: technicalColumnKeys.actions,
    date: technicalColumnKeys.date,
    light: categoryKeys.light,
    lightDay: categoryKeys.lightDay,
    lightNight: categoryKeys.lightNight,
    gas: categoryKeys.gas,
    water: categoryKeys.water,
    createdAt: technicalColumnKeys.createdAt,
    updatedAt: technicalColumnKeys.updatedAt,
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
