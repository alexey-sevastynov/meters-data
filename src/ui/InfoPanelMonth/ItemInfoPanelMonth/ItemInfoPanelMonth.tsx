import React from "react";
import useAdaptiveScreen from "@/hooks/useAdaptiveScreen";
import { BREAK_POINTS } from "@/constants";
import { useAppSelector } from "@/redux/hook";
import { selectTranslations } from "@/redux/slices/I18next";
import {
  shouldRenderDescriptionTitle,
  showValue,
} from "./itemInfoPanelMonth.function";
import { titlesForMeterReadings } from "@/constants/titlesForMeterReadings";
import { ValueChangeIndicator } from "../ValueChangeIndicator/ValueChangeIndicator";
import { ProgressIndicator } from "../ProgressIndicator/ProgressIndicator";
import Style from "./itemInfoPanelMonth.module.scss";
import { ItemInfoPanelMonthProps } from "./itemInfoPanelMonth.interface";

export const ItemInfoPanelMonth: React.FC<ItemInfoPanelMonthProps> = ({
  isWaterBlock,
  title,
  description,
  percentDifference,
  index,
}) => {
  const isMobileView = useAdaptiveScreen({ maxWidth: BREAK_POINTS.MOBILE_XL });
  const lang = useAppSelector(selectTranslations);

  const showDescriptionTitle = (
    <dt className={Style.title}>{lang.infoPanel[title]}</dt>
  );
  const hideBlockWater =
    !isWaterBlock && title === titlesForMeterReadings.water;

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
        <ProgressIndicator
          index={index}
          percentDifference={percentDifference}
          isMinus={true}
        />
        <span className={Style.itemInfoPanelMonth__line_center} />
        <ProgressIndicator
          index={index}
          percentDifference={percentDifference}
          isMinus={false}
        />
      </div>

      <p className={Style.itemInfoPanelMonth__title}>
        {shouldRenderDescriptionTitle(isMobileView, title) &&
          showDescriptionTitle}
      </p>
    </div>
  );
};
