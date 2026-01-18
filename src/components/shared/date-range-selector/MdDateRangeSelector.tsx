import React, { useState, useRef, useMemo, useEffect } from "react";
import { cn } from "@/lib/cn";
import styles from "./dateRangeSelector.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { colorNames } from "@/enums/color-names";
import { showMeterReadingCalc } from "@/store/slices/meters-data/slice";
import {
    DateRangeSelectorProps,
    MeterReadingOptionProps,
    MeterReadingsNavigationProps,
} from "@/components/shared/date-range-selector/dateRangeSelector.interface";
import {
    formatDateDisplay,
    handleClickOutside,
    isActive,
    navigateNextReading,
    navigatePreviousReading,
} from "@/components/shared/date-range-selector/dateRangeSelector.function";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { getCurrentLanguage } from "@/helpers/language/get-current-language";
import { getMonthNumberFromName } from "@/helpers/meters-data/dates/format-date";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";

export function MdDateRangeSelector({ meterReadings, selectedMonth, selectedYear }: DateRangeSelectorProps) {
    const lang = useAppSelector((state) => state.i18n.lang);
    const currentLang = getCurrentLanguage(lang);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedDateDisplay = formatDateDisplay(
        `${selectedMonth},${selectedYear}`,
        true,
        true,
        currentLang,
    );

    useEffect(() => {
        const handleOutsideDropdownClick = (event: MouseEvent) =>
            handleClickOutside(event, dropdownRef, setIsOpen, styles.dateRangeSelector__btn);

        document.addEventListener("mousedown", handleOutsideDropdownClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideDropdownClick);
        };
    }, []);

    return (
        <div className={styles.root}>
            <MeterReadingsNavigation
                meterReadings={meterReadings}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                selectedDateDisplay={selectedDateDisplay}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            {isOpen && (
                <div ref={dropdownRef} className={styles.dropdownContent}>
                    {meterReadings
                        .map((meterReading) => (
                            <MeterReadingOption
                                key={meterReading._id}
                                meterReading={meterReading}
                                selectedDateDisplay={selectedDateDisplay}
                                currentLang={currentLang}
                                setIsOpen={setIsOpen}
                            />
                        ))
                        .reverse()}
                </div>
            )}
        </div>
    );
}

function MeterReadingsNavigation({
    meterReadings,
    selectedMonth,
    selectedYear,
    selectedDateDisplay,
    isOpen,
    setIsOpen,
}: MeterReadingsNavigationProps) {
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const selectedReadingIndex = useMemo(() => {
        const monthNumber = getMonthNumberFromName(selectedMonth);
        const targetDate = `${monthNumber}.${selectedYear.trim()}`;

        return meterReadings.findIndex((reading) => reading.date === targetDate);
    }, [meterReadings, selectedMonth, selectedYear]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleDropdownButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        toggleDropdown();
    };

    const handleNavigatePreviousReading = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigatePreviousReading(meterReadings, selectedReadingIndex, dispatch);
    };

    const handleNavigateNextReading = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        navigateNextReading(meterReadings, selectedReadingIndex, dispatch);
    };

    return (
        <div className={styles.navWrapper}>
            <button
                className={cn(styles.navButton)}
                onClick={handleNavigatePreviousReading}
                disabled={selectedReadingIndex <= 0}
            >
                <MdIcon
                    name={iconNames.caretSquareLeft}
                    size={iconSizes.large}
                    color={getBaseIconColor(theme.themeMode)}
                />
            </button>
            <button
                className={cn(styles.dropdownTrigger, isOpen && styles.active)}
                onClick={handleDropdownButtonClick}
            >
                <p className={styles.title}>{selectedDateDisplay}</p>
                <MdIcon name={iconNames.calendar} size={iconSizes.large} color={colorNames.grey} />
            </button>
            <button
                className={cn(styles.navButton)}
                onClick={handleNavigateNextReading}
                disabled={selectedReadingIndex >= meterReadings.length - 1}
            >
                <MdIcon
                    name={iconNames.caretSquareRight}
                    size={iconSizes.large}
                    color={getBaseIconColor(theme.themeMode)}
                />
            </button>
        </div>
    );
}

function MeterReadingOption({
    meterReading,
    selectedDateDisplay,
    currentLang,
    setIsOpen,
}: MeterReadingOptionProps) {
    const dispatch = useAppDispatch();

    const handleOptionClick = () => {
        dispatch(
            showMeterReadingCalc({
                id: meterReading._id,
                address: meterReading.address,
            }),
        );

        setIsOpen(false);
    };

    return (
        <button
            key={meterReading._id}
            className={cn(
                styles.button,
                isActive(selectedDateDisplay, meterReading.date, currentLang) && styles.active,
            )}
            onClick={handleOptionClick}
        >
            <p>{formatDateDisplay(meterReading.date, true, false, currentLang)}</p>
            <p>{formatDateDisplay(meterReading.date, false, true, currentLang)}</p>
        </button>
    );
}
