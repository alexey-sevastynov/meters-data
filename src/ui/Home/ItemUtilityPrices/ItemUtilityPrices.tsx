import React from "react";
import Styles from "./itemUtilityPrices.module.scss";
import { CategoryUtilityPrices } from "../CategoryUtilityPrices/CategoryUtilityPrices";
import { ValueUtilityPrices } from "../ValueUtilityPrices/ValueUtilityPrices";

interface ItemUtilityPricesProps {
  category: string;
  image: string[];
  valueName: "kW" | "m³" | "piece";
  value: number;
}

export const ItemUtilityPrices: React.FC<ItemUtilityPricesProps> = ({
  category,
  image,
  valueName,
  value,
}) => {
  return (
    <li className={Styles.itemUtilityPrices}>
      <CategoryUtilityPrices category={category} image={image} />

      <ValueUtilityPrices valueName={valueName} value={value} />
    </li>
  );
};
