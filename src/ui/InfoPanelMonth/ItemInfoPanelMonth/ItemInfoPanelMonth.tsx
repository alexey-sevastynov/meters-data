import React from "react";
import Style from "./itemInfoPanelMonth.module.scss";
import useAdaptiveScreen from "../../../hooks/useAdaptiveScreen";
import { BREAK_POINTS } from "../../../constants";

interface ItemInfoPanelMonthProps {
  title: string;
  description: any;
}

export const ItemInfoPanelMonth: React.FC<ItemInfoPanelMonthProps> = ({
  title,
  description,
}) => {
  const isMobileView = useAdaptiveScreen({ maxWidth: BREAK_POINTS.MOBILE_XL });

  const showValue = (title: string) => {
    switch (title) {
      case "Light general":
        return "kW";
      case "Light day":
        return "kW";
      case "Light night":
        return "kW";
      case "Gas General":
        return "m³";
      case "Water general":
        return "m³";

      default:
        break;
    }
  };

  const shiwDescriptionTitle = <dt className={Style.title}>{title}</dt>;

  return (
    <div className={Style.ItemInfoPanelMonth}>
      {isMobileView
        ? title !== "Date" && shiwDescriptionTitle
        : shiwDescriptionTitle}
      <dd
        className={Style.description}
        style={
          isMobileView && title === "Date"
            ? { margin: "0 auto", fontWeight: "bold" }
            : {}
        }
      >
        {description} {showValue(title)}
      </dd>
    </div>
  );
};
