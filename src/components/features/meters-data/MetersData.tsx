import { BsCalendar2Plus, BsCalendar3 } from "react-icons/bs";
import Styles from "./metersData.module.scss";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { filterAndSortItemsByAddressAndDate } from "@/helpers/filter-and-sort-items-by-address-and-date";
import { useLocation } from "react-router-dom";
import { FormDataMonth } from "./form-data-month/FormDataMonth";
import { ListMetersData } from "@/components/features/meters-data/list-meters-data/ListMetersData";

interface MetersDataProps {
    isWaterBlock?: boolean;
}

export function MdMetersData({ isWaterBlock = true }: MetersDataProps) {
    const { pathname } = useLocation();
    const lang = useAppSelector(selectTranslations);
    const meterReadingsList = useAppSelector((state) => state.metersData.items);

    const addressPath: string = pathname.slice(1);
    const sortedAddressMeterData = filterAndSortItemsByAddressAndDate(meterReadingsList, addressPath);

    return (
        <section className={Styles.metersData}>
            <div className="overflow-auto">
                <h4 className={Styles.title}>
                    <BsCalendar2Plus style={{ marginRight: "10px" }} />
                    {lang.metersData["Meter Reading Submission Form for the end of the month"]}:
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
