export function translationDescription(inputString: string | number): string {
  if (typeof inputString === "number") return "";

  const monthsMap: { [key: string]: string } = {
    January: "Січень",
    February: "Лютий",
    March: "Березень",
    April: "Квітень",
    May: "Травень",
    June: "Червень",
    July: "Липень",
    August: "Серпень",
    September: "Вересень",
    October: "Жовтень",
    November: "Листопад",
    December: "Грудень",
  };

  const outputString = inputString
    .replace(/m³/g, "м³")
    .replace(/uah/g, "грн")
    .replace(/kW/g, "кВт")
    .replace(
      /(\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b,\s*\d{4})/g,
      (match) => {
        const [month, year] = match.split(",").map((item) => item.trim());
        const translatedMonth = monthsMap[month];
        return translatedMonth ? `${translatedMonth}, ${year}` : match;
      }
    );

  return outputString;
}
