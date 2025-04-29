import { errorMessage } from "@/constants/error-message";
import { isValidDateFormat } from "@/helpers/dates/date-validation";

export function getYearFromDate(date: string) {
    if (isValidDateFormat(date)) return date.split(".")[1];

    throw new Error(errorMessage.invalidDateFormat.replace("{0}", date));
}

export function getMonthFromDate(date: string) {
    if (isValidDateFormat(date)) return date.split(".")[0];

    throw new Error(errorMessage.invalidDateFormat.replace("{0}", date));
}
