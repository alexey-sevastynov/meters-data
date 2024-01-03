import React from "react";
import Styles from "./categoryUtilityPrices.module.scss";
import { getIconUrl } from "../../../helpers/getIconUrl";

interface CategoryUtilityPricesProps {
  category: string;
  image: string[];
}

export const CategoryUtilityPrices: React.FC<CategoryUtilityPricesProps> = ({
  category,
  image,
}) => {
  return (
    <div className={Styles.categoryUtilityPrices}>
      <p>{category},</p>
      <div className={Styles.images}>
        {image.map((name) => (
          <img
            key={name}
            src={getIconUrl(name)}
            alt={category}
            width={29}
            height={29}
          />
        ))}
      </div>
    </div>
  );
};
