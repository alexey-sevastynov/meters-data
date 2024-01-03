import React from "react";
import "../styles/pages/slobozhansky.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";

export const Slobozhansky = () => {
  return (
    <section className="slobozhansky">
      <h3 className="title">Slobozhansky Avenue, 68A/63</h3>
      <InfoPanelMonth />
    </section>
  );
};
