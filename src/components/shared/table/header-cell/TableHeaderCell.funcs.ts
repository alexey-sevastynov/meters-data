import { TableAction, TableColumn, tableColumnTypes } from "@/components/shared/table/table-models";

export function isActionColumnDisabledForReadOnly(
    column: TableColumn,
    isReadOnly: boolean,
    tableAction?: TableAction
) {
    return (!tableAction && isColumnAction(column)) || (isColumnAction(column) && isReadOnly);
}

export function isColumnAction(column: TableColumn) {
    return column.type === tableColumnTypes.actions;
}
