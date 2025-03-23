import Styles from "./infoPanelMonth.module.scss";
import { ListInfoPanelMonth } from "@/components/features/info-panel-month/list-info-panel-month/ListInfoPanelMonth";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { selectTranslations } from "@/redux/slices/I18next";
import { filterItemsByAddress } from "@/helpers/filterAndSortItemsByAddressAndDate";
import { removeFirstAddedMonth } from "@/helpers/removeFirstAddedMonth";
import { MdDateRangeSelector } from "@/components/shared/date-range-selector/MdDateRangeSelector";
import { LinkButtonGroup } from "@/components/features/info-panel-month/link-button-group/LinkButtonGroup";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { getStringEnv } from "@/helpers/get-string-env";
import { envKeys } from "@/enums/env-keys";

interface MdInfoPanelMonthProps {
    isWaterBlock?: boolean;
}

export function MdInfoPanelMonth({ isWaterBlock = true }: MdInfoPanelMonthProps) {
    const { pathname } = useLocation();
    const currentPage = pathname.slice(1);
    const items = useAppSelector((state) => state.metersData.metersData.items);
    const infoMeterReading = useAppSelector((state) => state.metersData.infoMeterReading);
    const lang = useAppSelector(selectTranslations);

    const lastValueMeter = (address: string) => {
        switch (address) {
            case getStringEnv(envKeys.address001):
                return infoMeterReading.address_001;
            case getStringEnv(envKeys.address002):
                return infoMeterReading.address_002;
            case getStringEnv(envKeys.address003):
                return infoMeterReading.address_003;
            case getStringEnv(envKeys.address004):
                return infoMeterReading.address_004;
            case getStringEnv(envKeys.address005):
                return infoMeterReading.address_005;
            default:
                return null;
        }
    };

    const lastValue = lastValueMeter(currentPage);
    const selectedMonth: string = lastValue ? lastValue[0].description : "unknown";
    const month = selectedMonth.split(",")[0];
    const year = selectedMonth.split(",")[1];
    const linksGroup = [
        {
            path: `${pathname}/price`,
            icon: <MdIcon name={iconNames.priceTagFill} />,
            label: lang.infoPanel.price,
        },
        {
            path: `${pathname}/graphics`,
            icon: <MdIcon name={iconNames.barChartSharp} />,
            label: lang.infoPanel.graphics,
        },
    ];

    return (
        <section className={Styles.infoPanelMonthSection}>
            <div className={Styles.infoPanelMonth}>
                <div className={Styles.infoPanelMonth__header}>
                    <MdDateRangeSelector
                        data={removeFirstAddedMonth(filterItemsByAddress(items, currentPage))}
                        selectedMonth={month}
                        selectedYear={year}
                    />

                    <LinkButtonGroup linksGroup={linksGroup} className={Styles.infoPanelMonth__header_btns} />
                </div>

                <ListInfoPanelMonth isWaterBlock={isWaterBlock} items={lastValue} />
                <LinkButtonGroup linksGroup={linksGroup} className={Styles.infoPanelMonth__btns} />
            </div>
        </section>
    );
}
