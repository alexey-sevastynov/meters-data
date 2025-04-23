import Styles from "./tableBodyCell.module.scss";
import { cn } from "@/lib/cn";
import { TableAction, TableColumn, TableRow } from "@/components/shared/table/table-models";
import {
    getFormatDate,
    isGasColumn,
    isWaterColumn,
} from "@/components/shared/table/body-cell/MdTableBodyCell.funcs";
import { useLocation, Location } from "react-router-dom";
import { isColumnAction } from "@/components/shared/table/header-cell/TableHeaderCell.funcs";
import { MdTableActionsCell } from "@/components/shared/table/body-cell/table-actions-cell/MdTableActionsCell";
import { tableColumnTypes } from "@/components/shared/table/table-enums";

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
    const location = useLocation();

    if (isHiddenCell) return;

    if (isReadOnly && isColumnAction(column)) return <td className={Styles.tableBodyCell}></td>;

    return renderCellByType(column, value, actions, row, location);
}

function renderCellByType(
    column: TableColumn,
    value: unknown,
    actions: unknown,
    row: TableRow,
    location: Location
) {
    const address = location.pathname.slice(1);
    const numberCellClassName = cn(
        Styles.tableBodyCell,
        Styles.tableBodyCellNumber,
        isWaterColumn(column.key) && Styles.tableBodyCellWater,
        isGasColumn(column.key) && Styles.tableBodyCellGas
    );

    switch (column.type) {
        case tableColumnTypes.string:
            return <td className={Styles.tableBodyCell}>{value as string}</td>;
        case tableColumnTypes.number:
            return <td className={numberCellClassName}>{value as number}</td>;
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
