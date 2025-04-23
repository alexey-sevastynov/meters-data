import { MdTableBodyRow } from "@/components/shared/table/body-row/MdTableBodyRow";
import { TableColumn, TableRow } from "@/components/shared/table/table-models";

interface MdTableBodyProps {
    rows: TableRow[];
    columns: TableColumn[];
    isReadOnly: boolean;
    listHiddenColumns: string[];
}

export function MdTableBody({ rows, columns, isReadOnly, listHiddenColumns }: MdTableBodyProps) {
    return (
        <tbody>
            {rows.map((row, index) => (
                <MdTableBodyRow
                    key={index}
                    row={row}
                    columns={columns}
                    isReadOnly={isReadOnly}
                    listHiddenColumns={listHiddenColumns}
                    actions={row.actions}
                />
            ))}
        </tbody>
    );
}
