import React from "react";
import Style from "./listMetersData.module.scss";
import { LIST_DATA } from "../../../constants";
import { ItemMetersData } from "../ItemMetersData/ItemMetersData";

export const ListMetersData = () => {
  return (
    <ul className={Style.listMetersData}>
      {LIST_DATA.map((item) => (
        <ItemMetersData {...item} />
      ))}
    </ul>
  );
};
