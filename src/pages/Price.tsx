import { useEffect } from "react";
import "@/styles/pages/price.scss";
import { useParams } from "react-router-dom";
import { LIST_NAV } from "@/constants";
import { useAppDispatch } from "@/redux/hook";
import { fetchAllServices } from "@/redux/slices/ServicesSlice";
import { fetchAllMonthlyMoneyCalculations } from "@/redux/slices/PriceSlice";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { getBreadcrumbItemsPrice } from "@/constants/breadcrumbItems";
import { ADDRESS_TYPES } from "@/constants/routes";
import { MdUtilityAccount } from "@/components/features/utility-account/MdUtilityAccount";
import { MdExtraServicesForm } from "@/components/features/extra-services-form/ExtraServicesForm";
import { MdListCategoriesWithPrices } from "@/components/features/list-categories-with-prices/ListCategoriesWithPrices";
import { MdMonthlyMoneyCalculations } from "@/components/features/monthly-money-calculations/MonthlyMoneyCalculations";

export function Price() {
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
        <MdBreadcrumb
          items={getBreadcrumbItemsPrice(
            address!,
            addressItem?.id,
            `/${address}/${ADDRESS_TYPES.PRICE}`
          )}
        />
      </div>

      <MdUtilityAccount />

      <MdExtraServicesForm dispatch={dispatch} />
      <div className="overflow-auto mt-40">
        <MdListCategoriesWithPrices dispatch={dispatch} />
      </div>

      <MdMonthlyMoneyCalculations />
    </div>
  );
}
