import { sortByDateAsc } from "@/helpers/compare-dates";
import { MeterDataWithObjectId } from "@/store/models/meter-data";

export function filterAndSortItemsByAddressAndDate(items: MeterDataWithObjectId[], address: string) {
    const filteredItems = filterItemsByAddress(items, address);

    return sortItemsByDate(filteredItems);
}

export function sortItemsByDate(items: MeterDataWithObjectId[]) {
    return items.sort((a, b) => sortByDateAsc(a, b));
}

export function filterItemsByAddress(
    items: MeterDataWithObjectId[],
    address: string
): MeterDataWithObjectId[] {
    return items.filter((item) => item.address === address);
}
