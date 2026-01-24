import { MdChart } from "@/components/shared/chart/MdChart";
import styles from "./graphicsChartSection.module.scss";
import { cn } from "@/lib/cn";
import { useAppSelector } from "@/store/hook";
import { filterMeterDataByAddressAndSortByDate } from "@/helpers/meters-data/filters";
import { useLocation } from "react-router-dom";
import { selectTranslations } from "@/store/slices/i-18-next";
import { routeNames } from "@/constants/routes";
import { getMeterChartData } from "@/components/features/graphics/graphics-chart-section/graphicChartSection.funcs";

interface MdGraphicsChartSectionProps {
    className?: string;
}

export function MdGraphicsChartSection({ className }: MdGraphicsChartSectionProps) {
    const metersData = useAppSelector((state) => state.metersData.items);
    const translations = useAppSelector(selectTranslations);
    const location = useLocation();
    const addressCurrentPage = location.pathname.slice(1).replace("/" + routeNames.graphics, "");
    const metersDataByAddressAndSortByDate = filterMeterDataByAddressAndSortByDate(
        metersData,
        addressCurrentPage,
    );
    const meterChartData = getMeterChartData(metersDataByAddressAndSortByDate);

    return (
        <div className={cn(styles.root, className)}>
            <MdChart data={meterChartData.light} title={translations.graphics.lightTitle} titleKey="Light" />
            <MdChart data={meterChartData.gas} title={translations.graphics.gasTitle} titleKey="Gas" />

            {meterChartData.water.every((item) => item.water !== null) && (
                <MdChart
                    data={meterChartData.water}
                    title={translations.graphics.waterTitle}
                    titleKey="Water"
                />
            )}
        </div>
    );
}
