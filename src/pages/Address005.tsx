import "@/styles/pages/address004.scss";
import { MdInfoPanelMonth } from "@/components/features/info-panel-month/MdInfoPanelMonth";
import { MetersData } from "@/components/features/meters-data/MetersData";
import { MdBreadcrumb } from "@/components/shared/breadcrumb/MdBreadcrumb";
import { BREADCRUMB_ITEMS_ADDR_005 } from "@/constants/breadcrumbItems";

export const Address005 = () => {
  return (
    <section className="address004">
      <MdBreadcrumb items={BREADCRUMB_ITEMS_ADDR_005} />

      <MdInfoPanelMonth isWaterBlock={false} />

      <MetersData isWaterBlock={false} />
    </section>
  );
};
