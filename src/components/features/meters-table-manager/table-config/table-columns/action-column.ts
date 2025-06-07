import { TableColumn } from "@/components/shared/table/table-models";
import {
    TableMeterDataColumnKey,
    tableMeterDataColumnKeys,
    TableMeterDataColumnLabel,
    tableMeterDataColumnLabels,
    tableColumnAligns,
    tableColumnTypes,
} from "@/components/shared/table/table-enums";

export const actionColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
    key: tableMeterDataColumnKeys.actions,
    label: tableMeterDataColumnLabels.actions,
    type: tableColumnTypes.actions,
    align: tableColumnAligns.center,
    isDisplayable: false,
};
