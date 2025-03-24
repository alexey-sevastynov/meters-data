import "@/styles/pages/address003.scss";
import { MdInfoPanelMonth } from "@/components/features/info-panel-month/MdInfoPanelMonth";
import { MdMetersData } from "@/components/features/meters-data/MetersData";
import { BREADCRUMB_ITEMS_ADDR_003 } from "@/constants/breadcrumb-items";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";

export function Address003() {
    return (
        <section className="address003">
            <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_003} />
            <MdInfoPanelMonth isWaterBlock={false} />
            <MdMetersData isWaterBlock={false} />
        </section>
    );
}
