import { useEffect, useMemo, useRef } from "react";
import styles from "./tableFilters.module.scss";
import { MdInputGroup } from "@/components/ui/input-group/MdInputGroup";
import {
    getAllYears,
    isClearSelectionNeeded,
    isCurrentYearSelectionNeeded,
} from "@/components/features/meters-manager/table-filters/tableFilters.funcs";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { Option } from "@/components/ui/input-group/input-group-models";
import { VoidFunc } from "@/types/getter-setter-functions";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";

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
    const translations = useAppSelector(selectTranslations);
    const isInitializedRef = useRef(false);
    const allYears = useMemo(() => getAllYears(sortedAddressMeterData), [sortedAddressMeterData]);

    useEffect(() => {
        if (!isInitializedRef.current) {
            isInitializedRef.current = true;

            if (isCurrentYearSelectionNeeded(allYears, selectedYears)) setSelectedYears([allYears[0]]);

            return;
        }

        if (isClearSelectionNeeded(allYears, selectedYears)) setSelectedYears([]);
    }, [allYears, selectedYears, setSelectedYears]);

    return (
        <div className={styles.root}>
            <MdInputGroup
                options={allYears}
                defaultValue={allYears.length > 0 ? [allYears[0]] : []}
                label={translations.inputGroup.selectYears as string}
                onChange={(selected) => {
                    setSelectedYears(selected);
                }}
            />
            <MdInputGroup
                options={columnVisibilityOptions}
                defaultValue={visibleColumns}
                label={translations.inputGroup.selectColumns as string}
                onChange={(selected) => {
                    setVisibleColumns(selected);
                }}
            />
        </div>
    );
}
