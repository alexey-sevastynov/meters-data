import { enUS, uk } from "date-fns/locale";
import { MdDateDisplayProps } from "@/components/shared/date-display/dateDisplay.interfaces";
import { getFormattedDate } from "@/components/shared/date-display/dateDisplay.funcs";
import { dateFormatKeys, languages } from "@/components/shared/date-display/constants";

export function MdDateDisplay({
    date,
    className,
    subTitle,
    formatType = dateFormatKeys.full,
    language = languages.en,
}: MdDateDisplayProps) {
    const lang = language === languages.en ? enUS : uk;
    const formattedDate = getFormattedDate(date, formatType, lang);

    return (
        <p className={className}>
            {subTitle && <span>{subTitle}: </span>}
            <span>{formattedDate}</span>
        </p>
    );
}
