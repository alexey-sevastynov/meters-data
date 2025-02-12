import { MeterDataType } from "@/types/MeterDataType";

export function sortByDateDesc(a: MeterDataType, b: MeterDataType) {
  return compareDates(b.date, a.date);
}

export function sortByDateAsc(a: MeterDataType, b: MeterDataType) {
  return compareDates(a.date, b.date);
}

function compareDates(dateA: string, dateB: string) {
  const [aMonth, aYear] = dateA.split(".");
  const [bMonth, bYear] = dateB.split(".");

  if (aYear !== bYear) {
    return +aYear - +bYear;
  } else {
    return +aMonth - +bMonth;
  }
}
