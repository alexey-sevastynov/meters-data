import Styles from "./infoPanelMonth.module.scss";
import { RiPriceTagFill } from "react-icons/ri";
import { IoBarChartSharp } from "react-icons/io5";
import { ListInfoPanelMonth } from "@/components/features/info-panel-month/list-info-panel-month/ListInfoPanelMonth";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { selectTranslations } from "@/redux/slices/I18next";
import { SIZE_ICONS } from "@/constants/sizeIcons";
import { filterItemsByAddress } from "@/helpers/filterAndSortItemsByAddressAndDate";
import { removeFirstAddedMonth } from "@/helpers/removeFirstAddedMonth";
import { MdDateRangeSelector } from "@/components/shared/date-range-selector/MdDateRangeSelector";
import { LinkButtonGroup } from "@/components/features/info-panel-month/link-button-group/LinkButtonGroup";

interface MdInfoPanelMonthProps {
  isWaterBlock?: boolean;
}

export function MdInfoPanelMonth({
  isWaterBlock = true,
}: MdInfoPanelMonthProps) {
  const { pathname } = useLocation();
  const currentPage = pathname.slice(1);

  const items = useAppSelector((props) => props.metersData.metersData.items);
  const infoMeterReading = useAppSelector(
    (props) => props.metersData.infoMeterReading
  );
  const lang = useAppSelector(selectTranslations);

  const lastValueMeter = (address: string) => {
    switch (address) {
      case import.meta.env.VITE_ADDR_001:
        return infoMeterReading.address_001;
      case import.meta.env.VITE_ADDR_002:
        return infoMeterReading.address_002;
      case import.meta.env.VITE_ADDR_003:
        return infoMeterReading.address_003;
      case import.meta.env.VITE_ADDR_004:
        return infoMeterReading.address_004;
      case import.meta.env.VITE_ADDR_005:
        return infoMeterReading.address_005;
      default:
        return null;
    }
  };

  const lastValue = lastValueMeter(currentPage);
  const selectedMonth: string = lastValue
    ? lastValue[0].description
    : "unknown";

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
          <MdDateRangeSelector
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
}
