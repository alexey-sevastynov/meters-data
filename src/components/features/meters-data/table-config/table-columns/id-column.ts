import { TableColumn } from "@/components/shared/table/table-models";
import { tableColumnAligns, tableColumnTypes } from "@/components/shared/table/table-enums";
import {
    TableMeterDataColumnKey,
    tableMeterDataColumnKeys,
    TableMeterDataColumnLabel,
    tableMeterDataColumnLabels,
} from "@/components/features/meters-data/table-config/table-columns/table-columns-enums";
import { minWidthIdColumn } from "@/components/shared/table/table-constants";

export const idColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
    key: tableMeterDataColumnKeys.id,
    label: tableMeterDataColumnLabels.id,
    type: tableColumnTypes.string,
    align: tableColumnAligns.left,
    minWidth: minWidthIdColumn,
};
