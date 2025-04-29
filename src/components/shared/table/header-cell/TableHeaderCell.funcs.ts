import { TableAction, TableColumn } from "@/components/shared/table/table-models";
import { tableColumnTypes } from "@/components/shared/table/table-enums";

export function isActionColumnDisabledForReadOnly(
    column: TableColumn,
    isReadOnly: boolean,
    tableAction?: TableAction
) {
    return isColumnAction(column) && !tableAction && isReadOnly;
}

export function isActionColumnVisible(column: TableColumn, isReadOnly: boolean, tableAction?: TableAction) {
    return isColumnAction(column) && !isReadOnly && tableAction?.visible;
}

export function isColumnAction(column: TableColumn) {
    return column.type === tableColumnTypes.actions;
}

export function calculateMinColumnWidth(element: HTMLElement | null) {
    if (!element) return 0;

    const extraWidthPadding = 20;
    const contentWidth = element.scrollWidth;

    return contentWidth + extraWidthPadding;
}

export function getTableCellDisplay(isHidden: boolean) {
    return isHidden ? "none" : "table-cell";
}
