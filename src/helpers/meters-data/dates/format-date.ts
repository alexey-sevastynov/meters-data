import { parse, format, isValid } from "date-fns";
import { dateFormats } from "@/components/shared/date-display/constants";
import { LanguageKey, languageKeys } from "@/enums/language-keys";
import { getLocale } from "@/helpers/language/get-current-language";

export function formatDate(inputDate: string, language: LanguageKey = languageKeys.en) {
    const parsedDate = parse(inputDate, dateFormats.monthYear, new Date());
    const formattedDate = format(parsedDate, dateFormats.monthYearFull, { locale: getLocale(language) });

    return formattedDate;
}

export function getMonthNumberFromName(monthName: string) {
    const parsedDate = parse(monthName, "MMMM", new Date());

    if (!isValid(parsedDate)) {
        throw new Error(`Invalid month name: "${monthName}"`);
    }

    return format(parsedDate, "MM");
}
