import "@/styles/pages/home.scss";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { MdListUtilityPrices } from "@/components/features/list-utility-prices/MdListUtilityPrices";
import { MdDateDisplay } from "@/components/shared/date-display/MdDateDisplay";
import { languages } from "@/components/shared/date-display/constants";
import { language } from "@/constants/language";

export function Home() {
    const lang = useAppSelector(selectTranslations);
    const currentLanguage = useAppSelector((state) => state.i18n.lang);
    const date = new Date();
    const isUkraineLanguage = currentLanguage === language.ua.toLowerCase();

    return (
        <section className="home">
            <div className="title__block">
                <h3 className="title">{lang.home.home}</h3>
                <MdDateDisplay
                    date={date}
                    subTitle={lang.home.currentDate}
                    language={isUkraineLanguage ? languages.ua : languages.en}
                />
            </div>

            <p className="subtitle">{lang.home.utilityPrices}</p>

            <MdListUtilityPrices />
        </section>
    );
}
