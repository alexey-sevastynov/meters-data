import React from "react";
import Styles from "./headMetersData.module.scss";
import { useAppSelector } from "@/redux/hook";
import { selectTranslations } from "@/redux/slices/I18next";

interface HeadMetersDataProps {
    isWaterBlock: boolean;
    isOpen?: boolean;
}

export const HeadMetersData: React.FC<HeadMetersDataProps> = ({ isWaterBlock, isOpen }) => {
    const lang = useAppSelector(selectTranslations);

    if (!isOpen) return null;

    return (
        <li className={Styles.headMetersData}>
            <p className={Styles.headMetersData__date}> {lang.infoPanel["month"]}</p>
            <p className={Styles.headMetersData__light}>
                {lang.infoPanel["Light general"]}, {lang.value.kW}
            </p>
            <p className={Styles.headMetersData__lightDay}>
                {lang.infoPanel["Light day"]}, {lang.value.kW}
            </p>
            <p className={Styles.headMetersData__lightNight}>
                {lang.infoPanel["Light night"]}, {lang.value.kW}
            </p>
            <p className={Styles.headMetersData__gas}>
                {lang.infoPanel["Gas General"]}, {lang.value["m³"]}
            </p>
            {isWaterBlock && (
                <p className={Styles.headMetersData__water}>
                    {lang.infoPanel["Water general"]}, {lang.value["m³"]}
                </p>
            )}
        </li>
    );
};
