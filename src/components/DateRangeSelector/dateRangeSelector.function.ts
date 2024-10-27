import { getDaysInMonths } from "@/helpers/getDaysInMonths";

export const isActive = (
  selectedDateDisplay: string,
  itemDate: string,
  currentLang: string
) => {
  return (
    selectedDateDisplay === getDaysInMonths(itemDate, true, true, currentLang)
  );
};

export const formatDateDisplay = (
  itemDate: string,
  isDayView: boolean,
  isMonthView: boolean,
  currentLang?: string
) => {
  return getDaysInMonths(itemDate, isDayView, isMonthView, currentLang);
};

export const handleClickOutside = (
  event: MouseEvent,
  dropdownRef: React.RefObject<HTMLDivElement>,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  buttonClass: string
) => {
  if (
    dropdownRef.current &&
    !dropdownRef.current.contains(event.target as Node) &&
    !(
      event.target instanceof HTMLElement &&
      event.target.closest(`.${buttonClass}`)
    )
  ) {
    setIsOpen(false);
  }
};
