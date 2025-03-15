import Style from "@/components/SelectDate/selectDate.module.scss";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import DatePicker, { DatePickerProps } from "react-date-picker";

import { useAppSelector } from "@/redux/hook";
import { selectTranslations } from "@/redux/slices/I18next";
import { DataPickerValue } from "@/types/DataPicker";

interface SelectDateProps extends DatePickerProps {
  value: DataPickerValue;
  onChange: (value: DataPickerValue) => void;
}

export function SelectDate({ value, onChange, ...props }: SelectDateProps) {
  const isEdit = useAppSelector((props) => props.metersData.isEdit);
  const language = useAppSelector((props) => props.i18n.lang);
  const lang = useAppSelector(selectTranslations);

  return (
    <div className={Style.selectDate}>
      <label>{lang.infoPanel.date}:</label>
      <DatePicker
        onChange={onChange}
        value={value}
        maxDetail="month"
        format="MMMM/yyyy"
        minDetail="year"
        locale={language === "ua" ? "uk" : "en"}
        disableCalendar
        clearIcon={null}
        className={`${Style.datePicker} ${isEdit ? Style.datePickerEdit : ""}`}
        {...props}
      />
    </div>
  );
}
