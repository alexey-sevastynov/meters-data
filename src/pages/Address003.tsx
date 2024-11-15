import "@/styles/pages/address003.scss";
import { InfoPanelMonth } from "@/components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "@/components/MetersData/MetersData";
import { BREADCRUMB_ITEMS_ADDR_003 } from "@/constants/breadcrumbItems";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";

export const Address003 = () => {
  return (
    <section className="address003">
      <Breadcrumb items={BREADCRUMB_ITEMS_ADDR_003} />

      <InfoPanelMonth isWaterBlock={false} />

      <MetersData isWaterBlock={false} />
    </section>
  );
};
