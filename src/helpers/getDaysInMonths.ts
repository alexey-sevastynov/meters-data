import { EN, language } from "@/constants/language";
import { ukrainianMonths } from "@/constants/ukrainianMonths";
import { ukrainianShortMonths } from "@/constants/ukrainianShortMonths";

const toPascalCase = (str: string): string => {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};

export function getDaysInMonths(date: string, showMonth = true, showYear = true, locale = EN) {
    let month: number;
    let year: number;

    const shortNames = true;

    if (date.includes(".")) {
        const [monthStr, yearStr] = date.split(".");
        month = parseInt(monthStr, 10) - 1;
        year = parseInt(yearStr, 10);
    } else {
        const [monthName, yearStr] = date.split(",").map((part) => part.trim());
        month = new Date(Date.parse(monthName + " 1")).getMonth();
        year = parseInt(yearStr, 10);
    }

    const firstDayNextMonth = new Date(year, month + 1, 1);
    const lastDayCurrentMonth = new Date(firstDayNextMonth.getTime() - 86400000);

    let monthFullName;

    if (locale === language.ua) {
        monthFullName = shortNames ? ukrainianShortMonths[month] : ukrainianMonths[month];
    } else {
        monthFullName = lastDayCurrentMonth.toLocaleString(locale, {
            month: shortNames ? "short" : "long",
        });
    }

    const monthFullNamePascal = toPascalCase(monthFullName);

    return formatResult(showMonth, showYear, monthFullNamePascal, lastDayCurrentMonth.getDate(), year);
}

function formatResult(
    showMonth: boolean,
    showYear: boolean,
    monthFullNamePascal: string,
    lastDay: number,
    year: number
): string {
    if (showMonth && showYear) {
        return `${monthFullNamePascal} 1 - ${monthFullNamePascal} ${lastDay} / ${year}`;
    } else if (showMonth && !showYear) {
        return `${monthFullNamePascal} 1 - ${monthFullNamePascal} ${lastDay}`;
    } else if (!showMonth && showYear) {
        return `${year}`;
    } else {
        return "";
    }
}
