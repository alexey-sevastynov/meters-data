import React from "react";
import Styles from "./infoPanelMonth.module.scss";
import { ListInfoPanelMonth } from "../../ui/InfoPanelMonth/ListInfoPanelMonth/ListInfoPanelMonth";
import { Button } from "../Button/Button";
import { Link, useLocation, useParams } from "react-router-dom";

interface InfoPanelMonthProps {
  isWaterBlock?: boolean;
}

export const InfoPanelMonth: React.FC<InfoPanelMonthProps> = ({
  isWaterBlock = true,
}) => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className={Styles.infoPanelMonth}>
      <ListInfoPanelMonth isWaterBlock={isWaterBlock} />

      <Link to={`${pathname}/price`}>
        <Button>price</Button>
      </Link>
    </div>
  );
};
