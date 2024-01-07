import React, { useEffect } from "react";
import "../styles/pages/price.scss";
import { Link, useParams } from "react-router-dom";
import { LIST_NAV } from "../constants";
import { ExtraServicesForm, ListCategoriesWithPrices } from "../ui/Price";
import { useAppDispatch } from "../redux/hook";
import { fetchAllServices } from "../redux/slices/ServicesSlice";

export const Price = () => {
  const { address } = useParams();
  const dispatch = useAppDispatch();

  const addressItem = LIST_NAV.find(({ link }) => link === `/${address}`);
  const nameAddress = addressItem ? addressItem.id : "Unknown Address";

  useEffect(() => {
    dispatch(fetchAllServices());
  }, []);

  return (
    <div className="price">
      <div className="title">
        <Link className="link" to={`/${address}`}>
          {nameAddress}
        </Link>
        <p>/price</p>
      </div>

      <ExtraServicesForm dispatch={dispatch} />
      <ListCategoriesWithPrices />
    </div>
  );
};
