import "@/styles/pages/address001.scss";
import { MdInfoPanelMonth } from "@/components/features/info-panel-month/MdInfoPanelMonth";
import { MdMetersData } from "@/components/features/meters-data/MetersData";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { BREADCRUMB_ITEMS_ADDR_001 } from "@/constants/breadcrumbItems";

export function Address001() {
  return (
    <section className="address001">
      <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_001} />
      <MdInfoPanelMonth />
      <MdMetersData />
    </section>
  );
}
