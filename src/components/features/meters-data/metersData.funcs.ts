import { MeterData } from "@/store/models/meter-data";
import { getTableColumns } from "@/components/features/meters-data/table-config/get-table-columns";
import { getTableRows } from "@/components/features/meters-data/table-config/get-table-rows";
import { TableConfig } from "@/components/shared/table/table-config";

export function initialTableConfig(data: MeterData[], isVisibleWaterColumn: boolean) {
    const tableConfig: TableConfig = {
        columns: getTableColumns(isVisibleWaterColumn),
        rows: getTableRows(data, isVisibleWaterColumn),
    };

    return tableConfig;
}
