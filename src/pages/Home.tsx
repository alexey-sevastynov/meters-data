import React, { HTMLAttributes } from "react";
import "../styles/pages/home.scss";
import { useAppSelector } from "../redux/hook";
import { selectTranslations } from "../redux/slices/I18next";
import { ListUtilityPrices } from "../ui/Home/ListUtilityPrices/ListUtilityPrices";

interface HomeProps extends HTMLAttributes<HTMLDivElement> {}

export const Home: React.FC<HomeProps> = ({ ...props }) => {
  const lang = useAppSelector(selectTranslations);
  return (
    <section className="home" {...props}>
      <h3 className="title">{lang.home.home} @</h3>
      <p className="subtitle">{lang.home.utilityPrices}</p>

      <ListUtilityPrices />
    </section>
  );
};
