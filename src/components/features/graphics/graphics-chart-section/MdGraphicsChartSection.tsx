import { MdChart } from "@/components/shared/chart/MdChart";
import styles from "./graphicsChartSection.module.scss";
import { cn } from "@/lib/cn";
import { useAppSelector } from "@/store/hook";
import { filterMeterDataByAddressAndSortByDate } from "@/helpers/meters-data/filters";
import { useLocation } from "react-router-dom";
import { selectTranslations } from "@/store/slices/i-18-next";
import { routeNames } from "@/constants/routes";
import {
    getMeterChartData,
    getGasLineChartConfig,
    getLightLineChartConfig,
    getWaterLineChartConfig,
} from "@/components/features/graphics/graphics-chart-section/graphicChartSection.funcs";

interface MdGraphicsChartSectionProps {
    className?: string;
}

export function MdGraphicsChartSection({ className }: MdGraphicsChartSectionProps) {
    const metersData = useAppSelector((state) => state.metersData.items);
    const lang = useAppSelector((state) => state.i18n.lang);
    const translations = useAppSelector(selectTranslations);
    const location = useLocation();
    const addressCurrentPage = location.pathname.slice(1).replace("/" + routeNames.graphics, "");
    const metersDataByAddressAndSortByDate = filterMeterDataByAddressAndSortByDate(
        metersData,
        addressCurrentPage,
    );
    const meterChartData = getMeterChartData(metersDataByAddressAndSortByDate, lang);
    const lightLineChartConfig = getLightLineChartConfig(meterChartData.light, translations);
    const gasLineChartConfig = getGasLineChartConfig(meterChartData.gas, translations);
    const waterLineChartConfig = getWaterLineChartConfig(meterChartData.water, translations);
    const hasWaterData = meterChartData.water.every((item) => item.water !== null);

    return (
        <div className={cn(styles.root, className)}>
            <MdChart title={translations.graphics.lightTitle} {...lightLineChartConfig} />
            <MdChart title={translations.graphics.gasTitle} {...gasLineChartConfig} />
            {hasWaterData && <MdChart title={translations.graphics.waterTitle} {...waterLineChartConfig} />}
        </div>
    );
}
