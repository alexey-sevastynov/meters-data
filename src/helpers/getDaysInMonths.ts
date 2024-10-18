import { EN } from "@/constants/language";

const toPascalCase = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function getDaysInMonths(
  date: string,
  showMonth = true,
  showYear = true,
  locale = EN
) {
  let month: number;
  let year: number;

  if (date.includes(".")) {
    const [monthStr, yearStr] = date.split(".");
    month = parseInt(monthStr, 10) - 1;
    year = parseInt(yearStr, 10);
  } else {
    const [monthName, yearStr] = date.split(",").map((part) => part.trim());
    month = new Date(Date.parse(monthName + " 1")).getMonth();
    year = parseInt(yearStr, 10);
  }

  const firstDayNextMonth = new Date(year, month + 1, 1);
  const lastDayCurrentMonth = new Date(firstDayNextMonth.getTime() - 86400000);

  const monthFullName = lastDayCurrentMonth.toLocaleString(locale, {
    month: "short",
  });

  const monthFullNamePascal = toPascalCase(monthFullName);

  if (showMonth && showYear) {
    return `${monthFullNamePascal} 1 - ${monthFullNamePascal} ${lastDayCurrentMonth.getDate()} / ${year}`;
  } else if (showMonth && !showYear) {
    return `${monthFullNamePascal} 1 - ${monthFullNamePascal} ${lastDayCurrentMonth.getDate()}`;
  } else if (!showMonth && showYear) {
    return `${year}`;
  } else {
    return "";
  }
}
