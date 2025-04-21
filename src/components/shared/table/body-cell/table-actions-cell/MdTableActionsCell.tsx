import Styles from "./tableActionsCell.module.scss";
import { TableAction, TableRow } from "@/components/shared/table/table-models";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { colorNames } from "@/enums/color-names";

interface MdTableActionsCellProps {
    id: string;
    actions: TableAction[];
    row: TableRow;
    address: string;
}

export function MdTableActionsCell({ id, actions, row, address }: MdTableActionsCellProps) {
    return (
        <td className={Styles.tableActionsCell}>
            <div className={Styles.tableActionsCellButtons}>
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
                            title={action.label}
                            type="button"
                        >
                            <MdIcon name={iconNames[action.icon]} color={colorNames.green} />
                        </button>
                    ))}
            </div>
        </td>
    );
}
