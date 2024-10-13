import React from "react";
import Style from "./listInfoPanelMonth.module.scss";

import { ItemInfoPanelMonth } from "../ItemInfoPanelMonth/ItemInfoPanelMonth";
import { ListInfoDataMonthType } from "@/redux/slices/MetersDataSlice";

interface ListInfoPanelMonthProps {
  isWaterBlock: boolean;
  items: ListInfoDataMonthType[] | null;
}

export const ListInfoPanelMonth: React.FC<ListInfoPanelMonthProps> = ({
  isWaterBlock,
  items,
}) => {
  return (
    <dl className={Style.listInfoPanelMonth}>
      {items &&
        items.map((props) => (
          <ItemInfoPanelMonth
            key={props.title}
            isWaterBlock={isWaterBlock}
            {...props}
          />
        ))}
    </dl>
  );
};
