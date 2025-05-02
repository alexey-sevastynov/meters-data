import "@/styles/pages/address001.scss";
import { MdInfoPanelMonth } from "@/components/features/info-panel-month/MdInfoPanelMonth";
import { MdMetersData } from "@/components/features/meters-data/MetersData";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { BREADCRUMB_ITEMS_ADDR_001 } from "@/constants/breadcrumb-items";
import { useSidebar } from "@/components/context/SidebarProvider";
import { MdMetersManager } from "@/components/features/meters-manager/MdMetersManager";

export function Address001() {
    const sidebarContext = useSidebar();

    const layoutStyle = sidebarContext.isSidebarCollapsed
        ? "page-layout--collapsed"
        : "page-layout--expanded";

    return (
        <section className="address001">
            <div className={layoutStyle}>
                <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_001} />
                <MdInfoPanelMonth />
                <MdMetersData isTableVisible={false} />
                <MdMetersManager />
            </div>
        </section>
    );
}
