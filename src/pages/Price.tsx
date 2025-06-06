import { useEffect } from "react";
import "@/styles/pages/price.scss";
import { useParams } from "react-router-dom";
import { navigationItems } from "@/constants/navigation-items";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getAllUtilityPrice } from "@/store/slices/utility-price-slice";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { getBreadcrumbItemsPrice } from "@/constants/breadcrumb-items";
import { routeNames } from "@/constants/routes";
import { MdUtilityAccount } from "@/components/features/utility-account/MdUtilityAccount";
import { MdExtraServicesForm } from "@/components/features/extra-services-form/ExtraServicesForm";
import { MdListCategoriesWithPrices } from "@/components/features/list-categories-with-prices/ListCategoriesWithPrices";
import { MdMonthlyMoneyCalculations } from "@/components/features/monthly-money-calculations/MonthlyMoneyCalculations";
import { getAllMonthlyMoneyCalculations } from "@/store/slices/monthly-money-calculations/monthly-money-calculations.thunks";
import { statusNames } from "@/constants/status";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";

export function Price() {
    const sidebarContext = useSidebar();
    const params = useParams();
    const dispatch = useAppDispatch();
    const utilityPrices = useAppSelector((state) => state.utilityPrices.items);
    const utilityPricesStatus = useAppSelector((state) => state.utilityPrices.status);
    const monthlyMoneyCalculations = useAppSelector((state) => state.monthlyMoneyCalculations.items);
    const monthlyMoneyCalculationsStatus = useAppSelector((state) => state.monthlyMoneyCalculations.status);
    const addressItem = navigationItems.find(({ link }) => link === `/${params.address}`);
    const addressName = addressItem?.text;
    const route = `/${params.address}/${routeNames.price}`;

    useEffect(() => {
        if (utilityPrices.length === 0 && utilityPricesStatus !== statusNames.loading) {
            dispatch(getAllUtilityPrice());
        }

        if (!monthlyMoneyCalculations && monthlyMoneyCalculationsStatus !== statusNames.loading) {
            dispatch(getAllMonthlyMoneyCalculations());
        }
    }, [
        dispatch,
        utilityPrices,
        utilityPricesStatus,
        monthlyMoneyCalculations,
        monthlyMoneyCalculationsStatus,
    ]);

    const layoutStyle = sidebarContext.isSidebarCollapsed
        ? "page-layout--collapsed"
        : "page-layout--expanded";

    return (
        <div className="price">
            <div className={layoutStyle}>
                <div className="title">
                    <MdBreadcrumb items={getBreadcrumbItemsPrice(params.address!, route, addressName)} />
                </div>
                <MdUtilityAccount />
                <MdExtraServicesForm dispatch={dispatch} />
                <div className="overflow-auto mt-40">
                    <MdListCategoriesWithPrices dispatch={dispatch} />
                </div>
                <MdMonthlyMoneyCalculations />
            </div>
        </div>
    );
}
