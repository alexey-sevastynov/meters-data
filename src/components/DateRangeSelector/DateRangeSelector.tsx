import React, { useState, useRef } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { COLORS } from "@/constants";
import { SIZE_ICONS } from "@/constants/sizeIcons";
import { language } from "@/constants/language";
import { showMeterReadingCalc } from "@/redux/slices/MetersDataSlice";
import Styles from "./dateRangeSelector.module.scss";
import { DateRangeSelectorProps } from "./dateRangeSelector.interface";
import {
  formatDateDisplay,
  handleClickOutside,
  isActive,
} from "./dateRangeSelector.function";

export function DateRangeSelector({
  data,
  selectedMonth,
  selectedYear,
}: DateRangeSelectorProps) {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((props) => props.i18n.lang);
  const currentLang =
    lang === language.ua.toLowerCase() ? language.ua : language.en;

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
      handleClickOutside(
        event,
        dropdownRef,
        setIsOpen,
        Styles.dateRangeSelector__btn
      );

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={Styles.dateRangeSelector}>
      <button
        className={`${Styles.dateRangeSelector__btn} ${
          isOpen ? Styles.dateRangeSelector__btn_active : ""
        }`}
        onClick={handleButtonClick}
      >
        <p>{selectedDateDisplay}</p>
        <FaCalendarAlt
          color={COLORS.grey}
          size={SIZE_ICONS.large}
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={Styles.dateRangeSelector__dropdown}
        >
          {data
            .map((item) => (
              <button
                key={item._id}
                className={`${Styles.dateRangeSelector__dropdown_btn} ${
                  isActive(selectedDateDisplay, item.date, currentLang)
                    ? Styles.dateRangeSelector__dropdown_btn_active
                    : ""
                }`}
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
