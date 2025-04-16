import { format } from "date-fns";
import { uk } from "date-fns/locale";

export function getFormatDate(dateAsString: string) {
    const date = new Date(dateAsString);

    return format(date, "d.MM.yy, HH:mm", { locale: uk });
}
