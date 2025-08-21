import { parse, format } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatDate(inputDate: string) {
    const parsedDate = parse(inputDate, "MM.yyyy", new Date());
    const formattedDate = format(parsedDate, "MMMM, yyyy", { locale: enUS });

    return formattedDate;
}
