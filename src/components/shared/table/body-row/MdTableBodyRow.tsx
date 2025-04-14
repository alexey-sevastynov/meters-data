import { MdTableBodyCell } from "@/components/shared/table/body-cell/MdTableBodyCell";
import { TableColumn, TableRow } from "@/components/shared/table/table-models";

interface MdTableBodyRowProps {
    row: TableRow;
    columns: TableColumn[];
    isReadOnly: boolean;
}

export function MdTableBodyRow({ row, columns, isReadOnly }: MdTableBodyRowProps) {
    return (
        <tr>
            {columns.map((col) => (
                <MdTableBodyCell
                    key={col.key}
                    column={col}
                    value={row[col.key]}
                    isLatestData={row.isLatestData}
                    isReadOnly={isReadOnly}
                />
            ))}
        </tr>
    );
}
