import React, { HTMLAttributes } from "react";
import "../styles/pages/home.scss";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { ListUtilityPrices } from "../ui/Home/ListUtilityPrices/ListUtilityPrices";

interface HomeProps extends HTMLAttributes<HTMLDivElement> {}

export const Home: React.FC<HomeProps> = ({ ...props }) => {
  return (
    <section className="home" {...props}>
      <h3 className="title">Home</h3>
      <p className="subtitle">Utility prices:</p>

      <ListUtilityPrices />
    </section>
  );
};
