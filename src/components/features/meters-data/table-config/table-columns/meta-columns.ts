import { TableColumn } from "@/components/shared/table/table-models";
import {
    TableMeterDataColumnKey,
    tableMeterDataColumnKeys,
    TableMeterDataColumnLabel,
    tableMeterDataColumnLabels,
} from "@/components/features/meters-data/table-config/table-columns/table-columns-enums";
import { tableColumnAligns, tableColumnTypes } from "@/components/shared/table/table-enums";
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
