import { DateFormats } from "./dateDisplay.interfaces";

export const dateFormats: DateFormats = {
  full: "yyyy, d MMMM", // Example: 2024 year, 1 January
  short: "yyyy, d MMM", // Example: 2024, 1 Jan
  timeOnly: "HH:mm", // Example: 14:35
  fullWithTime: "yyyy-MM-dd HH:mm:ss", // Example: 2024-01-01 14:35:22
} as const;

export type DateFormat = (typeof dateFormats)[keyof typeof dateFormats];

export const dateFormatKeys = {
  full: "full",
  short: "short",
  timeOnly: "timeOnly",
  fullWithTime: "fullWithTime",
} as const;

export type DateFormatKey =
  (typeof dateFormatKeys)[keyof typeof dateFormatKeys];

export const languages = {
  ua: "uk",
  en: "enUS",
} as const;

export type Language = (typeof languages)[keyof typeof languages];
