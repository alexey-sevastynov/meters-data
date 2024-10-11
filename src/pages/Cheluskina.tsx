import "../styles/pages/cheluskina.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";
import { Breadcrumb } from "../components/Breadcrumb/Breadcrumb";
import { BREADCRUMB_ITEMS_ADDR_001 } from "../constants/breadcrumbItems";

export const Cheluskina = () => {
  return (
    <section className="cheluskina">
      <Breadcrumb items={BREADCRUMB_ITEMS_ADDR_001} />

      <InfoPanelMonth />

      <MetersData />
    </section>
  );
};
