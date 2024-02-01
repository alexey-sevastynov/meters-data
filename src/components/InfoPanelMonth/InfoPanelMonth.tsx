import React from "react";
import Styles from "./infoPanelMonth.module.scss";
import { ListInfoPanelMonth } from "../../ui/InfoPanelMonth/ListInfoPanelMonth/ListInfoPanelMonth";
import { Button } from "../Button/Button";
import { Link, useLocation } from "react-router-dom";
import { Chart } from "../Chart/Chart";
import { useAppSelector } from "../../redux/hook";
import { filterAndSortItemsByAddressAndDate } from "../../helpers/filterAndSortItemsByAddressAndDate";
import { formatDate } from "../../helpers/formatDate";

interface InfoPanelMonthProps {
  isWaterBlock?: boolean;
}

export const InfoPanelMonth: React.FC<InfoPanelMonthProps> = ({
  isWaterBlock = true,
}) => {
  const { pathname } = useLocation();

  const items = useAppSelector((props) => props.metersData.metersData.items);
  const addressCurrentPage = pathname.slice(1);
  const listMetersData = filterAndSortItemsByAddressAndDate(
    items,
    addressCurrentPage
  );

  const formattedData = [];

  for (let i = 1; i < listMetersData.length; i++) {
    const currentMonth = listMetersData[i];
    const previousMonth = listMetersData[i - 1];

    const lightDiff = currentMonth.light - previousMonth.light;
    const lightDayDiff = currentMonth.lightDay - previousMonth.lightDay;
    const lightNightDiff = currentMonth.lightNight - previousMonth.lightNight;
    const gasDiff = currentMonth.gas - previousMonth.gas;
    const waterDiff =
      (currentMonth.water &&
        previousMonth.water &&
        currentMonth.water - previousMonth.water) ||
      null;

    const label = formatDate(currentMonth.date);

    formattedData.push({
      label,
      light: lightDiff,
      lightDay: lightDayDiff,
      lightNight: lightNightDiff,
      gas: gasDiff >= 0 ? gasDiff : 0,
      water: waterDiff,
    });
  }

  return (
    <div className={Styles.infoPanelMonth}>
      <ListInfoPanelMonth isWaterBlock={isWaterBlock} />

      <Link to={`${pathname}/price`}>
        <Button>price</Button>
      </Link>

      {formattedData && <Chart data={formattedData} />}
    </div>
  );
};
