import { useEffect } from "react";
import "@/styles/pages/price.scss";
import { useParams } from "react-router-dom";
import { LIST_NAV } from "@/constants";
import { useAppDispatch } from "@/store/hook";
import { getAllUtilityPrice } from "@/store/slices/utility-price-slice";
import { fetchAllMonthlyMoneyCalculations } from "@/store/slices/price-slice";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { getBreadcrumbItemsPrice } from "@/constants/breadcrumb-items";
import { routeNames } from "@/constants/routes";
import { MdUtilityAccount } from "@/components/features/utility-account/MdUtilityAccount";
import { MdExtraServicesForm } from "@/components/features/extra-services-form/ExtraServicesForm";
import { MdListCategoriesWithPrices } from "@/components/features/list-categories-with-prices/ListCategoriesWithPrices";
import { MdMonthlyMoneyCalculations } from "@/components/features/monthly-money-calculations/MonthlyMoneyCalculations";

export function Price() {
    const { address } = useParams();
    const dispatch = useAppDispatch();

    const addressItem = LIST_NAV.find(({ link }) => link === `/${address}`);

    useEffect(() => {
        dispatch(getAllUtilityPrice());
        dispatch(fetchAllMonthlyMoneyCalculations());
    }, []);

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

            <MdUtilityAccount />

            <MdExtraServicesForm dispatch={dispatch} />
            <div className="overflow-auto mt-40">
                <MdListCategoriesWithPrices dispatch={dispatch} />
            </div>

            <MdMonthlyMoneyCalculations />
        </div>
    );
}
