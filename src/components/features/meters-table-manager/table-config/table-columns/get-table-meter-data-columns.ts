import { TableColumn } from "@/components/shared/table/table-models";
import { idColumn } from "@/components/features/meters-table-manager/table-config/table-columns/id-column";
import { TableMeterDataColumnKey, TableMeterDataColumnLabel } from "@/components/shared/table/table-enums";
import { actionColumn } from "@/components/features/meters-table-manager/table-config/table-columns/action-column";
import { dateColumn } from "@/components/features/meters-table-manager/table-config/table-columns/date-column";
import { lightColumns } from "@/components/features/meters-table-manager/table-config/table-columns/light-columns";
import { gasColumn } from "@/components/features/meters-table-manager/table-config/table-columns/gas-column";
import { waterColumn } from "@/components/features/meters-table-manager/table-config/table-columns/water-column";
import { metaColumns } from "@/components/features/meters-table-manager/table-config/table-columns/meta-columns";

export function getTableMeterDataColumns(isVisibleWaterColumn: boolean) {
    const waterColumns = isVisibleWaterColumn ? [waterColumn] : [];

    const columns: TableColumn<TableMeterDataColumnKey, TableMeterDataColumnLabel>[] = [
        actionColumn,
        idColumn,
        dateColumn,
        ...lightColumns,
        gasColumn,
        ...waterColumns,
        ...metaColumns,
    ];

    return columns;
}
