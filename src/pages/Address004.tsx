import "@/styles/pages/address004.scss";
import { MdMonthlyUtilityReport } from "@/components/features/monthly-utility-report/MdMonthlyUtilityReport";
import { MdMetersData } from "@/components/features/meters-data/MetersData";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { BREADCRUMB_ITEMS_ADDR_004 } from "@/constants/breadcrumb-items";
import { useSidebar } from "@/components/context/SidebarProvider";

export function Address004() {
    const sidebarContext = useSidebar();

    const layoutStyle = sidebarContext.isSidebarCollapsed
        ? "page-layout--collapsed"
        : "page-layout--expanded";

    return (
        <section className="address004">
            <div className={layoutStyle}>
                <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_004} />
                <MdMonthlyUtilityReport isWaterBlock={false} />
                <MdMetersData isWaterBlock={false} />
            </div>
        </section>
    );
}
