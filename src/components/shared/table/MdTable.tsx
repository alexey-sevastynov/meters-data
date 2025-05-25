import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./table.module.scss";
import { TableConfig } from "@/components/shared/table/table-config";
import { MdTableHeader } from "@/components/shared/table/header/MdTableHeader";
import { MdTableBody } from "@/components/shared/table/body/MdTableBody";
import { TableSortDirection, tableSortDirection } from "@/components/shared/table/table-enums";
import { getSortedTableRows, initDefaultSort, tableSort } from "@/components/shared/table/MdTable.funcs";

interface TableMetresDataProps {
    tableConfig: TableConfig;
    isReadOnly?: boolean;
    listHiddenColumns?: string[];
}

export function MdTable({ tableConfig, isReadOnly = false, listHiddenColumns = [] }: TableMetresDataProps) {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<TableSortDirection>(tableSortDirection.asc);

    useEffect(() => {
        if (!sortKey) initDefaultSort(tableConfig.columns, setSortKey, setSortDirection);
    }, [tableConfig.columns, sortKey]);

    const sortedRows = useMemo(
        () => getSortedTableRows(sortKey, tableConfig, sortDirection),
        [sortKey, tableConfig, sortDirection]
    );

    const onSort = useCallback(
        (columnKey: string) =>
            tableSort(columnKey, sortKey, setSortKey, setSortDirection, tableConfig.columns, sortDirection),
        [sortKey, tableConfig.columns, sortDirection]
    );

    return (
        <table className={styles.root}>
            <MdTableHeader
                columns={tableConfig.columns}
                isReadOnly={isReadOnly}
                listHiddenColumns={listHiddenColumns}
                tableAction={tableConfig.action}
                onSort={onSort}
            />
            <MdTableBody
                rows={sortedRows}
                columns={tableConfig.columns}
                isReadOnly={isReadOnly}
                listHiddenColumns={listHiddenColumns}
            />
        </table>
    );
}
