import React from "react";
import Style from "./listInfoPanelMonth.module.scss";
import { LIST_INFO_DATA_MONTH } from "../../../constants";
import { ItemInfoPanelMonth } from "../ItemInfoPanelMonth/ItemInfoPanelMonth";

export const ListInfoPanelMonth = () => {
  return (
    <dl className={Style.listInfoPanelMonth}>
      {LIST_INFO_DATA_MONTH.map((props) => (
        <ItemInfoPanelMonth key={props.title} {...props} />
      ))}
    </dl>
  );
};
