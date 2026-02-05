import { DateFormats } from "@/components/shared/date-display/dateDisplay.interfaces";

export const dateFormats: DateFormats = {
    /**
     * Full date with year, day, and full month name.
     * Example: "2024, 1 January"
     */
    full: "yyyy, d MMMM",
    /**
     * Short date format with abbreviated month name.
     * Example: "2024, 1 Jan"
     */
    short: "yyyy, d MMM",
    /**
     * Time only, in 24-hour format.
     * Example: "14:35"
     */
    timeOnly: "HH:mm",
    /**
     * Full ISO-style date and time including seconds.
     * Example: "2024-01-01 14:35:22"
     */
    fullWithTime: "yyyy-MM-dd HH:mm:ss",
    /**
     * ISO date format (used in APIs and data storage).
     * Example: "2024-01-01"
     */
    iso: "yyyy-MM-dd",
    /**
     * European date format: day, month, and year.
     * Example: "01.01.2024"
     */
    dayMonthYear: "dd.MM.yyyy",
    /**
     * Month and year only — often used for meter readings or billing.
     * Example: "01.2024"
     */
    monthYear: "MM.yyyy",
    /**
     * Date and time without seconds — compact and user-friendly.
     * Example: "01.01.2024 14:35"
     */
    dateTime: "dd.MM.yyyy HH:mm",
    /**
     * Full date with year, day, and full month name.
     * Example: "1 January, 2024"
     */
    monthYearFull: "MMMM, yyyy",
    /**
     * Full date with year, day, and full month name and weekday.
     * Example: "Thursday, 1 January 2024"
     */
    fullWithWeekday: "EEEE, d MMMM yyyy 'р.'",
} as const;

export const dateFormatKeys = {
    full: "full",
    short: "short",
    timeOnly: "timeOnly",
    fullWithTime: "fullWithTime",
    iso: "iso",
    dayMonthYear: "dayMonthYear",
    monthYear: "monthYear",
    dateTime: "dateTime",
    monthYearFull: "monthYearFull",
    fullWithWeekday: "fullWithWeekday",
} as const;

export type DateFormatKey = (typeof dateFormatKeys)[keyof typeof dateFormatKeys];

export const languages = {
    ua: "uk",
    en: "enUS",
} as const;

export type Language = (typeof languages)[keyof typeof languages];
