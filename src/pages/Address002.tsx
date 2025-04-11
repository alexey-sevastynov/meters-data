import "@/styles/pages/address002.scss";
import { MdInfoPanelMonth } from "@/components/features/info-panel-month/MdInfoPanelMonth";
import { MdMetersData } from "@/components/features/meters-data/MetersData";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { BREADCRUMB_ITEMS_ADDR_002 } from "@/constants/breadcrumb-items";
import { useSidebar } from "@/components/context/SidebarProvider";

export function Address002() {
    const sidebarContext = useSidebar();

    const layoutStyle = sidebarContext.isSidebarCollapsed
        ? "page-layout--collapsed"
        : "page-layout--expanded";

    return (
        <section className="address002">
            <div className={layoutStyle}>
                <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_002} />
                <MdInfoPanelMonth />
                <MdMetersData />
            </div>
        </section>
    );
}
