import { TableRow } from "@/components/shared/table/table-models";

export function isTableEmpty(rows: TableRow[]) {
    return rows.length === 0;
}
