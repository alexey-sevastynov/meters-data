import { BsCalendar2Plus, BsCalendar3 } from "react-icons/bs";
import Styles from "./metersData.module.scss";
import { useAppSelector } from "@/redux/hook";
import { selectTranslations } from "@/redux/slices/I18next";
import { filterAndSortItemsByAddressAndDate } from "@/helpers/filterAndSortItemsByAddressAndDate";
import { AddressType } from "@/types/MeterDataType";
import { useLocation } from "react-router-dom";
import { FormDataMonth } from "./form-data-month/FormDataMonth";
import { ListMetersData } from "@/components/features/meters-data/list-meters-data/ListMetersData";

interface MetersDataProps {
  isWaterBlock?: boolean;
}

export function MdMetersData({ isWaterBlock = true }: MetersDataProps) {
  const { pathname } = useLocation();
  const lang = useAppSelector(selectTranslations);
  const meterReadingsList = useAppSelector(
    (props) => props.metersData.metersData.items
  );

  const addressPath: AddressType = pathname.slice(1);
  const sortedAddressMeterData = filterAndSortItemsByAddressAndDate(
    meterReadingsList,
    addressPath
  );

  return (
    <section className={Styles.metersData}>
      <div className="overflow-auto">
        <h4 className={Styles.title}>
          <BsCalendar2Plus style={{ marginRight: "10px" }} />
          {
            lang.metersData[
              "Meter Reading Submission Form for the end of the month"
            ]
          }
          :
        </h4>

        <FormDataMonth
          isWaterBlock={isWaterBlock}
          sortedAddressMeterData={sortedAddressMeterData}
          pathname={pathname}
          addressPath={addressPath}
        />

        <h4 className={Styles.title}>
          <BsCalendar3 style={{ marginRight: "10px" }} />
          {lang.metersData["Meter Reading Data Table by Months"]}:
        </h4>
        <ListMetersData isWaterBlock={isWaterBlock} />
      </div>
    </section>
  );
}
