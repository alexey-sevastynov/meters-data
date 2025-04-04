import "@/styles/pages/address004.scss";
import { MdInfoPanelMonth } from "@/components/features/info-panel-month/MdInfoPanelMonth";
import { MdMetersData } from "@/components/features/meters-data/MetersData";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { BREADCRUMB_ITEMS_ADDR_004 } from "@/constants/breadcrumb-items";

export function Address004() {
    return (
        <section className="address004">
            <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_004} />
            <MdInfoPanelMonth isWaterBlock={false} />
            <MdMetersData isWaterBlock={false} />
        </section>
    );
}
