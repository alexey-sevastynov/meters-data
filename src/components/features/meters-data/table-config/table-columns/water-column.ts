import { TableColumn } from "@/components/shared/table/table-models";
import {
    TableMeterDataColumnKey,
    tableMeterDataColumnKeys,
    TableMeterDataColumnLabel,
    tableMeterDataColumnLabels,
} from "@/components/features/meters-data/table-config/table-columns/table-columns-enums";
import { tableColumnAligns, tableColumnTypes } from "@/components/shared/table/table-enums";

export const waterColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
    key: tableMeterDataColumnKeys.water,
    label: tableMeterDataColumnLabels.water,
    type: tableColumnTypes.number,
    align: tableColumnAligns.right,
};
