export function compareDates(dateA: string, dateB: string) {
  const [aMonth, aYear] = dateA.split(".");
  const [bMonth, bYear] = dateB.split(".");

  if (aYear !== bYear) {
    return +aYear - +bYear;
  } else {
    return +aMonth - +bMonth;
  }
}
