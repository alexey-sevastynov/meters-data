import Styles from "./tableHeaderCell.module.scss";
import { cn } from "@/lib/cn";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { TableAction, TableColumn } from "@/components/shared/table/table-models";
import { iconNames } from "@/components/ui/icon/icon-constants";
import {
    calculateMinColumnWidth,
    isActionColumnDisabledForReadOnly,
    isActionColumnVisible,
    isColumnAction,
} from "./TableHeaderCell.funcs";
import { useState, useRef, useEffect } from "react";
import { MdResizableBox } from "@/components/ui/resizable-box/MdResizableBox";
import { colorNames } from "@/enums/color-names";

interface MdTableHeaderCellProps {
    column: TableColumn;
    isReadOnly: boolean;
    isHiddenCell: boolean;
    tableAction?: TableAction;
}

export function MdTableHeaderCell({ column, isReadOnly, isHiddenCell, tableAction }: MdTableHeaderCellProps) {
    const cellRef = useRef<HTMLTableCellElement>(null);
    const [minWidth, setMinWidth] = useState<number>(0);
    const maxWidth = 300;

    useEffect(() => {
        if (minWidth === 0 && cellRef.current) {
            const width = calculateMinColumnWidth(cellRef.current);

            setMinWidth(width);
        }
    }, [minWidth]);

    if (isActionColumnDisabledForReadOnly(column, isReadOnly, tableAction))
        return <th style={{ minWidth: "2rem" }} />;

    if (isActionColumnVisible(column, isReadOnly, tableAction) && tableAction) {
        return (
            <th className={Styles.tableHeaderCellAction}>
                <button
                    style={{
                        display: isHiddenCell ? "none" : "table-cell",
                    }}
                    title={tableAction.label}
                    type="button"
                >
                    <MdIcon name={iconNames[tableAction.icon]} color={colorNames.green} />
                </button>
            </th>
        );
    }

    if (isColumnAction(column) && isReadOnly) {
        return <th style={{ display: isHiddenCell ? "none" : "table-cell", minWidth: "5rem" }} />;
    }

    return (
        <th
            ref={cellRef}
            className={cn(Styles.tableHeaderCell, Styles.leftResizableHandle)}
            style={{ display: isHiddenCell ? "none" : "table-cell" }}
        >
            <MdResizableBox width={minWidth + 20} minWidth={minWidth} maxWidth={maxWidth}>
                {column.label}
            </MdResizableBox>
        </th>
    );
}
