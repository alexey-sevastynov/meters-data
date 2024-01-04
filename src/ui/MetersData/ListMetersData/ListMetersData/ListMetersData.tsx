import React from "react";
import Style from "./listMetersData.module.scss";
import { LIST_DATA } from "../../../../constants";
import { ItemMetersData } from "../ItemMetersData/ItemMetersData";

interface ListMetersDataProps {
  isWaterBlock: boolean;
}

export const ListMetersData: React.FC<ListMetersDataProps> = ({
  isWaterBlock,
}) => {
  return (
    <ul className={Style.listMetersData}>
      {LIST_DATA.map((item) => (
        <ItemMetersData key={item.id} isWaterBlock={isWaterBlock} {...item} />
      ))}
    </ul>
  );
};
