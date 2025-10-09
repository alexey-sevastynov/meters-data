import styles from "./tableHeaderActionsCell.module.scss";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { TableAction, TableColumn } from "@/components/shared/table/table-models";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { getTableCellDisplay } from "@/components/shared/table/header-cell/TableHeaderCell.funcs";
import { colorNames } from "@/enums/color-names";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { getPropertyValue } from "@/lib/utils";

interface MdTableHeaderActionsCellProps {
    column: TableColumn;
    isHiddenCell: boolean;
    tableAction: TableAction;
}

export function MdTableHeaderActionsCell({
    column,
    isHiddenCell,
    tableAction,
}: MdTableHeaderActionsCellProps) {
    const translations = useAppSelector(selectTranslations);

    return (
        <th className={styles.root}>
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
