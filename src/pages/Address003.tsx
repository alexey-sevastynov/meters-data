import "@/styles/pages/address003.scss";
import { MdInfoPanelMonth } from "@/components/features/info-panel-month/MdInfoPanelMonth";
import { MdMetersData } from "@/components/features/meters-data/MetersData";
import { BREADCRUMB_ITEMS_ADDR_003 } from "@/constants/breadcrumb-items";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { useSidebar } from "@/components/context/SidebarProvider";

export function Address003() {
    const sidebarContext = useSidebar();

    const layoutStyle = sidebarContext.isSidebarCollapsed
        ? "page-layout--collapsed"
        : "page-layout--expanded";

    return (
        <section className="address003">
            <div className={layoutStyle}>
                <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_003} />
                <MdInfoPanelMonth isWaterBlock={false} />
                <MdMetersData isWaterBlock={false} />
            </div>
        </section>
    );
}
