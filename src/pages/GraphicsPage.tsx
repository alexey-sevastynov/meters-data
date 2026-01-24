import "@/styles/pages/graphics.scss";
import { useParams } from "react-router-dom";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { getBreadcrumbItemsGraphics } from "@/constants/breadcrumb-items";
import { routeNames } from "@/constants/routes";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";
import { getSidebarLayoutClass } from "@/helpers/pages/get-sidebar-layout-class";
import { MdGraphicHeader } from "@/components/features/graphics/graphics-header/MdGraphicsHeader";
import { MdGraphicsChartSection } from "@/components/features/graphics/graphics-chart-section/MdGraphicsChartSection";
import { getNavigationItem } from "@/helpers/links/navigation-items";

export function GraphicsPage() {
    const sidebarContext = useSidebar();
    const routeParams = useParams();
    const navigationAddressItem = getNavigationItem(routeParams.address);
    const addressName = navigationAddressItem?.text;
    const appRoutePath = `/${routeParams.address}/${routeNames.graphics}`;

    return (
        <div className="graphics">
            <div className={getSidebarLayoutClass(sidebarContext.isSidebarCollapsed)}>
                <div className="title">
                    <MdBreadcrumb
                        items={getBreadcrumbItemsGraphics(routeParams.address!, addressName, appRoutePath)}
                    />
                </div>
                <MdGraphicHeader />
                <MdGraphicsChartSection />
            </div>
        </div>
    );
}
