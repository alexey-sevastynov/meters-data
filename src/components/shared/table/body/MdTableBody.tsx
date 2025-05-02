import Styles from "./tableBody.module.scss";
import { MdTableBodyRow } from "@/components/shared/table/body-row/MdTableBodyRow";
import { TableColumn, TableRow } from "@/components/shared/table/table-models";
import { isTableEmpty } from "@/components/shared/table/body/tableBody.funcs";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";

interface MdTableBodyProps {
    rows: TableRow[];
    columns: TableColumn[];
    isReadOnly: boolean;
    listHiddenColumns: string[];
}

export function MdTableBody({ rows, columns, isReadOnly, listHiddenColumns }: MdTableBodyProps) {
    const translations = useAppSelector(selectTranslations);

    return (
        <tbody className={Styles.tableBody}>
            {isTableEmpty(rows) ? (
                <p className={Styles.tableBodyNoData}>{translations.table.noData}</p>
            ) : (
                rows.map((row, index) => (
                    <MdTableBodyRow
                        key={index}
                        row={row}
                        columns={columns}
                        isReadOnly={isReadOnly}
                        listHiddenColumns={listHiddenColumns}
                        actions={row.actions}
                    />
                ))
            )}
        </tbody>
    );
}
