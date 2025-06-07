import { TableColumn } from "@/components/shared/table/table-models";
import {
    tableColumnAligns,
    tableColumnTypes,
    TableMeterDataColumnKey,
    tableMeterDataColumnKeys,
    TableMeterDataColumnLabel,
    tableMeterDataColumnLabels,
} from "@/components/shared/table/table-enums";
import { minWidthWaterColumn } from "@/components/shared/table/table-constants";

export const waterColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
    key: tableMeterDataColumnKeys.water,
    label: tableMeterDataColumnLabels.water,
    type: tableColumnTypes.number,
    align: tableColumnAligns.right,
    minWidth: minWidthWaterColumn,
};
