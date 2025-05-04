import { statusNames } from "@/constants/status";
import { isEmptyObject } from "@/utils/guards";
import { GroupedData } from "@/types/grouped-data";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { sortMeterDataByDateAsc, sortMeterDataByDateDesc } from "@/helpers/meters-data/sort";
import { filterMeterDataByAddress } from "@/helpers/meters-data/filters";

export function isEmptyList(groupedData: GroupedData, status: string) {
    return isEmptyObject(groupedData) && status === statusNames.loaded;
}

export function groupAndSortItemsByYear(items: MeterDataWithObjectId[], address: string) {
    const filteredItemsByAddress = filterMeterDataByAddress(items, address);
    const grouped = groupItemsByYear(filteredItemsByAddress);

    setLastYearAsOpen(grouped);
    sortItemsByDate(grouped);

    return grouped;
}

function groupItemsByYear(items: MeterDataWithObjectId[]) {
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

function getSortOrder(year: string, lastYear: string) {
    if (year === lastYear) {
        return (a: MeterDataWithObjectId, b: MeterDataWithObjectId) => sortMeterDataByDateDesc(a, b);
    }

    return (a: MeterDataWithObjectId, b: MeterDataWithObjectId) => sortMeterDataByDateAsc(a, b);
}

function sortItemsByDate(grouped: GroupedData) {
    const years = Object.keys(grouped);
    const lastYear = years[years.length - 1];

    for (const year of years) {
        grouped[year].items.sort(getSortOrder(year, lastYear));
    }
}

function getYearFromDate(dateString: string) {
    const [month, year] = dateString.split(".").map(Number);
    const date = new Date(year, month - 1, 1);

    return date.getFullYear().toString();
}
