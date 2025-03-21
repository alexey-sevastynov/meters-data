import "@/styles/pages/address002.scss";
import { MdInfoPanelMonth } from "@/components/features/info-panel-month/MdInfoPanelMonth";
import { MetersData } from "@/components/features/meters-data/MetersData";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { BREADCRUMB_ITEMS_ADDR_002 } from "@/constants/breadcrumbItems";

export const Address002 = () => {
  return (
    <section className="address002">
      <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_002} />

      <MdInfoPanelMonth />

      <MetersData />
    </section>
  );
};
