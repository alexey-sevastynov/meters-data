import { GroupedData, MeterDataType } from "../types/meter-data-type";
import { sortByDateAsc, sortByDateDesc } from "@/helpers/compare-dates";

export function groupAndSortItemsByYear(items: MeterDataType[], address: string) {
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

function getSortOrder(year: string, lastYear: string) {
    if (year === lastYear) {
        return (a: MeterDataType, b: MeterDataType) => sortByDateDesc(a, b);
    }

    return (a: MeterDataType, b: MeterDataType) => sortByDateAsc(a, b);
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
