import { sortMeterDataListByDateAsc } from "@/helpers/meters-data/sort";
import { MeterDataWithObjectId } from "@/store/models/meter-data";

export function filterMeterDataByAddressAndSortByDate(items: MeterDataWithObjectId[], address: string) {
    const filteredItems = filterMeterDataByAddress(items, address);

    return sortMeterDataListByDateAsc(filteredItems);
}

export function filterMeterDataByAddress(items: MeterDataWithObjectId[], address: string) {
    return items.filter((item) => item.address === address);
}
