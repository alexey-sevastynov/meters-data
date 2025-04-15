import { TableRow } from "@/components/shared/table/table-models";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { AppDispatch } from "@/store/store";
import { getActionsTableRow } from "@/components/features/meters-data/table-config/action-table-row";

export function getTableMeterDataRows(
    data: MeterDataWithObjectId[],
    isVisibleWaterColumn: boolean,
    dispatch: AppDispatch
): TableRow[] {
    const firstDate = getFirstDate(data);
    const latestDate = getLatestDate(data);

    return data.map((item) => {
        const row: TableRow = {
            id: item._id,
            date: item.date,
            address: item.address,
            light: item.light,
            lightDay: item.lightDay,
            lightNight: item.lightNight,
            gas: item.gas,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            isLatestData: item.date === latestDate,
            actions: getActionsTableRow(item, firstDate, latestDate, dispatch),
        };

        if (isVisibleWaterColumn) {
            row.water = item.water;
        }

        return row;
    });
}

function getLatestDate(data: MeterDataWithObjectId[]) {
    return sortedByDate(data, false)[0]?.date;
}

function getFirstDate(data: MeterDataWithObjectId[]) {
    return sortedByDate(data)[0]?.date;
}

function parseDate(mmYYYY: string) {
    const [month, year] = mmYYYY.split(".").map(Number);

    return new Date(year, month - 1);
}

function sortedByDate(data: MeterDataWithObjectId[], asc = true) {
    return [...data].sort((a, b) => {
        const dateA = parseDate(a.date).getTime();
        const dateB = parseDate(b.date).getTime();

        return asc ? dateA - dateB : dateB - dateA;
    });
}
