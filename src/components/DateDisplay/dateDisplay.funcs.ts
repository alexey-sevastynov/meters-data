import { format } from "date-fns";
import { DateFormatKey, dateFormats } from "./constants";
import { errorMessage } from "@/constants/errorMessage";

export const getFormattedDate = (date: Date, formatType: DateFormatKey) => {
  const formatString = dateFormats[formatType];

  if (!formatString) {
    throw new Error(errorMessage.unknownFormatType.replace("{0}", formatType));
  }

  return format(date, formatString);
};
