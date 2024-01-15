import React, { useState } from "react";
import Style from "./monthlyMoneyCalculations.module.scss";
import { Input } from "../../../components/Input/Input";
import { ListMonthlyMoneyCalculations } from "./ListMonthlyMoneyCalculations/ListMonthlyMoneyCalculations";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../redux/hook";
import { AddressType } from "../../../types/MeterDataType";

interface MonthlyMoneyCalculationsProps {}

export const MonthlyMoneyCalculations: React.FC<
  MonthlyMoneyCalculationsProps
> = () => {
  const { pathname } = useLocation();

  const status = useAppSelector(
    (props) => props.prices.itemsMonthlyMoneyCalculations.status
  );
  const allListItems = useAppSelector(
    (props) => props.prices.itemsMonthlyMoneyCalculations.items
  );

  const [inputValue, setInputValue] = useState<string>("");

  const currentPageName = pathname.replace(/^\/|\/price$/g, "") as AddressType;

  const itemsFilter = allListItems?.filter(
    (item) =>
      item.address === currentPageName &&
      item.data[0].description.toLowerCase().includes(inputValue.toLowerCase())
  );

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

      <ListMonthlyMoneyCalculations items={itemsFilter} status={status} />
    </section>
  );
};
