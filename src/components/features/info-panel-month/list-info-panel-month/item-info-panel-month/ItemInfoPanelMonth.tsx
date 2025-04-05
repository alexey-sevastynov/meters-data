import Style from "./itemInfoPanelMonth.module.scss";
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
    const lang = useAppSelector(selectTranslations);

    const showDescriptionTitle = (
        <dt className={Style.title}>{lang.infoPanel[title as TitleInfoPanelMonthType]}</dt>
    );
    const hideBlockWater = !isWaterBlock && title === titlesForMeterReadings.water;

    if (hideBlockWater) {
        return null;
    }

    if (title === titlesForMeterReadings.date) {
        return null;
    }

    return (
        <div className={Style.itemInfoPanelMonth}>
            <dd className={Style.itemInfoPanelMonth__header}>
                <p>
                    {description} {showValue(title, lang)}
                </p>
                <div className={Style.itemInfoPanelMonth__header_value_percent}>
                    <ValueChangeIndicator percentDifference={percentDifference} />
                    <p>{Math.abs(percentDifference)}%</p>
                </div>
            </dd>
            <div className={Style.itemInfoPanelMonth__line}>
                <ProgressIndicator index={index} percentDifference={percentDifference} isMinus={true} />
                <span className={Style.itemInfoPanelMonth__line_center} />
                <ProgressIndicator index={index} percentDifference={percentDifference} isMinus={false} />
            </div>

            <p className={Style.itemInfoPanelMonth__title}>
                {shouldRenderDescriptionTitle(isMobileView, title) && showDescriptionTitle}
            </p>
        </div>
    );
}
