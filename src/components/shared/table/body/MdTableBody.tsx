import { useEffect, useState, useMemo } from "react";
import styles from "./tableBody.module.scss";
import { MdTableBodyRow } from "@/components/shared/table/body-row/MdTableBodyRow";
import { TableColumn, TableRow } from "@/components/shared/table/table-models";
import { isTableEmpty, shouldShowNoData } from "@/components/shared/table/body/tableBody.funcs";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { StatusName, statusNames } from "@/constants/status";

interface MdTableBodyProps {
    rows: TableRow[];
    columns: TableColumn[];
    isReadOnly: boolean;
    listHiddenColumns: string[];
    status: StatusName;
}

export function MdTableBody({ rows, columns, isReadOnly, listHiddenColumns, status }: MdTableBodyProps) {
    const translations = useAppSelector(selectTranslations);
    const [isRenderComplete, setIsRenderComplete] = useState(false);

    const isDataLoaded = useMemo(() => {
        return status === statusNames.loaded;
    }, [status]);

    useEffect(() => {
        if (!isDataLoaded) {
            setIsRenderComplete(false);

            return;
        }

        if (isTableEmpty(rows)) {
            setIsRenderComplete(true);

            return;
        }

        const timer = setTimeout(() => {
            setIsRenderComplete(true);
        }, 0);

        return () => clearTimeout(timer);
    }, [isDataLoaded, rows]);

    return (
        <tbody className={styles.root}>
            {status === statusNames.loading && (
                <tr>
                    <td className={styles.loading}>{translations.table.loading}</td>
                </tr>
            )}
            {status === statusNames.loaded &&
                rows.map((row, index) => (
                    <MdTableBodyRow
                        key={index}
                        row={row}
                        columns={columns}
                        isReadOnly={isReadOnly}
                        listHiddenColumns={listHiddenColumns}
                        actions={row.actions}
                    />
                ))}
            {shouldShowNoData(status, isRenderComplete, rows) && (
                <tr>
                    <td className={styles.noData}>{translations.table.noData}</td>
                </tr>
            )}
            {status === statusNames.error && (
                <tr>
                    <td className={styles.error}>{translations.table.error}</td>
                </tr>
            )}
        </tbody>
    );
}
