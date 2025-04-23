import {
    tableColumnAligns,
    tableColumnTypes,
    tableSortDirection,
} from "@/components/shared/table/table-enums";
import { TableColumn } from "@/components/shared/table/table-models";
import { categoryKeys } from "@/enums/category-keys";
import { sortByDateAsc, sortByDateDesc } from "@/helpers/compare-dates";
import { MeterDataWithObjectId } from "@/store/models/meter-data";

export function getTableMeterDataColumns(isVisibleWaterColumn: boolean) {
    const idColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
        key: tableMeterDataColumnKeys.id,
        label: tableMeterDataColumnLabels.id,
        type: tableColumnTypes.string,
        align: tableColumnAligns.left,
    };

    const actionColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
        key: tableMeterDataColumnKeys.actions,
        label: tableMeterDataColumnLabels.actions,
        type: tableColumnTypes.actions,
        align: tableColumnAligns.center,
    };

    const dateColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
        key: tableMeterDataColumnKeys.date,
        label: tableMeterDataColumnLabels.date,
        type: tableColumnTypes.string,
        align: tableColumnAligns.left,
        sort: {
            sortByAsc: (a, b) => sortByDateAsc(a as MeterDataWithObjectId, b as MeterDataWithObjectId),
            sortByDesc: (a, b) => sortByDateDesc(a as MeterDataWithObjectId, b as MeterDataWithObjectId),
            defaultDirection: tableSortDirection.desc,
        },
    };

    const lightColumns: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel>[] = [
        {
            key: tableMeterDataColumnKeys.light,
            label: tableMeterDataColumnLabels.light,
            type: tableColumnTypes.number,
            align: tableColumnAligns.right,
        },
        {
            key: tableMeterDataColumnKeys.lightDay,
            label: tableMeterDataColumnLabels.lightDay,
            type: tableColumnTypes.number,
            align: tableColumnAligns.right,
        },
        {
            key: tableMeterDataColumnKeys.lightNight,
            label: tableMeterDataColumnLabels.lightNight,
            type: tableColumnTypes.number,
            align: tableColumnAligns.right,
        },
    ];

    const gasColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
        key: tableMeterDataColumnKeys.gas,
        label: tableMeterDataColumnLabels.gas,
        type: tableColumnTypes.number,
        align: tableColumnAligns.right,
    };

    const waterColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
        key: tableMeterDataColumnKeys.water,
        label: tableMeterDataColumnLabels.water,
        type: tableColumnTypes.number,
        align: tableColumnAligns.right,
    };

    const metaColumns: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel>[] = [
        {
            key: tableMeterDataColumnKeys.createdAt,
            label: tableMeterDataColumnLabels.createdAt,
            type: tableColumnTypes.date,
            align: tableColumnAligns.left,
        },
        {
            key: tableMeterDataColumnKeys.updatedAt,
            label: tableMeterDataColumnLabels.updatedAt,
            type: tableColumnTypes.date,
            align: tableColumnAligns.left,
        },
    ];

    const columns: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel>[] = [
        actionColumn,
        idColumn,
        dateColumn,
        ...lightColumns,
        gasColumn,
        ...(isVisibleWaterColumn ? [waterColumn] : []),
        ...metaColumns,
    ];

    return columns;
}

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

type TableMeterDataColumnKey = (typeof tableMeterDataColumnKeys)[keyof typeof tableMeterDataColumnKeys];

const tableMeterDataColumnLabels = {
    id: "id",
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

type TableMeterDataColumnLabel = (typeof tableMeterDataColumnLabels)[keyof typeof tableMeterDataColumnLabels];
