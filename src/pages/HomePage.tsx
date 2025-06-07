import "@/styles/pages/home.scss";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { MdListUtilityPrices } from "@/components/features/list-utility-prices/MdListUtilityPrices";
import { MdDateDisplay } from "@/components/shared/date-display/MdDateDisplay";
import { languages } from "@/components/shared/date-display/constants";
import { language } from "@/constants/language";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";
import { getSidebarLayoutClass } from "@/helpers/pages/get-sidebar-layout-class";

export function HomePage() {
    const sidebarContext = useSidebar();
    const translations = useAppSelector(selectTranslations);
    const currentLanguage = useAppSelector((state) => state.i18n.lang);
    const date = new Date();
    const isUkraineLanguage = currentLanguage === language.ua.toLowerCase();

    return (
        <section className="home">
            <div className={getSidebarLayoutClass(sidebarContext.isSidebarCollapsed)}>
                <div className="title__block">
                    <h3 className="title">{translations.home.home}</h3>
                    <MdDateDisplay
                        date={date}
                        subTitle={translations.home.currentDate}
                        language={isUkraineLanguage ? languages.ua : languages.en}
                    />
                </div>

                <h5 className="subtitle">{translations.home.utilityPrices}</h5>

                <MdListUtilityPrices />
            </div>
        </section>
    );
}
