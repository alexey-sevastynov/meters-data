import "../styles/pages/graphics.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { LIST_NAV } from "../constants";
import { formatDate } from "../helpers/formatDate";
import { useAppSelector } from "../redux/hook";
import { filterAndSortItemsByAddressAndDate } from "../helpers/filterAndSortItemsByAddressAndDate";
import { Chart } from "../components/Chart/Chart";
import { selectTranslations } from "../redux/slices/I18next";

export const Graphics = () => {
  const { address } = useParams();
  const { pathname } = useLocation();

  const items = useAppSelector((props) => props.metersData.metersData.items);
  const addressCurrentPage = pathname.slice(1).replace("/graphics", "");
  const listMetersData = filterAndSortItemsByAddressAndDate(
    items,
    addressCurrentPage
  );
  const lang = useAppSelector(selectTranslations);

  const addressItem = LIST_NAV.find(({ link }) => link === `/${address}`);
  const nameAddress = addressItem
    ? lang.navigation[addressItem.key]
    : "Unknown Address";

  const dataLight = [];
  const dataGas = [];
  const dataWater = [];

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

    dataLight.push({
      label,
      light: lightDiff,
      lightDay: lightDayDiff,
      lightNight: lightNightDiff,
    });

    dataGas.push({
      label,
      gas: gasDiff >= 0 ? gasDiff : 0,
    });

    dataWater.push({ label, water: waterDiff });
  }

  return (
    <div className="graphics">
      <div className="title">
        <Link className="link" to={`/${address}`}>
          {nameAddress}
        </Link>
        <p>/{lang.graphics["graphics"]}</p>

        <div className="items">
          <Chart data={dataLight} label={"Light"} />
          <Chart data={dataGas} label={"Gas"} />

          {dataWater.every((item) => item.water !== null) && (
            <Chart data={dataWater} label={"Water"} />
          )}
        </div>
      </div>
    </div>
  );
};
