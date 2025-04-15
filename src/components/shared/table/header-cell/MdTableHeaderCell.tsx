import { MdIcon } from "@/components/ui/icon/MdIcon";
import { TableAction, TableColumn } from "@/components/shared/table/table-models";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { isActionColumnDisabledForReadOnly, isColumnAction } from "./TableHeaderCell.funcs";

interface MdTableHeaderCellProps {
    column: TableColumn;
    isReadOnly: boolean;
    isHiddenCell: boolean;
    tableAction?: TableAction;
}

export function MdTableHeaderCell({ column, isReadOnly, isHiddenCell, tableAction }: MdTableHeaderCellProps) {
    if (isActionColumnDisabledForReadOnly(column, isReadOnly, tableAction)) return <th />;

    if (isColumnAction(column) && !isReadOnly && tableAction) {
        return (
            <th>
                {tableAction.visible && (
                    <button
                        style={{ display: isHiddenCell ? "none" : "table-cell" }}
                        title={tableAction.label}
                        onClick={() => tableAction.onClick({})}
                        type="button"
                    >
                        <MdIcon name={iconNames[tableAction.icon]} />
                    </button>
                )}
            </th>
        );
    }

    return <th style={{ display: isHiddenCell ? "none" : "table-cell" }}>{column.label}</th>;
}
