import React, { useEffect } from "react";
import Styles from "./listCategoriesWithPrices.module.scss";
import { useAppSelector } from "../../../redux/hook";
import { useLocation } from "react-router-dom";
import { ListInfoDataMonthType } from "../../../redux/slices/MetersDataSlice";
import { VALUE_BY_TITLE } from "../../../constants";
import { getKeyOnPage } from "../../../helpers/getKeyOnPage";
import { AddressType } from "../../../types/MeterDataType";
import { AppDispatch } from "../../../redux/store";
import {
  calcPrice,
  deleteServiceWithCurrentItem,
} from "../../../redux/slices/PriceSlice";
import { getIconUrl } from "../../../helpers/getIconUrl";

interface ListCategoriesWithPricesProps {
  dispatch: AppDispatch;
}

export const ListCategoriesWithPrices: React.FC<
  ListCategoriesWithPricesProps
> = ({ dispatch }) => {
  const { pathname } = useLocation();

  const currentPageName = pathname.replace(/^\/|\/price$/g, "") as AddressType;

  const currentItem = useAppSelector((props) => props.prices.currentItem);
  const sumMoney = useAppSelector((props) => props.prices.sumMoney);
  const services = useAppSelector((props) => props.services.services.items);
  const infoMeterReading = useAppSelector(
    (props) => props.metersData.infoMeterReading
  ) as { [key: string]: ListInfoDataMonthType[] | null };

  const items = infoMeterReading[getKeyOnPage(currentPageName)];

  useEffect(() => {
    dispatch(calcPrice({ itemValue: items, priceServices: services }));
  }, []);

  const isShowDeleteButton = (title: string) => {
    return (
      title !== "Date" &&
      title !== "Light day" &&
      title !== "Light night" &&
      title !== "Gas General" &&
      title !== "Water general"
    );
  };

  const removeItem = (title: string, value: string | number) => {
    dispatch(deleteServiceWithCurrentItem({ title, value: Number(value) }));
  };

  return (
    <ul className={Styles.listCategoriesWithPrices}>
      {currentItem &&
        currentItem.map(({ title, description }) => (
          <div key={title} className={Styles.itemBlock}>
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

      <li className={`${Styles.item} ${Styles.itemLast}`}>
        <p className={Styles.title}>Amount of money:</p>
        <p className={Styles.sumMoney}>{sumMoney} uah</p>
      </li>
    </ul>
  );
};
