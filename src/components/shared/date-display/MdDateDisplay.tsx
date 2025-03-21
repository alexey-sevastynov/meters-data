import { enUS, uk } from "date-fns/locale";
import { MdDateDisplayProps } from "./dateDisplay.interfaces";
import { getFormattedDate } from "./dateDisplay.funcs";
import { dateFormatKeys, languages } from "./constants";

export function MdDateDisplay({
  date,
  className,
  subTitle,
  formatType = dateFormatKeys.full,
  language = languages.en,
}: MdDateDisplayProps) {
  const lang = language === languages.en ? enUS : uk;
  const formattedDate = getFormattedDate(date, formatType, lang);

  return (
    <p className={className}>
      {subTitle && <span>{subTitle}: </span>}
      <span>{formattedDate}</span>
    </p>
  );
}
