import { TableColumn } from "@/components/shared/table/table-models";
import { tableColumnAligns, tableColumnTypes } from "@/components/shared/table/table-enums";
import {
    TableMeterDataColumnKey,
    tableMeterDataColumnKeys,
    TableMeterDataColumnLabel,
    tableMeterDataColumnLabels,
} from "@/components/features/meters-data/table-config/table-columns/table-columns-enums";

export const lightColumns: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel>[] = [
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
