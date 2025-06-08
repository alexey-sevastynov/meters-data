import { TableRow } from "@/components/shared/table/table-models";
import { StatusName, statusNames } from "@/constants/status";

export function isTableEmpty(rows: TableRow[]) {
    return rows.length === 0;
}

export function shouldShowNoData(statusName: StatusName, isRenderComplete: boolean, rows: TableRow[]) {
    return statusName === statusNames.loaded && isRenderComplete && isTableEmpty(rows);
}
