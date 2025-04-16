import { TableAction, TableColumn, tableColumnTypes } from "@/components/shared/table/table-models";

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
