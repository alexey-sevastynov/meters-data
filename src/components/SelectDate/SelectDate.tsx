import React from "react";
import Style from "./selectDate.module.scss";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import DatePicker, { DatePickerProps } from "react-date-picker";

import { useAppSelector } from "../../redux/hook";
import { selectTranslations } from "../../redux/slices/I18next";

interface SelectDateProps extends DatePickerProps {
  value: any;
  onChange: any;
}

export const SelectDate: React.FC<SelectDateProps> = ({
  value,
  onChange,
  ...props
}) => {
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
};
