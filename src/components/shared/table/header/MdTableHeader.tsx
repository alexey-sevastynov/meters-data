import { TableColumn } from "@/components/shared/table/table-models";
import { MdTableHeaderCell } from "@/components/shared/table/header-cell/MdTableHeaderCell";

interface Props {
    columns: TableColumn[];
    isReadOnly: boolean;
}

export function MdTableHeader({ columns, isReadOnly }: Props) {
    return (
        <thead style={{ backgroundColor: "lightgrey" }}>
            {columns.map((col) => (
                <MdTableHeaderCell key={col.key} column={col} isReadOnly={isReadOnly} />
            ))}
        </thead>
    );
}
