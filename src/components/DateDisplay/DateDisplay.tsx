import React from "react";
import { enUS, uk } from "date-fns/locale";
import { DateDisplayProps } from "./dateDisplay.interfaces";
import { getFormattedDate } from "./dateDisplay.funcs";
import { dateFormatKeys, languages } from "./constants";

const DateDisplay: React.FC<DateDisplayProps> = ({
  date,
  className,
  subTitle,
  formatType = dateFormatKeys.full,
  language = languages.en,
}) => {
  const lang = language === languages.en ? enUS : uk;
  const formattedDate = getFormattedDate(date, formatType, lang);

  return (
    <p className={className}>
      {subTitle && <span>{subTitle}: </span>}
      <span>{formattedDate}</span>
    </p>
  );
};

export default DateDisplay;
