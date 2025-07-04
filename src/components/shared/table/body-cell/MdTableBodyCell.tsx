import styles from "./tableBodyCell.module.scss";
import { cn } from "@/lib/cn";
import { TableAction, TableColumn, TableRow } from "@/components/shared/table/table-models";
import {
    getFormatDate,
    isDateColumn,
    isGasColumn,
    isWaterColumn,
} from "@/components/shared/table/body-cell/MdTableBodyCell.funcs";
import { useLocation, Location } from "react-router-dom";
import { isColumnAction } from "@/components/shared/table/header-cell/TableHeaderCell.funcs";
import { MdTableActionsCell } from "@/components/shared/table/body-cell/table-actions-cell/MdTableActionsCell";
import { tableColumnTypes } from "@/components/shared/table/table-enums";
import { getDaysInMonths } from "@/helpers/meters-data/dates/get-days-in-months";
import { useAppSelector } from "@/store/hook";
import { getCurrentLanguage } from "@/helpers/language/get-current-language";

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
    const lang = useAppSelector((state) => state.i18n.lang);

    if (isHiddenCell) return;

    if (isReadOnly && isColumnAction(column)) return <td className={styles.root}></td>;

    return renderCellByType(column, value, actions, row, location, lang);
}

function renderCellByType(
    column: TableColumn,
    value: unknown,
    actions: unknown,
    row: TableRow,
    location: Location,
    lang: string
) {
    const address = location.pathname.slice(1);
    const numberCellClassName = cn(
        styles.root,
        styles.tableBodyCellNumber,
        isWaterColumn(column.key) && styles.tableBodyCellWater,
        isGasColumn(column.key) && styles.tableBodyCellGas
    );

    switch (column.type) {
        case tableColumnTypes.string: {
            const currentLang = getCurrentLanguage(lang);
            const displayValue = isDateColumn(column.key)
                ? getDaysInMonths(value as string, true, true, currentLang)
                : (value as string);

            return <td className={styles.root}>{displayValue}</td>;
        }
        case tableColumnTypes.number:
            return <td className={numberCellClassName}>{value as number}</td>;
        case tableColumnTypes.boolean:
            return <td className={styles.root}>{value as boolean}</td>;
        case tableColumnTypes.date:
            return <td className={styles.root}>{getFormatDate(value as string)}</td>;
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
            return <td className={styles.root}>{value as string}</td>;
    }
}
