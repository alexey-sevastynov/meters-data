import { useEffect, useMemo } from "react";
import Styles from "./tableFilters.module.scss";
import { MdInputGroup } from "@/components/ui/input-group/MdInputGroup";
import {
    getAllYears,
    isClearSelectionNeeded,
    isCurrentYearSelectionNeeded,
} from "@/components/features/meters-data/table-filters/tableFilters.funcs";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { Option } from "@/components/ui/input-group/input-group-models";
import { VoidFunc } from "@/types/getter-setter-functions";

interface TableFiltersProps {
    sortedAddressMeterData: MeterDataWithObjectId[];
    columnVisibilityOptions: Option[];
    visibleColumns: Option[];
    selectedYears: Option[];
    setSelectedYears: VoidFunc<Option[]>;
    setVisibleColumns: VoidFunc<Option[]>;
}

export function TableFilters({
    columnVisibilityOptions,
    sortedAddressMeterData,
    visibleColumns,
    selectedYears,
    setSelectedYears,
    setVisibleColumns,
}: TableFiltersProps) {
    const allYears = useMemo(() => getAllYears(sortedAddressMeterData), [sortedAddressMeterData]);

    useEffect(() => {
        if (isCurrentYearSelectionNeeded(allYears, selectedYears)) {
            setSelectedYears([allYears[0]]);
        }

        if (isClearSelectionNeeded(allYears, selectedYears)) {
            setSelectedYears([]);
        }
    }, [allYears, selectedYears, setSelectedYears]);

    return (
        <div className={Styles.tableFilters}>
            <MdInputGroup
                options={allYears}
                defaultValue={allYears.length > 0 ? [allYears[0]] : []}
                label="Виберіть роки"
                onChange={(selected) => {
                    setSelectedYears(selected);
                }}
            />
            <MdInputGroup
                options={columnVisibilityOptions}
                defaultValue={visibleColumns}
                label="Виберіть колонки"
                onChange={(selected) => {
                    setVisibleColumns(selected);
                }}
            />
        </div>
    );
}
