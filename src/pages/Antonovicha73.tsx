import React, { HTMLAttributes } from "react";
import "../styles/pages/antonovicha73.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";
import { useAppSelector } from "../redux/hook";
import { selectTranslations } from "../redux/slices/I18next";

interface Antonovicha73Props extends HTMLAttributes<HTMLDivElement> {}

export const Antonovicha73: React.FC<Antonovicha73Props> = () => {
  const lang = useAppSelector(selectTranslations);
  return (
    <section className="antonovicha73">
      <h3 className="title">{lang.navigation.volodymyrAntonovicha73}</h3>
      <InfoPanelMonth isWaterBlock={false} />

      <MetersData isWaterBlock={false} />
    </section>
  );
};
