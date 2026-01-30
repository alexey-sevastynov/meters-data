import { useEffect, useMemo, useRef } from "react";
import styles from "./tableFilters.module.scss";
import { MdInputGroup } from "@/components/ui/select/input-group/MdInputGroup";
import {
    getAvailableYears,
    onAutomaticYearSelection,
} from "@/components/features/meters-table-manager/table-filters/tableFilters.funcs";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { Option } from "@/components/ui/select/select-models";
import { VoidFunc, VoidFuncNoParam } from "@/types/getter-setter-functions";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { MdIconButton } from "@/components/ui/icon-button/MdIconButton";

interface TableFiltersProps {
    sortedAddressMeterData: MeterDataWithObjectId[];
    columnVisibilityOptions: Option[];
    visibleColumns: Option[];
    selectedYears: Option[];
    setSelectedYears: VoidFunc<Option[]>;
    setVisibleColumns: VoidFunc<Option[]>;
    onRefresh: VoidFuncNoParam;
}

export function TableFilters({
    columnVisibilityOptions,
    sortedAddressMeterData,
    visibleColumns,
    selectedYears,
    setSelectedYears,
    setVisibleColumns,
    onRefresh,
}: TableFiltersProps) {
    const translations = useAppSelector(selectTranslations);
    const availableYears = useMemo(() => getAvailableYears(sortedAddressMeterData), [sortedAddressMeterData]);
    const previousLatestYearRef = useRef<string | null>(null);

    useEffect(() => {
        onAutomaticYearSelection(availableYears, selectedYears, previousLatestYearRef, setSelectedYears);
    }, [availableYears, selectedYears, setSelectedYears]);

    return (
        <div className={styles.root}>
            <MdIconButton
                iconName={iconNames.refresh}
                tooltip={translations.btn.refresh}
                onClick={onRefresh}
            />
            <MdInputGroup
                options={availableYears}
                defaultValue={availableYears.length > 0 ? [availableYears[0]] : []}
                value={selectedYears}
                label={translations.inputGroup.selectYears}
                onChange={(selected) => setSelectedYears(selected)}
                preventClearLastOption={true}
            />
            <MdInputGroup
                options={columnVisibilityOptions}
                defaultValue={visibleColumns}
                value={visibleColumns}
                label={translations.inputGroup.selectColumns}
                onChange={(selected) => setVisibleColumns(selected)}
            />
        </div>
    );
}
