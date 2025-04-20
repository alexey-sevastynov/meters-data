import Styles from "./tableBodyCell.module.scss";
import { TableAction, TableColumn, tableColumnTypes, TableRow } from "@/components/shared/table/table-models";
import { getFormatDate } from "@/components/shared/table/body-cell/MdTableBodyCell.funcs";
import { useLocation } from "react-router-dom";
import { isColumnAction } from "@/components/shared/table/header-cell/TableHeaderCell.funcs";
import { MdTableActionsCell } from "@/components/shared/table/body-cell/table-actions-cell/MdTableActionsCell";

interface MdTableBodyCellProps {
    id: unknown;
    column: TableColumn;
    value: unknown;
    isReadOnly: boolean;
    isHiddenCell: boolean;
    row: TableRow;
    actions?: TableAction[];
}

export function MdTableBodyCell({
    column,
    value,
    isReadOnly,
    isHiddenCell,
    actions,
    row,
}: MdTableBodyCellProps) {
    const { pathname } = useLocation();
    const address = pathname.slice(1);

    if (isHiddenCell) return;

    if (isReadOnly && isColumnAction(column))
        return <td className={Styles.tableBodyCell} style={{ minWidth: "2rem" }}></td>;

    switch (column.type) {
        case tableColumnTypes.string:
            return <td className={Styles.tableBodyCell}>{value as string}</td>;
        case tableColumnTypes.number:
            return (
                <td className={Styles.tableBodyCell} style={{ textAlign: "right" }}>
                    {value as number}
                </td>
            );
        case tableColumnTypes.boolean:
            return <td className={Styles.tableBodyCell}>{value as boolean}</td>;
        case tableColumnTypes.date:
            return <td className={Styles.tableBodyCell}>{getFormatDate(value as string)}</td>;
        case tableColumnTypes.actions:
            return (
                <MdTableActionsCell
                    id={row.id as string}
                    actions={actions as TableAction[]}
                    row={row}
                    address={address}
                />
            );

        default:
            return <td className={Styles.tableBodyCell}>{value as string}</td>;
    }
}
