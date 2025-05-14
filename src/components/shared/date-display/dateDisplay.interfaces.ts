import { DateFormatKey, Language } from "@/components/shared/date-display/constants";

export interface MdDateDisplayProps {
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
