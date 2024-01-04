import React from "react";
import "../styles/pages/price.scss";
import { Link, useParams } from "react-router-dom";
import { LIST_NAV } from "../constants";
import { ExtraServicesForm } from "../ui/Price";

export const Price = () => {
  const { address } = useParams();

  const addressItem = LIST_NAV.find(({ link }) => link === `/${address}`);
  const nameAddress = addressItem ? addressItem.id : "Unknown Address";

  return (
    <div className="price">
      <div className="title">
        <Link className="link" to={`/${address}`}>
          {nameAddress}
        </Link>
        <p>/price</p>
      </div>

      <ExtraServicesForm />
    </div>
  );
};
