import React, { useState, useRef } from "react";
import { cn } from "@/lib/cn";
import styles from "./dateRangeSelector.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { colorNames } from "@/enums/color-names";
import { showMeterReadingCalc } from "@/store/slices/meters-data/slice";
import { DateRangeSelectorProps } from "@/components/shared/date-range-selector/dateRangeSelector.interface";
import {
    formatDateDisplay,
    handleClickOutside,
    isActive,
} from "@/components/shared/date-range-selector/dateRangeSelector.function";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { getCurrentLanguage } from "@/helpers/language/get-current-language";

export function MdDateRangeSelector({ data, selectedMonth, selectedYear }: DateRangeSelectorProps) {
    const dispatch = useAppDispatch();
    const lang = useAppSelector((state) => state.i18n.lang);
    const currentLang = getCurrentLanguage(lang);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedDateDisplay = formatDateDisplay(
        `${selectedMonth},${selectedYear}`,
        true,
        true,
        currentLang
    );

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        toggleDropdown();
    };

    React.useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) =>
            handleClickOutside(event, dropdownRef, setIsOpen, styles.dateRangeSelector__btn);

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className={styles.dateRangeSelector}>
            <button
                className={cn(styles.dateRangeSelectorBtn, isOpen && styles.dateRangeSelectorBtnActive)}
                onClick={handleButtonClick}
            >
                <p className={styles.dateRangeSelectorBtnDate}>{selectedDateDisplay}</p>
                <MdIcon name={iconNames.calendar} size={iconSizes.large} color={colorNames.grey} />
            </button>

            {isOpen && (
                <div ref={dropdownRef} className={styles.dateRangeSelectorDropdown}>
                    {data
                        .map((item) => (
                            <button
                                key={item._id}
                                className={cn(
                                    styles.dateRangeSelectorDropdownBtn,
                                    isActive(selectedDateDisplay, item.date, currentLang) &&
                                        styles.dateRangeSelectorDropdownBtnActive
                                )}
                                onClick={() => {
                                    dispatch(
                                        showMeterReadingCalc({
                                            id: item._id,
                                            address: item.address,
                                        })
                                    );
                                    setIsOpen(false);
                                }}
                            >
                                <p>{formatDateDisplay(item.date, true, false, currentLang)}</p>
                                <p>{formatDateDisplay(item.date, false, true, currentLang)}</p>
                            </button>
                        ))
                        .reverse()}
                </div>
            )}
        </div>
    );
}
