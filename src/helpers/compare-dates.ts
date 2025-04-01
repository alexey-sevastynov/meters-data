import { MeterDataWithObjectId } from "@/store/models/meter-data";

export function sortByDateDesc(a: MeterDataWithObjectId, b: MeterDataWithObjectId) {
    return compareDates(b.date, a.date);
}

export function sortByDateAsc(a: MeterDataWithObjectId, b: MeterDataWithObjectId) {
    return compareDates(a.date, b.date);
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
