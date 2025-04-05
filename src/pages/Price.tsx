import { useEffect } from "react";
import "@/styles/pages/price.scss";
import { useParams } from "react-router-dom";
import { navigationItems } from "@/constants/navigation-items";
import { useAppDispatch } from "@/store/hook";
import { getAllUtilityPrice } from "@/store/slices/utility-price-slice";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { getBreadcrumbItemsPrice } from "@/constants/breadcrumb-items";
import { routeNames } from "@/constants/routes";
import { MdBillingAccounts } from "@/components/features/utility-account/MdUtilityAccount";
import { MdExtraServicesForm } from "@/components/features/extra-services-form/ExtraServicesForm";
import { MdListCategoriesWithPrices } from "@/components/features/list-categories-with-prices/ListCategoriesWithPrices";
import { MdMonthlyMoneyCalculations } from "@/components/features/monthly-money-calculations/MonthlyMoneyCalculations";
import { getAllMonthlyMoneyCalculations } from "@/store/slices/monthly-money-calculations/monthly-money-calculations.thunks";

export function Price() {
    const { address } = useParams();
    const dispatch = useAppDispatch();

    const addressItem = navigationItems.find(({ link }) => link === `/${address}`);

    useEffect(() => {
        dispatch(getAllUtilityPrice());
        dispatch(getAllMonthlyMoneyCalculations());
    }, [dispatch]);

    return (
        <div className="price">
            <div className="title">
                <MdBreadcrumb
                    items={getBreadcrumbItemsPrice(
                        address!,
                        `/${address}/${routeNames.price}`,
                        addressItem?.id
                    )}
                />
            </div>

            <MdBillingAccounts />

            <MdExtraServicesForm dispatch={dispatch} />
            <div className="overflow-auto mt-40">
                <MdListCategoriesWithPrices dispatch={dispatch} />
            </div>

            <MdMonthlyMoneyCalculations />
        </div>
    );
}
