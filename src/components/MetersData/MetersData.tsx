import React from "react";
import Styles from "./metersData.module.scss";
import { FormDataMonth, ListMetersData } from "../../ui/MetersData";

interface MetersDataProps {
  isWaterBlock?: boolean;
}

export const MetersData: React.FC<MetersDataProps> = ({
  isWaterBlock = true,
}) => {
  return (
    <div className={Styles.metersData}>
      <div className="overflow-auto mt-40">
        <FormDataMonth isWaterBlock={isWaterBlock} />
        <ListMetersData isWaterBlock={isWaterBlock} />
      </div>
    </div>
  );
};
