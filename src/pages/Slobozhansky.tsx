import "../styles/pages/slobozhansky.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";
import { useAppSelector } from "../redux/hook";
import { selectTranslations } from "../redux/slices/I18next";

export const Slobozhansky = () => {
  const lang = useAppSelector(selectTranslations);
  return (
    <section className="slobozhansky">
      <h3 className="title">{lang.navigation.slobozhanskyAvenue}</h3>
      <InfoPanelMonth />

      <MetersData />
    </section>
  );
};
