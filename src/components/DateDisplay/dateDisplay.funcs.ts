import { format, Locale } from "date-fns";
import { DateFormatKey, dateFormats } from "./constants";
import { errorMessage } from "@/constants/errorMessage";

export function getFormattedDate(
  date: Date,
  formatType: DateFormatKey,
  locale: Locale
) {
  const formatString = dateFormats[formatType];

  if (!formatString) {
    throw new Error(errorMessage.unknownFormatType.replace("{0}", formatType));
  }

  return format(date, formatString, { locale });
}
