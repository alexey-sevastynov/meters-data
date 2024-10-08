import { MeterDataType } from "../types/MeterDataType";
import { compareDates } from "./compareDates";

export function filterAndSortItemsByAddressAndDate(
  items: MeterDataType[],
  address: string
) {
  return items
    .filter((item) => item.address === address)
    .sort((a, b) => compareDates(a.date, b.date));
}
