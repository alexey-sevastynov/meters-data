import { format, Locale } from "date-fns";
import { DateFormatKey, dateFormats } from "@/components/shared/date-display/constants";
import { errorMessage } from "@/constants/error-message";

export function getFormattedDate(date: Date, formatType: DateFormatKey, locale: Locale) {
    const formatString = dateFormats[formatType];

    if (!formatString) {
        throw new Error(errorMessage.unknownFormatType.replace("{0}", formatType));
    }

    return format(date, formatString, { locale });
}
