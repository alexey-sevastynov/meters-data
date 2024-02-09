import React from "react";
import Styles from "./infoPanelMonth.module.scss";
import { motion } from "framer-motion";
import { ListInfoPanelMonth } from "../../ui/InfoPanelMonth/ListInfoPanelMonth/ListInfoPanelMonth";
import { Button } from "../Button/Button";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hook";

interface InfoPanelMonthProps {
  isWaterBlock?: boolean;
}

export const InfoPanelMonth: React.FC<InfoPanelMonthProps> = ({
  isWaterBlock = true,
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
  const selectedMonth = lastValue ? lastValue[0].description : "unknown";

  return (
    <section className={Styles.infoPanelMonthSection}>
      <h4 className={Styles.title}>
        Consumption of Utilities for{" "}
        <motion.b
          key={selectedMonth}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: "easeOut",
            duration: 0.7,
          }}
        >
          {selectedMonth}
        </motion.b>
        :
      </h4>

      <div className={Styles.infoPanelMonth}>
        <ListInfoPanelMonth isWaterBlock={isWaterBlock} items={lastValue} />
        <div className={Styles.links}>
          <Link to={`${pathname}/price`}>
            <Button>price</Button>
          </Link>
          <Link to={`${pathname}/graphics`}>
            <Button>graphics</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
