import { useEffect } from "react";
import "@/styles/pages/price.scss";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getAllUtilityPrice } from "@/store/slices/utility-price-slice";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { getBreadcrumbItemsPrice } from "@/constants/breadcrumb-items";
import { routeNames } from "@/constants/routes";
import { MdExtraServicesForm } from "@/components/features/extra-services-form/ExtraServicesForm";
import { MdMonthlyMoneyCalculations } from "@/components/features/monthly-money-calculations/MonthlyMoneyCalculations";
import { getAllMonthlyMoneyCalculations } from "@/store/slices/monthly-money-calculations/monthly-money-calculations.thunks";
import { statusNames } from "@/constants/status";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";
import { getSidebarLayoutClass } from "@/helpers/pages/get-sidebar-layout-class";
import { getNavigationItem } from "@/helpers/links/navigation-items";

export function PricePage() {
    const sidebarContext = useSidebar();
    const params = useParams();
    const dispatch = useAppDispatch();
    const utilityPrices = useAppSelector((state) => state.utilityPrices.items);
    const utilityPricesStatus = useAppSelector((state) => state.utilityPrices.status);
    const monthlyMoneyCalculations = useAppSelector((state) => state.monthlyMoneyCalculations.items);
    const monthlyMoneyCalculationsStatus = useAppSelector((state) => state.monthlyMoneyCalculations.status);
    const navigationAddressItem = getNavigationItem(params.address);
    const addressName = navigationAddressItem?.text;
    const appRoutePath = `/${params.address}/${routeNames.price}`;

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

    return (
        <div className="price">
            <div className={getSidebarLayoutClass(sidebarContext.isSidebarCollapsed)}>
                <div className="title">
                    <MdBreadcrumb
                        items={getBreadcrumbItemsPrice(params.address!, addressName, appRoutePath)}
                    />
                </div>
                <MdExtraServicesForm dispatch={dispatch} />
                <MdMonthlyMoneyCalculations />
            </div>
        </div>
    );
}
