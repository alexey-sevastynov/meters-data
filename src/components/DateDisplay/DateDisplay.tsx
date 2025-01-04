import React from "react";
import { DateDisplayProps } from "./dateDisplay.interfaces";
import { getFormattedDate } from "./dateDisplay.funcs";
import { dateFormatKeys } from "./constants";

const DateDisplay: React.FC<DateDisplayProps> = ({
  date,
  className,
  subTitle,
  formatType = dateFormatKeys.full,
}) => {
  const formattedDate = getFormattedDate(date, formatType);

  return (
    <p className={className}>
      {subTitle && <span>{subTitle}: </span>}
      <span>{formattedDate}</span>
    </p>
  );
};

export default DateDisplay;
