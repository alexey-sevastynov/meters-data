import "../styles/pages/antonovicha75.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";

export const Antonovicha75 = () => {
  return (
    <section className="antonovicha75">
      <h3 className="title">Volodymyr Antonovicha street, 75/1</h3>
      <InfoPanelMonth isWaterBlock={false} />

      <MetersData isWaterBlock={false} />
    </section>
  );
};
