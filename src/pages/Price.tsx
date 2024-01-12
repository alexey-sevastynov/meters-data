import { useEffect } from "react";
import "../styles/pages/price.scss";
import { Link, useParams } from "react-router-dom";
import { LIST_NAV } from "../constants";
import {
  ExtraServicesForm,
  ListCategoriesWithPrices,
  MonthlyMoneyCalculations,
} from "../ui/Price";
import { useAppDispatch } from "../redux/hook";
import { fetchAllServices } from "../redux/slices/ServicesSlice";
import { fetchAllMonthlyMoneyCalculations } from "../redux/slices/PriceSlice";

export const Price = () => {
  const { address } = useParams();
  const dispatch = useAppDispatch();

  const addressItem = LIST_NAV.find(({ link }) => link === `/${address}`);
  const nameAddress = addressItem ? addressItem.id : "Unknown Address";

  useEffect(() => {
    dispatch(fetchAllServices());
    dispatch(fetchAllMonthlyMoneyCalculations());
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
      <div className="overflow-auto mt-40">
        <ListCategoriesWithPrices dispatch={dispatch} />
      </div>

      <MonthlyMoneyCalculations />
    </div>
  );
};
