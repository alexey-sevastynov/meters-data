import { BsCalendar2Plus } from "react-icons/bs";
import styles from "./metersFormSection.module.scss";
import { useAppSelector } from "@/store/hook";
import { selectTranslations } from "@/store/slices/i-18-next";
import { filterMeterDataByAddressAndSortByDate } from "@/helpers/meters-data/filters";
import { useLocation } from "react-router-dom";
import { FormDataMonth } from "@/components/features/meters-form-section/form-data-month/FormDataMonth";

interface MetersFormSectionProps {
    isWaterBlock?: boolean;
}

export function MdMetersFormSection({ isWaterBlock = true }: MetersFormSectionProps) {
    const location = useLocation();
    const translations = useAppSelector(selectTranslations);
    const meterReadingsList = useAppSelector((state) => state.metersData.items);
    const addressPath = location.pathname.slice(1);
    const sortedAddressMeterData = filterMeterDataByAddressAndSortByDate(meterReadingsList, addressPath);

    return (
        <section className={styles.root}>
            <div className="overflow-auto">
                <h4 className={styles.title}>
                    <BsCalendar2Plus style={{ marginRight: "10px" }} />
                    {translations.metersData["Meter Reading Submission Form for the end of the month"]}:
                </h4>
                <FormDataMonth
                    isWaterBlock={isWaterBlock}
                    sortedAddressMeterData={sortedAddressMeterData}
                    pathname={location.pathname}
                    addressPath={addressPath}
                />
            </div>
        </section>
    );
}
