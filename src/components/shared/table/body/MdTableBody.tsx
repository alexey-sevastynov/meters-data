import { MdTableBodyRow } from "../body-row/MdTableBodyRow";
import { TableColumn, TableRow } from "../table-models";

interface MdTableBodyProps {
    rows: TableRow[];
    columns: TableColumn[];
    isReadOnly: boolean;
}

export function MdTableBody({ rows, columns, isReadOnly }: MdTableBodyProps) {
    return (
        <tbody>
            {rows.map((row, index) => (
                <MdTableBodyRow key={index} row={row} columns={columns} isReadOnly={isReadOnly} />
            ))}
        </tbody>
    );
}
