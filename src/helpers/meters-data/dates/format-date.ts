import { parse, format, isValid } from "date-fns";
import { enUS } from "date-fns/locale";
import { dateFormats } from "@/components/shared/date-display/constants";

export function formatDate(inputDate: string) {
    const parsedDate = parse(inputDate, dateFormats.monthYear, new Date());
    const formattedDate = format(parsedDate, dateFormats.monthYearFull, { locale: enUS });

    return formattedDate;
}

export function getMonthNumberFromName(monthName: string) {
    const parsedDate = parse(monthName, "MMMM", new Date());

    if (!isValid(parsedDate)) {
        throw new Error(`Invalid month name: "${monthName}"`);
    }

    return format(parsedDate, "MM");
}
