import "../styles/pages/cheluskina.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";
import { useAppSelector } from "../redux/hook";
import { selectTranslations } from "../redux/slices/I18next";

export const Cheluskina = () => {
  const lang = useAppSelector(selectTranslations);
  return (
    <section className="cheluskina">
      <h3 className="title">{lang.navigation.chelyuskina}</h3>
      <InfoPanelMonth />

      <MetersData />
    </section>
  );
};
