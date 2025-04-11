import "@/styles/pages/address004.scss";
import { MdInfoPanelMonth } from "@/components/features/info-panel-month/MdInfoPanelMonth";
import { MdMetersData } from "@/components/features/meters-data/MetersData";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { BREADCRUMB_ITEMS_ADDR_005 } from "@/constants/breadcrumb-items";
import { useSidebar } from "@/components/context/SidebarProvider";

export function Address005() {
    const sidebarContext = useSidebar();

    const layoutStyle = sidebarContext.isSidebarCollapsed
        ? "page-layout--collapsed"
        : "page-layout--expanded";

    return (
        <section className="address004">
            <div className={layoutStyle}>
                <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_005} />
                <MdInfoPanelMonth isWaterBlock={false} />
                <MdMetersData isWaterBlock={false} />
            </div>
        </section>
    );
}
