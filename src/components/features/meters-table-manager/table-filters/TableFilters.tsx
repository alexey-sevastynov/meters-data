import { useEffect, useMemo } from "react";
import styles from "./tableFilters.module.scss";
import { MdInputGroup } from "@/components/ui/input-group/MdInputGroup";
import {
    getAllYears,
    isCurrentYearSelectionNeeded,
} from "@/components/features/meters-table-manager/table-filters/tableFilters.funcs";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { Option } from "@/components/ui/input-group/input-group-models";
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
    const allYears = useMemo(() => getAllYears(sortedAddressMeterData), [sortedAddressMeterData]);

    useEffect(() => {
        if (isCurrentYearSelectionNeeded(allYears, selectedYears)) {
            setSelectedYears([allYears[0]]);
        }
    }, [allYears, selectedYears, setSelectedYears]);

    return (
        <div className={styles.root}>
            <MdIconButton
                iconName={iconNames.refresh}
                tooltip={translations.btn.refresh as string}
                onClick={onRefresh}
            />
            <MdInputGroup
                options={allYears}
                defaultValue={allYears.length > 0 ? [allYears[0]] : []}
                label={translations.inputGroup.selectYears as string}
                onChange={(selected) => {
                    setSelectedYears(selected);
                }}
                preventClearLastOption={true}
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
