import React, { HTMLAttributes } from "react";
import "../styles/pages/antonovicha73.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";

interface Antonovicha73Props extends HTMLAttributes<HTMLDivElement> {}

export const Antonovicha73: React.FC<Antonovicha73Props> = () => {
  return (
    <section className="antonovicha73">
      <h3 className="title">Volodymyr Antonovicha street, 73/8</h3>
      <InfoPanelMonth isWaterBlock={false} />

      <MetersData isWaterBlock={false} />
    </section>
  );
};
