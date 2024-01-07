import React from "react";
import Style from "./listInfoPanelMonth.module.scss";

import { ItemInfoPanelMonth } from "../ItemInfoPanelMonth/ItemInfoPanelMonth";
import { useAppSelector } from "../../../redux/hook";

import { useLocation } from "react-router-dom";

interface ListInfoPanelMonthProps {
  isWaterBlock: boolean;
}

export const ListInfoPanelMonth: React.FC<ListInfoPanelMonthProps> = ({
  isWaterBlock,
}) => {
  const { pathname } = useLocation();
  const currentPage = pathname.slice(1);
  const infoMeterReading = useAppSelector(
    (props) => props.metersData.infoMeterReading
  );

  const lastValueMeter = (address: string) => {
    switch (address) {
      case "chelyuskina":
        return infoMeterReading.chelyuskina;
      case "slobozhansky-68a":
        return infoMeterReading.slobozhansky;
      case "antonovicha-73":
        return infoMeterReading.antonovicha73;
      case "antonovicha-75":
        return infoMeterReading.antonovicha75;
      default:
        return null;
    }
  };

  const lastValue = lastValueMeter(currentPage);

  return (
    <dl className={Style.listInfoPanelMonth}>
      {lastValue &&
        lastValue.map((props) => (
          <ItemInfoPanelMonth
            key={props.title}
            isWaterBlock={isWaterBlock}
            {...props}
          />
        ))}
    </dl>
  );
};
