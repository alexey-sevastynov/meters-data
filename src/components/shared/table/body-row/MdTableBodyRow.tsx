import styles from "./tableBodyRow.module.scss";
import { useLocation } from "react-router-dom";
import { MdTableBodyCell } from "@/components/shared/table/body-cell/MdTableBodyCell";
import { TableAction, TableColumn, TableRow } from "@/components/shared/table/table-models";
import { getUtilityCostByAddress } from "@/helpers/meters-data/get-utility-cost-by-address";
import { cn } from "@/lib/cn";
import { useAppSelector } from "@/store/hook";

interface MdTableBodyRowProps {
    row: TableRow;
    columns: TableColumn[];
    isReadOnly: boolean;
    listHiddenColumns: string[];
    actions?: TableAction[];
}

export function MdTableBodyRow({
    row,
    columns,
    isReadOnly,
    listHiddenColumns,
    actions,
}: MdTableBodyRowProps) {
    // <Temporary solution, to be removed in the future>
    const { pathname } = useLocation();
    const currentPage: string = pathname.slice(1);
    const infoMeterReading = useAppSelector((state) => state.metersData.infoMeterReading);
    const currentInfoMeterReading = getUtilityCostByAddress(infoMeterReading, currentPage);
    const selectedMonthId = currentInfoMeterReading?.[0].id;
    // </Temporary solution, to be removed in the future>

    return (
        <tr className={cn(styles.root, row.id === selectedMonthId && styles.active)}>
            {columns.map((col) => {
                const isHiddenCell = listHiddenColumns.includes(col.key);

                return (
                    <MdTableBodyCell
                        key={col.key}
                        id={row.id}
                        column={col}
                        value={row[col.key]}
                        isReadOnly={isReadOnly}
                        isHiddenCell={isHiddenCell}
                        row={row}
                        actions={actions}
                    />
                );
            })}
        </tr>
    );
}
