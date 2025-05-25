import styles from "./itemInfoPanelMonth.module.scss";
import useAdaptiveScreen from "@/hooks/useAdaptiveScreen";
import { breakPoints } from "@/constants/break-points";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import {
    shouldRenderDescriptionTitle,
    showValue,
} from "@/components/features/monthly-utility-report/monthly-info-list/monthly-info-item/itemInfoPanelMonth.function";
import { titlesForMeterReadings } from "@/constants/titles-for-meter-readings";
import { ValueChangeIndicator } from "@/components/features/monthly-utility-report/monthly-info-list/monthly-info-item/value-change-indicator/ValueChangeIndicator";
import { ProgressIndicator } from "@/components/features/monthly-utility-report/monthly-info-list/monthly-info-item/progress-indicator/ProgressIndicator";
import { MonthlyInfoItemProps } from "@/components/features/monthly-utility-report/monthly-info-list/monthly-info-item/itemInfoPanelMonth.interface";
import { TitleInfoPanelMonthType } from "@/types/title-info-panel-month-type";

export function MdMonthlyInfoItem({
    isWaterBlock,
    title,
    description,
    percentDifference,
    index,
}: MonthlyInfoItemProps) {
    const isMobileView = useAdaptiveScreen({ maxWidth: breakPoints.md });
    const translations = useAppSelector(selectTranslations);

    const showDescriptionTitle = (
        <dt className={styles.title}>{translations.infoPanel[title as TitleInfoPanelMonthType]}</dt>
    );
    const hideBlockWater = !isWaterBlock && title === titlesForMeterReadings.water;

    if (hideBlockWater) {
        return null;
    }

    if (title === titlesForMeterReadings.date) {
        return null;
    }

    return (
        <div className={styles.root}>
            <dd className={styles.header}>
                <p>
                    {description} {showValue(title, translations)}
                </p>
                <div className={styles.valuePercent}>
                    <ValueChangeIndicator percentDifference={percentDifference} />
                    <p>{Math.abs(percentDifference)}%</p>
                </div>
            </dd>
            <div className={styles.line}>
                <ProgressIndicator index={index} percentDifference={percentDifference} isMinus={true} />
                <span className={styles.lineCenter} />
                <ProgressIndicator index={index} percentDifference={percentDifference} isMinus={false} />
            </div>

            <p className={styles.title}>
                {shouldRenderDescriptionTitle(isMobileView, title) && showDescriptionTitle}
            </p>
        </div>
    );
}
