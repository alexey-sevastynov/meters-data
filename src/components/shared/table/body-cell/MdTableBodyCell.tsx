import { TableAction, TableColumn, tableColumnTypes, TableRow } from "@/components/shared/table/table-models";
import { getFormatDate } from "@/components/shared/table/body-cell/MdTableBodyCell.funcs";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";
import { useLocation } from "react-router-dom";

interface MdTableBodyCellProps {
    id: unknown;
    column: TableColumn;
    value: unknown;
    isReadOnly: boolean;
    isHiddenCell: boolean;
    row: TableRow;
    actions?: TableAction[];
}

export function MdTableBodyCell({ id, column, value, isHiddenCell, actions, row }: MdTableBodyCellProps) {
    const { pathname } = useLocation();
    const address = pathname.slice(1);

    if (isHiddenCell) return;

    switch (column.type) {
        case tableColumnTypes.string:
            return <td>{value as string}</td>;
        case tableColumnTypes.number:
            return <td>{value as number}</td>;
        case tableColumnTypes.boolean:
            return <td>{value as boolean}</td>;
        case tableColumnTypes.date:
            return <td>{getFormatDate(value as string)}</td>;
        case tableColumnTypes.actions:
            return (
                <th>
                    {actions?.map(
                        (action) =>
                            action.visible && (
                                <button
                                    key={action.icon}
                                    onClick={() =>
                                        action.onClick({
                                            id: String(id),
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
                                    <MdIcon name={iconNames[action.icon]} color={colorNames.black} />
                                </button>
                            )
                    )}
                </th>
            );

        default:
            return <td>{value as string}</td>;
    }
}
