import React, { useEffect } from "react";
import Styles from "./listUtilityPrices.module.scss";
import { LIST_UTILITY_PRICES } from "../../../constants";
import { ItemUtilityPrices } from "../ItemUtilityPrices/ItemUtilityPrices";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { fetchAllServices } from "../../../redux/slices/ServicesSlice";

export const ListUtilityPrices = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((props) => props.services.services);

  useEffect(() => {
    dispatch(fetchAllServices());
  }, []);

  return (
    <ul className={Styles.listUtilityPrices}>
      {status === "loading" && <p className={Styles.loading}>Loading...</p>}
      {items.map(({ value, valueName, image, category }) => (
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
