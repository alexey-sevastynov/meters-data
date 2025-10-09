import styles from "./tableHeaderCell.module.scss";
import { cn } from "@/lib/cn";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { TableAction, TableColumn } from "@/components/shared/table/table-models";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import {
    calculateMinColumnWidth,
    getTableCellDisplay,
    isActionColumnDisabledForReadOnly,
    isActionColumnVisible,
    isColumnAction,
    isColumnSort,
} from "@/components/shared/table/header-cell/TableHeaderCell.funcs";
import { useState, useRef, useEffect } from "react";
import { MdResizableBox } from "@/components/ui/resizable-box/MdResizableBox";
import { VoidFunc } from "@/types/getter-setter-functions";
import { maxWidthColumn } from "@/components/shared/table/table-constants";
import { tableColumnTypes } from "@/components/shared/table/table-enums";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";
import { getPropertyValue } from "@/lib/utils";
import { MdTableHeaderActionsCell } from "@/components/shared/table/header-cell/table-header-actions-cell/MdTableHeaderActionsCell";

interface MdTableHeaderCellProps {
    column: TableColumn;
    isReadOnly: boolean;
    isHiddenCell: boolean;
    tableAction?: TableAction;
    onSort?: VoidFunc<string>;
}

// eslint-disable-next-line complexity
export function MdTableHeaderCell({
    column,
    isReadOnly,
    isHiddenCell,
    tableAction,
    onSort,
}: MdTableHeaderCellProps) {
    const theme = useTheme();
    const translations = useAppSelector(selectTranslations);
    const cellRef = useRef<HTMLTableCellElement>(null);
    const [minWidth, setMinWidth] = useState<number>(column.minWidth || 0);

    useEffect(() => {
        if (minWidth === 0 && cellRef.current) {
            const width = calculateMinColumnWidth(cellRef.current);

            setMinWidth(width);
        }
    }, [minWidth]);

    if (isActionColumnDisabledForReadOnly(column, isReadOnly, tableAction))
        return <th className={styles.tableHeaderCellActionForReadOnly} />;

    if (isActionColumnVisible(column, isReadOnly, tableAction) && tableAction) {
        return (
            <MdTableHeaderActionsCell column={column} isHiddenCell={isHiddenCell} tableAction={tableAction} />
        );
    }

    if (isColumnAction(column) && isReadOnly) {
        return <th style={{ display: getTableCellDisplay(isHiddenCell), minWidth: "5rem" }} />;
    }

    const onSortClick = () => {
        if (isColumnSort(column) && onSort) {
            onSort(column.key);
        }
    };

    return (
        <th
            ref={cellRef}
            className={cn(styles.tableHeaderCell, styles.leftResizableHandle)}
            style={{ display: getTableCellDisplay(isHiddenCell) }}
        >
            <MdResizableBox width={minWidth + 20} minWidth={minWidth} maxWidth={maxWidthColumn}>
                <button
                    className={cn(
                        styles.tableHeaderCellButton,
                        column.type === tableColumnTypes.number && styles.tableHeaderCellNumber,
                        isColumnSort(column) && styles.tableHeaderCellButtonSortable
                    )}
                    onClick={onSortClick}
                    type="button"
                >
                    <p className={styles.tableHeaderCellLabel}>
                        {getPropertyValue(translations.table, column.key)}
                    </p>
                    {column.sort && (
                        <MdIcon
                            name={iconNames.sort}
                            color={getBaseIconColor(theme.themeMode)}
                            size={iconSizes.small}
                        />
                    )}
                </button>
            </MdResizableBox>
        </th>
    );
}
