import { EN, language } from "@/constants/language";
import { ukrainianMonths } from "@/constants/ukrainian-months";
import { ukrainianShortMonths } from "@/constants/ukrainian-short-months";

export function getDaysInMonths(dateAsString: string, isShowMonth = true, isShowYear = true, locale = EN) {
    const { month, year } = parseMonthAndYear(dateAsString);
    const lastDay = getLastDayOfMonth(year, month);
    const monthLabel = getLocalizedMonthName(month, year, locale);
    const monthNamePascal = toPascalCase(monthLabel);

    return buildRangeLabel(isShowMonth, isShowYear, monthNamePascal, lastDay, year);
}

function parseMonthAndYear(dateAsString: string) {
    return dateAsString.includes(".") ? parseNumericDate(dateAsString) : parseTextualDate(dateAsString);
}

function parseNumericDate(dateAsString: string) {
    const [monthStr, yearStr] = dateAsString.split(".");

    return {
        month: parseInt(monthStr, 10) - 1,
        year: parseInt(yearStr, 10),
    };
}

function parseTextualDate(dateAsString: string) {
    const [monthName, yearStr] = dateAsString.split(",").map((part) => part.trim());
    const month = new Date(Date.parse(`${monthName} 1`)).getMonth();

    return {
        month,
        year: parseInt(yearStr, 10),
    };
}

function getLastDayOfMonth(year: number, month: number) {
    const firstDayNextMonth = new Date(year, month + 1, 1);
    const lastDay = new Date(firstDayNextMonth.getTime() - 86400000);

    return lastDay.getDate();
}

function getLocalizedMonthName(month: number, year: number, locale: string) {
    const shortNames = true;

    if (locale === language.ua) return shortNames ? ukrainianShortMonths[month] : ukrainianMonths[month];

    const date = new Date(year, month, 1);

    return date.toLocaleString(locale, {
        month: shortNames ? "short" : "long",
    });
}

function toPascalCase(str: string) {
    if (!str) return "";

    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

function buildRangeLabel(
    showMonth: boolean,
    showYear: boolean,
    monthName: string,
    lastDay: number,
    year: number
) {
    if (showMonth && showYear) return `${monthName} 1 - ${monthName} ${lastDay} / ${year}`;

    if (showMonth) return `${monthName} 1 - ${monthName} ${lastDay}`;

    if (showYear) return `${year}`;

    return "";
}
