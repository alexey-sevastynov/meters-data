import { MeterDataWithObjectId } from "@/store/models/meter-data";

export function sortMeterDataByDateDesc(a: MeterDataWithObjectId, b: MeterDataWithObjectId) {
    return compareDates(b.date, a.date);
}

export function sortMeterDataByDateAsc(a: MeterDataWithObjectId, b: MeterDataWithObjectId) {
    return compareDates(a.date, b.date);
}

export function sortMeterDataListByDateAsc(items: MeterDataWithObjectId[]) {
    return items.sort((a, b) => sortMeterDataByDateAsc(a, b));
}

function compareDates(dateA: string, dateB: string) {
    const [aMonth, aYear] = dateA.split(".");
    const [bMonth, bYear] = dateB.split(".");

    if (aYear !== bYear) {
        return +aYear - +bYear;
    } else {
        return +aMonth - +bMonth;
    }
}
