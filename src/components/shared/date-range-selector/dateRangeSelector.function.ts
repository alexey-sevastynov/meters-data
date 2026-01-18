import { RefObject } from "react";
import { getDaysInMonths } from "@/helpers/meters-data/dates/get-days-in-months";
import { isDomNode, isHTMLElement } from "@/utils/dom";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { AppDispatch } from "@/store/store";
import { showMeterReadingCalc } from "@/store/slices/meters-data/slice";

export function isActive(selectedDateDisplay: string, itemDate: string, currentLang: string) {
    return selectedDateDisplay === getDaysInMonths(itemDate, true, true, currentLang);
}

export function formatDateDisplay(
    itemDate: string,
    isMonthRangeLabel: boolean,
    isYearLabel: boolean,
    currentLang?: string,
) {
    return getDaysInMonths(itemDate, isMonthRangeLabel, isYearLabel, currentLang);
}

export const handleClickOutside = (
    event: MouseEvent,
    dropdownRef: React.RefObject<HTMLDivElement>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    buttonClass: string,
) => {
    if (
        isClickOutsideDropdown(event.target, dropdownRef) &&
        isClickOutsideButton(event.target, buttonClass)
    ) {
        setIsOpen(false);
    }
};

export function navigatePreviousReading(
    meterReadings: MeterDataWithObjectId[],
    selectedReadingIndex: number,
    dispatch: AppDispatch,
) {
    if (selectedReadingIndex > 0) {
        const prevReading = meterReadings[selectedReadingIndex - 1];

        dispatch(
            showMeterReadingCalc({
                id: prevReading._id,
                address: prevReading.address,
            }),
        );
    }
}

export function navigateNextReading(
    meterReadings: MeterDataWithObjectId[],
    selectedReadingIndex: number,
    dispatch: AppDispatch,
) {
    if (selectedReadingIndex < meterReadings.length - 1) {
        const nextReading = meterReadings[selectedReadingIndex + 1];

        dispatch(
            showMeterReadingCalc({
                id: nextReading._id,
                address: nextReading.address,
            }),
        );
    }
}

function isClickOutsideDropdown(target: EventTarget | null, dropdownRef: RefObject<HTMLElement>) {
    return isDomNode(target) && dropdownRef.current !== null && !dropdownRef.current.contains(target);
}

function isClickOutsideButton(target: EventTarget | null, buttonClass: string) {
    return !(isHTMLElement(target) && target.closest(`.${buttonClass}`));
}
