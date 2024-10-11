import "../styles/pages/antonovicha73.scss";
import React, { HTMLAttributes } from "react";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";
import { BREADCRUMB_ITEMS_ADDR_003 } from "../constants/breadcrumbItems";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";

interface Antonovicha73Props extends HTMLAttributes<HTMLDivElement> {}

export const Antonovicha73: React.FC<Antonovicha73Props> = () => {
  return (
    <section className="antonovicha73">
      <Breadcrumb items={BREADCRUMB_ITEMS_ADDR_003} />

      <InfoPanelMonth isWaterBlock={false} />

      <MetersData isWaterBlock={false} />
    </section>
  );
};
