import { addMonths, format, parse } from "date-fns";
import { LIST_NAV } from "@/constants";
import { sortItemsByDate } from "@/helpers/filterAndSortItemsByAddressAndDate";
import { KeysItemUtilityPricesType } from "@/types/KeysItemUtilityPricesType";
import { AddressType, MeterDataType } from "@/types/MeterDataType";

export function getNextMonthDate(items: MeterDataType[]) {
  if (items.length === 0) return new Date();

  const sorted = sortItemsByDate(items);
  const lastItem = sorted[sorted.length - 1];
  const lastDate = parse(lastItem.date, "MM.yyyy", new Date());

  return addMonths(lastDate, 1);
}

export function setDefaultValue(
  key: KeysItemUtilityPricesType,
  currentPage: AddressType,
  listCurrentPage: MeterDataType[]
) {
  const localStorageValue = localStorage.getItem(
    `metersData_${key}_${currentPage}`
  );

  if (localStorageValue !== null) {
    return Number(localStorageValue);
  }

  if (listCurrentPage.length > 0) {
    const lastItem = listCurrentPage[listCurrentPage.length - 1]?.[key];

    return typeof lastItem === "number" ? lastItem : 0;
  }

  return 0;
}

export function generateMessage(
  currentPage: string,
  valueSelectDate: Date,
  light: number,
  lightDay: number,
  lightNight: number,
  gas: number,
  water: number
) {
  const pageId =
    LIST_NAV.find((item) => item.link === `/${currentPage}`)?.id || "Unknown";

  let message = `<b>${pageId}</b>`;

  message += ` (${format(valueSelectDate, "MM.yyyy")})\n`;
  message += `\u{1F4A1} Light: ${light} kWt\n`;
  message += `\u{1F4A1}\u{1F31E} Light Day: ${lightDay} kWt\n`;
  message += `\u{1F4A1}\u{1F319} Light Night: ${lightNight} kWt\n`;
  message += `\u{1F525} Gas: ${gas} m³\n`;

  if (water) {
    message += `\u{1F6BF} Water: ${water} m³\n`;
  }

  return message;
}
