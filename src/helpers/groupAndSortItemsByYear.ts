import { GroupedData, MeterDataType } from "../types/MeterDataType";
import { compareDates } from "./compareDates";

export function groupAndSortItemsByYear(
  items: MeterDataType[],
  address: string
) {
  const grouped: GroupedData = {};

  items
    .filter((item) => item.address === address)
    .forEach((item) => {
      const [month, year] = item.date.split(".").map(Number);
      const date = new Date(year, month - 1, 1);
      const yearString = date.getFullYear().toString();

      if (!grouped[yearString]) {
        grouped[yearString] = {
          items: [],
          isOpen: yearString === new Date().getFullYear().toString(),
        };
      }
      grouped[yearString].items.push(item);
    });

  Object.keys(grouped).forEach((year) => {
    grouped[year].items.sort((a, b) => {
      const isCurrentYear = year === new Date().getFullYear().toString();

      return isCurrentYear
        ? compareDates(b.date, a.date)
        : compareDates(a.date, b.date);
    });
  });

  return grouped;
}
