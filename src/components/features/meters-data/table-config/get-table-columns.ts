import { TableColumn, tableColumnAligns, tableColumnTypes } from "@/components/shared/table/table-models";
import { categoryKeys } from "@/enums/category-keys";

export function getTableColumns(isVisibleWaterColumn: boolean) {
    const actionColumn: TableColumn<TableColumnKey, TableColumnLabel> = {
        key: tableColumnKeys.actions,
        label: tableColumnLabels.actions,
        type: tableColumnTypes.actions,
        align: tableColumnAligns.center,
    };

    const dateColumn: TableColumn<TableColumnKey, TableColumnLabel> = {
        key: tableColumnKeys.date,
        label: tableColumnLabels.date,
        type: tableColumnTypes.string,
        align: tableColumnAligns.left,
    };

    const lightColumns: TableColumn<TableColumnKey, TableColumnLabel>[] = [
        {
            key: tableColumnKeys.light,
            label: tableColumnLabels.light,
            type: tableColumnTypes.number,
            align: tableColumnAligns.right,
        },
        {
            key: tableColumnKeys.lightDay,
            label: tableColumnLabels.lightDay,
            type: tableColumnTypes.number,
            align: tableColumnAligns.right,
        },
        {
            key: tableColumnKeys.lightNight,
            label: tableColumnLabels.lightNight,
            type: tableColumnTypes.number,
            align: tableColumnAligns.right,
        },
    ];

    const gasColumn: TableColumn<TableColumnKey, TableColumnLabel> = {
        key: tableColumnKeys.gas,
        label: tableColumnLabels.gas,
        type: tableColumnTypes.number,
        align: tableColumnAligns.right,
    };

    const waterColumn: TableColumn<TableColumnKey, TableColumnLabel> = {
        key: tableColumnKeys.water,
        label: tableColumnLabels.water,
        type: tableColumnTypes.number,
        align: tableColumnAligns.right,
    };

    const metaColumns: TableColumn<TableColumnKey, TableColumnLabel>[] = [
        {
            key: tableColumnKeys.createdAt,
            label: tableColumnLabels.createdAt,
            type: tableColumnTypes.date,
            align: tableColumnAligns.left,
        },
        {
            key: tableColumnKeys.updatedAt,
            label: tableColumnLabels.updatedAt,
            type: tableColumnTypes.date,
            align: tableColumnAligns.left,
        },
    ];

    const columns: TableColumn<TableColumnKey, TableColumnLabel>[] = [
        actionColumn,
        dateColumn,
        ...lightColumns,
        gasColumn,
        ...(isVisibleWaterColumn ? [waterColumn] : []),
        ...metaColumns,
    ];

    return columns;
}

const tableColumnKeys = {
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

type TableColumnKey = (typeof tableColumnKeys)[keyof typeof tableColumnKeys];

const tableColumnLabels = {
    actions: "",
    date: "Місяць",
    light: "Світло, кВт",
    lightDay: "Світло день, кВт",
    lightNight: "Світло ніч, кВт",
    gas: "Газ",
    water: "Вода",
    createdAt: "Створено",
    updatedAt: "Оновлено",
} as const;

type TableColumnLabel = (typeof tableColumnLabels)[keyof typeof tableColumnLabels];
