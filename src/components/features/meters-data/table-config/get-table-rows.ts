import { TableRow } from "@/components/shared/table/table-models";
import { MeterData } from "@/store/models/meter-data";

export function getTableRows(data: MeterData[], isVisibleWaterColumn: boolean) {
    const latestDate = getLatestDate(data);
    const rows: TableRow[] = [];

    for (const item of data) {
        const row: TableRow = {
            date: item.date,
            address: item.address,
            light: item.light,
            lightDay: item.lightDay,
            lightNight: item.lightNight,
            gas: item.gas,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            isLatestData: item.date === latestDate,
        };

        if (isVisibleWaterColumn) row.water = item.water;

        rows.push(row);
    }

    return rows;
}

function getLatestDate(data: MeterData[]) {
    const sorted = [...data].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

    return sorted[0]?.date;
}

function parseDate(mmYYYY: string) {
    const [month, year] = mmYYYY.split(".").map(Number);

    return new Date(year, month - 1);
}
