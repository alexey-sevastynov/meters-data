import styles from "./monthlyUtilityReport.module.scss";
import { MdMonthlyInfoList } from "@/components/features/monthly-utility-report/monthly-info-list/MdMonthlyInfoList";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { filterMeterDataByAddress } from "@/helpers/meters-data/filters";
import { MdDateRangeSelector } from "@/components/shared/date-range-selector/MdDateRangeSelector";
import { LinkButtonGroup } from "@/components/features/monthly-utility-report/link-button-group/LinkButtonGroup";
import { getStringEnv } from "@/infra/env/env-functions";
import { envKeys } from "@/infra/env/env-keys";
import { getLinkButtons } from "@/components/features/monthly-utility-report/link-button-group/LinkButtonGroup.funcs";
import { removeFirstAddedMonth } from "@/components/features/monthly-utility-report/monthlyUtilityReport.funcs";

interface MdMonthlyUtilityReportProps {
    isWaterBlock?: boolean;
}

export function MdMonthlyUtilityReport({ isWaterBlock = true }: MdMonthlyUtilityReportProps) {
    const { pathname } = useLocation();
    const currentPage = pathname.slice(1);
    const items = useAppSelector((state) => state.metersData.items);
    const infoMeterReading = useAppSelector((state) => state.metersData.infoMeterReading);
    const translations = useAppSelector(selectTranslations);

    const lastValueMeter = (address: string) => {
        switch (address) {
            case getStringEnv(envKeys.address001):
                return infoMeterReading.address001;
            case getStringEnv(envKeys.address002):
                return infoMeterReading.address002;
            case getStringEnv(envKeys.address003):
                return infoMeterReading.address003;
            case getStringEnv(envKeys.address004):
                return infoMeterReading.address004;
            case getStringEnv(envKeys.address005):
                return infoMeterReading.address005;
            default:
                return null;
        }
    };

    const lastValue = lastValueMeter(currentPage);
    const selectedMonth: string = lastValue ? lastValue[0].description : "unknown";
    const month = selectedMonth.split(",")[0];
    const year = selectedMonth.split(",")[1];

    return (
        <section className={styles.root}>
            <div className={styles.header}>
                <h2>{translations.address.meterReadings}</h2>
                <MdDateRangeSelector
                    meterReadings={removeFirstAddedMonth(filterMeterDataByAddress(items, currentPage))}
                    selectedMonth={month}
                    selectedYear={year}
                />
            </div>

            <MdMonthlyInfoList isWaterBlock={isWaterBlock} items={lastValue} />
            <LinkButtonGroup
                linksGroup={getLinkButtons(pathname, translations)}
                className={styles.footerButtonGroup}
            />
        </section>
    );
}
