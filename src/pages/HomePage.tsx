import "@/styles/pages/home.scss";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { MdListUtilityPrices } from "@/components/features/list-utility-prices/MdListUtilityPrices";
import { MdDateDisplay } from "@/components/shared/date-display/MdDateDisplay";
import { languages } from "@/components/shared/date-display/constants";
import { language } from "@/constants/language";
import { useSidebar } from "@/components/context/sidebar-provider/SidebarProvider";
import { getSidebarLayoutClass } from "@/helpers/pages/get-sidebar-layout-class";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";

export function HomePage() {
    const sidebarContext = useSidebar();
    const translations = useAppSelector(selectTranslations);
    const currentLanguage = useAppSelector((state) => state.i18n.lang);
    const date = new Date();
    const isUkraineLanguage = currentLanguage === language.ua.toLowerCase();

    return (
        <section className="home">
            <div className={getSidebarLayoutClass(sidebarContext.isSidebarCollapsed)}>
                <h3 className="title">{translations.home.welcome}, Lesha! 👋</h3>
                <div className="date">
                    <MdIcon name={iconNames.calendar} color={colorNames.grey} />
                    <MdDateDisplay date={date} language={isUkraineLanguage ? languages.ua : languages.en} />
                </div>

                <h5 className="subtitle">{translations.home.utilityPrices}</h5>

                <MdListUtilityPrices />
            </div>
        </section>
    );
}
