import { Option } from "@/components/ui/input-group/input-group-models";
import { getYearFromDate } from "@/helpers/meters-data/dates/get-date";
import { MeterDataWithObjectId } from "@/store/models/meter-data";

export function getAllYears(sortedAddressMeterData: MeterDataWithObjectId[]) {
    const uniqueYears = new Set<string>();

    for (const item of sortedAddressMeterData) {
        const year = getYearFromDate(item.date);
        uniqueYears.add(year);
    }

    const sortedUniqueYears = [...uniqueYears].sort((a, b) => +b - +a);
    const allYears: Option[] = sortedUniqueYears.map((year) => ({ value: year, label: year }));

    return allYears;
}

export function isCurrentYearSelectionNeeded(years: Option[], selectedYears: Option[]) {
    return years.length > 0 && selectedYears.length === 0;
}

export function isClearSelectionNeeded(years: Option[], selectedYears: Option[]) {
    return years.length === 0 && selectedYears.length > 0;
}
