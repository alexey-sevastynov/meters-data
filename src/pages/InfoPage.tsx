import "@/styles/pages/info.scss";
import { useParams } from "react-router-dom";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { getBreadcrumbItemsInfo } from "@/constants/breadcrumb-items";
import { routeNames } from "@/constants/routes";
import { getSidebarLayoutClass } from "@/helpers/pages/get-sidebar-layout-class";
import { navigationAddressItems } from "@/constants/navigation-items";
import { MdBillingAccounts } from "@/components/features/billing-accounts/MdBillingAccounts";

export function InfoPage() {
    const sidebarContext = useSidebar();
    const params = useParams();
    const addressItem = navigationAddressItems.find(({ link }) => link === `/${params.address}`);
    const addressName = addressItem?.text;
    const route = `/${params.address}/${routeNames.info}`;

    return (
        <div className="info">
            <div className={getSidebarLayoutClass(sidebarContext.isSidebarCollapsed)}>
                <div className="title">
                    <MdBreadcrumb items={getBreadcrumbItemsInfo(params.address!, addressName, route)} />
                </div>
                <MdBillingAccounts />
            </div>
        </div>
    );
}
