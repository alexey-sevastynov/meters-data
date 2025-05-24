import styles from "./infoPanelMonth.module.scss";
import { ListInfoPanelMonth } from "@/components/features/info-panel-month/list-info-panel-month/ListInfoPanelMonth";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { filterMeterDataByAddress } from "@/helpers/meters-data/filters";
import { MdDateRangeSelector } from "@/components/shared/date-range-selector/MdDateRangeSelector";
import { LinkButtonGroup } from "@/components/features/info-panel-month/link-button-group/LinkButtonGroup";
import { getStringEnv } from "@/infra/env/env-functions";
import { envKeys } from "@/infra/env/env-keys";
import { getLinkButtons } from "@/components/features/info-panel-month/link-button-group/LinkButtonGroup.funcs";
import { removeFirstAddedMonth } from "@/components/features/info-panel-month/infoPanelMonth.funcs";

interface MdInfoPanelMonthProps {
    isWaterBlock?: boolean;
}

export function MdInfoPanelMonth({ isWaterBlock = true }: MdInfoPanelMonthProps) {
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
        <section className={styles.infoPanelMonthSection}>
            <div className={styles.infoPanelMonth}>
                <div className={styles.infoPanelMonthHeader}>
                    <MdDateRangeSelector
                        data={removeFirstAddedMonth(filterMeterDataByAddress(items, currentPage))}
                        selectedMonth={month}
                        selectedYear={year}
                    />

                    <LinkButtonGroup
                        linksGroup={getLinkButtons(pathname, translations)}
                        className={styles.infoPanelMonthHeaderBtns}
                    />
                </div>

                <ListInfoPanelMonth isWaterBlock={isWaterBlock} items={lastValue} />
                <LinkButtonGroup
                    linksGroup={getLinkButtons(pathname, translations)}
                    className={styles.infoPanelMonthBtns}
                />
            </div>
        </section>
    );
}
