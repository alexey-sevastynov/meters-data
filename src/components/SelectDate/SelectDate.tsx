import React from "react";
import Style from "./selectDate.module.scss";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import DatePicker, { DatePickerProps } from "react-date-picker";

import { useAppSelector } from "../../redux/hook";

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

  return (
    <div className={Style.selectDate}>
      <label>Date:</label>
      <DatePicker
        onChange={onChange}
        value={value}
        maxDetail="month"
        format="MMMM/yyyy"
        minDetail="year"
        locale="en"
        disableCalendar
        clearIcon={null}
        className={`${Style.datePicker} ${isEdit ? Style.datePickerEdit : ""}`}
        {...props}
      />
    </div>
  );
};
