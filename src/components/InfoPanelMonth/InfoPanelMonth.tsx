import React from "react";
import Styles from "./infoPanelMonth.module.scss";
import { ListInfoPanelMonth } from "../../ui/InfoPanelMonth/ListInfoPanelMonth/ListInfoPanelMonth";
import { Button } from "../Button/Button";

export const InfoPanelMonth = () => {
  return (
    <div className={Styles.infoPanelMonth}>
      <ListInfoPanelMonth />

      <Button>price</Button>
    </div>
  );
};
