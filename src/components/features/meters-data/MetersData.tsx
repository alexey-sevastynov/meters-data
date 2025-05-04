import { useEffect } from "react";
import { BsCalendar2Plus, BsCalendar3 } from "react-icons/bs";
import Styles from "./metersData.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { filterMeterDataByAddressAndSortByDate } from "@/helpers/meters-data/filters";
import { useLocation } from "react-router-dom";
import { FormDataMonth } from "@/components/features/meters-data/form-data-month/FormDataMonth";
import { getAllMetersData } from "@/store/slices/meters-data/meters-data.thunks";
import { statusNames } from "@/constants/status";
import { ListMetersData } from "@/components/features/meters-data/list-meters-data/ListMetersData";

interface MetersDataProps {
    isWaterBlock?: boolean;
    isTableVisible?: boolean;
}

export function MdMetersData({ isWaterBlock = true, isTableVisible = true }: MetersDataProps) {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const translations = useAppSelector(selectTranslations);
    const meterReadingsList = useAppSelector((state) => state.metersData.items);
    const status = useAppSelector((state) => state.metersData.status);
    const addressPath = location.pathname.slice(1);
    const sortedAddressMeterData = filterMeterDataByAddressAndSortByDate(meterReadingsList, addressPath);

    useEffect(() => {
        if (meterReadingsList.length === 0 && status !== statusNames.loading) {
            dispatch(getAllMetersData());
        }
    }, [dispatch, meterReadingsList, status]);

    return (
        <section className={Styles.metersData}>
            <div className="overflow-auto">
                <h4 className={Styles.title}>
                    <BsCalendar2Plus style={{ marginRight: "10px" }} />
                    {translations.metersData["Meter Reading Submission Form for the end of the month"]}:
                </h4>

                <FormDataMonth
                    isWaterBlock={isWaterBlock}
                    sortedAddressMeterData={sortedAddressMeterData}
                    pathname={location.pathname}
                    addressPath={addressPath}
                />

                {isTableVisible && (
                    <>
                        <h4 className={Styles.title}>
                            <BsCalendar3 style={{ marginRight: "10px" }} />
                            {translations.metersData["Meter Reading Data Table by Months"]}:
                        </h4>
                        <ListMetersData isWaterBlock={isWaterBlock} />
                    </>
                )}
            </div>
        </section>
    );
}
