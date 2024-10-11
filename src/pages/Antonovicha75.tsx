import "../styles/pages/antonovicha75.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { BREADCRUMB_ITEMS_ADDR_004 } from "../constants/breadcrumbItems";

export const Antonovicha75 = () => {
  return (
    <section className="antonovicha75">
      <Breadcrumb items={BREADCRUMB_ITEMS_ADDR_004} />

      <InfoPanelMonth isWaterBlock={false} />

      <MetersData isWaterBlock={false} />
    </section>
  );
};
