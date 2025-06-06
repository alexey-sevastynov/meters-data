import "@/styles/pages/address001.scss";
import { MdMonthlyUtilityReport } from "@/components/features/monthly-utility-report/MdMonthlyUtilityReport";
import { MdMetersFormSection } from "@/components/features/meters-data/MetersData";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { BREADCRUMB_ITEMS_ADDR_001 } from "@/constants/breadcrumb-items";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";
import { MdMetersTableManager } from "@/components/features/meters-manager/MdMetersManager";

export function Address001() {
    const sidebarContext = useSidebar();

    const layoutStyle = sidebarContext.isSidebarCollapsed
        ? "page-layout--collapsed"
        : "page-layout--expanded";

    return (
        <section className="address001">
            <div className={layoutStyle}>
                <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_001} />
                <MdMonthlyUtilityReport />
                <MdMetersFormSection />
                <MdMetersTableManager />
            </div>
        </section>
    );
}
