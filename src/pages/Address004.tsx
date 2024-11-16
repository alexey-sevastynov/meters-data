import "@/styles/pages/address004.scss";
import { InfoPanelMonth } from "@/components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "@/components/MetersData/MetersData";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { BREADCRUMB_ITEMS_ADDR_004 } from "@/constants/breadcrumbItems";

export const Address004 = () => {
  return (
    <section className="address004">
      <Breadcrumb items={BREADCRUMB_ITEMS_ADDR_004} />

      <InfoPanelMonth isWaterBlock={false} />

      <MetersData isWaterBlock={false} />
    </section>
  );
};
