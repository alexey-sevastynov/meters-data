import { MdMonthlyUtilityReport } from "@/components/features/monthly-utility-report/MdMonthlyUtilityReport";
import { MdMetersFormSection } from "@/components/features/meters-form-section/MetersFormSection";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";
import { MdMetersTableManager } from "@/components/features/meters-table-manager/MetersTableManager";
import { BreadcrumbItem } from "@/components/shared/breadcrumb/breadcrumb.type";
import { getSidebarLayoutClass } from "@/helpers/pages/get-sidebar-layout-class";

interface AddressPageProps {
    breadcrumbItems: BreadcrumbItem[];
    isWaterBlock?: boolean;
}

export function AddressPage({ breadcrumbItems, isWaterBlock = true }: AddressPageProps) {
    const sidebarContext = useSidebar();

    return (
        <section className="address">
            <div className={getSidebarLayoutClass(sidebarContext.isSidebarCollapsed)}>
                <MdBreadcrumb items={breadcrumbItems} />
                <MdMonthlyUtilityReport isWaterBlock={isWaterBlock} />
                <MdMetersFormSection isWaterBlock={isWaterBlock} />
                <MdMetersTableManager isWaterBlock={isWaterBlock} />
            </div>
        </section>
    );
}
