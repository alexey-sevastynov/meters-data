import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { getTableMeterDataColumns } from "@/components/features/meters-data/table-config/table-columns/table-meter-data-columns";
import { getTableMeterDataRows } from "@/components/features/meters-data/table-config/table-rows";
import { TableConfig } from "@/components/shared/table/table-config";
import {
    getTableUtilityPriceColumns,
    getTableUtilityPriceRows,
} from "@/components/shared/table/constants/table-utility-price";
import { UtilityPrice } from "@/store/models/utility-price";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { TableAction } from "@/components/shared/table/table-models";
import { AppDispatch } from "@/store/store";
import { getYearFromDate } from "@/helpers/dates/get-date";
import { Option } from "@/components/ui/input-group/input-group-models";

export function initialTableMeterDataConfig(
    data: MeterDataWithObjectId[],
    filteredData: MeterDataWithObjectId[],
    isVisibleWaterColumn: boolean,
    dispatch: AppDispatch
) {
    const tableConfig: TableConfig = {
        columns: getTableMeterDataColumns(isVisibleWaterColumn),
        rows: getTableMeterDataRows(data, filteredData, isVisibleWaterColumn, dispatch),
        action: createAddRowAction(),
    };

    return tableConfig;
}

export function initialUtilityPriceTableConfig(data: UtilityPrice[]) {
    const tableConfig: TableConfig = {
        columns: getTableUtilityPriceColumns(),
        rows: getTableUtilityPriceRows(data),
        action: createAddRowAction(),
    };

    return tableConfig;
}

export function createAddRowAction(onClick = () => {}, visible = true, label = "Додати") {
    const tableAction: TableAction = {
        icon: iconNames.plusCircle,
        onClick,
        visible,
        label,
    };

    return tableAction;
}

export function filterBySelectedYears(
    data: MeterDataWithObjectId[],
    selectedYears: Option[]
): MeterDataWithObjectId[] {
    const result: MeterDataWithObjectId[] = [];
    const selectedYearSet = new Set(selectedYears.map((opt) => opt.value));

    for (const item of data) {
        const year = getYearFromDate(item.date);

        if (!selectedYearSet.has(year)) continue;

        result.push(item);
    }

    return result;
}

export function getHiddenColumnListKeys(allColumns: Option[], visibleColumns: Option[]) {
    const visibleColumnKeys = visibleColumns.map((column) => column.value);
    const allColumnKeys = allColumns.map((column) => column.value);
    const hiddenColumnKeys = allColumnKeys.filter((key) => !visibleColumnKeys.includes(key));

    return hiddenColumnKeys;
}
