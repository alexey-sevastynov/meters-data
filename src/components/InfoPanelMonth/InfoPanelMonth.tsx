import React from "react";
import Styles from "./infoPanelMonth.module.scss";
import { ListInfoPanelMonth } from "../../ui/InfoPanelMonth/ListInfoPanelMonth/ListInfoPanelMonth";
import { Button } from "../Button/Button";
import { Link, useLocation } from "react-router-dom";

interface InfoPanelMonthProps {
  isWaterBlock?: boolean;
}

export const InfoPanelMonth: React.FC<InfoPanelMonthProps> = ({
  isWaterBlock = true,
}) => {
  const { pathname } = useLocation();

  return (
    <div className={Styles.infoPanelMonth}>
      <ListInfoPanelMonth isWaterBlock={isWaterBlock} />

      <div className={Styles.links}>
        <Link to={`${pathname}/price`}>
          <Button>price</Button>
        </Link>
        <Link to={`${pathname}/graphics`}>
          <Button>graphics</Button>
        </Link>
      </div>
    </div>
  );
};
