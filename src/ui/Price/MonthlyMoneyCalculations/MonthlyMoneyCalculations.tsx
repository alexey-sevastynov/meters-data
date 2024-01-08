import React, { useState } from "react";
import Style from "./monthlyMoneyCalculations.module.scss";
import { Input } from "../../../components/Input/Input";
import { ListMonthlyMoneyCalculations } from "./ListMonthlyMoneyCalculations/ListMonthlyMoneyCalculations";

export const MonthlyMoneyCalculations = () => {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <section className={Style.monthlyMoneyCalculations}>
      <h4>Monthly money calculations:</h4>
      <div className={Style.inputBlock}>
        <Input
          className={Style.input}
          value={inputValue}
          setValue={setInputValue}
          defaultValue={""}
          labelTextBold
          labelText="Choose period"
          type="text"
          placeholder="Search..."
        />
      </div>

      <ListMonthlyMoneyCalculations />
    </section>
  );
};
