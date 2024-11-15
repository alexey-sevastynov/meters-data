import "../styles/pages/address002.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { BREADCRUMB_ITEMS_ADDR_002 } from "../constants/breadcrumbItems";

export const Address002 = () => {
  return (
    <section className="address002">
      <Breadcrumb items={BREADCRUMB_ITEMS_ADDR_002} />

      <InfoPanelMonth />

      <MetersData />
    </section>
  );
};
