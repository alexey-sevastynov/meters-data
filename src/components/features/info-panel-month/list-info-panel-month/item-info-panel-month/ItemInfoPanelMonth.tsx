import styles from "./itemInfoPanelMonth.module.scss";
import useAdaptiveScreen from "@/hooks/useAdaptiveScreen";
import { breakPoints } from "@/constants/break-points";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import {
    shouldRenderDescriptionTitle,
    showValue,
} from "@/components/features/info-panel-month/list-info-panel-month/item-info-panel-month/itemInfoPanelMonth.function";
import { titlesForMeterReadings } from "@/constants/titles-for-meter-readings";
import { ValueChangeIndicator } from "@/components/features/info-panel-month/list-info-panel-month/item-info-panel-month/value-change-indicator/ValueChangeIndicator";
import { ProgressIndicator } from "@/components/features/info-panel-month/list-info-panel-month/item-info-panel-month/progress-indicator/ProgressIndicator";
import { ItemInfoPanelMonthProps } from "@/components/features/info-panel-month/list-info-panel-month/item-info-panel-month/itemInfoPanelMonth.interface";
import { TitleInfoPanelMonthType } from "@/types/title-info-panel-month-type";

export function ItemInfoPanelMonth({
    isWaterBlock,
    title,
    description,
    percentDifference,
    index,
}: ItemInfoPanelMonthProps) {
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
        <div className={styles.itemInfoPanelMonth}>
            <dd className={styles.itemInfoPanelMonthHeader}>
                <p>
                    {description} {showValue(title, translations)}
                </p>
                <div className={styles.itemInfoPanelMonthHeaderValuePercent}>
                    <ValueChangeIndicator percentDifference={percentDifference} />
                    <p>{Math.abs(percentDifference)}%</p>
                </div>
            </dd>
            <div className={styles.itemInfoPanelMonthLine}>
                <ProgressIndicator index={index} percentDifference={percentDifference} isMinus={true} />
                <span className={styles.itemInfoPanelMonthLineCenter} />
                <ProgressIndicator index={index} percentDifference={percentDifference} isMinus={false} />
            </div>

            <p className={styles.itemInfoPanelMonthTitle}>
                {shouldRenderDescriptionTitle(isMobileView, title) && showDescriptionTitle}
            </p>
        </div>
    );
}
