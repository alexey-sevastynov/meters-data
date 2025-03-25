import { MeterData } from "../models/meter-data";

export function findPreviousDateById(items: MeterData[], id: string) {
    const item = items.find((meterDataItem) => meterDataItem._id === id);

    if (!item) return null;

    const currentDate = item.date;
    const [currentMonth, currentYear] = currentDate.split(".").map(Number);
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    const previousDate = `${previousMonth.toString().padStart(2, "0")}.${previousYear}`;

    const previousItem = items.find(
        (itm) => itm.date === previousDate && itm._id !== id && itm.address === item.address
    );

    return previousItem ? previousItem : null;
}
