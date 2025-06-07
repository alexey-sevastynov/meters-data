import styles from "./selectDate.module.scss";
import { cn } from "@/lib/cn";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import DatePicker, { DatePickerProps } from "react-date-picker";
import { DataPickerValue } from "@/types/data-picker";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";

interface SelectDateProps extends DatePickerProps {
    selectDate: DataPickerValue;
    setSelectDate: (value: DataPickerValue) => void;
}

export function SelectDate({ selectDate, setSelectDate, ...props }: SelectDateProps) {
    const isEdit = useAppSelector((state) => state.metersData.isEdit);
    const language = useAppSelector((state) => state.i18n.lang);
    const translations = useAppSelector(selectTranslations);

    return (
        <div className={styles.selectDate}>
            <label>{translations.infoPanel.date}:</label>
            <DatePicker
                onChange={setSelectDate}
                value={selectDate}
                maxDetail="month"
                format="MMMM/yyyy"
                minDetail="year"
                locale={language === "ua" ? "uk" : "en"}
                disableCalendar
                clearIcon={null}
                className={cn(styles.datePicker, isEdit && styles.datePickerEdit)}
                {...props}
            />
        </div>
    );
}
