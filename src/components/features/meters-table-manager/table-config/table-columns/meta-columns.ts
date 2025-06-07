import { TableColumn } from "@/components/shared/table/table-models";
import {
    tableColumnAligns,
    tableColumnTypes,
    TableMeterDataColumnKey,
    tableMeterDataColumnKeys,
    TableMeterDataColumnLabel,
    tableMeterDataColumnLabels,
} from "@/components/shared/table/table-enums";
import { minWidthMetaColumn } from "@/components/shared/table/table-constants";

export const metaColumns: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel>[] = [
    {
        key: tableMeterDataColumnKeys.createdAt,
        label: tableMeterDataColumnLabels.createdAt,
        type: tableColumnTypes.date,
        align: tableColumnAligns.left,
        minWidth: minWidthMetaColumn,
    },
    {
        key: tableMeterDataColumnKeys.updatedAt,
        label: tableMeterDataColumnLabels.updatedAt,
        type: tableColumnTypes.date,
        align: tableColumnAligns.left,
        minWidth: minWidthMetaColumn,
    },
];
