import { MeterDataType } from "@/types/meter-data-type";
import { sortByDateAsc } from "@/helpers/compare-dates";

export function filterAndSortItemsByAddressAndDate(items: MeterDataType[], address: string) {
    const filteredItems = filterItemsByAddress(items, address);

    return sortItemsByDate(filteredItems);
}

export function sortItemsByDate(items: MeterDataType[]) {
    return items.sort((a, b) => sortByDateAsc(a, b));
}

export function filterItemsByAddress(items: MeterDataType[], address: string): MeterDataType[] {
    return items.filter((item) => item.address === address);
}
