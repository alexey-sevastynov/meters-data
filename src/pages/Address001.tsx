import "@/styles/pages/address001.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { BREADCRUMB_ITEMS_ADDR_001 } from "../constants/breadcrumbItems";

export const Address001 = () => {
  return (
    <section className="address001">
      <Breadcrumb items={BREADCRUMB_ITEMS_ADDR_001} />

      <InfoPanelMonth />

      <MetersData />
    </section>
  );
};
