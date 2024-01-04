import React from "react";
import Styles from "./infoPanelMonth.module.scss";
import { ListInfoPanelMonth } from "../../ui/InfoPanelMonth/ListInfoPanelMonth/ListInfoPanelMonth";
import { Button } from "../Button/Button";

interface InfoPanelMonthProps {
  isWaterBlock?: boolean;
}

export const InfoPanelMonth: React.FC<InfoPanelMonthProps> = ({
  isWaterBlock = true,
}) => {
  return (
    <div className={Styles.infoPanelMonth}>
      <ListInfoPanelMonth isWaterBlock={isWaterBlock} />

      <Button>price</Button>
    </div>
  );
};
