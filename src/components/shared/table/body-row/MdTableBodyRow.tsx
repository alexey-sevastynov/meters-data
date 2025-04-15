import { MdTableBodyCell } from "@/components/shared/table/body-cell/MdTableBodyCell";
import { TableAction, TableColumn, TableRow } from "@/components/shared/table/table-models";

interface MdTableBodyRowProps {
    row: TableRow;
    columns: TableColumn[];
    isReadOnly: boolean;
    listHiddenColumns: string[];
    actions?: TableAction[];
}

export function MdTableBodyRow({
    row,
    columns,
    isReadOnly,
    listHiddenColumns,
    actions,
}: MdTableBodyRowProps) {
    return (
        <tr>
            {columns.map((col) => {
                const isHiddenCell = listHiddenColumns.includes(col.key);

                return (
                    <MdTableBodyCell
                        key={col.key}
                        id={row.id}
                        column={col}
                        value={row[col.key]}
                        isReadOnly={isReadOnly}
                        isHiddenCell={isHiddenCell}
                        row={row}
                        actions={actions}
                    />
                );
            })}
        </tr>
    );
}
