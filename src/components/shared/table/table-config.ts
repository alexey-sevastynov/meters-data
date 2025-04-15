import { TableAction, TableColumn, TableRow } from "@/components/shared/table/table-models";

export interface TableConfig {
    columns: TableColumn[];
    rows: TableRow[];
    action?: TableAction;
}
