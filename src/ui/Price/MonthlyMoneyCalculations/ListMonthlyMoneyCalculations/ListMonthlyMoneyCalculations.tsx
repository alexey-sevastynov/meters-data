import React from "react";
import Style from "./listMonthlyMoneyCalculations.module.scss";
import { ItemMonthlyMoneyCalculations } from "../ItemMonthlyMoneyCalculations/ItemMonthlyMoneyCalculations";

export const ListMonthlyMoneyCalculations = () => {
  return (
    <ul className={Style.listMonthlyMoneyCalculations}>
      <ItemMonthlyMoneyCalculations />
    </ul>
  );
};
