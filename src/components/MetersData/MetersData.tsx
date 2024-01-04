import React from "react";
import Styles from "./metersData.module.scss";
import { ListMetersData } from "../../ui/ListMetersData";
import { getIconUrl } from "../../helpers/getIconUrl";

export const MetersData = () => {
  return (
    <div className={Styles.metersData}>
      <ListMetersData />
    </div>
  );
};
