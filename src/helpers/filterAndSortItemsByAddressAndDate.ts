import { MeterDataType } from "../types/MeterDataType";

export function filterAndSortItemsByAddressAndDate(
  items: MeterDataType[],
  address: string
) {
  return items
    .filter((item) => item.address === address)
    .sort((a, b) => compareByDate(a.date, b.date));
}

function compareByDate(dateA: string, dateB: string) {
  const [aMonth, aYear] = dateA.split(".");
  const [bMonth, bYear] = dateB.split(".");

  if (aYear !== bYear) {
    return +aYear - +bYear;
  } else {
    return +aMonth - +bMonth;
  }
}
