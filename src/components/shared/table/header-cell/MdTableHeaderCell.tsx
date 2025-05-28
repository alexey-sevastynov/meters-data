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
} from "@/components/shared/table/header-cell/TableHeaderCell.funcs";
import { useState, useRef, useEffect } from "react";
import { MdResizableBox } from "@/components/ui/resizable-box/MdResizableBox";
import { colorNames } from "@/enums/color-names";
import { VoidFunc } from "@/types/getter-setter-functions";
import { maxWidthColumn } from "@/components/shared/table/table-constants";
import { tableColumnTypes } from "@/components/shared/table/table-enums";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";
import { getPropertyValue } from "@/lib/utils";

interface MdTableHeaderCellProps {
    column: TableColumn;
    isReadOnly: boolean;
    isHiddenCell: boolean;
    tableAction?: TableAction;
    onSort?: VoidFunc<string>;
}

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
            <th className={styles.tableHeaderCellAction}>
                {column.isDisplayable && (
                    <button
                        style={{
                            display: getTableCellDisplay(isHiddenCell),
                        }}
                        title={getPropertyValue(translations.table, tableAction.label)}
                        type="button"
                    >
                        <MdIcon name={iconNames[tableAction.icon]} color={colorNames.grey} />
                    </button>
                )}
            </th>
        );
    }

    if (isColumnAction(column) && isReadOnly) {
        return <th style={{ display: getTableCellDisplay(isHiddenCell), minWidth: "5rem" }} />;
    }

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
                        column.type === tableColumnTypes.number && styles.tableHeaderCellNumber
                    )}
                    onClick={() => onSort?.(column.key)}
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
