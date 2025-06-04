import "@/styles/pages/address003.scss";
import { MdMonthlyUtilityReport } from "@/components/features/monthly-utility-report/MdMonthlyUtilityReport";
import { MdMetersData } from "@/components/features/meters-data/MetersData";
import { BREADCRUMB_ITEMS_ADDR_003 } from "@/constants/breadcrumb-items";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { useSidebar } from "@/components/context/SidebarProvider";
import { MdMetersManager } from "@/components/features/meters-manager/MdMetersManager";

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
                <MdMetersData isTableVisible={false} isWaterBlock={false} />
                <MdMetersManager isWaterBlock={false} />
            </div>
        </section>
    );
}
