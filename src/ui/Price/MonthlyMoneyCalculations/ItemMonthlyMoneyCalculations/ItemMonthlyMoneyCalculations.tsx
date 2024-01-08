import React from "react";
import Style from "./itemMonthlyMoneyCalculations.module.scss";
import { useAppSelector } from "../../../../redux/hook";
import { Button } from "../../../../components/Button/Button";
import { COLORS } from "../../../../constants";

export const ItemMonthlyMoneyCalculations = () => {
  const currentItem = useAppSelector((props) => props.prices.currentItem);
  const sumMoney = useAppSelector((props) => props.prices.sumMoney);
  return (
    <li className={Style.itemMonthlyMoneyCalculations}>
      <ul>
        {currentItem &&
          currentItem.map(({ title, description }) => (
            <li className={Style.item}>
              <p className={Style.title}>{title}:</p>
              <p>
                {description} {title === "Date" ? "" : "uah"}
              </p>
            </li>
          ))}
        <li className={`${Style.item} ${Style.itemLast}`}>
          <p className={Style.title}>Amount of money:</p>
          <p className={Style.sumMoney}>{sumMoney} uah</p>
        </li>
      </ul>

      <div className={Style.btns}>
        <Button>edit</Button>
        <Button style={{ backgroundColor: COLORS.red }}>delete</Button>
        <Button>share</Button>
      </div>
    </li>
  );
};
