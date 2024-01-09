import React from "react";
import Style from "./itemMonthlyMoneyCalculations.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { Button } from "../../../../components/Button/Button";
import { COLORS } from "../../../../constants";
import { ListInfoDataMonthType } from "../../../../redux/slices/MetersDataSlice";
import {
  deleteMonthMoneyCalculations,
  editMonthMoneyCalculations,
  fetchAllMonthlyMoneyCalculations,
  getOneMonthMoneyCalculations,
} from "../../../../redux/slices/PriceSlice";

interface ItemMonthlyMoneyCalculationsProps {
  items: ListInfoDataMonthType[];
  sumMoney: number;
  id: string | undefined;
}

export const ItemMonthlyMoneyCalculations: React.FC<
  ItemMonthlyMoneyCalculationsProps
> = ({ items, sumMoney, id }) => {
  const dispatch = useAppDispatch();
  const isEdit = useAppSelector(
    (props) => props.prices.itemsMonthlyMoneyCalculations.isEdit
  );

  const deleteItem = () => {
    if (id) {
      dispatch(deleteMonthMoneyCalculations({ id }))
        .then((response: any) => {
          if (response.payload) {
            dispatch(fetchAllMonthlyMoneyCalculations());
          }
        })
        .catch((error: any) => {
          console.error("Error adding data:", error);
        });
    }
  };
  const editItem = () => {
    if (id) {
      dispatch(getOneMonthMoneyCalculations({ id }));
    }
  };
  return (
    <li className={Style.itemMonthlyMoneyCalculations}>
      <ul>
        {items &&
          items.map(({ title, description }) => (
            <li key={title} className={Style.item}>
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
        <Button onClick={editItem} disabled={isEdit}>
          edit
        </Button>
        <Button
          style={isEdit ? {} : { backgroundColor: COLORS.red }}
          onClick={deleteItem}
          disabled={isEdit}
        >
          delete
        </Button>
        <Button disabled={isEdit}>Share</Button>
      </div>
    </li>
  );
};
