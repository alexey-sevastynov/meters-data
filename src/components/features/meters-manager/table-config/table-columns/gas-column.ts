import { TableColumn } from "@/components/shared/table/table-models";
import {
    TableMeterDataColumnKey,
    tableMeterDataColumnKeys,
    TableMeterDataColumnLabel,
    tableMeterDataColumnLabels,
    tableColumnAligns,
    tableColumnTypes,
} from "@/components/shared/table/table-enums";
import { minWidthGasColumn } from "@/components/shared/table/table-constants";

export const gasColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
    key: tableMeterDataColumnKeys.gas,
    label: tableMeterDataColumnLabels.gas,
    type: tableColumnTypes.number,
    align: tableColumnAligns.right,
    minWidth: minWidthGasColumn,
};
