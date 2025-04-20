import { TableAction, TableColumn } from "@/components/shared/table/table-models";
import { MdTableHeaderCell } from "@/components/shared/table/header-cell/MdTableHeaderCell";

interface MdTableHeaderProps {
    columns: TableColumn[];
    isReadOnly: boolean;
    listHiddenColumns: string[];
    tableAction?: TableAction;
}

export function MdTableHeader({ columns, isReadOnly, listHiddenColumns, tableAction }: MdTableHeaderProps) {
    return (
        <thead>
            {columns.map((col) => {
                const isHiddenCell = !listHiddenColumns || listHiddenColumns.includes(col.key);

                return (
                    <MdTableHeaderCell
                        key={col.key}
                        column={col}
                        isReadOnly={isReadOnly}
                        isHiddenCell={isHiddenCell}
                        tableAction={tableAction}
                    />
                );
            })}
        </thead>
    );
}
