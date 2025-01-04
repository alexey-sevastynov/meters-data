import { DateFormatKey } from "./constants";

export interface DateDisplayProps {
  date: Date;
  className?: string;
  subTitle?: string;
  formatType?: DateFormatKey;
}

export interface DateFormats {
  full: string;
  short: string;
  timeOnly: string;
  fullWithTime: string;
}
