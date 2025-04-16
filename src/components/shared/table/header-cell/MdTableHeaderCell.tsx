import { MdIcon } from "@/components/ui/icon/MdIcon";
import { TableAction, TableColumn } from "@/components/shared/table/table-models";
import { iconNames } from "@/components/ui/icon/icon-constants";
import {
    isActionColumnDisabledForReadOnly,
    isActionColumnVisible,
    isColumnAction,
} from "./TableHeaderCell.funcs";

interface MdTableHeaderCellProps {
    column: TableColumn;
    isReadOnly: boolean;
    isHiddenCell: boolean;
    tableAction?: TableAction;
}

export function MdTableHeaderCell({ column, isReadOnly, isHiddenCell, tableAction }: MdTableHeaderCellProps) {
    if (isActionColumnDisabledForReadOnly(column, isReadOnly, tableAction))
        return <th style={{ minWidth: "2rem" }} />;

    if (isActionColumnVisible(column, isReadOnly, tableAction) && tableAction) {
        return (
            <th>
                <button
                    style={{ display: isHiddenCell ? "none" : "table-cell", minWidth: "5rem" }}
                    title={tableAction.label}
                    type="button"
                >
                    <MdIcon name={iconNames[tableAction.icon]} />
                </button>
            </th>
        );
    }

    if (isColumnAction(column) && isReadOnly) {
        return <th style={{ display: isHiddenCell ? "none" : "table-cell", minWidth: "5rem" }} />;
    }

    return (
        <th style={{ display: isHiddenCell ? "none" : "table-cell", padding: "0 2rem" }}>{column.label}</th>
    );
}
