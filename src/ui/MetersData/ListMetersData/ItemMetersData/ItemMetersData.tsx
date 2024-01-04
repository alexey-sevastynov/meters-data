import React from "react";
import Styles from "./itemMetersData.module.scss";
import { getIconUrl } from "../../../../helpers/getIconUrl";

interface ItemMetersDataProps {
  isWaterBlock: boolean;
  date: string;
  light: number;
  lightDay: number;
  lightNight: number;
  gas: number;
  water: number;
}

export const ItemMetersData: React.FC<ItemMetersDataProps> = ({
  isWaterBlock,
  date,
  light,
  lightDay,
  lightNight,
  gas,
  water,
}) => {
  return (
    <li className={Styles.itemMetersData}>
      <div className={Styles.data}>
        <p className={Styles.date}>{date}</p>
        <p className={Styles.light}>{light} kW</p>
        <p className={Styles.lightDay}>{lightDay} kW</p>
        <p className={Styles.lightNight}>{lightNight} kW</p>
        <p className={Styles.gas}>{gas} m³</p>
        {isWaterBlock && <p className={Styles.water}>{water} m³</p>}
      </div>

      <div className={Styles.btns}>
        <button
          type="button"
          title={`Сalculation of meter readings for ${date}`}
        >
          <img src={getIconUrl("show.png")} alt="show" width={25} height={25} />
        </button>
        <button type="button" title={`edit meter readings`}>
          <img src={getIconUrl("edit.png")} alt="edit" width={25} height={25} />
        </button>
        <button type="button" title={`delete data`}>
          <img
            src={getIconUrl("delete.png")}
            alt="delete"
            width={25}
            height={25}
          />
        </button>
      </div>
    </li>
  );
};
