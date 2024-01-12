import "../styles/pages/slobozhansky.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";

export const Slobozhansky = () => {
  return (
    <section className="slobozhansky">
      <h3 className="title">Slobozhansky Avenue, 68A/63</h3>
      <InfoPanelMonth />

      <MetersData />
    </section>
  );
};
