import { RefObject } from "react";
import { getDaysInMonths } from "@/helpers/meters-data/dates/get-days-in-months";
import { isDomNode, isHTMLElement } from "@/utils/dom";

export function isActive(selectedDateDisplay: string, itemDate: string, currentLang: string) {
    return selectedDateDisplay === getDaysInMonths(itemDate, true, true, currentLang);
}

export function formatDateDisplay(
    itemDate: string,
    isMonthRangeLabel: boolean,
    isYearLabel: boolean,
    currentLang?: string
) {
    return getDaysInMonths(itemDate, isMonthRangeLabel, isYearLabel, currentLang);
}

export const handleClickOutside = (
    event: MouseEvent,
    dropdownRef: React.RefObject<HTMLDivElement>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    buttonClass: string
) => {
    if (
        isClickOutsideDropdown(event.target, dropdownRef) &&
        isClickOutsideButton(event.target, buttonClass)
    ) {
        setIsOpen(false);
    }
};

function isClickOutsideDropdown(target: EventTarget | null, dropdownRef: RefObject<HTMLElement>) {
    return isDomNode(target) && dropdownRef.current !== null && !dropdownRef.current.contains(target);
}

function isClickOutsideButton(target: EventTarget | null, buttonClass: string) {
    return !(isHTMLElement(target) && target.closest(`.${buttonClass}`));
}
