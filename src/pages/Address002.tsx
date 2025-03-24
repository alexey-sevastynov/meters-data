import "@/styles/pages/address002.scss";
import { MdInfoPanelMonth } from "@/components/features/info-panel-month/MdInfoPanelMonth";
import { MdMetersData } from "@/components/features/meters-data/MetersData";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { BREADCRUMB_ITEMS_ADDR_002 } from "@/constants/breadcrumb-items";

export function Address002() {
    return (
        <section className="address002">
            <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_002} />
            <MdInfoPanelMonth />
            <MdMetersData />
        </section>
    );
}
