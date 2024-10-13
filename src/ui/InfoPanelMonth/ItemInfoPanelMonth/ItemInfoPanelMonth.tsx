import React from "react";
import Style from "./itemInfoPanelMonth.module.scss";
import useAdaptiveScreen from "@/hooks/useAdaptiveScreen";
import { BREAK_POINTS, VALUE_BY_TITLE } from "@/constants";
import { useAppSelector } from "@/redux/hook";
import { selectTranslations } from "@/redux/slices/I18next";

interface ItemInfoPanelMonthProps {
  isWaterBlock: boolean;
  title: string;
  description: any;
}

export const ItemInfoPanelMonth: React.FC<ItemInfoPanelMonthProps> = ({
  isWaterBlock,
  title,
  description,
}) => {
  const isMobileView = useAdaptiveScreen({ maxWidth: BREAK_POINTS.MOBILE_XL });
  const lang = useAppSelector(selectTranslations);

  const showValue = (title: string) => {
    const unitOfChange = VALUE_BY_TITLE[title];

    return lang.value[unitOfChange] || "";
  };

  const shouldRenderDescriptionTitle = isMobileView ? title !== "Date" : true;
  const showDescriptionTitle = (
    <dt className={Style.title}>{lang.infoPanel[title]}</dt>
  );
  const hideBlockWater = !isWaterBlock && title === "Water general";

  const descriptionStyles =
    isMobileView && title === "Date"
      ? { margin: "0 auto", fontWeight: "bold" }
      : {};

  if (hideBlockWater) {
    return null;
  }

  if (title === "Date") {
    return null;
  }

  return (
    <div className={Style.itemInfoPanelMonth}>
      {shouldRenderDescriptionTitle && showDescriptionTitle}
      <dd className={Style.description} style={descriptionStyles}>
        {description} {showValue(title)}
      </dd>
    </div>
  );
};
