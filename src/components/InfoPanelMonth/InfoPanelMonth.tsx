import React from "react";
import Styles from "./infoPanelMonth.module.scss";
import { RiPriceTagFill } from "react-icons/ri";
import { IoBarChartSharp } from "react-icons/io5";
import { ListInfoPanelMonth } from "@/ui/InfoPanelMonth/ListInfoPanelMonth/ListInfoPanelMonth";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { selectTranslations } from "@/redux/slices/I18next";
import { SIZE_ICONS } from "@/constants/sizeIcons";
import { filterItemsByAddress } from "@/helpers/filterAndSortItemsByAddressAndDate";
import { removeFirstAddedMonth } from "@/helpers/removeFirstAddedMonth";
import { DateRangeSelector } from "../DateRangeSelector/DateRangeSelector";
import LinkButtonGroup from "../LinkButtonGroup/LinkButtonGroup";

interface InfoPanelMonthProps {
  isWaterBlock?: boolean;
}

export const InfoPanelMonth: React.FC<InfoPanelMonthProps> = ({
  isWaterBlock = true,
}) => {
  const { pathname } = useLocation();
  const currentPage = pathname.slice(1);

  const items = useAppSelector((props) => props.metersData.metersData.items);
  const infoMeterReading = useAppSelector(
    (props) => props.metersData.infoMeterReading
  );
  const lang = useAppSelector(selectTranslations);

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
      case "antonovicha-75-3":
        return infoMeterReading.antonovicha75_3;
      default:
        return null;
    }
  };

  const lastValue = lastValueMeter(currentPage);
  const selectedMonth: any = lastValue ? lastValue[0].description : "unknown";
  const month = selectedMonth.split(",")[0];
  const year = selectedMonth.split(",")[1];

  const linksGroup = [
    {
      path: `${pathname}/price`,
      icon: <RiPriceTagFill size={SIZE_ICONS.medium} />,
      label: lang.infoPanel.price,
    },
    {
      path: `${pathname}/graphics`,
      icon: <IoBarChartSharp size={SIZE_ICONS.medium} />,
      label: lang.infoPanel.graphics,
    },
  ];

  return (
    <section className={Styles.infoPanelMonthSection}>
      <div className={Styles.infoPanelMonth}>
        <div className={Styles.infoPanelMonth__header}>
          <DateRangeSelector
            data={removeFirstAddedMonth(
              filterItemsByAddress(items, currentPage)
            )}
            selectedMonth={month}
            selectedYear={year}
          />

          <LinkButtonGroup
            linksGroup={linksGroup}
            className={Styles.infoPanelMonth__header_btns}
          />
        </div>

        <ListInfoPanelMonth
          isWaterBlock={isWaterBlock}
          items={lastValue}
        />
        <LinkButtonGroup
          linksGroup={linksGroup}
          className={Styles.infoPanelMonth__btns}
        />
      </div>
    </section>
  );
};
