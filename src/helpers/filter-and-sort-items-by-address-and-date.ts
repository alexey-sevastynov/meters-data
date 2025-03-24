import { sortByDateAsc } from "@/helpers/compare-dates";
import { MeterData } from "@/store/models/meter-data";

export function filterAndSortItemsByAddressAndDate(items: MeterData[], address: string) {
    const filteredItems = filterItemsByAddress(items, address);

    return sortItemsByDate(filteredItems);
}

export function sortItemsByDate(items: MeterData[]) {
    return items.sort((a, b) => sortByDateAsc(a, b));
}

export function filterItemsByAddress(items: MeterData[], address: string): MeterData[] {
    return items.filter((item) => item.address === address);
}
