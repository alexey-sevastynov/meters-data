import styles from "./tableHeader.module.scss";
import { TableAction, TableColumn } from "@/components/shared/table/table-models";
import { MdTableHeaderCell } from "@/components/shared/table/header-cell/MdTableHeaderCell";
import { VoidFunc } from "@/types/getter-setter-functions";

interface MdTableHeaderProps {
    columns: TableColumn[];
    isReadOnly: boolean;
    listHiddenColumns: string[];
    tableAction?: TableAction;
    onSort?: VoidFunc<string>;
}

export function MdTableHeader({
    columns,
    isReadOnly,
    listHiddenColumns,
    tableAction,
    onSort,
}: MdTableHeaderProps) {
    return (
        <thead className={styles.root}>
            <tr>
                {columns.map((col) => {
                    const isHiddenCell = !listHiddenColumns || listHiddenColumns.includes(col.key);

                    return (
                        <MdTableHeaderCell
                            key={col.key}
                            column={col}
                            isReadOnly={isReadOnly}
                            isHiddenCell={isHiddenCell}
                            tableAction={tableAction}
                            onSort={onSort}
                        />
                    );
                })}
            </tr>
        </thead>
    );
}
