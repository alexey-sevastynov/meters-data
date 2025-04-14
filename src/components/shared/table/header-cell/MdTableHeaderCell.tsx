import { MdIcon } from "@/components/ui/icon/MdIcon";
import { TableColumn, tableColumnTypes } from "@/components/shared/table/table-models";
import { iconNames } from "@/components/ui/icon/icon-constants";

interface MdTableHeaderCellProps {
    column: TableColumn;
    isReadOnly: boolean;
}

export function MdTableHeaderCell({ column, isReadOnly }: MdTableHeaderCellProps) {
    if (column.type === tableColumnTypes.actions && !isReadOnly) {
        return (
            <th>
                <button>
                    <MdIcon name={iconNames.plusCircle} />
                </button>
            </th>
        );
    }

    return <th>{column.label}</th>;
}
