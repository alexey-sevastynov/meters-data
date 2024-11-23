import { useEffect } from "react";
import "@/styles/pages/price.scss";
import { useParams } from "react-router-dom";
import { LIST_NAV } from "@/constants";
import {
  ExtraServicesForm,
  ListCategoriesWithPrices,
  MonthlyMoneyCalculations,
} from "@/ui/Price";
import { useAppDispatch } from "@/redux/hook";
import { fetchAllServices } from "@/redux/slices/ServicesSlice";
import { fetchAllMonthlyMoneyCalculations } from "@/redux/slices/PriceSlice";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { getBreadcrumbItemsPrice } from "@/constants/breadcrumbItems";
import { ADDRESS_TYPES } from "@/constants/routes";
import { UtilityAccount } from "@/components/UtilityAccount/UtilityAccount";

export const Price = () => {
  const { address } = useParams();
  const dispatch = useAppDispatch();

  const addressItem = LIST_NAV.find(({ link }) => link === `/${address}`);

  useEffect(() => {
    dispatch(fetchAllServices());
    dispatch(fetchAllMonthlyMoneyCalculations());
  }, []);

  return (
    <div className="price">
      <div className="title">
        <Breadcrumb
          items={getBreadcrumbItemsPrice(
            address!,
            addressItem?.id,
            `/${address}/${ADDRESS_TYPES.PRICE}`
          )}
        />
      </div>

      <UtilityAccount />

      <ExtraServicesForm dispatch={dispatch} />
      <div className="overflow-auto mt-40">
        <ListCategoriesWithPrices dispatch={dispatch} />
      </div>

      <MonthlyMoneyCalculations />
    </div>
  );
};
