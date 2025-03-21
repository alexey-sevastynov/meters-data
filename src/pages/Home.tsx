import React, { HTMLAttributes } from "react";
import "@//styles/pages/home.scss";
import { useAppSelector } from "@/redux/hook";
import { selectTranslations } from "@/redux/slices/I18next";
import { ListUtilityPrices } from "@/components/features/list-utility-prices/ListUtilityPrices";
import { MdDateDisplay } from "@/components/shared/date-display/MdDateDisplay";
import { languages } from "@/components/shared/date-display/constants";
import { language } from "@/constants/language";

interface HomeProps extends HTMLAttributes<HTMLDivElement> {}

export const Home: React.FC<HomeProps> = ({ ...props }) => {
  const lang = useAppSelector(selectTranslations);
  const currentLanguage = useAppSelector((props) => props.i18n.lang);
  const date = new Date();
  const isUkraineLanguage = currentLanguage === language.ua.toLowerCase();

  return (
    <section
      className="home"
      {...props}
    >
      <div className="title__block">
        <h3 className="title">{lang.home.home}</h3>
        <MdDateDisplay
          date={date}
          subTitle={lang.home.currentDate}
          language={isUkraineLanguage ? languages.ua : languages.en}
        />
      </div>

      <p className="subtitle">{lang.home.utilityPrices}</p>

      <ListUtilityPrices />
    </section>
  );
};
