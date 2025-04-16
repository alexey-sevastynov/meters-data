import { MdTableBodyRow } from "../body-row/MdTableBodyRow";
import { TableColumn, TableRow } from "../table-models";

interface MdTableBodyProps {
    rows: TableRow[];
    columns: TableColumn[];
    isReadOnly: boolean;
    listHiddenColumns: string[];
}

export function MdTableBody({ rows, columns, isReadOnly, listHiddenColumns }: MdTableBodyProps) {
    return (
        <tbody>
            {rows.map((row, index) => {
                return (
                    <MdTableBodyRow
                        key={index}
                        row={row}
                        columns={columns}
                        isReadOnly={isReadOnly}
                        listHiddenColumns={listHiddenColumns}
                        actions={row.actions}
                    />
                );
            })}
        </tbody>
    );
}
