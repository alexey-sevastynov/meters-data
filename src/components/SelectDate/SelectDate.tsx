import React, { useState } from "react";
import Style from "./selectDate.module.scss";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import DatePicker from "react-date-picker";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const SelectDate = () => {
  const [value, onChange] = useState<Value>(new Date());
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
        className={Style.datePicker}
      />
    </div>
  );
};
