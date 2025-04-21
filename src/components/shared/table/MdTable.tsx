import Styles from "./table.module.scss";
import { TableConfig } from "@/components/shared/table/table-config";
import { MdTableHeader } from "@/components/shared/table/header/MdTableHeader";
import { MdTableBody } from "@/components/shared/table/body/MdTableBody";

interface TableMetresDataProps {
    tableConfig: TableConfig;
    isReadOnly?: boolean;
    listHiddenColumns?: string[];
}

export function MdTable({ tableConfig, isReadOnly = false, listHiddenColumns = [] }: TableMetresDataProps) {
    return (
        <table className={Styles.table}>
            <MdTableHeader
                columns={tableConfig.columns}
                isReadOnly={isReadOnly}
                listHiddenColumns={listHiddenColumns}
                tableAction={tableConfig.action}
            />
            <MdTableBody
                rows={tableConfig.rows}
                columns={tableConfig.columns}
                isReadOnly={isReadOnly}
                listHiddenColumns={listHiddenColumns}
            />
        </table>
    );
}
