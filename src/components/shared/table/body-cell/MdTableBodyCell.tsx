import { TableColumn, tableColumnTypes } from "@/components/shared/table/table-models";
import { getFormatDate } from "@/components/shared/table/body-cell/MdTableBodyCell.funcs";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";

interface MdTableBodyCellProps {
    column: TableColumn;
    value: unknown;
    isReadOnly: boolean;
    isLatestData?: boolean;
}

export function MdTableBodyCell({ column, value, isLatestData, isReadOnly }: MdTableBodyCellProps) {
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
                <td>
                    <button type="button">
                        <MdIcon name={iconNames.view} color={colorNames.black} />
                    </button>
                    {!isReadOnly && (
                        <button type="button">
                            <MdIcon name={iconNames.edit} color={colorNames.black} />
                        </button>
                    )}
                    {!isReadOnly && isLatestData && (
                        <button type="button">
                            <MdIcon name={iconNames.delete} color={colorNames.black} />
                        </button>
                    )}
                </td>
            );
        default:
            return <td>{value as string}</td>;
    }
}
