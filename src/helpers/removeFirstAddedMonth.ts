import { errorMessage } from "@/constants/errorMessage";
import { MeterDataType } from "@/types/MeterDataType";

const parseDate = (dateStr: string) => {
  const [month, year] = dateStr.split(".").map(Number);
  if (isNaN(month) || isNaN(year)) {
    throw new Error(errorMessage.invalidDateFormat.replace("{0}", dateStr));
  }

  return new Date(year, month - 1);
};

const findEarliestMonth = (dates: string[]) => {
  try {
    return dates
      .map(parseDate)
      .reduce(
        (earliest, current) => (current < earliest ? current : earliest),
        new Date()
      );
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);

    throw new Error(errorMessage.findEarliestMonthError.replace("{0}", msg));
  }
};

const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}.${year}`;
};

export const removeFirstAddedMonth = (data: MeterDataType[]) => {
  try {
    if (!data.length) return [];

    const dateStrings = data.map(({ date }) => date);
    const earliestMonth = findEarliestMonth(dateStrings);
    const earliestMonthStr = formatDate(earliestMonth);

    return data.filter(({ date }) => date !== earliestMonthStr);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(errorMessage.removeFirstAddedMonthError.replace("{0}", msg));

    return data;
  }
};
