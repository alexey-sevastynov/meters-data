import { parse, format } from "date-fns";
import { enUS } from "date-fns/locale";
import { dateFormats } from "@/components/shared/date-display/constants";

export function formatDate(inputDate: string) {
    const parsedDate = parse(inputDate, dateFormats.monthYear, new Date());
    const formattedDate = format(parsedDate, dateFormats.monthYearFull, { locale: enUS });

    return formattedDate;
}
