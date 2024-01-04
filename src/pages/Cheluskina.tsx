import React from "react";
import "../styles/pages/cheluskina.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";

export const Cheluskina = () => {
  return (
    <section className="cheluskina">
      <h3 className="title">Chelyuskina street, 1/12</h3>
      <InfoPanelMonth />

      <MetersData />
    </section>
  );
};
