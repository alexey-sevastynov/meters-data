import { TableColumn } from "@/components/shared/table/table-models";
import {
    TableMeterDataColumnKey,
    tableMeterDataColumnKeys,
    TableMeterDataColumnLabel,
    tableMeterDataColumnLabels,
} from "@/components/features/meters-data/table-config/table-columns/table-columns-enums";
import {
    tableColumnAligns,
    tableColumnTypes,
    tableSortDirection,
} from "@/components/shared/table/table-enums";
import { sortByDateAsc, sortByDateDesc } from "@/helpers/compare-dates";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { minWidthDateColumn } from "@/components/shared/table/table-constants";

export const dateColumn: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel> = {
    key: tableMeterDataColumnKeys.date,
    label: tableMeterDataColumnLabels.date,
    type: tableColumnTypes.string,
    align: tableColumnAligns.left,
    sort: {
        sortByAsc: (a, b) => sortByDateAsc(a as MeterDataWithObjectId, b as MeterDataWithObjectId),
        sortByDesc: (a, b) => sortByDateDesc(a as MeterDataWithObjectId, b as MeterDataWithObjectId),
        defaultDirection: tableSortDirection.desc,
    },
    minWidth: minWidthDateColumn,
};
