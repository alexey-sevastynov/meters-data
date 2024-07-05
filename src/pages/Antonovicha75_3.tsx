import "../styles/pages/antonovicha75.scss";
import { InfoPanelMonth } from "../components/InfoPanelMonth/InfoPanelMonth";
import { MetersData } from "../components/MetersData/MetersData";
import { useAppSelector } from "../redux/hook";
import { selectTranslations } from "../redux/slices/I18next";

export const Antonovicha75_3 = () => {
  const lang = useAppSelector(selectTranslations);
  return (
    <section className="antonovicha75">
      <h3 className="title">{lang.navigation.volodymyrAntonovicha75_3}</h3>
      <InfoPanelMonth isWaterBlock={false} />

      <MetersData isWaterBlock={false} />
    </section>
  );
};
