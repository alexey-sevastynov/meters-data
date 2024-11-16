import React, { useEffect } from "react";
import Styles from "./listCategoriesWithPrices.module.scss";
import { useAppSelector } from "@/redux/hook";
import { useLocation } from "react-router-dom";
import { ListInfoDataMonthType } from "@/redux/slices/MetersDataSlice";

import { getKeyOnPage } from "@/helpers/getKeyOnPage";
import { AddressType } from "@/types/MeterDataType";
import { AppDispatch } from "@/redux/store";
import {
  calcPrice,
  deleteServiceWithCurrentItem,
  dissableEdit,
  editMonthMoneyCalculations,
  fetchAllMonthlyMoneyCalculations,
  fetchPostMonthMoneyCalculations,
} from "@/redux/slices/PriceSlice";
import { getIconUrl } from "@/helpers/getIconUrl";
import { Button } from "@/ui/Button/Button";
import { COLORS } from "@/constants";

interface ListCategoriesWithPricesProps {
  dispatch: AppDispatch;
}

export const ListCategoriesWithPrices: React.FC<
  ListCategoriesWithPricesProps
> = ({ dispatch }) => {
  const { pathname } = useLocation();

  const currentPageName: AddressType = pathname.replace(
    /^\/|\/price$/g,
    ""
  ) as AddressType;

  const currentItem = useAppSelector((props) => props.prices.currentItem);
  const sumMoney = useAppSelector((props) => props.prices.sumMoney);
  const services = useAppSelector((props) => props.services.services.items);
  const allListMonthlyMoneyCalculations = useAppSelector(
    (props) => props.prices.itemsMonthlyMoneyCalculations.items
  );
  const isEdit = useAppSelector(
    (props) => props.prices.itemsMonthlyMoneyCalculations.isEdit
  );
  const idEdit = useAppSelector(
    (props) => props.prices.itemsMonthlyMoneyCalculations.idEdit
  );
  const infoMeterReading = useAppSelector(
    (props) => props.metersData.infoMeterReading
  ) as { [key: string]: ListInfoDataMonthType[] | null };

  const items = infoMeterReading[getKeyOnPage(currentPageName)];

  const dateCurrent =
    currentItem &&
    currentItem.find((item) => item.title === "Date")?.description;

  const isUniqueObj = !allListMonthlyMoneyCalculations?.some(
    (item) =>
      item.data[0].description === dateCurrent &&
      item.address === currentPageName
  );

  const isShowDeleteButton = (title: string) => {
    return (
      title !== "Date" &&
      title !== "Light day" &&
      title !== "Light night" &&
      title !== "Gas General" &&
      title !== "Water general"
    );
  };

  const handleResponse = (response: any) => {
    if (response.payload) {
      dispatch(fetchAllMonthlyMoneyCalculations());
    }
  };

  const saveItemDB = async () => {
    if (currentItem && sumMoney && isUniqueObj) {
      try {
        const response = await dispatch(
          fetchPostMonthMoneyCalculations({
            address: currentPageName,
            data: currentItem,
            sumMoney,
          })
        );
        handleResponse(response);
      } catch (error: any) {
        console.error("Error adding data:", error);
      }
    }
  };

  const removeItem = (title: string, value: string | number) => {
    dispatch(deleteServiceWithCurrentItem({ title, value: Number(value) }));
  };

  const editItem = async () => {
    if (currentItem && idEdit) {
      try {
        const response = await dispatch(
          editMonthMoneyCalculations({
            _id: idEdit,
            data: currentItem,
            sumMoney,
          })
        );
        handleResponse(response);
        dispatch(dissableEdit());
      } catch (error: any) {
        console.error("Error editing data:", error);
      }
    }
  };

  const cancel = () => {
    dispatch(dissableEdit());
  };

  useEffect(() => {
    dispatch(calcPrice({ itemValue: items, priceServices: services }));
  }, []);

  return (
    <ul className={Styles.listCategoriesWithPrices}>
      {currentItem &&
        currentItem.map(({ title, description }) => (
          <div
            key={title}
            className={Styles.itemBlock}
          >
            {isShowDeleteButton(title) && (
              <button
                className={Styles.btn}
                type="button"
                title={`delete data`}
                onClick={() => removeItem(title, description)}
              >
                <img
                  src={getIconUrl("delete.png")}
                  alt="delete"
                  width={25}
                  height={25}
                />
              </button>
            )}
            <li className={Styles.item}>
              <p className={Styles.title}>{title}:</p>
              <p>
                {description} {title === "Date" ? "" : "uah"}
              </p>
            </li>
          </div>
        ))}

      <div className={Styles.footer}>
        <li className={`${Styles.item} ${Styles.itemLast}`}>
          <p className={Styles.title}>Amount of money:</p>
          <p className={Styles.sumMoney}>{sumMoney} uah</p>
        </li>
        {isEdit ? (
          <div className={Styles.btns}>
            <Button
              type="button"
              onClick={cancel}
              style={{ backgroundColor: COLORS.red }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={editItem}
            >
              Edit
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={saveItemDB}
            disabled={!isUniqueObj}
          >
            Save
          </Button>
        )}
      </div>
    </ul>
  );
};
