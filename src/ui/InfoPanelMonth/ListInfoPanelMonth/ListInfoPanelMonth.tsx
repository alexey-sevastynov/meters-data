import React from "react";
import { ListInfoDataMonthType } from "@/redux/slices/MetersDataSlice";
import Style from "./listInfoPanelMonth.module.scss";
import { ItemInfoPanelMonth } from "../ItemInfoPanelMonth/ItemInfoPanelMonth";

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
        items.map((props, index) => (
          <ItemInfoPanelMonth
            key={props.id}
            isWaterBlock={isWaterBlock}
            index={index}
            {...props}
          />
        ))}
    </dl>
  );
};
