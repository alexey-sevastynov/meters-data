import { TableColumn } from "@/components/shared/table/table-models";
import {
    TableMeterDataColumnKey,
    tableMeterDataColumnKeys,
    TableMeterDataColumnLabel,
    tableMeterDataColumnLabels,
    tableColumnAligns,
    tableColumnTypes,
    tableSortDirection,
} from "@/components/shared/table/table-enums";
import { sortMeterDataByDateAsc, sortMeterDataByDateDesc } from "@/helpers/meters-data/sort";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { minWidthDateColumn } from "@/components/shared/table/table-constants";

export const dateColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
    key: tableMeterDataColumnKeys.date,
    label: tableMeterDataColumnLabels.date,
    type: tableColumnTypes.string,
    align: tableColumnAligns.left,
    sort: {
        sortByAsc: (a, b) => sortMeterDataByDateAsc(a as MeterDataWithObjectId, b as MeterDataWithObjectId),
        sortByDesc: (a, b) => sortMeterDataByDateDesc(a as MeterDataWithObjectId, b as MeterDataWithObjectId),
        defaultDirection: tableSortDirection.desc,
    },
    minWidth: minWidthDateColumn,
};
