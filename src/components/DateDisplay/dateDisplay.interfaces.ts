import { DateFormatKey, Language } from "./constants";

export interface DateDisplayProps {
  date: Date;
  className?: string;
  subTitle?: string;
  formatType?: DateFormatKey;
  language: Language;
}

export interface DateFormats {
  full: string;
  short: string;
  timeOnly: string;
  fullWithTime: string;
}
