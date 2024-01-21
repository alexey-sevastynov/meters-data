import React from "react";
import Style from "./itemInfoPanelMonth.module.scss";
import useAdaptiveScreen from "../../../hooks/useAdaptiveScreen";
import { BREAK_POINTS, VALUE_BY_TITLE } from "../../../constants";

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

  const showValue = (title: string) => {
    return VALUE_BY_TITLE[title] || "";
  };

  const shouldRenderDescriptionTitle = isMobileView ? title !== "Date" : true;
  const showDescriptionTitle = <dt className={Style.title}>{title}</dt>;
  const hideBlockWater = !isWaterBlock && title === "Water general";

  const descriptionStyles =
    isMobileView && title === "Date"
      ? { margin: "0 auto", fontWeight: "bold" }
      : {};

  if (hideBlockWater) {
    return null; // Возвращаем null, чтобы не отображать блок
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
