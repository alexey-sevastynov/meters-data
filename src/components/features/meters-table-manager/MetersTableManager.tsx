import styles from "./metersTableManager.module.scss";
import { useMemo, useState } from "react";
import { MdTable } from "@/components/shared/table/MdTable";
import { TableFilters } from "@/components/features/meters-table-manager/table-filters/TableFilters";
import {
    filterBySelectedYears,
    getHiddenColumnListKeys,
    initialTableMeterDataConfig,
} from "@/components/features/meters-table-manager/metersTableManager.funcs";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useLocation } from "react-router-dom";
import { filterMeterDataByAddressAndSortByDate } from "@/helpers/meters-data/filters";
import { Option } from "@/components/ui/input-group/input-group-models";
import {
    getTableMeterDataColumnVisibilityOptions,
    getTableMeterDataMetaColumnVisibilityOptions,
} from "@/components/features/meters-table-manager/table-config/table-column-visibility-options";
import { selectTranslations } from "@/store/slices/i-18-next";

interface MetersTableManagerProps {
    isWaterBlock?: boolean;
}

export function MdMetersTableManager({ isWaterBlock = true }: MetersTableManagerProps) {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const translations = useAppSelector(selectTranslations);
    const meterReadingsList = useAppSelector((state) => state.metersData.items);
    const status = useAppSelector((state) => state.metersData.status);
    const addressPath = location.pathname.slice(1);
    const sortedAddressMeterData = filterMeterDataByAddressAndSortByDate(meterReadingsList, addressPath);
    const [selectedYears, setSelectedYears] = useState<Option[]>([]);
    const [visibleColumns, setVisibleColumns] = useState<Option[]>(
        getTableMeterDataMetaColumnVisibilityOptions(translations)
    );

    const filteredByYear = useMemo(
        () => filterBySelectedYears(sortedAddressMeterData, selectedYears),
        [sortedAddressMeterData, selectedYears]
    );

    const tableMeterDataConfig = initialTableMeterDataConfig(
        sortedAddressMeterData,
        filteredByYear,
        isWaterBlock,
        dispatch
    );

    return (
        <div className={styles.root}>
            <TableFilters
                columnVisibilityOptions={getTableMeterDataColumnVisibilityOptions(translations)}
                sortedAddressMeterData={sortedAddressMeterData}
                visibleColumns={visibleColumns}
                selectedYears={selectedYears}
                setSelectedYears={setSelectedYears}
                setVisibleColumns={setVisibleColumns}
            />
            <div className={styles.table}>
                <MdTable
                    tableConfig={tableMeterDataConfig}
                    status={status}
                    listHiddenColumns={[
                        ...getHiddenColumnListKeys(
                            getTableMeterDataColumnVisibilityOptions(translations),
                            visibleColumns
                        ),
                    ]}
                />
            </div>
        </div>
    );
}
