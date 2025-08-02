import { useEffect } from "react";
import { MdMonthlyUtilityReport } from "@/components/features/monthly-utility-report/MdMonthlyUtilityReport";
import { MdMetersFormSection } from "@/components/features/meters-form-section/MetersFormSection";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";
import { MdMetersTableManager } from "@/components/features/meters-table-manager/MetersTableManager";
import { BreadcrumbItem } from "@/components/shared/breadcrumb/breadcrumb.type";
import { getSidebarLayoutClass } from "@/helpers/pages/get-sidebar-layout-class";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { statusNames } from "@/constants/status";
import { getAllMetersData } from "@/store/slices/meters-data/meters-data.thunks";
import { initSocket } from "@/infra/socket/socket-client";

interface AddressPageProps {
    breadcrumbItems: BreadcrumbItem[];
    isWaterBlock?: boolean;
}

export function AddressPage({ breadcrumbItems, isWaterBlock = true }: AddressPageProps) {
    const sidebarContext = useSidebar();

    const dispatch = useAppDispatch();

    const meterReadingsList = useAppSelector((state) => state.metersData.items);
    const status = useAppSelector((state) => state.metersData.status);

    useEffect(() => {
        initSocket(dispatch);
    }, [dispatch]);

    useEffect(() => {
        if (meterReadingsList.length === 0 && status === statusNames.inactive) {
            dispatch(getAllMetersData());
        }
    }, [dispatch, meterReadingsList, status]);

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
