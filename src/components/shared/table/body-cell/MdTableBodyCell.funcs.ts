import { tableMeterDataColumnKeys } from "@/components/shared/table/table-enums";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

export function getFormatDate(dateAsString: string) {
    const date = new Date(dateAsString);

    return format(date, "d.MM.yy, HH:mm", { locale: uk });
}

export function isWaterColumn(columnKey: string) {
    return columnKey === tableMeterDataColumnKeys.water;
}

export function isGasColumn(columnKey: string) {
    return columnKey === tableMeterDataColumnKeys.gas;
}

export function isDateColumn(columnKey: string) {
    return columnKey === tableMeterDataColumnKeys.date;
}
