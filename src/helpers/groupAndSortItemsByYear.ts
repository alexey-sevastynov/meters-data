import { GroupedData, MeterDataType } from "../types/MeterDataType";
import { compareDates } from "./compareDates";

export function groupAndSortItemsByYear(
  items: MeterDataType[],
  address: string
) {
  const filteredItemsByAddress = getFilteredItemsByAddress(items, address);
  const grouped = groupItemsByYear(filteredItemsByAddress);

  setLastYearAsOpen(grouped);
  sortItemsByDate(grouped);

  return grouped;
}

function getFilteredItemsByAddress(items: MeterDataType[], address: string) {
  return items.filter((item) => item.address === address);
}

function groupItemsByYear(items: MeterDataType[]) {
  return items.reduce((grouped: GroupedData, item) => {
    const yearString = getYearFromDate(item.date);

    if (!grouped[yearString]) {
      grouped[yearString] = {
        items: [],
        isOpen: false,
      };
    }

    grouped[yearString].items.push(item);
    return grouped;
  }, {});
}

function setLastYearAsOpen(grouped: GroupedData) {
  const years = Object.keys(grouped);
  const lastYear = years[years.length - 1];

  if (lastYear) {
    grouped[lastYear].isOpen = true;
  }
}

function sortItemsByDate(grouped: GroupedData) {
  for (const year of Object.keys(grouped)) {
    grouped[year].items.sort((a, b) => compareDates(a.date, b.date));
  }
}

function getYearFromDate(dateString: string) {
  const [month, year] = dateString.split(".").map(Number);
  const date = new Date(year, month - 1, 1);
  return date.getFullYear().toString();
}
