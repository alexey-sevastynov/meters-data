import React from "react";
import Styles from "./listUtilityPrices.module.scss";
import { LIST_UTILITY_PRICES } from "../../../constants";
import { ItemUtilityPrices } from "../ItemUtilityPrices/ItemUtilityPrices";

export const ListUtilityPrices = () => {
  return (
    <ul className={Styles.listUtilityPrices}>
      {LIST_UTILITY_PRICES.map(({ value, valueName, image, category }) => (
        <ItemUtilityPrices
          key={category}
          value={value}
          valueName={valueName}
          image={image}
          category={category}
        />
      ))}
    </ul>
  );
};
