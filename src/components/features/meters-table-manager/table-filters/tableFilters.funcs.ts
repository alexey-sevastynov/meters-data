import { MutableRefObject } from "react";
import { Option } from "@/components/ui/select/select-models";
import { getYearFromDate } from "@/helpers/meters-data/dates/get-date";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { VoidFunc } from "@/types/getter-setter-functions";

export function getAvailableYears(sortedAddressMeterData: MeterDataWithObjectId[]) {
    const uniqueYears = new Set<string>();

    for (const item of sortedAddressMeterData) {
        const year = getYearFromDate(item.date);
        uniqueYears.add(year);
    }

    const sortedUniqueYears = [...uniqueYears].sort((a, b) => +b - +a);
    const allYears: Option[] = sortedUniqueYears.map((year) => ({ value: year, label: year }));

    return allYears;
}

export function onAutomaticYearSelection(
    availableYears: Option[],
    selectedYears: Option[],
    previousLatestYearRef: MutableRefObject<string | null>,
    setSelectedYears: VoidFunc<Option[]>,
) {
    if (availableYears.length === 0) return;

    const currentLatestYear = availableYears[0].value;
    const previousLatestYear = previousLatestYearRef.current;
    const hasNewYearAppeared = checkIfNewYearAppeared(currentLatestYear, previousLatestYear);
    const isCurrentSelectionInvalid = checkIfSelectionIsInvalid(selectedYears, availableYears);
    const isNothingSelected = selectedYears.length === 0;
    const shouldForceUpdateSelection = isNothingSelected || hasNewYearAppeared || isCurrentSelectionInvalid;

    if (shouldForceUpdateSelection) setSelectedYears([availableYears[0]]);

    previousLatestYearRef.current = currentLatestYear;
}

function checkIfNewYearAppeared(currentLatestYear: string, previousLatestYear: string | null): boolean {
    const isPreviousYearRecorded = previousLatestYear !== null;

    if (!isPreviousYearRecorded) {
        return false;
    }

    return +currentLatestYear > +previousLatestYear!;
}

function checkIfSelectionIsInvalid(selectedYears: Option[], availableYears: Option[]): boolean {
    const areAllSelectedYearsPresentInAvailableList = selectedYears.every((selectedYear) =>
        availableYears.some((availableYear) => availableYear.value === selectedYear.value),
    );

    return !areAllSelectedYearsPresentInAvailableList;
}
