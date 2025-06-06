import "@/styles/pages/address003.scss";
import { MdMonthlyUtilityReport } from "@/components/features/monthly-utility-report/MdMonthlyUtilityReport";
import { MdMetersFormSection } from "@/components/features/meters-data/MetersData";
import { BREADCRUMB_ITEMS_ADDR_003 } from "@/constants/breadcrumb-items";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";
import { MdMetersTableManager } from "@/components/features/meters-manager/MdMetersManager";

export function Address003() {
    const sidebarContext = useSidebar();

    const layoutStyle = sidebarContext.isSidebarCollapsed
        ? "page-layout--collapsed"
        : "page-layout--expanded";

    return (
        <section className="address003">
            <div className={layoutStyle}>
                <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_003} />
                <MdMonthlyUtilityReport isWaterBlock={false} />
                <MdMetersFormSection isWaterBlock={false} />
                <MdMetersTableManager isWaterBlock={false} />
            </div>
        </section>
    );
}
