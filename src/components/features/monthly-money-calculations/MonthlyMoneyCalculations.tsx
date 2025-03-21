import { useState } from "react";
import Style from "./monthlyMoneyCalculations.module.scss";
import { MdInput } from "@/components/ui/input/MdInput";
import { ListMonthlyMoneyCalculations } from "./list-monthly-money-calculations/ListMonthlyMoneyCalculations";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { AddressType } from "@/types/MeterDataType";

export function MdMonthlyMoneyCalculations() {
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
        <MdInput
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

      <ListMonthlyMoneyCalculations
        items={itemsFilter}
        status={status}
      />
    </section>
  );
}
