import React from "react";
import Styles from "./metersData.module.scss";
import { FormDataMonth, ListMetersData } from "../../ui/MetersData";
import { useAppSelector } from "../../redux/hook";
import { selectTranslations } from "../../redux/slices/I18next";
import { BsCalendar2Plus, BsCalendar3 } from "react-icons/bs";

interface MetersDataProps {
  isWaterBlock?: boolean;
}

export const MetersData: React.FC<MetersDataProps> = ({
  isWaterBlock = true,
}) => {
  const lang = useAppSelector(selectTranslations);
  return (
    <section className={Styles.metersData}>
      <div className="overflow-auto mt-40">
        <h4 className={Styles.title}>
          <BsCalendar2Plus style={{ marginRight: "10px" }} />
          {
            lang.metersData[
              "Meter Reading Submission Form for the end of the month"
            ]
          }
          :
        </h4>
        <FormDataMonth isWaterBlock={isWaterBlock} />
        <h4 className={Styles.title}>
          <BsCalendar3 style={{ marginRight: "10px" }} />
          {lang.metersData["Meter Reading Data Table by Months"]}:
        </h4>
        <ListMetersData isWaterBlock={isWaterBlock} />
      </div>
    </section>
  );
};
