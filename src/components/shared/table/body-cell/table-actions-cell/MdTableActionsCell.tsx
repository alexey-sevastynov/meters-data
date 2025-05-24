import { useEffect } from "react";
import styles from "./tableActionsCell.module.scss";
import { TableAction, TableRow } from "@/components/shared/table/table-models";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { deleteItemMeterData } from "@/components/shared/table/body-cell/table-actions-cell/tableActionsCell.funcs";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";

interface MdTableActionsCellProps {
    id: string;
    actions: TableAction[];
    row: TableRow;
    address: string;
}

export function MdTableActionsCell({ id, actions, row, address }: MdTableActionsCellProps) {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const translations = useAppSelector(selectTranslations);
    const isDelete = useAppSelector((state) => state.confirm.isActionDeleteItem);
    const idDelete = useAppSelector((state) => state.confirm.idDeleteItem);

    useEffect(() => {
        if (isDelete && idDelete === id) deleteItemMeterData(id, dispatch);
        // Approve
        // eslint-disable-next-line
    }, [isDelete]);

    return (
        <td className={styles.tableActionsCell}>
            <div className={styles.tableActionsCellButtons}>
                {actions
                    .filter((action) => action.visible)
                    .map((action) => (
                        <button
                            key={action.icon}
                            onClick={() =>
                                action.onClick({
                                    id,
                                    address,
                                    date: row.date,
                                    light: row.light,
                                    lightDay: row.lightDay,
                                    lightNight: row.lightNight,
                                    gas: row.gas,
                                    water: row.water,
                                    createdAt: row.createdAt,
                                    updatedAt: row.updatedAt,
                                })
                            }
                            title={translations.table[action.label as keyof typeof translations.table]}
                            type="button"
                        >
                            <MdIcon name={iconNames[action.icon]} color={getBaseIconColor(theme.themeMode)} />
                        </button>
                    ))}
            </div>
        </td>
    );
}
