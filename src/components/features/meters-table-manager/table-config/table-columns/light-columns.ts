import { TableColumn } from "@/components/shared/table/table-models";
import {
    tableColumnAligns,
    tableColumnTypes,
    TableMeterDataColumnKey,
    tableMeterDataColumnKeys,
    TableMeterDataColumnLabel,
    tableMeterDataColumnLabels,
} from "@/components/shared/table/table-enums";
import { minWidthLightColumn } from "@/components/shared/table/table-constants";

export const lightColumns: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel>[] = [
    {
        key: tableMeterDataColumnKeys.light,
        label: tableMeterDataColumnLabels.light,
        type: tableColumnTypes.number,
        align: tableColumnAligns.right,
        minWidth: minWidthLightColumn,
    },
    {
        key: tableMeterDataColumnKeys.lightDay,
        label: tableMeterDataColumnLabels.lightDay,
        type: tableColumnTypes.number,
        align: tableColumnAligns.right,
        minWidth: minWidthLightColumn,
    },
    {
        key: tableMeterDataColumnKeys.lightNight,
        label: tableMeterDataColumnLabels.lightNight,
        type: tableColumnTypes.number,
        align: tableColumnAligns.right,
        minWidth: minWidthLightColumn,
    },
];
